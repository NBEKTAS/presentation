#!/usr/bin/env python3
"""Double-fork daemon serving the presentation directory over HTTP.

Why: the sandboxed shell kills background children when the command ends,
`setsid` is unavailable on this Mac, and `python3 -m http.server` under
launchctl hits a getcwd() PermissionError. A double-fork with os.setsid()
detaches cleanly from the shell's process group.

Writes the daemon PID to /tmp/ppt_server.pid and prints it.
"""
import functools
import http.server
import os
import sys
import time

PORT = 8642
ROOT = os.path.dirname(os.path.abspath(__file__))
PIDFILE = "/tmp/ppt_server.pid"


def daemonize() -> int:
    pid = os.fork()
    if pid > 0:
        # parent: wait briefly so the child can report port errors first
        time.sleep(0.7)
        try:
            with open(PIDFILE) as f:
                return int(f.read().strip())
        except Exception:
            sys.exit(0)
    os.setsid()
    pid = os.fork()
    if pid > 0:
        os._exit(0)
    # grandchild = daemon
    sys.stdout.flush(); sys.stderr.flush()
    devnull = os.open(os.devnull, os.O_RDWR)
    os.dup2(devnull, 0)
    log = open("/tmp/ppt_server.log", "ab", buffering=0)
    os.dup2(log.fileno(), 1)
    os.dup2(log.fileno(), 2)
    return 0


def main() -> None:
    daemon_pid = daemonize()
    if daemon_pid:
        print(daemon_pid)
        return

    os.chdir(ROOT)
    with open(PIDFILE, "w") as f:
        f.write(str(os.getpid()))

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    try:
        http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler).serve_forever()
    except Exception as e:  # port busy etc.
        with open("/tmp/ppt_server.err", "w") as f:
            f.write(repr(e))
        os._exit(1)


if __name__ == "__main__":
    main()

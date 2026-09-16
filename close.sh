#!/bin/bash

# Check if the PID file exists
if [ -f .app_pid ]; then
  # Read the PID from the file
  PID=$(cat .app_pid)
  
  echo "Stopping the presentation app (PID: $PID)..."
  
  # Kill the process
  kill $PID 2>/dev/null
  
  # Remove the PID file
  rm .app_pid
  
  echo "App stopped successfully."
else
  echo "App is not currently running (no .app_pid file found)."
  
  # Optional: Fallback to kill node/vite processes if they were started differently
  # Uncomment the line below if you want a brute-force kill
  # pkill -f "vite"
fi

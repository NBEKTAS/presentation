#!/bin/bash

# Start the Vite React app in the background
echo "Starting the presentation app..."

# Run 'npm run dev', redirect output to app.log, and run in background
npm run dev > app.log 2>&1 &

# Save the Process ID (PID) to a file so we can kill it later
echo $! > .app_pid

echo "App started successfully!"
echo "It may take a few seconds to load. You can view it at: http://localhost:3000"
echo "Check app.log if you need to see the logs."

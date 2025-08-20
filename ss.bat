@echo off
echo Stopping any existing servers on port 5173...

REM Find and kill processes using port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo Killing process %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo Starting development server...
cd testinternals-website
npm run dev 
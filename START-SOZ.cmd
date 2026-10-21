@echo off
setlocal
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\NodeJS\node-v24.22.0-win-x64;C:\Program Files\nodejs;C:\Program Files\Git\cmd;%PATH%"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 24 LTS is required. Install it from https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  call npm.cmd install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo.
echo SÖZ: http://localhost:5173
echo Keep this window open. Press Ctrl+C to stop.
echo.
call npm.cmd run dev
pause

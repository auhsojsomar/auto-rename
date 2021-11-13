@echo off
echo [1] Rename image
echo [2] Compress image

set /p command="Process: "

IF %command% == 1 node index.cjs
IF %command% == 2 node compress

pause
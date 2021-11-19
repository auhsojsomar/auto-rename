@echo off
echo [1] Rename image
echo [2] Convert image

set /p command="Process: "

IF %command% == 1 node index.cjs
IF %command% == 2 node convert

pause
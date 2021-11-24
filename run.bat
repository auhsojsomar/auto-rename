@echo off
echo [1] Rename image
echo [2] Convert image

set /p command="Process: "

IF %command% == 1 set /p sbu="CSV Filename: "
node index %sbu%
IF %command% == 2 node convert

pause
@echo off
echo [1] Rename image
echo [2] Convert image

set /p command="Process: "

IF /i "%command%"=="1" GOTO rename
IF /i "%command%"=="2" GOTO convert


:rename
set /p sbu="CSV Filename: "
node index %sbu%
pause
exit

:convert
node convert
pause
exit


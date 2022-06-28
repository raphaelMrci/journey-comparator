@echo off
start "title" .\data.json"

pause

node ./compare.js

pause > nul
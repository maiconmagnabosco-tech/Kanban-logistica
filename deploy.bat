@echo off
echo ========================================
echo   Kanban - Deploy para Vercel
echo ========================================
echo.
echo Este script vai instalar o Vercel CLI e fazer o deploy
echo.
echo Instalando Vercel CLI...
npm install -g vercel

echo.
echo Fazendo deploy...
cd /d "%~dp0"
vercel --prod

echo.
echo Deploy concluido!
pause

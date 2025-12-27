@echo off
chcp 65001 >nul
echo ========================================
echo   PUBLICAR KANBAN ONLINE - VERCEL
echo ========================================
echo.

REM Verificar se Vercel CLI está instalado
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Vercel CLI não está instalado!
    echo.
    echo Instalando Vercel CLI...
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar Vercel CLI
        echo Verifique se o Node.js está instalado
        pause
        exit /b 1
    )
    echo [OK] Vercel CLI instalado!
    echo.
)

echo [INFO] Verificando login...
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [AVISO] Você precisa fazer login na Vercel
    echo Abrindo navegador para login...
    vercel login
)

echo.
echo ========================================
echo   INICIANDO DEPLOY
echo ========================================
echo.

REM Executar deploy
vercel --yes

echo.
echo ========================================
echo   DEPLOY CONCLUÍDO!
echo ========================================
echo.
echo Anote a URL que foi exibida acima!
echo.
pause



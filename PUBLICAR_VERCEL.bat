@echo off
chcp 65001 >nul
echo ========================================
echo   DEPLOY NO VERCEL - KANBAN LOGÍSTICA
echo ========================================
echo.

:: Verificar se está na pasta correta
cd /d "%~dp0"
echo [1/5] Verificando localização...
echo Pasta atual: %CD%
echo.

:: Verificar se config.js existe
if not exist "config.js" (
    echo [ERRO] Arquivo config.js não encontrado!
    echo.
    echo Por favor, crie o arquivo config.js a partir do config.js.example
    echo Execute: Copy-Item config.js.example config.js
    echo Depois edite o config.js com suas credenciais
    pause
    exit /b 1
)

echo [2/5] Arquivo config.js encontrado ✓
echo.

:: Verificar se git está instalado
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [AVISO] Git não encontrado. Você precisará fazer deploy manual.
    echo Acesse: https://vercel.com e faça upload dos arquivos
    pause
    exit /b 0
)

echo [3/5] Git encontrado ✓
echo.

:: Inicializar git se necessário
if not exist ".git" (
    echo [4/5] Inicializando repositório Git...
    git init
    git add .
    git commit -m "Versão estável 01 - Deploy Vercel"
    echo.
    echo [IMPORTANTE] Você precisa criar um repositório no GitHub e conectar:
    echo   1. Acesse: https://github.com/new
    echo   2. Crie um novo repositório
    echo   3. Execute os comandos que aparecerão na tela
    echo.
    pause
    exit /b 0
)

echo [4/5] Repositório Git já existe ✓
echo.

:: Verificar se Vercel CLI está instalado
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [5/5] Instalando Vercel CLI...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar Vercel CLI
        echo.
        echo Você pode fazer deploy manualmente:
        echo   1. Acesse: https://vercel.com
        echo   2. Importe seu repositório GitHub
        echo   3. Configure e faça deploy
        pause
        exit /b 1
    )
)

echo [5/5] Vercel CLI encontrado ✓
echo.
echo ========================================
echo   OPÇÕES DE DEPLOY
echo ========================================
echo.
echo 1. Deploy via GitHub (Recomendado)
echo 2. Deploy via Vercel CLI (Manual)
echo 3. Ver guia completo
echo 4. Sair
echo.
set /p opcao="Escolha uma opção (1-4): "

if "%opcao%"=="1" goto github
if "%opcao%"=="2" goto cli
if "%opcao%"=="3" goto guia
if "%opcao%"=="4" exit /b 0

:github
echo.
echo ========================================
echo   DEPLOY VIA GITHUB
echo ========================================
echo.
echo Siga estes passos:
echo.
echo 1. Crie um repositório no GitHub:
echo    https://github.com/new
echo.
echo 2. Execute estes comandos:
echo    git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Acesse o Vercel e importe o repositório:
echo    https://vercel.com/new
echo.
echo 4. Configure e faça deploy!
echo.
pause
exit /b 0

:cli
echo.
echo ========================================
echo   DEPLOY VIA VERCEL CLI
echo ========================================
echo.
echo Fazendo login no Vercel...
call vercel login
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha no login
    pause
    exit /b 1
)
echo.
echo Fazendo deploy...
call vercel --prod
echo.
echo [SUCESSO] Deploy concluído!
echo.
pause
exit /b 0

:guia
echo.
echo Abrindo guia completo...
if exist "DEPLOY_VERCEL.md" (
    start notepad "DEPLOY_VERCEL.md"
) else (
    echo Arquivo DEPLOY_VERCEL.md não encontrado
)
pause
exit /b 0


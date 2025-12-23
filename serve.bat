@echo off
echo ========================================
echo  Kanban Logistica - Servidor Local
echo ========================================
echo.
echo Iniciando servidor na porta 8000...
echo.
echo Acesse: http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

python -m http.server 8000

pause


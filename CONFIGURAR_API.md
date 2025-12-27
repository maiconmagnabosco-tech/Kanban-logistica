# 🔐 Guia de Configuração da Google Sheets API

Este guia explica como configurar a aplicação para usar a Google Sheets API diretamente, mantendo suas credenciais seguras.

## 📋 Pré-requisitos

1. Conta Google
2. Acesso ao Google Cloud Console
3. Uma planilha Google Sheets criada

---

## 🚀 Passo a Passo

### 1️⃣ Criar e Configurar a Planilha Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. **Copie o ID da planilha** do URL:
   ```
   https://docs.google.com/spreadsheets/d/SEU_SPREADSHEET_ID_AQUI/edit
   ```
   O ID é a parte entre `/d/` e `/edit`

---

### 2️⃣ Criar Chave de API no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs e Serviços** → **Biblioteca**
4. Procure por **"Google Sheets API"** e **ative**
5. Vá em **APIs e Serviços** → **Credenciais**
6. Clique em **+ Criar Credenciais** → **Chave de API**
7. **Copie a chave gerada** (você precisará dela)
8. **IMPORTANTE**: Clique em **Restringir chave** e configure:
   - **Restrições de API**: Selecione apenas "Google Sheets API"
   - **Restrições de aplicativo**: 
     - Se for usar localmente: "Nenhuma"
     - Se for publicar online: "Referenciadores HTTP" e adicione seu domínio
   - Clique em **Salvar**

---

### 3️⃣ Criar Google Apps Script para Escrita (Segurança)

A chave de API só permite **leitura**. Para **escrita**, usamos um Google Apps Script como proxy seguro.

1. Acesse [Google Apps Script](https://script.google.com/)
2. Clique em **+ Novo projeto**
3. **Apague** o código padrão
4. **Cole** o código do arquivo `google-script-write.js`
5. No menu **Recursos** → **Planilha vinculada**, selecione sua planilha
6. Clique em **Salvar** (💾)
7. Vá em **Publicar** → **Implantar como aplicativo da web**
8. Configure:
   - **Executar como**: "Eu mesmo"
   - **Quem tem acesso**: "Qualquer pessoa, mesmo anônimo"
9. Clique em **Implantar**
10. **Copie a URL gerada** (você precisará dela)

---

### 4️⃣ Configurar o Arquivo config.js

1. **Copie** o arquivo `config.js.example` para `config.js`:
   ```bash
   # No Windows PowerShell:
   Copy-Item config.js.example config.js
   ```

2. **Abra** `config.js` e preencha:
   ```javascript
   const CONFIG = {
       SPREADSHEET_ID: 'COLE_SEU_SPREADSHEET_ID_AQUI',
       API_KEY: 'COLE_SUA_API_KEY_AQUI',
       WRITE_PROXY_URL: 'COLE_URL_DO_GOOGLE_APPS_SCRIPT_AQUI'
   };
   ```

3. **Salve** o arquivo

---

### 5️⃣ Inicializar a Planilha

1. No Google Apps Script, execute a função `setupSheet()` uma vez:
   - Selecione `setupSheet` no dropdown de funções
   - Clique em **Executar** (▶️)
   - Autorize o acesso se solicitado

Isso criará os cabeçalhos na planilha.

---

## ✅ Verificação

1. Abra `index.html` no navegador
2. Verifique o console do navegador (F12) para erros
3. Se tudo estiver correto, os dados devem carregar automaticamente

---

## 🔒 Segurança

### ✅ O que está protegido:
- `config.js` está no `.gitignore` e **não será commitado**
- A chave de API tem restrições configuradas
- A escrita usa Google Apps Script (não expõe credenciais)

### ⚠️ Boas práticas:
- **NUNCA** faça commit do arquivo `config.js`
- **NUNCA** compartilhe sua chave de API
- Use restrições de API no Google Cloud Console
- Revise periodicamente as chaves ativas

---

## 🐛 Solução de Problemas

### Erro: "API não inicializada"
- Verifique se `config.js` existe e está configurado
- Verifique se os scripts estão na ordem correta no HTML

### Erro: "403 Forbidden" ao ler dados
- Verifique se a Google Sheets API está ativada
- Verifique se a chave de API está correta
- Verifique se a planilha está compartilhada publicamente (ou use OAuth)

### Erro: "Erro ao salvar dados"
- Verifique se o Google Apps Script está publicado corretamente
- Verifique se a URL do `WRITE_PROXY_URL` está correta
- Verifique se a planilha está vinculada ao script

### Dados não aparecem
- Execute `setupSheet()` no Google Apps Script
- Verifique se há dados na planilha
- Verifique o console do navegador para erros

---

## 📝 Notas Importantes

1. **Leitura**: Usa Google Sheets API diretamente (com API Key)
2. **Escrita**: Usa Google Apps Script como proxy (mais seguro)
3. A planilha precisa estar **pública** ou você precisa usar OAuth2 (mais complexo)
4. Para produção, considere usar variáveis de ambiente no servidor

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do Google Apps Script
3. Verifique as restrições da chave de API no Google Cloud Console


# 🚀 Publicação Rápida - Passo a Passo Simplificado

Guia rápido para publicar seu Kanban online em **5 minutos** usando **Vercel**.

---

## ⚡ MÉTODO RÁPIDO: Vercel via CLI

### Passo 1: Instalar Vercel CLI
```powershell
npm install -g vercel
```

### Passo 2: Login
```powershell
vercel login
```
- Abrirá o navegador para fazer login
- Clique em "Authorize Vercel"

### Passo 3: Ir para pasta do projeto
```powershell
cd "C:\Users\maicon John\kanban"
```

### Passo 4: Fazer Deploy
```powershell
vercel
```

**Responda às perguntas:**
- Set up and deploy? → **Y**
- Which scope? → **Selecione sua conta**
- Link to existing project? → **N**
- Project name? → **kanban-logistica** (ou outro nome)
- Directory? → **.** (ponto)
- Override settings? → **N**

### Passo 5: PRONTO! 🎉

Você receberá uma URL tipo: `https://kanban-logistica-xyz.vercel.app`

**Anote essa URL!**

---

## 📋 ANTES DE PUBLICAR: Configurar Google Apps Script

### ⚠️ IMPORTANTE: Se você ainda não fez isso:

1. Acesse: https://script.google.com/
2. Crie novo projeto
3. Cole o conteúdo de `google-script.js`
4. Publique como Web App (acesso: qualquer pessoa)
5. **COPIE A URL** gerada
6. Abra `main.js` e atualize a primeira linha:
   ```javascript
   const API_URL = 'COLE_SUA_URL_AQUI';
   ```

---

## 🌐 ALTERNATIVAS RÁPIDAS

### Opção 2: Netlify (Drag and Drop)

1. Acesse: https://www.netlify.com/
2. Faça login
3. Arraste a pasta do projeto para o site
4. PRONTO!

### Opção 3: GitHub Pages

1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Settings → Pages → Source: main branch
4. PRONTO!

---

## ✅ Checklist Rápido

- [ ] Google Apps Script configurado
- [ ] URL do script atualizada no `main.js`
- [ ] Vercel CLI instalado
- [ ] Deploy realizado
- [ ] URL anotada
- [ ] Site testado

---

## 🆘 Problemas Comuns

**Erro ao fazer deploy:**
- Certifique-se de estar na pasta correta
- Verifique se tem arquivo `vercel.json`

**Site não carrega dados:**
- Verifique se a URL do Google Script está correta no `main.js`
- Verifique se o Google Apps Script está publicado corretamente

**Erro de CORS:**
- O script já está configurado para CORS
- Se persistir, verifique as configurações do Google Apps Script

---

**Tempo estimado:** 5-10 minutos



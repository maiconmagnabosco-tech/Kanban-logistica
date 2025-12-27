# ⚡ Deploy Rápido no Vercel

## 🚀 Método Mais Rápido (via GitHub)

### 1️⃣ Preparar o projeto

```bash
# Certifique-se que config.js existe
Copy-Item config.js.example config.js
# (Edite o config.js com suas credenciais)
```

### 2️⃣ Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `kanban-logistica`
3. **NÃO** marque "Add README" ou "Add .gitignore"
4. Clique em **"Create repository"**

### 3️⃣ Fazer upload do código

```bash
git init
git add .
git commit -m "Versão estável 01"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/kanban-logistica.git
git push -u origin main
```

### 4️⃣ Deploy no Vercel

1. Acesse: https://vercel.com/new
2. **Import** seu repositório GitHub
3. Configure:
   - Framework: **Other**
   - Deixe o resto padrão
4. **IMPORTANTE**: Antes de fazer deploy:
   - Vá em **Settings** → **Files**
   - Faça upload do arquivo `config.js`
5. Clique em **Deploy**
6. ✅ Pronto! Site online!

---

## 🔑 Alternativa: Deploy Manual (sem GitHub)

### Via Vercel CLI:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd "c:\Users\maicon John\kanban"
vercel

# Depois adicionar config.js manualmente no painel
```

---

## ⚠️ IMPORTANTE

- ✅ O arquivo `config.js` **NÃO** será enviado pelo Git (está no .gitignore)
- ✅ Você **DEVE** fazer upload manual do `config.js` no Vercel
- ✅ Ou use variáveis de ambiente (mais seguro, mas requer código adicional)

---

## 📚 Guia Completo

Para instruções detalhadas, consulte: **DEPLOY_VERCEL.md**


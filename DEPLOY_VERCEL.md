# 🚀 Deploy no Vercel - Guia Completo

Este guia explica como publicar sua aplicação Kanban no Vercel.

---

## 📋 Pré-requisitos

1. ✅ Conta no [Vercel](https://vercel.com) (grátis)
2. ✅ Conta no [GitHub](https://github.com) (recomendado)
3. ✅ Projeto configurado localmente
4. ✅ `config.js` criado e configurado

---

## 🔐 IMPORTANTE: Sobre o arquivo config.js

O arquivo `config.js` contém suas credenciais e **NÃO está no Git** (protegido pelo `.gitignore`).

**Para o Vercel funcionar, você precisa:**
- ✅ Fazer upload do `config.js` manualmente no Vercel, OU
- ✅ Usar variáveis de ambiente (mais seguro - ver opção 2)

---

## 🎯 Opção 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em **"New repository"**
3. Nome: `kanban-logistica` (ou outro nome)
4. **NÃO marque** "Add .gitignore" ou "Add README"
5. Clique em **"Create repository"**

### Passo 2: Fazer commit e push

```bash
# No terminal, na pasta do projeto:
cd "c:\Users\maicon John\kanban"

# Inicializar git (se ainda não foi feito)
git init

# Adicionar arquivos (config.js será ignorado automaticamente)
git add .

# Commit
git commit -m "Versão estável 01 - Kanban Logística"

# Adicionar repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/kanban-logistica.git

# Push
git branch -M main
git push -u origin main
```

### Passo 3: Conectar ao Vercel

1. Acesse [Vercel](https://vercel.com)
2. Faça login (pode usar sua conta GitHub)
3. Clique em **"Add New Project"**
4. **Import** seu repositório GitHub
5. Clique em **"Import"**

### Passo 4: Configurar o projeto

1. **Project Name**: `kanban-logistica` (ou outro nome)
2. **Framework Preset**: "Other"
3. **Root Directory**: `./` (deixe padrão)
4. **Build Command**: Deixe vazio
5. **Output Directory**: Deixe vazio
6. **Install Command**: Deixe vazio

### Passo 5: Adicionar config.js (IMPORTANTE)

**Opção A - Upload Manual:**
1. No painel do Vercel, vá em **Settings** → **Files**
2. Faça upload do arquivo `config.js` na raiz do projeto

**Opção B - Variáveis de Ambiente (Mais Seguro):**
1. No painel do Vercel, vá em **Settings** → **Environment Variables**
2. Adicione:
   - `SPREADSHEET_ID` = `1yDp_Nmsz9Ir_SFFtzMwP_BQnJ2XmqJlZn35Zf-4wBwc`
   - `API_KEY` = `AIzaSyDrg0PNmgX8RTq9d_eG16kOMls0t4Biykw`
   - `WRITE_PROXY_URL` = `https://script.google.com/macros/s/AKfycby4mEJALHkkk7yyoYvenaJns8zsY37uGTxBMu6vXKWGEJ3Nd-nejeKE4ynLSDySb0JX/exec`

3. Depois, você precisará modificar o código para ler de variáveis de ambiente (veja opção 2)

### Passo 6: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (2-3 minutos)
3. ✅ Seu site estará online!

---

## 🎯 Opção 2: Deploy Manual (Sem GitHub)

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer login

```bash
vercel login
```

### Passo 3: Deploy

```bash
cd "c:\Users\maicon John\kanban"
vercel
```

Siga as instruções:
- **Set up and deploy?** → `Y`
- **Which scope?** → Seu usuário
- **Link to existing project?** → `N`
- **What's your project's name?** → `kanban-logistica`
- **In which directory is your code located?** → `./`

### Passo 4: Adicionar config.js

1. Depois do primeiro deploy, execute:
```bash
vercel --prod
```

2. Ou adicione o `config.js` manualmente no painel do Vercel (Settings → Files)

---

## ⚙️ Usar Variáveis de Ambiente (Mais Seguro)

Se você preferir usar variáveis de ambiente ao invés de `config.js`:

### 1. Modificar sheets-api.js:

```javascript
// sheets-api.js - Adicionar no início
function getConfig() {
    // Se estiver no Vercel (variáveis de ambiente)
    if (typeof process !== 'undefined' && process.env) {
        return {
            SPREADSHEET_ID: process.env.SPREADSHEET_ID,
            API_KEY: process.env.API_KEY,
            WRITE_PROXY_URL: process.env.WRITE_PROXY_URL
        };
    }
    
    // Senão, usar CONFIG do config.js
    return typeof CONFIG !== 'undefined' ? CONFIG : null;
}
```

**Nota**: Isso requer um backend Node.js. Para frontend puro, mantenha o `config.js`.

---

## 🔧 Configurações Adicionais

### Domínio Personalizado

1. No Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções para configurar DNS

### Variáveis de Ambiente por Ambiente

1. **Settings** → **Environment Variables**
2. Configure valores diferentes para:
   - **Production**
   - **Preview**
   - **Development**

---

## ✅ Verificação Pós-Deploy

1. ✅ Acesse a URL fornecida pelo Vercel
2. ✅ Teste o login
3. ✅ Verifique se os dados carregam da planilha
4. ✅ Teste criar/editar uma tarefa
5. ✅ Verifique o console (F12) para erros

---

## 🐛 Troubleshooting

### Erro: "CONFIG não encontrado"
- ✅ Verifique se `config.js` foi enviado para o Vercel
- ✅ Verifique se está na raiz do projeto

### Erro: "CORS" ou "403 Forbidden"
- ✅ Verifique se a chave de API está correta
- ✅ Verifique se a planilha está compartilhada publicamente (ou use OAuth)

### Erro: "404 Not Found" em arquivos
- ✅ Verifique se o `vercel.json` está correto
- ✅ Verifique se todos os arquivos foram commitados (exceto config.js)

### Site não atualiza
- ✅ Faça um novo deploy: `vercel --prod`
- ✅ Ou no painel do Vercel, clique em **Redeploy**

---

## 📝 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado
- [ ] Projeto criado no Vercel
- [ ] `config.js` adicionado (ou variáveis de ambiente)
- [ ] Deploy realizado com sucesso
- [ ] Site testado e funcionando
- [ ] Domínio personalizado configurado (opcional)

---

## 🎉 Pronto!

Sua aplicação está online! A URL será algo como:
`https://kanban-logistica.vercel.app`

**Importante**: Mantenha suas credenciais seguras. Nunca compartilhe o `config.js` publicamente.


# 📋 Guia Completo - Publicação Online do Kanban

Este guia fornece instruções passo a passo para publicar seu projeto Kanban online usando diferentes plataformas gratuitas.

---

## 🎯 Pré-requisitos

1. **Conta Google** - Para usar Google Sheets (já configurado)
2. **Google Apps Script** - Script já criado (`google-script.js`)
3. **Conta GitHub** (opcional, mas recomendado)
4. **Navegador atualizado**

---

## 📌 PASSO 1: Configurar Google Apps Script

### 1.1. Criar/Atualizar o Script

1. Acesse: https://script.google.com/
2. Clique em **"+ Novo projeto"**
3. Dê um nome ao projeto: `Kanban Backend`
4. Cole o conteúdo completo do arquivo `google-script.js` no editor
5. Clique em **"Salvar"** (💾) ou pressione `Ctrl+S`

### 1.2. Publicar como Web App

1. No menu, clique em **"Publicar" → "Implantar como aplicativo da web"**
2. Configure:
   - **Executar como:** "Eu mesmo"
   - **Quem tem acesso:** "Qualquer pessoa, mesmo anônimo"
3. Clique em **"Implantar"**
4. **COPIE A URL** que aparecer (parece com: `https://script.google.com/macros/s/AKfyc...`)
5. **IMPORTANTE:** Guarde essa URL em local seguro!

### 1.3. Obter URL do Script

- A URL será algo como: `https://script.google.com/macros/s/AKfycby.../exec`
- Essa URL deve ser configurada no código JavaScript

---

## 📌 PASSO 2: Configurar URL do Script no Código

### 2.1. Localizar onde está configurada a URL

1. Abra o arquivo `main.js`
2. **Na primeira linha**, você encontrará:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
3. **Substitua** essa URL pela URL que você copiou no Passo 1.2

**IMPORTANTE:** 
- Mantenha o nome da variável como `API_URL`
- A URL deve terminar com `/exec`
- Copie a URL completa, sem espaços extras

### 2.2. Exemplo de como ficará:

```javascript
const API_URL = 'https://script.google.com/macros/s/AKfycbxhSdNViygF4gGPP28lmun2nad_BIzVV0_l-xkWvk5lDhU5dctAiQ5tho0qJDQNkNvX/exec';
```

### 2.3. Verificar se já está configurado

Se já houver uma URL configurada e você quiser manter o mesmo script, não precisa alterar nada. Mas se criou um novo script no Passo 1, você DEVE atualizar essa URL.

---

## 📌 PASSO 3: Escolher Plataforma de Hospedagem

Escolha uma das opções abaixo:

---

## 🌐 OPÇÃO A: Vercel (Recomendado - Mais Fácil)

### Vantagens:
- ✅ Gratuito
- ✅ HTTPS automático
- ✅ Deploy rápido
- ✅ Domínio personalizado gratuito
- ✅ Sem configuração complexa

### Passo a Passo:

#### 3A.1. Criar Conta na Vercel

1. Acesse: https://vercel.com/
2. Clique em **"Sign Up"**
3. Escolha: **"Continue with GitHub"** (recomendado) ou use email
4. Complete o cadastro

#### 3A.2. Instalar Vercel CLI (Opção 1 - Recomendado)

**No Windows:**

1. Abra o PowerShell como Administrador
2. Execute:
   ```powershell
   npm install -g vercel
   ```

#### 3A.3. Fazer Deploy via CLI

1. Abra o PowerShell na pasta do projeto:
   ```powershell
   cd "C:\Users\maicon John\kanban"
   ```

2. Execute:
   ```powershell
   vercel
   ```

3. Siga as instruções:
   - **Set up and deploy?** → `Y` (Sim)
   - **Which scope?** → Selecione sua conta
   - **Link to existing project?** → `N` (Não, é novo)
   - **Project name?** → `kanban-logistica` (ou outro nome)
   - **Directory?** → `.` (ponto, para usar a pasta atual)
   - **Override settings?** → `N` (Não)

4. Aguarde o deploy terminar
5. Você receberá uma URL: `https://kanban-logistica.vercel.app`
6. **PRONTO!** Seu site está online!

#### 3A.4. Deploy via GitHub (Opção 2 - Alternativa)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos (exceto `node_modules`)
3. Na Vercel, clique em **"Add New Project"**
4. Conecte seu repositório GitHub
5. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `.`
   - **Build Command:** (deixe vazio)
   - **Output Directory:** `.`
6. Clique em **"Deploy"**

---

## 🌐 OPÇÃO B: Netlify

### Vantagens:
- ✅ Gratuito
- ✅ HTTPS automático
- ✅ Drag and Drop simples
- ✅ Deploy contínuo do GitHub

### Passo a Passo:

#### 3B.1. Criar Conta

1. Acesse: https://www.netlify.com/
2. Clique em **"Sign up"**
3. Escolha: **"Sign up with GitHub"** ou use email

#### 3B.2. Deploy via Drag and Drop (Mais Fácil)

1. Na dashboard da Netlify, vá em **"Sites"**
2. Arraste e solte a pasta do projeto (sem `node_modules`)
3. Aguarde alguns minutos
4. Você receberá uma URL: `https://random-name-123.netlify.app`
5. **PRONTO!**

#### 3B.3. Deploy via GitHub

1. Conecte seu repositório GitHub
2. Configure:
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.`
3. Clique em **"Deploy site"**

---

## 🌐 OPÇÃO C: GitHub Pages

### Vantagens:
- ✅ Gratuito
- ✅ Integrado ao GitHub
- ✅ HTTPS automático

### Passo a Passo:

#### 3C.1. Criar Repositório no GitHub

1. Acesse: https://github.com/
2. Clique em **"New repository"**
3. Nome: `kanban-logistica`
4. Selecione **"Public"**
5. **NÃO** marque "Initialize with README"
6. Clique em **"Create repository"**

#### 3C.2. Fazer Upload dos Arquivos

**Opção 1 - Via Git (Recomendado):**

1. Abra o PowerShell na pasta do projeto
2. Execute:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/kanban-logistica.git
   git push -u origin main
   ```

**Opção 2 - Via Interface Web:**

1. No repositório, clique em **"uploading an existing file"**
2. Arraste todos os arquivos (exceto `node_modules`)
3. Commit as mudanças

#### 3C.3. Ativar GitHub Pages

1. No repositório, vá em **"Settings"**
2. No menu lateral, clique em **"Pages"**
3. Em **"Source"**, selecione: **"Deploy from a branch"**
4. Branch: `main` / Folder: `/ (root)`
5. Clique em **"Save"**
6. Aguarde alguns minutos
7. Você receberá uma URL: `https://SEU_USUARIO.github.io/kanban-logistica`
8. **PRONTO!**

---

## 🌐 OPÇÃO D: Firebase Hosting

### Vantagens:
- ✅ Gratuito
- ✅ HTTPS automático
- ✅ CDN global

### Passo a Passo:

#### 3D.1. Instalar Firebase CLI

```powershell
npm install -g firebase-tools
```

#### 3D.2. Login no Firebase

```powershell
firebase login
```

#### 3D.3. Inicializar Projeto

```powershell
cd "C:\Users\maicon John\kanban"
firebase init hosting
```

**Responda:**
- **What do you want to use as your public directory?** → `.`
- **Configure as a single-page app?** → `N`
- **Set up automatic builds and deploys with GitHub?** → `N`

#### 3D.4. Fazer Deploy

```powershell
firebase deploy
```

Você receberá uma URL: `https://SEU_PROJETO.web.app`

---

## 📌 PASSO 4: Configurar CORS no Google Apps Script

### 4.1. Verificar se o CORS está configurado

O script já deve ter configurações de CORS. Se não funcionar, adicione no início do `doGet` e `doPost`:

```javascript
return ContentService.createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
```

---

## 📌 PASSO 5: Testar o Site Online

### 5.1. Verificar Funcionamento

1. Acesse a URL do seu site
2. Teste o login
3. Teste criar uma tarefa
4. Teste mover tarefas entre colunas
5. Verifique se os dados aparecem no Google Sheets

### 5.2. Possíveis Problemas

**Problema:** Erro de CORS
- **Solução:** Verifique se o Google Apps Script está configurado corretamente (Passo 4)

**Problema:** Dados não aparecem
- **Solução:** Verifique se a URL do script está correta no `main.js`

**Problema:** Login não funciona
- **Solução:** O login usa `localStorage`, então funciona normalmente online

---

## 📌 PASSO 6: Configurar Domínio Personalizado (Opcional)

### 6.1. Vercel

1. No dashboard da Vercel, vá em **"Settings" → "Domains"**
2. Adicione seu domínio
3. Configure o DNS conforme as instruções

### 6.2. Netlify

1. No dashboard, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Siga as instruções de DNS

---

## 🔧 Checklist Final

- [ ] Google Apps Script criado e publicado
- [ ] URL do script configurada no `main.js`
- [ ] Site publicado em uma plataforma
- [ ] Testado login e criação de tarefas
- [ ] Verificado se dados aparecem no Google Sheets
- [ ] URL do site anotada em local seguro

---

## 🆘 Suporte e Dúvidas

### Links Úteis:
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com/
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Firebase Hosting:** https://firebase.google.com/docs/hosting

### Arquivos Importantes:
- `index.html` - Página principal
- `login.html` - Página de login
- `main.js` - Lógica principal (onde está a URL do script)
- `google-script.js` - Script do Google Apps Script
- `style.css` - Estilos
- `auth.js` - Autenticação

---

## 📝 Notas Importantes

1. **Senha Padrão:** `123456` (definida no `auth.js`)
2. **Google Sheets:** Certifique-se de que a planilha está acessível
3. **HTTPS:** Todas as plataformas fornecem HTTPS gratuitamente
4. **Backup:** Mantenha backup dos arquivos localmente
5. **Atualizações:** Para atualizar o site, faça novo deploy com os arquivos atualizados

---

## ✅ Pronto!

Seu Kanban agora está online e acessível de qualquer lugar!

**Lembre-se:**
- Mantenha a URL do Google Apps Script segura
- Teste regularmente se tudo está funcionando
- Faça backup dos arquivos importantes

---

**Criado em:** $(Get-Date -Format "dd/MM/yyyy")
**Versão:** 1.0


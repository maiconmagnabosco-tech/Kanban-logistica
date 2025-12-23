# 🚀 Como Iniciar o Projeto Localmente (SEM VERCEL)

## Opção 1: Usando Python (Mais Fácil)

### Windows:
1. Clique duas vezes no arquivo `serve.bat`
2. Aguarde o servidor iniciar
3. Acesse: `http://localhost:8000`

### Mac/Linux:
```bash
python3 -m http.server 8000
```

## Opção 2: Usando Node.js

```bash
npx http-server -p 8000
```

## Opção 3: Usando VS Code Live Server

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## Opção 4: Usando extensão Chrome "Web Server for Chrome"

1. Instale a extensão "Web Server for Chrome" do Chrome Web Store
2. Configure para a pasta do projeto
3. Clique em "Choose Folder" e selecione a pasta do projeto
4. Acesse a URL mostrada pela extensão

## 🌐 Hospedar em Outras Plataformas (Alternativas ao Vercel)

### 1. Netlify (Gratuito)
- Acesse: https://netlify.com
- Arraste e solte a pasta do projeto
- Pronto! Site no ar em segundos

### 2. GitHub Pages (Gratuito)
```bash
# Crie um branch gh-pages
git checkout -b gh-pages
git push origin gh-pages

# Depois vá em Settings > Pages no GitHub
# Selecione o branch gh-pages
```

### 3. Surge.sh (Gratuito)
```bash
npm install -g surge
surge
# Siga as instruções
```

### 4. Firebase Hosting (Gratuito)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## ⚠️ Importante

- O projeto funciona **100% localmente**
- Não precisa de servidor especial
- Apenas precisa de um servidor HTTP simples
- Os dados continuam vindo do Google Sheets

## 🔧 Se o Loop de Login Acontecer

1. Abra o Console do Navegador (F12)
2. Vá na aba "Application" > "Local Storage"
3. Delete as chaves: `kanban_auth` e `kanban_user`
4. Recarregue a página

## ✅ Testado e Funcionando

O projeto funciona perfeitamente em servidores locais. Use qualquer uma das opções acima!


# Guia de Deploy - Kanban Logística

Este guia explica como fazer o deploy do projeto Kanban Logística para produção usando a Vercel.

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com) (gratuita)
2. Conta no Google (para Google Sheets como base de dados)
3. Node.js instalado (opcional, apenas para testes locais)

## 🚀 Passo a Passo para Deploy

### 1. Preparar o Google Sheets como Base de Dados

#### 1.1 Criar uma Planilha Google Sheets
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Renomeie a primeira aba para "Kanban" (ou outro nome de sua escolha)

#### 1.2 Configurar as Colunas
Na primeira linha (cabeçalho), adicione as seguintes colunas:
```
| id | project | conteudo | status | setor | responsavel | data_inicio | data_fim |
```

#### 1.3 Configurar Google Apps Script
1. No menu da planilha, vá em **Extensões** → **Apps Script**
2. Apague qualquer código existente e cole o conteúdo do arquivo `google-script.js`
3. Salve o script (Ctrl+S ou Cmd+S)
4. Dê um nome ao projeto, por exemplo: "Kanban API"

#### 1.4 Publicar como Web App
1. Clique em **Implantar** → **Nova implantação**
2. Escolha o tipo: **Aplicativo da web**
3. Configure:
   - **Descrição**: "Kanban API v1"
   - **Executar como**: "Eu"
   - **Quem tem acesso**: "Todos"
4. Clique em **Implantar**
5. **IMPORTANTE**: Copie a URL gerada (algo como: `https://script.google.com/macros/s/AKfycb.../exec`)
6. Substitua a URL no arquivo `main.js` na linha que contém `const API_URL = '...'`

### 2. Testar Localmente (Opcional)

#### 2.1 Instalar Dependências
```bash
npm install
```

#### 2.2 Executar Servidor Local
Você pode usar qualquer servidor HTTP simples:

**Opção 1: Python (se instalado)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção 2: Node.js (http-server)**
```bash
npx http-server -p 8000
```

**Opção 3: VS Code Live Server**
- Instale a extensão "Live Server" no VS Code
- Clique com botão direito em `index.html` → "Open with Live Server"

Acesse: `http://localhost:8000`

### 3. Deploy na Vercel

#### 3.1 Preparar o Projeto
Certifique-se de que o arquivo `vercel.json` existe na raiz do projeto. Ele já está configurado corretamente.

#### 3.2 Opção A: Deploy via GitHub (Recomendado)

1. **Criar Repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/kanban-logistica.git
   git push -u origin main
   ```

2. **Conectar com Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em **Add New Project**
   - Selecione o repositório do GitHub
   - Clique em **Import**

3. **Configurar Projeto**
   - **Project Name**: kanban-logistica (ou outro nome)
   - **Framework Preset**: Other (já configurado no vercel.json)
   - Clique em **Deploy**

#### 3.3 Opção B: Deploy via CLI da Vercel

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Fazer Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Responda as perguntas:
   - Set up and deploy? **Y**
   - Which scope? Selecione sua conta
   - Link to existing project? **N**
   - Project name? **kanban-logistica**
   - Directory? **.**
   - Override settings? **N**

4. **Deploy para Produção**
   ```bash
   vercel --prod
   ```

### 4. Configurações Finais

#### 4.1 Atualizar URL da API (se necessário)
Se você precisar alterar a URL da API do Google Sheets após o deploy:
1. Edite o arquivo `main.js`
2. Altere a linha: `const API_URL = 'SUA_URL_AQUI';`
3. Faça commit e push novamente
4. A Vercel fará o deploy automático

#### 4.2 Configurar Domínio Personalizado (Opcional)
1. Na dashboard da Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Siga as instruções de configuração DNS

## 🔒 Segurança

### Autenticação
- O sistema usa autenticação local (localStorage)
- Domínio de email: `@transmagnabosco.com.br`
- Senha universal: `lositique25`
- Para alterar, edite `login.html` e `auth.js`

### Google Sheets
- Mantenha a URL do Google Apps Script privada
- Não compartilhe o link da planilha publicamente
- Use permissões adequadas no Google Sheets

## 📝 Estrutura de Arquivos

```
kanban/
├── index.html          # Página principal do Kanban
├── login.html          # Página de login
├── main.js             # Lógica principal do aplicativo
├── style.css           # Estilos do Kanban
├── login.css           # Estilos do login (se existir)
├── auth.js             # Lógica de autenticação
├── google-script.js    # Script para Google Apps Script
├── vercel.json         # Configuração do Vercel
├── package.json        # Dependências Node.js
└── DEPLOY.md           # Este arquivo
```

## 🐛 Troubleshooting

### Erro: "Failed to fetch" no console
- Verifique se a URL da API no `main.js` está correta
- Certifique-se de que o Google Apps Script está implantado como "Acesso: Todos"
- Verifique se há erros no console do Google Apps Script

### Erro: "CORS policy"
- O Google Apps Script já está configurado para permitir CORS
- Se persistir, verifique as configurações de implantação

### Erro: "Authentication failed"
- Verifique se o email termina com `@transmagnabosco.com.br`
- Verifique se a senha está correta: `lositique25`

### Cards não aparecem
- Verifique se há dados na planilha Google Sheets
- Verifique o console do navegador para erros
- Certifique-se de que as colunas estão com os nomes corretos

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs no console do navegador (F12)
2. Verifique os logs do Google Apps Script (Extensões → Apps Script → Execuções)
3. Verifique os logs da Vercel na dashboard

## ✅ Checklist Final

- [ ] Google Sheets criado e configurado
- [ ] Google Apps Script implantado e URL copiada
- [ ] URL da API atualizada no `main.js`
- [ ] Projeto testado localmente
- [ ] Deploy realizado na Vercel
- [ ] Acesso testado após deploy
- [ ] Login funcionando
- [ ] Criação de tarefas funcionando
- [ ] Drag and drop funcionando
- [ ] Filtros funcionando

## 🎉 Pronto!

Seu Kanban Logística está no ar! Acesse a URL fornecida pela Vercel para usar o sistema.


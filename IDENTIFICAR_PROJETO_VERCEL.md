# 🔍 Como Identificar Seu Projeto no Vercel

Guia rápido para encontrar o projeto correto entre vários projetos no Vercel.

---

## 🎯 Formas de Identificar

### 1️⃣ **Pelo Nome do Projeto**

Seu projeto provavelmente tem um destes nomes:
- `kanban`
- `kanban-logistica`
- `kanban-logistica-*` (com variações)
- Nome baseado na pasta: `kanban-*`

**Como verificar:**
1. Acesse: https://vercel.com/dashboard
2. Veja a lista de projetos
3. Procure por nomes que contenham "kanban"

---

### 2️⃣ **Pela URL do Site**

A URL do seu site no Vercel é única e identifica o projeto.

**Como encontrar:**
1. No painel do Vercel, cada projeto mostra sua URL
2. URLs do Vercel seguem o padrão: `https://NOME-DO-PROJETO.vercel.app`
3. Procure por URLs que contenham "kanban"

**Exemplo:**
- ✅ `https://kanban-logistica.vercel.app`
- ✅ `https://kanban.vercel.app`
- ✅ `https://kanban-abc123.vercel.app`

---

### 3️⃣ **Pela Data de Criação/Último Deploy**

Se você acabou de fazer o deploy, o projeto mais recente provavelmente é o seu.

**Como verificar:**
1. No dashboard, veja a coluna "Updated" (última atualização)
2. O projeto mais recente provavelmente é o seu
3. Clique no projeto para ver detalhes

---

### 4️⃣ **Pelo Conteúdo do Site**

A forma mais segura é acessar o site e verificar o conteúdo.

**Passos:**
1. No dashboard do Vercel, clique em um projeto
2. Veja a URL de produção (Production)
3. Clique para abrir o site
4. Verifique se é o site Kanban Logística
5. Procure por:
   - ✅ Tela de login
   - ✅ Título "Kanban Logística"
   - ✅ Logo da empresa
   - ✅ Colunas: "Não Iniciado", "Em Andamento", "Concluído"

---

### 5️⃣ **Pelo Repositório GitHub (se conectado)**

Se você conectou um repositório GitHub:

**Como verificar:**
1. Clique no projeto
2. Vá em **Settings** → **Git**
3. Veja qual repositório está conectado
4. Se o repositório for `kanban` ou similar, é o projeto correto

---

### 6️⃣ **Pelas Environment Variables**

Você pode verificar se o projeto tem as variáveis de ambiente configuradas:

**Passos:**
1. Clique em um projeto
2. Vá em **Settings** → **Environment Variables**
3. Procure por:
   - ✅ `SPREADSHEET_ID`
   - ✅ `API_KEY`
   - ✅ `WRITE_PROXY_URL`
4. Se encontrar essas 3 variáveis, **é o projeto correto!**

---

## ✅ Checklist de Identificação

Marque os itens que encontrou no projeto:

- [ ] Nome contém "kanban"
- [ ] URL contém "kanban"
- [ ] Último deploy foi recente (hoje/ontem)
- [ ] Site mostra "Kanban Logística"
- [ ] Tem tela de login
- [ ] Repositório conectado é "kanban"
- [ ] Tem as 3 Environment Variables configuradas

**Se marcou 3 ou mais itens**, provavelmente é o projeto correto!

---

## 🔧 Dica: Renomear o Projeto

Se quiser facilitar a identificação, você pode renomear o projeto:

1. Clique no projeto
2. Vá em **Settings** → **General**
3. Em **Project Name**, digite: `kanban-logistica`
4. Clique em **Save**

---

## 📍 Passos Rápidos

### Método Mais Rápido:

1. **Acesse:** https://vercel.com/dashboard
2. **Procure** por projetos com "kanban" no nome
3. **Clique** no projeto
4. **Vá em:** Settings → Environment Variables
5. **Verifique** se tem as 3 variáveis (`SPREADSHEET_ID`, `API_KEY`, `WRITE_PROXY_URL`)
6. **Se tiver**, é o projeto correto! ✅

---

## 🆘 Se Não Encontrar

Se não conseguir identificar:

1. **Liste todos os projetos:**
   - Anote o nome e URL de cada um
   - Acesse cada URL para ver o conteúdo

2. **Verifique o histórico:**
   - Veja a data de criação
   - Veja o último deploy
   - O mais recente provavelmente é o seu

3. **Crie um novo projeto:**
   - Se preferir, crie um novo projeto com nome claro
   - Exemplo: `kanban-logistica-producao`
   - Faça o deploy novamente

---

## 📝 Exemplo Visual

```
Dashboard do Vercel
│
├─ projeto-1              (não é)
├─ meu-site               (não é)
├─ kanban-logistica  ⭐   (É ESTE! ✅)
│  ├─ URL: https://kanban-logistica.vercel.app
│  ├─ Updated: há 2 horas
│  └─ Settings → Environment Variables
│     ├─ SPREADSHEET_ID ✅
│     ├─ API_KEY ✅
│     └─ WRITE_PROXY_URL ✅
└─ outro-projeto          (não é)
```

---

## 🎯 Resumo

**A forma mais confiável de identificar é:**

1. ✅ Verificar o nome (contém "kanban")
2. ✅ Acessar o site e verificar o conteúdo
3. ✅ Verificar se tem as Environment Variables configuradas

Se todos esses itens corresponderem, **é o projeto correto!** ✅


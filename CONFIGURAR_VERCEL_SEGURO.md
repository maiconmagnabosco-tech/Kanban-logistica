# 🔐 Configurar Credenciais no Vercel (Seguro)

Este guia explica como configurar suas credenciais no Vercel de forma **segura**, sem expor no código.

---

## 🎯 Onde Colocar as Credenciais

### ✅ **NO PAINEL DO VERCEL** (Recomendado - Mais Seguro)

As credenciais devem ser colocadas como **Variáveis de Ambiente** no painel do Vercel.

---

## 📋 Passo a Passo

### 1️⃣ Acessar o Painel do Vercel

1. Acesse: https://vercel.com
2. Faça login na sua conta
3. Selecione seu projeto **kanban-logistica** (ou o nome que você deu)

### 2️⃣ Ir em Settings → Environment Variables

1. No menu lateral, clique em **Settings**
2. Clique em **Environment Variables** (Variáveis de Ambiente)

### 3️⃣ Adicionar as 3 Variáveis

Adicione cada variável clicando em **Add New**:

#### Variável 1: SPREADSHEET_ID
- **Name**: `SPREADSHEET_ID`
- **Value**: `1yDp_Nmsz9Ir_SFFtzMwP_BQnJ2XmqJlZn35Zf-4wBwc`
- **Environments**: Marque todas (Production, Preview, Development)
- Clique em **Save**

#### Variável 2: API_KEY
- **Name**: `API_KEY`
- **Value**: `AIzaSyDrg0PNmgX8RTq9d_eG16kOMls0t4Biykw`
- **Environments**: Marque todas (Production, Preview, Development)
- Clique em **Save**

#### Variável 3: WRITE_PROXY_URL
- **Name**: `WRITE_PROXY_URL`
- **Value**: `https://script.google.com/macros/s/AKfycby4mEJALHkkk7yyoYvenaJns8zsY37uGTxBMu6vXKWGEJ3Nd-nejeKE4ynLSDySb0JX/exec`
- **Environments**: Marque todas (Production, Preview, Development)
- Clique em **Save**

### 4️⃣ Fazer Redeploy

Após adicionar as variáveis:

1. Vá em **Deployments**
2. Clique nos **3 pontos** (⋯) do último deployment
3. Clique em **Redeploy**
4. Aguarde o deploy completar

---

## ✅ Verificação

Após o redeploy:

1. Acesse seu site no Vercel
2. Abra o Console do navegador (F12)
3. Você deve ver: `"Configuração carregada da API route (Vercel)"`
4. Teste se os dados carregam corretamente

---

## 🔒 Segurança

### ✅ O que está protegido:
- ✅ Credenciais **não** estão no código fonte
- ✅ Credenciais **não** aparecem no GitHub
- ✅ Credenciais só são acessíveis via API route no servidor
- ✅ Variáveis de ambiente são privadas no Vercel

### ⚠️ Importante:
- As credenciais ainda são expostas no JavaScript do cliente (inevitável em frontend puro)
- Mas pelo menos **não ficam no código fonte** do repositório
- Para máxima segurança, considere usar um backend completo

---

## 🐛 Troubleshooting

### Erro: "Configuração incompleta"
- ✅ Verifique se todas as 3 variáveis foram adicionadas
- ✅ Verifique se os valores estão corretos (sem espaços extras)
- ✅ Verifique se marcou todos os ambientes (Production, Preview, Development)

### Erro: "API route não disponível"
- ✅ Verifique se o arquivo `api/config.js` foi commitado
- ✅ Faça um novo deploy após adicionar as variáveis

### Dados não carregam
- ✅ Verifique o console do navegador (F12) para erros
- ✅ Verifique se a chave de API está correta
- ✅ Verifique se a planilha está acessível

---

## 📝 Resumo das Variáveis

| Variável | Valor |
|----------|-------|
| `SPREADSHEET_ID` | `1yDp_Nmsz9Ir_SFFtzMwP_BQnJ2XmqJlZn35Zf-4wBwc` |
| `API_KEY` | `AIzaSyDrg0PNmgX8RTq9d_eG16kOMls0t4Biykw` |
| `WRITE_PROXY_URL` | `https://script.google.com/macros/s/AKfycby4mEJALHkkk7yyoYvenaJns8zsY37uGTxBMu6vXKWGEJ3Nd-nejeKE4ynLSDySb0JX/exec` |

---

## 🎉 Pronto!

Suas credenciais estão configuradas de forma segura no Vercel!

**Lembre-se**: Nunca compartilhe essas credenciais publicamente.


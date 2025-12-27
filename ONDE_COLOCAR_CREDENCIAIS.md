# 🔐 ONDE COLOCAR AS CREDENCIAIS NO VERCEL

## ✅ **LOCAL CORRETO: Painel do Vercel → Environment Variables**

---

## 📍 Passo a Passo Rápido

### 1. Acesse o Vercel
👉 https://vercel.com → Faça login → Selecione seu projeto

### 2. Vá em Settings
👉 Menu lateral → **Settings**

### 3. Clique em Environment Variables
👉 **Environment Variables** (Variáveis de Ambiente)

### 4. Adicione as 3 variáveis:

```
┌─────────────────────────────────────────┐
│ Name: SPREADSHEET_ID                    │
│ Value: 1yDp_Nmsz9Ir_SFFtzMwP_BQnJ2X... │
│ ☑ Production  ☑ Preview  ☑ Development │
│ [Save]                                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Name: API_KEY                           │
│ Value: AIzaSyDrg0PNmgX8RTq9d_eG16k... │
│ ☑ Production  ☑ Preview  ☑ Development │
│ [Save]                                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Name: WRITE_PROXY_URL                   │
│ Value: https://script.google.com/...   │
│ ☑ Production  ☑ Preview  ☑ Development │
│ [Save]                                   │
└─────────────────────────────────────────┘
```

### 5. Faça Redeploy
👉 Deployments → 3 pontos (⋯) → **Redeploy**

---

## ✅ Valores para Copiar

### SPREADSHEET_ID
```
1yDp_Nmsz9Ir_SFFtzMwP_BQnJ2XmqJlZn35Zf-4wBwc
```

### API_KEY
```
AIzaSyDrg0PNmgX8RTq9d_eG16kOMls0t4Biykw
```

### WRITE_PROXY_URL
```
https://script.google.com/macros/s/AKfycby4mEJALHkkk7yyoYvenaJns8zsY37uGTxBMu6vXKWGEJ3Nd-nejeKE4ynLSDySb0JX/exec
```

---

## ⚠️ IMPORTANTE

- ❌ **NÃO** coloque no código (GitHub)
- ❌ **NÃO** coloque no arquivo config.js (será ignorado pelo Git)
- ✅ **SIM** coloque no Vercel → Settings → Environment Variables
- ✅ As credenciais ficam **seguras** e **privadas**

---

## 🎯 Caminho Completo no Vercel

```
Vercel Dashboard
  └─ Seu Projeto (kanban-logistica)
      └─ Settings
          └─ Environment Variables
              └─ Add New (3 vezes)
                  ├─ SPREADSHEET_ID
                  ├─ API_KEY
                  └─ WRITE_PROXY_URL
```

---

## ✅ Depois de Configurar

1. ✅ Faça **Redeploy**
2. ✅ Teste o site
3. ✅ Verifique o console (F12) - deve aparecer: "Configuração carregada da API route (Vercel)"

---

## 📚 Guia Completo

Para instruções detalhadas, consulte: **CONFIGURAR_VERCEL_SEGURO.md**


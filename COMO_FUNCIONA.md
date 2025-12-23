# 🔄 Como Funciona o Sistema - De Onde Vêm os Dados?

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                    SEU COMPUTADOR/CELULAR                    │
│  (Navegador acessando o site hospedado na Vercel/GitHub)    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Faz requisições HTTP
                        │ (GET para buscar dados)
                        │ (POST para salvar dados)
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              GOOGLE APPS SCRIPT (API)                        │
│  URL: https://script.google.com/macros/s/.../exec          │
│  (Este é o código do arquivo google-script.js)               │
│                                                              │
│  Função:                                                      │
│  • Recebe pedidos do navegador                               │
│  • Lê/escreve dados no Google Sheets                         │
│  • Retorna dados em formato JSON                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Lê/Grava dados
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    GOOGLE SHEETS                              │
│  (Planilha com as colunas: id, project, conteudo, etc.)     │
│                                                              │
│  Esta é a BASE DE DADOS do sistema                           │
│  Todas as tarefas são armazenadas aqui                       │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Resumo Simples

1. **GitHub/Vercel** = Apenas hospeda o código (HTML, CSS, JavaScript)
   - Não armazena dados
   - É como um "servidor de arquivos"

2. **Google Apps Script** = A ponte/conexão
   - Recebe pedidos do navegador
   - Conecta com o Google Sheets
   - É como um "garçom" que busca e entrega dados

3. **Google Sheets** = O banco de dados
   - Onde TODOS os dados ficam armazenados
   - Cada linha = uma tarefa
   - Cada coluna = um tipo de informação

## 📝 Onde Cada Coisa Fica?

### No GitHub/Vercel (hospedagem do código):
- ✅ `index.html` - Tela principal do Kanban
- ✅ `login.html` - Tela de login
- ✅ `main.js` - Lógica do aplicativo
- ✅ `style.css` - Estilos visuais
- ✅ **NÃO tem dados aqui!**

### No Google Sheets (armazenamento de dados):
- ✅ Todas as tarefas
- ✅ Todos os projetos
- ✅ Informações de setores, responsáveis, datas
- ✅ **Aqui que ficam os dados!**

### No Google Apps Script (API/conexão):
- ✅ Código que lê o Google Sheets
- ✅ Código que escreve no Google Sheets
- ✅ Recebe e retorna dados em JSON

## 🔧 O Que Você Precisa Fazer?

### 1. Configurar Google Sheets ✅ (JÁ FEITO - você tem a URL)
Você já configurou e tem a URL da API. Isso significa que:
- ✅ Google Sheets está criado
- ✅ Google Apps Script está publicado
- ✅ A URL está no `main.js`

### 2. Verificar se o Google Sheets tem as colunas corretas

Abra sua planilha do Google Sheets e verifique se a primeira linha tem:
```
id | project | conteudo | status | setor | responsavel | data_inicio | data_fim
```

Se não tiver, crie essas colunas na primeira linha.

### 3. Fazer Deploy no GitHub/Vercel

O GitHub/Vercel vai apenas hospedar o código. Os dados continuarão vindo do Google Sheets.

## ❓ Perguntas Frequentes

**P: Se eu fizer deploy no GitHub, meus dados vão para lá?**
R: **NÃO!** O GitHub só hospeda o código. Os dados continuam no Google Sheets.

**P: Posso mudar o Google Sheets depois?**
R: Sim! Basta que você atualize a URL da API no `main.js` se criar uma nova planilha.

**P: Outras pessoas vão ver minha planilha?**
R: Depende das permissões que você configurou no Google Sheets. Por padrão, você controla quem vê.

**P: O site vai funcionar mesmo se eu desligar meu computador?**
R: Sim! O código fica na Vercel, os dados ficam no Google Sheets. Ambos ficam online 24/7.

## ✅ Checklist Final

- [x] Google Sheets criado (você já tem a URL da API)
- [x] Google Apps Script publicado
- [x] URL da API no `main.js` (você já atualizou)
- [ ] Verificar se as colunas estão corretas no Google Sheets
- [ ] Fazer deploy no GitHub/Vercel
- [ ] Testar se está funcionando

---

**Resumo**: GitHub/Vercel = código | Google Sheets = dados | Google Apps Script = conexão entre os dois


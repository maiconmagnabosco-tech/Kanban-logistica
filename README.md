# Kanban Logística | MAGNABOCO

Sistema de gestão de projetos logísticos em formato Kanban com integração ao Google Sheets.

## 🚀 Funcionalidades

- ✅ Tela de login com validação de email corporativo
- 📊 Dashboard com métricas de projetos
- 🎯 Kanban board com 3 colunas: Não Iniciado, Em Andamento, Concluído
- 🔍 Filtros por Projeto, Setor e Responsável
- 📈 Indicador de aderência com cores dinâmicas
- 📦 Cards de tarefas com informações detalhadas
- 🔄 Drag and drop para mover tarefas entre colunas
- ✏️ Edição e exclusão de tarefas
- 💾 Sincronização automática com Google Sheets

## 🎨 Características Visuais

### Cards de Aderência
- 🔴 **Vermelho**: 0% a 75.99%
- 🟠 **Laranja**: 76% a 90.99%
- 🔵 **Azul**: 91% a 99.99%
- 🟢 **Verde**: 100%

### Cards de Tarefas
- 🔴 **Vermelho**: Não Iniciado
- 🟠 **Laranja**: Em Andamento
- 🟢 **Verde**: Concluído

## 🔐 Credenciais de Acesso

- **Domínio de email**: `@transmagnabosco.com.br`
- **Senha universal**: `lositique25`

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conta Google (para Google Sheets)
- Acesso à internet

## 🛠️ Instalação Local

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em um servidor local
3. Configure o Google Sheets (veja DEPLOY.md)
4. Atualize a URL da API no `main.js`

## 📚 Documentação

Para instruções detalhadas de deploy, consulte [DEPLOY.md](./DEPLOY.md)

## 📝 Estrutura do Projeto

```
kanban/
├── index.html          # Página principal
├── login.html          # Página de login
├── main.js             # Lógica principal
├── style.css           # Estilos
├── auth.js             # Autenticação
├── google-script.js    # Script Google Apps Script
├── vercel.json         # Configuração Vercel
└── DEPLOY.md           # Guia de deploy
```

## 🚀 Deploy

O projeto está configurado para deploy na Vercel. Veja o guia completo em [DEPLOY.md](./DEPLOY.md)

## 📞 Suporte

Para problemas ou dúvidas, verifique:
1. Console do navegador (F12)
2. Logs do Google Apps Script
3. Logs da Vercel

---

Desenvolvido para MAGNABOCO | Sistema de Gestão Logística


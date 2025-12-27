// API Route para retornar configurações de forma segura
// As variáveis de ambiente são acessíveis apenas no servidor

export default function handler(req, res) {
    // Verificar se é uma requisição GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Retornar configurações das variáveis de ambiente
    // Essas variáveis são definidas no painel do Vercel
    const config = {
        SPREADSHEET_ID: process.env.SPREADSHEET_ID || '',
        API_KEY: process.env.API_KEY || '',
        WRITE_PROXY_URL: process.env.WRITE_PROXY_URL || ''
    };

    // Verificar se todas as variáveis estão configuradas
    if (!config.SPREADSHEET_ID || !config.API_KEY || !config.WRITE_PROXY_URL) {
        console.error('Variáveis de ambiente não configuradas completamente');
        return res.status(500).json({ 
            error: 'Configuração incompleta. Verifique as variáveis de ambiente no Vercel.' 
        });
    }

    // Retornar configurações
    // IMPORTANTE: Isso ainda expõe as credenciais no cliente
    // Mas pelo menos não ficam no código fonte
    res.status(200).json(config);
}


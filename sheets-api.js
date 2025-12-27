// Google Sheets API v4 - Cliente para sincronização
// Usa API Key para leitura e Google Apps Script para escrita (mais seguro)
class SheetsAPI {
    constructor(config) {
        this.spreadsheetId = config.SPREADSHEET_ID;
        this.apiKey = config.API_KEY;
        this.writeProxyUrl = config.WRITE_PROXY_URL || null; // URL do Google Apps Script para escrita
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        this.range = 'Sheet1!A1:H1000'; // Ajuste conforme necessário
    }

    /**
     * Busca todas as tarefas da planilha usando Google Sheets API
     */
    async fetchTasks() {
        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
            }

            const data = await response.json();
            
            if (!data.values || data.values.length === 0) {
                return [];
            }

            // Primeira linha são os cabeçalhos
            const headers = data.values[0];
            const rows = data.values.slice(1);

            // Mapear para o formato de tarefas
            const tasks = rows
                .filter(row => row[0] && row[0] !== 'undefined' && row[0].trim() !== '')
                .map(row => ({
                    id: String(row[0] || ''),
                    project: row[1] || 'Geral',
                    content: row[2] || '',
                    columnId: row[3] || 'todo',
                    sector: row[4] || '',
                    responsible: row[5] || '',
                    startDate: row[6] || '',
                    endDate: row[7] || ''
                }));

            return tasks;
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
            throw error;
        }
    }

    /**
     * Salva todas as tarefas na planilha usando Google Apps Script como proxy
     * Isso é mais seguro pois não expõe a API Key no frontend para escrita
     */
    async saveTasks(tasks) {
        if (!this.writeProxyUrl) {
            throw new Error('WRITE_PROXY_URL não configurado. Configure a URL do Google Apps Script para escrita.');
        }

        try {
            const payload = {
                tasks: tasks.map(t => ({
                    ...t,
                    id: String(t.id) // Garantir que ID é string
                }))
            };

            const response = await fetch(this.writeProxyUrl, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requer no-cors
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // Com no-cors, não podemos ler a resposta, mas assumimos sucesso se não houver erro
            console.log('Dados enviados para sincronização');
            return { status: 'success' };
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
            throw error;
        }
    }
}


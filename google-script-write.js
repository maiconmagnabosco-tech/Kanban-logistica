// Google Apps Script para ESCRITA na planilha
// Este script deve ser usado APENAS para escrita, mantendo a API Key segura
// Cole este código no Google Apps Script e publique como Web App

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents);

        if (!data || !Array.isArray(data.tasks)) {
            return ContentService.createTextOutput(JSON.stringify({ 
                status: 'error', 
                message: 'Missing tasks array' 
            })).setMimeType(ContentService.MimeType.JSON);
        }

        // Limpar dados antigos (exceto cabeçalho)
        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
            sheet.getRange(2, 1, lastRow - 1, 8).clearContent();
        }

        // Escrever novos dados
        if (data.tasks.length > 0) {
            const rows = data.tasks.map(t => [
                String(t.id || ''),
                String(t.project || 'Geral'),
                String(t.content || ''),
                String(t.columnId || 'todo'),
                String(t.sector || ''),
                String(t.responsible || ''),
                String(t.startDate || ''),
                String(t.endDate || '')
            ]);
            
            sheet.getRange(2, 1, rows.length, 8).setValues(rows);
            SpreadsheetApp.flush();
        }

        return ContentService.createTextOutput(JSON.stringify({ 
            status: 'success', 
            count: data.tasks.length 
        })).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ 
            status: 'error', 
            message: error.toString() 
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Função para inicializar a planilha (execute uma vez manualmente)
function setupSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();
    sheet.appendRow(['id', 'project', 'conteudo', 'status', 'setor', 'responsavel', 'data_inicio', 'data_fim']);
}


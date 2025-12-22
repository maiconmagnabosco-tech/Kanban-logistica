function doGet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const rows = sheet.getDataRange().getValues();
    const headers = rows.shift();

    const tasks = rows.map(row => ({
        id: String(row[0]),
        project: row[1],
        content: row[2],
        columnId: row[3],
        sector: row[4],
        responsible: row[5],
        startDate: row[6],
        endDate: row[7]
    })).filter(t => t.id && t.id !== 'undefined');

    return ContentService.createTextOutput(JSON.stringify({
        tasks: tasks
    })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON' }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    if (!data || !Array.isArray(data.tasks)) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Missing tasks array' }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, 8).clearContent();
    }

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

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', count: data.tasks.length }))
        .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();
    sheet.appendRow(['id', 'project', 'conteudo', 'status', 'setor', 'responsavel', 'data_inicio', 'data_fim']);
}

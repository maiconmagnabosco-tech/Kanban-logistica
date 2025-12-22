const API_URL = 'https://script.google.com/macros/s/AKfycbw3Qd94WSi6jYw0utA6XDNdr2ieCeqrbaF5UODyRQw3s0axroX951WQ1GzM-oYj-4E/exec';

const COLUMNS = [
    { id: 'todo', title: 'Não Iniciado', color: '#ef4444' },
    { id: 'inprogress', title: 'Em Andamento', color: '#f59e0b' },
    { id: 'done', title: 'Concluído', color: '#10b981' }
];

class App {
    constructor() {
        this.tasks = [];
        this.currentProject = localStorage.getItem('last_project') || '';
        this.currentResponsible = '';
        this.currentSector = '';
        this.isSyncing = false;
        this.init();
    }

    async init() {
        this.setupModal();
        this.setupFilters();
        this.displayUserInfo();
        await this.fetchData();

        document.getElementById('btn-new-project').onclick = () => this.openModal();
        document.getElementById('btn-refresh').onclick = () => {
            document.getElementById('btn-refresh').style.transform = 'rotate(180deg)';
            this.fetchData().then(() => {
                setTimeout(() => document.getElementById('btn-refresh').style.transform = 'none', 500);
            });
        };

        document.getElementById('btn-logout').onclick = () => {
            if (confirm('Deseja realmente sair do sistema?')) {
                localStorage.removeItem('kanban_auth');
                localStorage.removeItem('kanban_user');
                window.location.href = 'login.html';
            }
        };
    }

    displayUserInfo() {
        const userEmail = localStorage.getItem('kanban_user');
        if (userEmail) {
            const userName = userEmail.split('@')[0].replace('.', ' ');
            const userInfoEl = document.getElementById('user-info');
            if (userInfoEl) {
                userInfoEl.textContent = `👤 ${userName}`;
            }
        }
    }

    async fetchData() {
        try {
            const res = await fetch(API_URL + '?t=' + Date.now());
            const data = await res.json();
            if (data.tasks) {
                this.tasks = data.tasks;
                // Initial update based on potentially stored project
                this.updateSelectors();
                this.renderDashboard();
                this.renderBoard();
            }
        } catch (err) { console.error(err); }
    }

    setupFilters() {
        const pSelector = document.getElementById('project-selector');
        const rSelector = document.getElementById('responsible-selector');
        const sSelector = document.getElementById('sector-selector');

        pSelector.onchange = (e) => {
            this.currentProject = e.target.value;
            localStorage.setItem('last_project', this.currentProject);
            this.updateSelectors();
            this.renderDashboard();
            this.renderBoard();
        };

        rSelector.onchange = (e) => {
            this.currentResponsible = e.target.value;
            this.updateSelectors();
            this.renderDashboard();
            this.renderBoard();
        };

        sSelector.onchange = (e) => {
            this.currentSector = e.target.value;
            this.updateSelectors();
            this.renderDashboard();
            this.renderBoard();
        };
    }

    updateSelectors() {
        // Filter tasks based on current selections to show only valid options in OTHER dropdowns
        const getFilteredTasks = (exclude = '') => {
            return this.tasks.filter(t => {
                const matchProject = exclude === 'project' || !this.currentProject || t.project === this.currentProject;
                const matchResponsible = exclude === 'responsible' || !this.currentResponsible || t.responsible === this.currentResponsible;
                const matchSector = exclude === 'sector' || !this.currentSector || t.sector === this.currentSector;
                return matchProject && matchResponsible && matchSector;
            });
        };

        const availableProjects = new Set(getFilteredTasks('project').map(t => t.project).filter(p => p));
        const availableResponsibles = new Set(getFilteredTasks('responsible').map(t => t.responsible).filter(r => r));
        const availableSectors = new Set(getFilteredTasks('sector').map(t => t.sector).filter(s => s));

        const render = (el, set, current, placeholder) => {
            const previousValue = el.value;
            el.innerHTML = `<option value="">${placeholder}</option>`;
            Array.from(set).sort().forEach(val => {
                const opt = document.createElement('option');
                opt.value = val;
                opt.innerText = val;
                if (val === current) opt.selected = true;
                el.appendChild(opt);
            });
            if (current && !set.has(current)) {
                el.value = "";
                return false;
            }
            return true;
        };

        const pValid = render(document.getElementById('project-selector'), availableProjects, this.currentProject, "Todos os Projetos");
        if (!pValid) {
            this.currentProject = "";
            localStorage.setItem('last_project', "");
        }

        const rValid = render(document.getElementById('responsible-selector'), availableResponsibles, this.currentResponsible, "Todos os Responsáveis");
        if (!rValid) this.currentResponsible = "";

        const sValid = render(document.getElementById('sector-selector'), availableSectors, this.currentSector, "Todos os Setores");
        if (!sValid) this.currentSector = "";

        // 3. Populate Modal Datalist for Projects
        const datalist = document.getElementById('project-list');
        if (datalist) {
            const allProjects = new Set(this.tasks.map(t => t.project).filter(p => p));
            datalist.innerHTML = '';
            Array.from(allProjects).sort().forEach(p => {
                const opt = document.createElement('option');
                opt.value = p;
                datalist.appendChild(opt);
            });
        }
    }

    renderDashboard() {
        // If filtered by Responsible or Sector, adherence reflects ONLY their tasks
        let filteredTasks = this.tasks;
        if (this.currentResponsible) filteredTasks = filteredTasks.filter(t => t.responsible === this.currentResponsible);
        if (this.currentSector) filteredTasks = filteredTasks.filter(t => t.sector === this.currentSector);

        // Projects calculation is trickier when filtered
        // We look at projects where the selected person/sector has ANY task
        const relevantProjects = [...new Set(filteredTasks.map(t => t.project).filter(p => p))];
        const totalProjectsCount = relevantProjects.length;

        // A project is "100% complete" for this view if ALL tasks in that project (assigned to this person/sector) are done
        let completedProjectsCount = 0;
        relevantProjects.forEach(projectName => {
            const projectTasks = filteredTasks.filter(t => t.project === projectName);
            const projectDone = projectTasks.filter(t => t.columnId === 'done').length;
            if (projectTasks.length > 0 && projectTasks.length === projectDone) {
                completedProjectsCount++;
            }
        });

        // Overall adherence: tasks done vs total tasks assigned to the filters
        const totalTasksCount = filteredTasks.length;
        const doneTasksCount = filteredTasks.filter(t => t.columnId === 'done').length;
        const adherence = totalTasksCount === 0 ? 0 : Math.round((doneTasksCount / totalTasksCount) * 100);

        document.getElementById('stat-total').innerText = totalProjectsCount;
        document.getElementById('stat-completed').innerText = completedProjectsCount;
        document.getElementById('stat-adherence').innerText = `${adherence}%`;
    }

    renderBoard() {
        const board = document.getElementById('board');
        board.innerHTML = '';

        let filtered = this.tasks;
        if (this.currentProject) filtered = filtered.filter(t => t.project === this.currentProject);
        if (this.currentResponsible) filtered = filtered.filter(t => t.responsible === this.currentResponsible);
        if (this.currentSector) filtered = filtered.filter(t => t.sector === this.currentSector);

        if (filtered.length === 0) {
            const hasFilters = this.currentProject || this.currentResponsible || this.currentSector;
            const msg = hasFilters ? "Nenhuma tarefa encontrada com esses filtros." : "Nenhuma tarefa cadastrada.";
            board.innerHTML = `<div style="color:#666; text-align:center; width:100%; margin-top:3rem;">${msg}</div>`;
            return;
        }

        COLUMNS.forEach(col => {
            const colTasks = filtered.filter(t => t.columnId === col.id);
            const colEl = document.createElement('div');
            colEl.className = 'column';
            colEl.id = col.id;
            colEl.innerHTML = `
                <div class="column-header" style="border-bottom-color: ${col.color}">
                    <h2>${col.title} <span style="opacity:0.5; font-size:0.8em">(${colTasks.length})</span></h2>
                    <button class="add-btn" data-col="${col.id}">+</button>
                </div>
                <div class="task-list" id="${col.id}"></div>
            `;

            const list = colEl.querySelector('.task-list');
            colTasks.forEach(task => {
                const el = this.createCard(task, col.color);
                list.appendChild(el);
            });

            colEl.querySelector('.add-btn').onclick = () => this.openModal(col.id);
            board.appendChild(colEl);
        });

        this.setupDragDrop();
    }

    getDaysRemaining(endDateStr) {
        if (!endDateStr) return null;
        const end = new Date(endDateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(end)) return null;
        const diffTime = end - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    createCard(task, accentColor) {
        const div = document.createElement('div');
        div.className = 'task';
        div.draggable = true;
        div.id = task.id;
        div.style.background = accentColor;
        div.style.color = '#ffffff';

        // Emoji based on column
        const emojiMap = {
            'todo': '😐',
            'inprogress': '😊',
            'done': '🤩'
        };
        const emoji = emojiMap[task.columnId] || '📋';

        const remaining = this.getDaysRemaining(task.endDate);
        let remainHtml = '';
        if (remaining !== null) {
            if (task.columnId === 'done') {
                if (remaining >= 0) remainHtml = `<span class="days-remaining ok">Concluído dentro do prazo</span>`;
                else remainHtml = `<span class="days-remaining late">Concluído fora do prazo (+${Math.abs(remaining)} dias)</span>`;
            } else {
                if (remaining < 0) remainHtml = `<span class="days-remaining late">⚠️ ${Math.abs(remaining)} dias atrasado</span>`;
                else if (remaining === 0) remainHtml = `<span class="days-remaining late">Hoje</span>`;
                else if (remaining <= 2) remainHtml = `<span class="days-remaining soon">⏱️ ${remaining} dias</span>`;
                else remainHtml = `<span class="days-remaining ok">${remaining} dias</span>`;
            }
        }

        const dateEnd = task.endDate ? new Date(task.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '';

        div.innerHTML = `
            <div class="task-actions">
                <button class="action-icon edit-btn" data-id="${task.id}" title="Editar tarefa">
                    <ion-icon name="pencil"></ion-icon>
                </button>
                <button class="action-icon delete-btn" data-id="${task.id}" title="Excluir tarefa">
                    <ion-icon name="trash"></ion-icon>
                </button>
            </div>
            <div class="task-meta" style="margin-bottom:0.5rem">
                <span class="badge-sector">${task.sector || 'Logística'}</span>
            </div>
            <span class="task-content">${task.content}</span>
            <div class="task-meta" style="margin-top:0.8rem; color:rgba(255,255,255,0.9);">
                ${task.responsible ? `<div class="task-owner"><span class="owner-emoji">${emoji}</span><span class="owner-name">👤 ${task.responsible}</span></div>` : '<span></span>'}
                <div style="text-align:right">
                    ${remainHtml}
                    ${dateEnd ? `<div style="font-size:0.65rem; opacity:0.8; margin-top:2px;">Prev: ${dateEnd}</div>` : ''}
                </div>
            </div>
        `;

        // Add event listeners after innerHTML is set
        const editBtn = div.querySelector('.edit-btn');
        const deleteBtn = div.querySelector('.delete-btn');

        // Prevent drag when clicking buttons
        editBtn.addEventListener('mousedown', (e) => e.stopPropagation());
        deleteBtn.addEventListener('mousedown', (e) => e.stopPropagation());

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.loadEdit(task.id);
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.deleteTask(task.id);
        });

        return div;
    }

    deleteTask(id) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.renderBoard();
            this.updateSelectors();
            this.renderDashboard();
            this.sync();
        }
    }

    loadEdit(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;
        document.getElementById('modal-title').innerText = 'Editar Tarefa';
        document.getElementById('inp-id').value = task.id;
        document.getElementById('inp-project').value = task.project;
        document.getElementById('inp-content').value = task.content;
        document.getElementById('inp-sector').value = task.sector;
        document.getElementById('inp-responsible').value = task.responsible;
        const parseDate = (d) => d ? new Date(d).toISOString().split('T')[0] : '';
        document.getElementById('inp-start').value = parseDate(task.startDate);
        document.getElementById('inp-end').value = parseDate(task.endDate);
        this.pendingColId = task.columnId;
        document.getElementById('modal-overlay').classList.remove('hidden');
    }

    setupModal() {
        const overlay = document.getElementById('modal-overlay');
        const btnCancel = document.getElementById('btn-cancel');
        const btnSave = document.getElementById('btn-save');
        this.closeModal = () => overlay.classList.add('hidden');
        this.openModal = (colId) => {
            this.pendingColId = colId || 'todo';
            document.getElementById('modal-title').innerText = 'Nova Tarefa';
            document.getElementById('inp-id').value = '';
            document.getElementById('inp-project').value = this.currentProject || '';
            document.getElementById('inp-content').value = '';
            document.getElementById('inp-sector').value = '';
            document.getElementById('inp-responsible').value = '';
            document.getElementById('inp-start').value = '';
            document.getElementById('inp-end').value = '';
            overlay.classList.remove('hidden');
            document.getElementById('inp-content').focus();
        };
        btnCancel.onclick = this.closeModal;
        btnSave.onclick = () => {
            const id = document.getElementById('inp-id').value;
            const project = document.getElementById('inp-project').value.trim();
            const content = document.getElementById('inp-content').value.trim();
            const sector = document.getElementById('inp-sector').value.trim();
            const responsible = document.getElementById('inp-responsible').value.trim();
            const startDate = document.getElementById('inp-start').value;
            const endDate = document.getElementById('inp-end').value;

            if (!project || !content) { alert('Projeto e Tarefa são obrigatórios.'); return; }
            const taskData = { id, project, content, sector, responsible, startDate, endDate, columnId: this.pendingColId };
            this.saveTask(taskData);
            this.closeModal();
        };
        overlay.onclick = (e) => { if (e.target === overlay) this.closeModal(); };
    }

    saveTask(data) {
        // Ensure ID is a string for consistent comparison
        const targetId = data.id ? String(data.id) : null;

        if (targetId) {
            const idx = this.tasks.findIndex(t => String(t.id) === targetId);
            if (idx !== -1) {
                // Update existing task, merging old and new data
                this.tasks[idx] = { ...this.tasks[idx], ...data, id: targetId };
            }
        } else {
            // New task
            const newTask = {
                ...data,
                id: Date.now().toString(),
                columnId: data.columnId || 'todo'
            };
            this.tasks.push(newTask);

            // If we are creating a new task, we might want to switch to its project
            // but only if no project is currently selected
            if (!this.currentProject) {
                this.currentProject = data.project;
                localStorage.setItem('last_project', this.currentProject);
            }
        }

        this.renderBoard();
        this.updateSelectors();
        this.renderDashboard();
        this.sync();
    }

    async sync() {
        if (this.isSyncing) return; // Prevent concurrent syncs
        this.isSyncing = true;

        const refreshBtn = document.getElementById('btn-refresh');
        if (refreshBtn) refreshBtn.classList.add('syncing');

        try {
            // Prepare data for Google Script
            const payload = {
                tasks: this.tasks.map(t => ({
                    ...t,
                    id: String(t.id) // Ensure ID is string on backend too
                }))
            };

            await fetch(API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log('Sync successful');
        } catch (e) {
            console.error('Sync failed:', e);
            alert('Erro ao salvar dados. Verifique sua conexão.');
        } finally {
            this.isSyncing = false;
            if (refreshBtn) refreshBtn.classList.remove('syncing');
        }
    }

    setupDragDrop() {
        let draggedId = null;

        document.querySelectorAll('.task').forEach(t => {
            t.addEventListener('dragstart', (e) => {
                if (e.target.closest('.action-icon')) {
                    e.preventDefault();
                    return;
                }
                draggedId = t.id;
                e.dataTransfer.effectAllowed = 'move';
                t.classList.add('dragging');

                // Set a ghost image or just let browser handle it
                e.dataTransfer.setData('text/plain', t.id);
            });

            t.addEventListener('dragend', () => {
                t.classList.remove('dragging');
                document.querySelectorAll('.task-list').forEach(l => l.classList.remove('dragover'));
            });
        });

        document.querySelectorAll('.task-list').forEach(list => {
            list.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                list.classList.add('dragover');
            });

            list.addEventListener('dragleave', (e) => {
                // Only remove if we really left the list container
                const rect = list.getBoundingClientRect();
                if (e.clientX < rect.left || e.clientX >= rect.right || e.clientY < rect.top || e.clientY >= rect.bottom) {
                    list.classList.remove('dragover');
                }
            });

            list.addEventListener('drop', (e) => {
                e.preventDefault();
                list.classList.remove('dragover');

                const id = e.dataTransfer.getData('text/plain') || draggedId;
                if (!id) return;

                const task = this.tasks.find(t => t.id === id);
                const newCol = list.id;

                if (task && task.columnId !== newCol) {
                    task.columnId = newCol;
                    this.renderBoard();
                    this.renderDashboard();
                    this.sync();
                }

                draggedId = null;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new App(); });

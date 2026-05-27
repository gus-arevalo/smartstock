// ── DADOS MOCK ─────────────────────────────────────────────────
const DATA = {
  items: [
    { id: 1, sku: 'LPT-001', name: 'Notebook Dell Inspiron 15', cat: 'Eletrônicos', qty: 0,  min: 3,  price_buy: 2800, price_sell: 3499, supplier: 'TechDistrib', margin: 24.9 },
    { id: 2, sku: 'MSE-012', name: 'Mouse sem fio Logitech M185', cat: 'Periféricos',  qty: 2,  min: 10, price_buy: 49,   price_sell: 79,   supplier: 'InfoParts',   margin: 61.2 },
    { id: 3, sku: 'KBD-007', name: 'Teclado Mecânico Redragon K552', cat: 'Periféricos', qty: 4, min: 8, price_buy: 189, price_sell: 269, supplier: 'InfoParts', margin: 42.3 },
    { id: 4, sku: 'CBL-USB', name: 'Cabo USB-C 2m', cat: 'Acessórios',  qty: 35, min: 20, price_buy: 12,  price_sell: 24,   supplier: 'CabosNet',    margin: 100 },
    { id: 5, sku: 'MON-022', name: 'Monitor LG 24" Full HD', cat: 'Monitores',   qty: 1,  min: 2,  price_buy: 860,  price_sell: 1199, supplier: 'TechDistrib', margin: 39.4 },
    { id: 6, sku: 'PRT-003', name: 'Impressora HP LaserJet Pro', cat: 'Impressoras', qty: 6, min: 4, price_buy: 920, price_sell: 1349, supplier: 'PrintMax', margin: 46.6 },
    { id: 7, sku: 'HDS-009', name: 'Headset Gamer HyperX Cloud II', cat: 'Periféricos', qty: 3, min: 5, price_buy: 350, price_sell: 499, supplier: 'GameZone', margin: 42.6 },
    { id: 8, sku: 'PEN-100', name: 'Pen Drive 64GB Kingston', cat: 'Armazenamento', qty: 18, min: 15, price_buy: 38, price_sell: 69, supplier: 'StoreParts', margin: 81.6 },
  ],
  movements: [
    { id: 1, date: '2026-05-20', type: 'entrada', item: 'Cabo USB-C 2m', sku: 'CBL-USB', qty: 20, supplier: 'CabosNet', user: 'Gustavo' },
    { id: 2, date: '2026-05-21', type: 'saida',   item: 'Mouse sem fio Logitech M185', sku: 'MSE-012', qty: 8, reason: 'Venda', user: 'Gustavo' },
    { id: 3, date: '2026-05-22', type: 'saida',   item: 'Notebook Dell Inspiron 15', sku: 'LPT-001', qty: 3, reason: 'Venda', user: 'Gustavo' },
    { id: 4, date: '2026-05-23', type: 'entrada', item: 'Teclado Mecânico Redragon', sku: 'KBD-007', qty: 4, supplier: 'InfoParts', user: 'Gustavo' },
    { id: 5, date: '2026-05-24', type: 'saida',   item: 'Monitor LG 24"', sku: 'MON-022', qty: 1, reason: 'Venda', user: 'Gustavo' },
    { id: 6, date: '2026-05-25', type: 'entrada', item: 'Pen Drive 64GB Kingston', sku: 'PEN-100', qty: 10, supplier: 'StoreParts', user: 'Gustavo' },
  ],
  suppliers: [
    { id: 1, name: 'TechDistrib',  contact: 'comercial@techdistrib.com.br', phone: '(11) 3344-5566', items: 12 },
    { id: 2, name: 'InfoParts',    contact: 'vendas@infoparts.com.br',      phone: '(11) 2233-4455', items: 8  },
    { id: 3, name: 'CabosNet',     contact: 'pedidos@cabosnet.com.br',      phone: '(11) 4455-6677', items: 5  },
    { id: 4, name: 'PrintMax',     contact: 'atend@printmax.com.br',        phone: '(11) 5566-7788', items: 4  },
    { id: 5, name: 'GameZone',     contact: 'b2b@gamezone.com.br',          phone: '(11) 6677-8899', items: 6  },
    { id: 6, name: 'StoreParts',   contact: 'vendas@storeparts.com.br',     phone: '(11) 7788-9900', items: 9  },
  ]
};

// ── HELPERS ────────────────────────────────────────────────────
function getStatus(item) {
  if (item.qty === 0) return { label: 'Esgotado', cls: 'badge-red', dotcls: 'red', pct: 0 };
  const pct = item.qty / item.min;
  if (pct <= 0.25) return { label: 'Crítico', cls: 'badge-red', dotcls: 'red', pct: Math.round(pct * 100) };
  if (pct < 1)    return { label: 'Baixo',    cls: 'badge-yellow', dotcls: 'yellow', pct: Math.round(pct * 100) };
  return { label: 'Normal', cls: 'badge-green', dotcls: 'green', pct: Math.min(Math.round(pct * 100), 100) };
}

function fillColor(pct) {
  if (pct === 0 || pct <= 25) return 'fill-red';
  if (pct < 100) return 'fill-yellow';
  return 'fill-green';
}

function fmtBRL(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function fmtDate(d) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

// ── SIDEBAR SVGs ───────────────────────────────────────────────
const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  items: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  entrada: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
  saida: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  suppliers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  movements: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  logo: `<svg viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
};

// ── RENDER SIDEBAR ─────────────────────────────────────────────
function renderSidebar(activePage) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard',     icon: 'dashboard' },
    { id: 'monitor',   label: 'Monitoramento', icon: 'monitor'   },
    { id: 'items',     label: 'Itens',         icon: 'items'     },
    { id: 'entrada',   label: 'Entrada',       icon: 'entrada'   },
    { id: 'saida',     label: 'Saída',         icon: 'saida'     },
    { id: 'movements', label: 'Movimentações', icon: 'movements' },
    { id: 'suppliers', label: 'Fornecedores',  icon: 'suppliers' },
  ];
  return `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-mark">
          <div class="logo-icon">${ICONS.logo}</div>
          <div>
            <div class="logo-text">SmartStock</div>
            <div class="logo-sub">Gestão de Estoque</div>
          </div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Menu</div>
        ${navItems.map(n => `
          <div class="nav-item ${activePage === n.id ? 'active' : ''}" onclick="navigate('${n.id}')">
            ${ICONS[n.icon]}
            ${n.label}
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="avatar">GA</div>
        <div class="avatar-info">
          <div class="avatar-name">Gustavo A.</div>
          <div class="avatar-role">Administrador</div>
        </div>
      </div>
    </aside>`;
}

// ── PAGES ──────────────────────────────────────────────────────

function pageDashboard() {
  const esgotados = DATA.items.filter(i => i.qty === 0).length;
  const criticos  = DATA.items.filter(i => i.qty > 0 && i.qty / i.min <= 0.25).length;
  const baixos    = DATA.items.filter(i => i.qty > 0 && i.qty / i.min < 1 && i.qty / i.min > 0.25).length;
  const total     = DATA.items.length;
  const alertItems = DATA.items.filter(i => getStatus(i).label !== 'Normal').sort((a,b) => a.qty - b.qty);

  return `
    <div class="topbar">
      <div class="topbar-title">Dashboard</div>
      <div class="topbar-search">${ICONS.search}<input placeholder="Buscar item ou SKU…" oninput="handleSearch(this.value)"/></div>
      <button class="topbar-btn btn-primary" onclick="navigate('entrada')">${ICONS.plus} Entrada</button>
      <button class="topbar-btn btn-secondary" onclick="navigate('saida')">Saída</button>
    </div>
    <div class="content">
      <div class="cards-row">
        <div class="stat-card danger">
          <div class="card-icon">${ICONS.monitor}</div>
          <div class="card-label">Esgotados</div>
          <div class="card-value">${esgotados}</div>
          <div class="card-sub">itens sem estoque</div>
        </div>
        <div class="stat-card warning">
          <div class="card-icon">${ICONS.monitor}</div>
          <div class="card-label">Críticos</div>
          <div class="card-value">${criticos}</div>
          <div class="card-sub">≤ 25% do mínimo</div>
        </div>
        <div class="stat-card ok">
          <div class="card-icon">${ICONS.items}</div>
          <div class="card-label">Estoque Baixo</div>
          <div class="card-value">${baixos}</div>
          <div class="card-sub">abaixo do mínimo</div>
        </div>
        <div class="stat-card info">
          <div class="card-icon">${ICONS.items}</div>
          <div class="card-label">Total de Itens</div>
          <div class="card-value">${total}</div>
          <div class="card-sub">cadastrados no sistema</div>
        </div>
      </div>

      <div class="grid3">
        <div class="panel">
          <div class="panel-header">
            <h2>⚠️ Itens que precisam de atenção</h2>
            <div class="panel-actions">
              <button class="topbar-btn btn-secondary" onclick="navigate('monitor')">Ver tudo</button>
            </div>
          </div>
          <div class="alert-list">
            ${alertItems.slice(0,6).map(item => {
              const s = getStatus(item);
              return `
              <div class="alert-item">
                <div class="alert-dot ${s.dotcls}"></div>
                <div class="alert-info">
                  <div class="alert-name">${item.name}</div>
                  <div class="alert-meta">${item.sku} · ${item.qty} un · Mín: ${item.min}</div>
                </div>
                <span class="badge ${s.cls}">${s.label}</span>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div class="panel">
          <div class="panel-header"><h2>Últimas movimentações</h2></div>
          <div class="alert-list">
            ${DATA.movements.slice().reverse().slice(0,5).map(m => `
              <div class="alert-item">
                <div class="alert-dot ${m.type === 'entrada' ? 'green' : 'yellow'}"></div>
                <div class="alert-info">
                  <div class="alert-name">${m.item}</div>
                  <div class="alert-meta">${m.type === 'entrada' ? '▲' : '▼'} ${m.qty} un · ${fmtDate(m.date)}</div>
                </div>
                <span class="badge ${m.type === 'entrada' ? 'badge-green' : 'badge-yellow'}">${m.type}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function pageMonitor() {
  const critItems = DATA.items
    .filter(i => getStatus(i).label !== 'Normal')
    .sort((a,b) => a.qty - b.qty);

  return `
    <div class="topbar">
      <div class="topbar-title">Painel de Monitoramento</div>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header">
          <h2>Itens com nível crítico de estoque</h2>
          <div class="panel-actions">
            <span class="badge badge-red">${critItems.filter(i=>i.qty===0||i.qty/i.min<=0.25).length} críticos</span>
            <span class="badge badge-yellow">${critItems.filter(i=>i.qty>0&&i.qty/i.min>0.25&&i.qty/i.min<1).length} baixos</span>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Status</th><th>Item</th><th>SKU</th><th>Qtd. Atual</th><th>Qtd. Mínima</th><th>Nível</th><th>Fornecedor</th><th>Ação</th>
            </tr></thead>
            <tbody>
              ${critItems.map(item => {
                const s = getStatus(item);
                const pct = item.min > 0 ? Math.min(Math.round((item.qty/item.min)*100), 100) : 0;
                const fc = item.qty === 0 ? 'fill-red' : pct <= 25 ? 'fill-red' : 'fill-yellow';
                return `<tr>
                  <td><span class="badge ${s.cls}">${s.label}</span></td>
                  <td class="td-bold">${item.name}</td>
                  <td class="td-mono">${item.sku}</td>
                  <td class="text-red fw600">${item.qty}</td>
                  <td>${item.min}</td>
                  <td>
                    <div class="stock-bar-wrap">
                      <div class="stock-bar"><div class="stock-bar-fill ${fc}" style="width:${pct}%"></div></div>
                      <span class="stock-qty">${pct}%</span>
                    </div>
                  </td>
                  <td>${item.supplier}</td>
                  <td><button class="topbar-btn btn-primary" onclick="navigate('entrada')">${ICONS.plus} Repor</button></td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function pageItems() {
  return `
    <div class="topbar">
      <div class="topbar-title">Itens do Estoque</div>
      <div class="topbar-search">${ICONS.search}<input placeholder="Buscar por nome ou SKU…" id="items-search" oninput="filterItems(this.value)"/></div>
      <button class="topbar-btn btn-primary" onclick="navigate('cadastro')">${ICONS.plus} Novo Item</button>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header"><h2>Todos os itens</h2></div>
        <div class="table-wrap">
          <table id="items-table">
            <thead><tr>
              <th>SKU</th><th>Nome</th><th>Categoria</th><th>Qtd.</th><th>Mínimo</th><th>Nível</th><th>Preço Venda</th><th>Margem</th><th>Status</th>
            </tr></thead>
            <tbody id="items-tbody">
              ${renderItemsRows(DATA.items)}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function renderItemsRows(items) {
  return items.map(item => {
    const s = getStatus(item);
    const pct = item.min > 0 ? Math.min(Math.round((item.qty/item.min)*100), 100) : 0;
    return `<tr>
      <td class="td-mono">${item.sku}</td>
      <td class="td-bold">${item.name}</td>
      <td><span class="badge badge-blue">${item.cat}</span></td>
      <td class="fw600">${item.qty}</td>
      <td class="text-muted">${item.min}</td>
      <td>
        <div class="stock-bar-wrap">
          <div class="stock-bar"><div class="stock-bar-fill ${fillColor(pct)}" style="width:${pct}%"></div></div>
          <span class="stock-qty text-sm">${pct}%</span>
        </div>
      </td>
      <td>${fmtBRL(item.price_sell)}</td>
      <td class="text-green fw600">${item.margin}%</td>
      <td><span class="badge ${s.cls}">${s.label}</span></td>
    </tr>`;
  }).join('');
}

function filterItems(q) {
  const tbody = document.getElementById('items-tbody');
  if (!tbody) return;
  const filtered = q
    ? DATA.items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase()))
    : DATA.items;
  tbody.innerHTML = renderItemsRows(filtered);
}

function handleSearch(q) {
  if (!q) return;
  navigate('items');
  setTimeout(() => {
    const inp = document.getElementById('items-search');
    if (inp) { inp.value = q; filterItems(q); }
  }, 50);
}

function pageCadastro() {
  return `
    <div class="topbar">
      <div class="topbar-title">Cadastrar Novo Item</div>
      <button class="topbar-btn btn-secondary" onclick="navigate('items')">← Voltar</button>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header"><h2>Dados do item</h2></div>
        <div class="form-grid cols3">
          <div class="form-group span2">
            <label>Nome do item *</label>
            <input type="text" placeholder="Ex: Notebook Dell Inspiron 15"/>
          </div>
          <div class="form-group">
            <label>SKU *</label>
            <input type="text" placeholder="Ex: LPT-001"/>
          </div>
          <div class="form-group">
            <label>Categoria</label>
            <select>
              <option>Eletrônicos</option>
              <option>Periféricos</option>
              <option>Acessórios</option>
              <option>Monitores</option>
              <option>Impressoras</option>
              <option>Armazenamento</option>
            </select>
          </div>
          <div class="form-group">
            <label>Qtd. inicial</label>
            <input type="number" placeholder="0" min="0"/>
          </div>
          <div class="form-group">
            <label>Estoque mínimo *</label>
            <input type="number" placeholder="Ex: 5" min="1"/>
            <span class="form-hint">Abaixo desse valor, o painel emite alerta</span>
          </div>
          <div class="form-group">
            <label>Preço de compra (R$)</label>
            <input type="number" placeholder="0,00" step="0.01"/>
          </div>
          <div class="form-group">
            <label>Preço de venda (R$)</label>
            <input type="number" placeholder="0,00" step="0.01"/>
          </div>
          <div class="form-group">
            <label>Fornecedor principal</label>
            <select>
              <option value="">Selecionar…</option>
              ${DATA.suppliers.map(s => `<option>${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group span2">
            <label>Observações</label>
            <textarea placeholder="Informações adicionais sobre o item…"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="topbar-btn btn-secondary" onclick="navigate('items')">Cancelar</button>
          <button class="topbar-btn btn-primary" onclick="showToast('Item cadastrado com sucesso!')">Salvar item</button>
        </div>
      </div>
    </div>`;
}

function pageEntrada() {
  return `
    <div class="topbar">
      <div class="topbar-title">Registro de Entrada</div>
      <button class="topbar-btn btn-secondary" onclick="navigate('movements')">Ver histórico</button>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header"><h2>Nova entrada de itens</h2></div>
        <div class="form-grid">
          <div class="form-group">
            <label>Item *</label>
            <select>
              <option value="">Selecionar item…</option>
              ${DATA.items.map(i => `<option value="${i.id}">${i.name} (${i.sku})</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Fornecedor</label>
            <select>
              <option value="">Selecionar…</option>
              ${DATA.suppliers.map(s => `<option>${s.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Quantidade recebida *</label>
            <input type="number" placeholder="0" min="1"/>
          </div>
          <div class="form-group">
            <label>Data de recebimento *</label>
            <input type="date" value="2026-05-26"/>
          </div>
          <div class="form-group">
            <label>Nota fiscal / Referência</label>
            <input type="text" placeholder="NF-0001 ou código de referência"/>
          </div>
          <div class="form-group">
            <label>Preço unitário pago (R$)</label>
            <input type="number" placeholder="0,00" step="0.01"/>
          </div>
          <div class="form-group span2">
            <label>Observações</label>
            <textarea placeholder="Detalhes sobre o recebimento…"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="topbar-btn btn-secondary">Limpar</button>
          <button class="topbar-btn btn-primary" onclick="showToast('Entrada registrada com sucesso!')">Registrar entrada</button>
        </div>
      </div>
    </div>`;
}

function pageSaida() {
  return `
    <div class="topbar">
      <div class="topbar-title">Registro de Saída</div>
      <button class="topbar-btn btn-secondary" onclick="navigate('movements')">Ver histórico</button>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header"><h2>Nova saída de itens</h2></div>
        <div class="form-grid">
          <div class="form-group">
            <label>Item *</label>
            <select>
              <option value="">Selecionar item…</option>
              ${DATA.items.map(i => `<option value="${i.id}">${i.name} (${i.sku}) — ${i.qty} un</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Motivo da saída *</label>
            <select>
              <option>Venda</option>
              <option>Doação</option>
              <option>Descarte</option>
              <option>Uso interno</option>
              <option>Devolução</option>
            </select>
          </div>
          <div class="form-group">
            <label>Quantidade *</label>
            <input type="number" placeholder="0" min="1"/>
          </div>
          <div class="form-group">
            <label>Data da saída *</label>
            <input type="date" value="2026-05-26"/>
          </div>
          <div class="form-group">
            <label>Destinatário / Cliente</label>
            <input type="text" placeholder="Nome do cliente ou entidade"/>
          </div>
          <div class="form-group">
            <label>Número do pedido</label>
            <input type="text" placeholder="PED-0001"/>
          </div>
          <div class="form-group span2">
            <label>Observações</label>
            <textarea placeholder="Detalhes sobre a saída…"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="topbar-btn btn-secondary">Limpar</button>
          <button class="topbar-btn btn-danger" onclick="showToast('Saída registrada com sucesso!')">Registrar saída</button>
        </div>
      </div>
    </div>`;
}

function pageMovements() {
  return `
    <div class="topbar">
      <div class="topbar-title">Histórico de Movimentações</div>
      <button class="topbar-btn btn-primary" onclick="navigate('entrada')">${ICONS.plus} Entrada</button>
      <button class="topbar-btn btn-secondary" onclick="navigate('saida')">Saída</button>
    </div>
    <div class="content">
      <div class="tabs" id="mov-tabs">
        <div class="tab active" onclick="filterMov('all',this)">Todas</div>
        <div class="tab" onclick="filterMov('entrada',this)">Entradas</div>
        <div class="tab" onclick="filterMov('saida',this)">Saídas</div>
      </div>
      <div class="panel" style="margin-top:0;border-top:none;border-radius:0 0 12px 12px;">
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Data</th><th>Tipo</th><th>Item</th><th>SKU</th><th>Qtd.</th><th>Origem / Motivo</th><th>Usuário</th>
            </tr></thead>
            <tbody id="mov-tbody">
              ${renderMovRows(DATA.movements)}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function renderMovRows(movs) {
  return [...movs].reverse().map(m => `
    <tr>
      <td>${fmtDate(m.date)}</td>
      <td><span class="badge ${m.type === 'entrada' ? 'badge-green' : 'badge-yellow'}">${m.type}</span></td>
      <td class="td-bold">${m.item}</td>
      <td class="td-mono">${m.sku}</td>
      <td class="fw600">${m.qty}</td>
      <td>${m.supplier || m.reason || '—'}</td>
      <td>${m.user}</td>
    </tr>
  `).join('');
}

function filterMov(type, el) {
  document.querySelectorAll('#mov-tabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const tbody = document.getElementById('mov-tbody');
  if (!tbody) return;
  const filtered = type === 'all' ? DATA.movements : DATA.movements.filter(m => m.type === type);
  tbody.innerHTML = renderMovRows(filtered);
}

function pageSuppliers() {
  return `
    <div class="topbar">
      <div class="topbar-title">Fornecedores</div>
    </div>
    <div class="content">
      <div class="panel">
        <div class="panel-header"><h2>Fornecedores cadastrados</h2></div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Nome</th><th>Contato</th><th>Telefone</th><th>Itens fornecidos</th>
            </tr></thead>
            <tbody>
              ${DATA.suppliers.map((s, i) => `
                <tr>
                  <td class="td-bold">${s.name}</td>
                  <td>${s.contact}</td>
                  <td class="td-mono">${s.phone}</td>
                  <td><span class="badge badge-blue">${s.items} itens</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `position:fixed;bottom:24px;right:24px;background:#1F4E79;color:white;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:9999;transition:opacity 0.3s`;
    document.body.appendChild(t);
  }
  t.textContent = '✓ ' + msg;
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}

// ── NAVIGATION ─────────────────────────────────────────────────
const PAGES = {
  dashboard: pageDashboard,
  monitor:   pageMonitor,
  items:     pageItems,
  cadastro:  pageCadastro,
  entrada:   pageEntrada,
  saida:     pageSaida,
  movements: pageMovements,
  suppliers: pageSuppliers,
};

let currentPage = 'dashboard';

function navigate(page) {
  if (!PAGES[page]) page = 'dashboard';
  currentPage = page;
  const navPage = ['cadastro'].includes(page) ? 'items' : page;
  document.getElementById('app-root').innerHTML = `
    <div class="app">
      ${renderSidebar(navPage)}
      <div class="main">${PAGES[page]()}</div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => navigate('dashboard'));

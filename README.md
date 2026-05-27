# SmartStock

> Sistema de Estoque Inteligente — Protótipo Funcional

Projeto desenvolvido como parte do **Projeto Integrador Multidisciplinar Extensionista (PIME)** do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário Belas Artes de São Paulo.

**Autor:** Gustavo Arévalo Rodrigues — RA 25117245  
**Orientador:** Prof. Marcio Cavalcante de Souza, Me.  
**Ano:** 2026

---

## Acesso ao protótipo

🔗 **[Abrir SmartStock](https://[seu-usuario].github.io/smartstock/login.html)**

---

## Sobre o projeto

O SmartStock é uma aplicação desktop (protótipo web) para controle inteligente de estoque, voltada a:

- Pequenas empresas e comércios locais
- ONGs e instituições sociais que controlam doações

### Funcionalidades implementadas (Sprint 1)

| ID | Funcionalidade | Status |
|----|---------------|--------|
| HU01 | Cadastro e login | ✅ Protótipo |
| HU02 | Cadastro de itens | ✅ Protótipo |
| HU03 | Busca por nome/SKU | ✅ Protótipo |
| HU04 | Visualização de fornecedores e margens | ✅ Protótipo |
| HU05 | Registro de entrada de itens | ✅ Protótipo |
| HU06 | Registro de saída de itens | ✅ Protótipo |
| HU07 | Painel de monitoramento e reposição | ✅ Protótipo |

---

## Estrutura do projeto

```
smartstock/
├── index.html          # Dashboard principal
├── login.html          # Tela de login
├── css/
│   └── style.css       # Estilos globais
├── js/
│   └── app.js          # Lógica e navegação SPA
└── README.md
```

---

## Como usar localmente

```bash
# Clone o repositório
git clone https://github.com/[seu-usuario]/smartstock.git

# Abra no navegador
open smartstock/login.html
```

> Não requer servidor ou dependências. Funciona diretamente no navegador.

---

## Tecnologias

- HTML5 + CSS3 (sem frameworks)
- JavaScript ES6+ (vanilla, sem build tools)
- Google Fonts: DM Sans + DM Mono
- Dados mockados em memória (simulação do banco SQLite futuro)

---

## Paleta de cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Navy | `#1F4E79` | Sidebar, botões primários |
| Blue | `#2E75B6` | Destaques, links |
| Red | `#C0392B` | Esgotado / crítico |
| Yellow | `#E67E22` | Estoque baixo |
| Green | `#27AE60` | Normal / entradas |

---

*PIME 2026.1 · Belas Artes São Paulo*

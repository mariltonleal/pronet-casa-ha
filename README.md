# ProNet Casa — Home Assistant Theme

Tema e branding completo do **ProNet Casa** para Home Assistant, seguindo o Manual da Marca ProNet Casa v1.0.

## Estrutura

```
homeassistant/
├── configuration.yaml          # Config principal do HA
├── automations.yaml            # Automacao: tema padrao ao iniciar
├── lovelace_pronet_casa.yaml   # Dashboard principal do produto
├── themes/
│   └── pronet_casa.yaml        # Tema light + dark
├── www/
│   ├── pronet_casa_logo.png    # Logo com fundo transparente
│   ├── pronet_branding.js      # Modulo de branding (sidebar logo, login, visual)
│   └── pronet_fonts.html       # Carregamento da fonte Nunito Sans
└── README.md
```

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Principal | `#0077FF` | 50% — botoes, links, destaques |
| Azul Escuro | `#003A70` | 30% — sidebar, header, textos |
| Branco | `#FFFFFF` | 10% — fundo cards |
| Azul Claro | `#35BFFF` | 5% — icones, acentos |
| Amarelo Quente | `#FBB724` | 5% — detalhe de conforto |
| Cinza Suave | `#F2F7FA` | fundo geral |

## Funcionalidades

- Tema light e dark com identidade ProNet Casa
- Logo SVG na sidebar (substitui "Home Assistant")
- Branding na tela de login (gradiente + logo)
- Transicoes suaves nos cards
- Scrollbar estilizada
- Dashboard com comodos + controles rapidos
- Fonte Nunito Sans (Google Fonts)
- Automacao para aplicar tema ao iniciar

## Instalacao

1. Copie os arquivos para `/config/` do seu Home Assistant
2. Reinicie o Home Assistant
3. Va em **Perfil > Tema** e selecione `pronet_casa`
4. Limpe o cache do browser (Ctrl+Shift+R)

## Requisitos

- Home Assistant 2026.x+
- HACS (opcional, para Mushroom cards)

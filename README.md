# Sala de Espera · MVNES

Instrumento de validação dos vetores neuroeconômicos (VTCI, VSC, VFE, VEXO, VRES) da tese de doutorado em Economia (PPGE/UFPA).

O participante passa por 12 vinhetas de saúde com exigência manipulada (informação técnica, conflito entre pessoas, aperto financeiro, barreira institucional e ruptura súbita) e distribui 10 fichas de tempo e energia entre ações simples e conjuntas, podendo guardar fichas. Depois responde a uma escala de autorrelato de 15 itens e a dados socioeconômicos.

- `index.html` app do participante
- `painel.html` painel do pesquisador (`/painel`, pede a chave)
- `app.js` cenas, itens e cálculos
- `config.js` URL do Apps Script
- `apps-script/Code.gs` receptor da planilha

## Ligar a planilha

1. Crie a planilha Google **MVNES New respostas**.
2. Extensões > Apps Script. Apague o conteúdo e cole `apps-script/Code.gs`. Salve.
3. Implantar > Nova implantação > tipo **App da Web**. Executar como **Eu**, acesso **Qualquer pessoa**. Autorize.
4. Copie a URL que termina em `/exec` e cole em `config.js`, no campo `APPS_SCRIPT_URL`. Faça o commit.

A planilha cria sozinha as abas `sessoes` (uma linha por participante) e `cenas_longo` (pessoa × cena × vetor, pronta para modelo multinível).

## Publicar

Importe o repositório na Vercel (sem build, site estático). O app fica na raiz e o painel em `/painel`.

## Análises do painel

Perfil médio, alfa por vetor nas vinhetas e na escala, efeito da exigência da cena (correspondência), matriz multitraço-multimétodo vinheta × escala, correlação entre vetores e exportação em CSV largo e longo.

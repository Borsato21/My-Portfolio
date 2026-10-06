# Portfólio — Vítor Borsato

Portfólio pessoal estático criado para publicação no GitHub Pages.

## Estrutura

- `index.html` — conteúdo e estrutura da página
- `style.css` — layout, responsividade, tema claro/escuro e animações
- `script.js` — menu mobile, tema e animações de entrada
- `.nojekyll` — evita processamento desnecessário do Jekyll no GitHub Pages

## Como publicar no GitHub Pages

### Opção 1 — repositório `Borsato21.github.io`

1. Crie um repositório público chamado `Borsato21.github.io`.
2. Envie os arquivos deste projeto para a branch `main`.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha `main` e a pasta `/ (root)`.
6. Salve. O endereço esperado será `https://borsato21.github.io/`.

### Opção 2 — qualquer repositório

Você também pode usar um repositório como `portfolio`. Nesse caso, o endereço ficará parecido com:

`https://borsato21.github.io/portfolio/`

Como o site usa caminhos relativos para os arquivos locais, ele funciona nas duas opções.

## Personalização rápida

- Textos: edite `index.html`.
- Cores: altere as variáveis no começo de `style.css`.
- Projetos: procure pela seção `id="projetos"` em `index.html`.
- Contato: procure pela seção `id="contato"`.

## Observação de privacidade

O portfólio usa informações profissionais e de contato relevantes, mas não publica telefone nem data de nascimento. Caso queira disponibilizar um currículo em PDF, prefira criar uma versão pública sem dados pessoais desnecessários.
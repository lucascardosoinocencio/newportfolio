# 📁 Portfólio — Lucas Cardoso Inocêncio

Portfólio pessoal com visual de caderno/scrapbook: uma pasta pêssego com abas coloridas estilo divisórias de fichário, foto polaroid, carimbo e folhas que "pulam na frente" a cada aba clicada.

🔗 **Site no ar:** https://lucascardosoinocencio.github.io/newportfolio/

## Sobre

Desenvolvedor Front-end em formação Fullstack. Comecei estudando HTML, CSS e JavaScript do zero e fui transformando cada projeto de curso em algo que resolvesse problemas reais — de uma calculadora de comissões para uma distribuidora até landing pages para clientes de verdade. Atualmente atuo como freelancer na criação de sites e sigo me aprofundando no ecossistema Fullstack JavaScript.

## ✨ Funcionalidades

- **Navegação por abas** (Sobre, Habilidades, Projetos, Contato), sem scroll entre seções — cada aba troca o conteúdo com uma animação de "folha subindo e se acomodando na frente".
- **Projetos dinâmicos**: busca em tempo real os repositórios públicos via API do GitHub (`/users/:user/repos`), com skeleton de carregamento e fallback estático caso a API falhe.
- **Projetos em destaque** com preview de imagem gerado automaticamente pelo GitHub (opengraph).
- 100% responsivo (mobile, tablet e desktop).

## 🛠️ Stack utilizada

| Camada | Tecnologia |
|---|---|
| UI | [React 18](https://react.dev/) (via CDN, sem build step) |
| Transpilação JSX | [Babel Standalone](https://babeljs.io/docs/babel-standalone) (transformação no navegador, runtime clássico do React) |
| Estilo | CSS puro (custom properties, Grid, Flexbox, `clip-path`, animações via `@keyframes`) + [Tailwind CSS](https://tailwindcss.com/) via CDN para utilitários pontuais |
| Fontes | [Google Fonts](https://fonts.google.com/) — Caveat, Kalam, Patrick Hand, Nunito |
| Ícones | [Font Awesome](https://fontawesome.com/) via CDN |
| Dados dos projetos | [GitHub REST API](https://docs.github.com/en/rest) (`api.github.com/users/{user}/repos`) |
| Hospedagem | [GitHub Pages](https://pages.github.com/) |

Todo o projeto vive em um único arquivo `index.html` — sem etapa de build, sem `node_modules`, sem bundler. React e Babel são carregados via CDN e o JSX é transpilado diretamente no navegador.

## 📂 Estrutura

```
newportfolio/
├── index.html   # página inteira: HTML + CSS + componentes React (JSX)
├── LICENSE
└── README.md
```

## 🚀 Como rodar localmente

Por não depender de build, basta servir o arquivo estaticamente:

```bash
npx http-server -p 8080
```

Ou simplesmente abrir o `index.html` direto no navegador.

## 📬 Contato

- LinkedIn: [linkedin.com/in/lucasc-inocencio](https://www.linkedin.com/in/lucasc-inocencio/)
- GitHub: [github.com/lucascardosoinocencio](https://github.com/lucascardosoinocencio)
- E-mail: lucasdarkpsy@gmail.com

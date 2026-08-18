// Busca o código-fonte JSX em app.jsx, transpila com o Babel Standalone
// forçando o runtime clássico do React (o runtime automático gera `import`
// estático, que quebra em <script> comum) e roda o resultado na página.
fetch("app.jsx")
  .then((res) => res.text())
  .then((jsxSource) => {
    var compiled = Babel.transform(jsxSource, { presets: [["react", { runtime: "classic" }]] }).code;
    var runnable = document.createElement("script");
    runnable.text = compiled;
    document.body.appendChild(runnable);
  });

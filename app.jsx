const { useState, useEffect, useRef } = React;

/* =====================================================
   CONFIGURAÇÃO (edite aqui para trocar usuário/projetos)
   ===================================================== */
const GITHUB_USER = "lucascardosoinocencio";
const PHOTO_SRC = "assets/foto.jpg";

const TABS = [
  { id: "sobre", label: "Sobre" },
  { id: "habilidades", label: "Habilidades" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

// Projetos em destaque (curados manualmente). A imagem usa o preview
// automático que o próprio GitHub gera para cada repositório público
// (opengraph), então não depende de nenhum arquivo externo.
const FEATURED_PROJECTS = [
  {
    name: "Stock Segurança",
    repo: "stock-seguranca-site",
    description: "Landing page para a Stock Segurança: CFTV, alarme, controle de acesso e automação em Americana/SP e região. Página comercial com seções de serviços, chamadas para contato e visual orientado a conversão.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsivo"],
    url: "https://github.com/lucascardosoinocencio/stock-seguranca-site",
  },
  {
    name: "Calculadora de Comissão",
    repo: "calculadora-comissao-route66",
    description: "Calculadora de comissões desenvolvida para os vendedores da Distribuidora Route 66, com formatação de moeda em tempo real e cálculo instantâneo conforme os valores digitados.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    url: "https://github.com/lucascardosoinocencio/calculadora-comissao-route66",
  },
  {
    name: "Login Validator",
    repo: "login-validator-js",
    description: "Validador de formulário de login com feedback em tempo real: checagem de campos, mensagens de erro dinâmicas e experiência de preenchimento mais clara para o usuário.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    url: "https://github.com/lucascardosoinocencio/login-validator-js",
  },
  {
    name: "Busca de CEP",
    repo: "projeto-viacep",
    description: "Projeto de consulta de endereço completo a partir do CEP, consumindo a API pública ViaCEP via Fetch e exibindo os dados formatados na tela.",
    tech: ["JavaScript", "Fetch API", "ViaCEP"],
    url: "https://github.com/lucascardosoinocencio/projeto-viacep",
  },
];

// Fallback estático usado somente se a API do GitHub falhar (limite de requisições, offline, etc.)
const FALLBACK_REPOS = [
  { name: "stock-seguranca-site", description: "Landing page da Stock Segurança: CFTV, alarme, controle de acesso e automação em Americana/SP e região.", language: "HTML", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/stock-seguranca-site" },
  { name: "calculadora-comissao-route66", description: "Calculadora de comissões moderna para os vendedores da Distribuidora Route 66, com formatação de moeda em tempo real.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/calculadora-comissao-route66" },
  { name: "login-validator-js", description: "Login Validator (HTML, CSS, JavaScript): validação de formulário com feedback em tempo real.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/login-validator-js" },
  { name: "projeto-viacep", description: "Projeto para pesquisa de CEP completo, consumindo a API ViaCEP.", language: "CSS", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/projeto-viacep" },
  { name: "projeto-portfolio", description: "Projeto final do Curso em Vídeo de HTML5 e CSS3.", language: "HTML", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/projeto-portfolio" },
  { name: "html-css", description: "Curso de HTML5 e CSS3 do CursoemVideo.", language: "HTML", stargazers_count: 0, html_url: "https://github.com/lucascardosoinocencio/html-css" },
];

/* =====================================================
   CABEÇALHO FIXO DA PASTA (nome, foto polaroid, carimbo)
   ===================================================== */
function HeroPanel() {
  return (
    <div className="hero-panel">
      <div className="title-tape">Lucas Inocêncio</div>
      <div className="hero">
        <div className="hero-text">
          <p className="hero-role">Desenvolvedor Front-end · em formação Fullstack</p>
        </div>
        <div className="polaroid-wrap">
          <div className="polaroid">
            <span className="tape tl"></span>
            <span className="tape tr"></span>
            <img src={PHOTO_SRC} alt="Foto de Lucas Cardoso Inocêncio" />
          </div>
          <div className="stamp"><b>Qualificado</b><span>Dev Front-end</span></div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ABAS (nav): estado ativo controla o destaque visual
   ===================================================== */
function TabsNav({ activeTab, onChange }) {
  return (
    <nav className="tabs" aria-label="Navegação principal">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={"tab" + (activeTab === tab.id ? " active" : "")}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

/* =====================================================
   PAINEL: SOBRE ("Quem sou eu?")
   ===================================================== */
function SobrePanel() {
  return (
    <article className="paper rot-sobre">
      <h2 className="section-title">Quem sou eu?</h2>
      <div className="about-card">
        <img className="about-avatar" src={PHOTO_SRC} alt="Lucas Cardoso Inocêncio" />
        <div className="about-text">
          <p className="about-name">Lucas Cardoso Inocêncio</p>
          <p className="about-role">Desenvolvedor Front-end · em formação Fullstack</p>

          <p className="about-subtitle">Apresentação</p>
          <p className="about-bio">
            Olá! Comecei estudando <strong>HTML, CSS e JavaScript</strong> do zero e, aos poucos, fui
            transformando cada projeto de curso em algo que pudesse resolver problemas reais: de uma
            calculadora de comissões para uma distribuidora até landing pages para clientes de verdade.
            Hoje sigo me aprofundando no ecossistema <strong>Fullstack JavaScript</strong> (Node.js, TypeScript,
            React e Next.js), sempre com a mão na massa em projetos novos e cuidando de cada detalhe
            visual para entregar telas que funcionam bem no desktop e no celular.
          </p>

          <p className="about-subtitle">Experiência Profissional</p>
          <p className="about-bio">
            Atuo como <strong>freelancer na criação de sites</strong>, desenvolvendo páginas institucionais
            e comerciais sob demanda para clientes, como o site para a <strong>Ana</strong> e a landing page
            da <strong>Stock Segurança</strong> (CFTV, alarme e controle de acesso). Cuido de todo o processo:
            estrutura, estilo visual e entrega responsiva para desktop e celular.
          </p>
        </div>
      </div>
    </article>
  );
}

/* =====================================================
   PAINEL: HABILIDADES
   ===================================================== */
const SKILL_CATEGORIES = [
  {
    color: "c-blue",
    icon: "fa-solid fa-code",
    title: "Fundamentos Web",
    note: "Curso em Vídeo: HTML5 e CSS3",
    tags: ["HTML5", "CSS3", "Responsividade", "Flexbox / Grid"],
  },
  {
    color: "c-green",
    icon: "fa-brands fa-js",
    title: "JavaScript & Lógica",
    note: "Curso em Vídeo: JavaScript e Lógica de Programação",
    tags: ["JavaScript", "Lógica de Programação", "DOM", "Fetch API"],
  },
  {
    color: "c-pink",
    icon: "fa-solid fa-layer-group",
    title: "Fullstack JavaScript",
    note: "Udemy: em formação",
    tags: ["Node.js", "TypeScript", "React", "Next.js", "Docker", "Git", "API REST"],
  },
  {
    color: "c-orange",
    icon: "fa-solid fa-toolbox",
    title: "Ferramentas",
    note: "Uso no dia a dia",
    tags: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"],
  },
];

function HabilidadesPanel() {
  return (
    <article className="paper rot-habilidades">
      <h2 className="section-title">Minhas Habilidades</h2>
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title} className={"skill-card " + cat.color}>
            <div className="skill-icon"><i className={cat.icon}></i></div>
            <h3>{cat.title}</h3>
            <p className="skill-note">{cat.note}</p>
            <div className="pills">
              {cat.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* =====================================================
   PAINEL: PROJETOS (destaque + GitHub via API, com estado React)
   ===================================================== */
function FeaturedCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <article className="featured-card">
      {!imgFailed && (
        <img
          className="featured-thumb"
          src={`https://opengraph.githubassets.com/1/${GITHUB_USER}/${project.repo}`}
          alt={`Prévia do repositório ${project.name}`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}
      <div className="featured-body">
        <h4>{project.name}</h4>
        <p>{project.description}</p>
        <div className="pills">
          {project.tech.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
        <a className="btn-github" href={project.url} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i> Ver no GitHub
        </a>
      </div>
    </article>
  );
}

function RepoCard({ repo }) {
  return (
    <article className="repo-card">
      <div className="repo-name"><i className="fa-regular fa-folder-open"></i> {repo.name}</div>
      <p className="repo-desc">{repo.description ? repo.description : "Sem descrição disponível."}</p>
      <div className="repo-meta">
        {repo.language && <span><i className="fa-solid fa-code"></i> {repo.language}</span>}
        <span><i className="fa-solid fa-star"></i> {repo.stargazers_count}</span>
      </div>
      <a className="repo-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">Ver no GitHub →</a>
    </article>
  );
}

function ProjetosPanel() {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`);
        if (!res.ok) throw new Error(`GitHub API respondeu ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Resposta inesperada da API do GitHub");

        const sorted = data
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (!cancelled) {
          setRepos(sorted);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Falha ao buscar repositórios no GitHub, usando lista de fallback:", err);
        if (!cancelled) {
          setErrorMsg("Não foi possível carregar os repositórios em tempo real agora (limite de requisições ou conexão). Mostrando uma lista salva.");
          setRepos(FALLBACK_REPOS);
          setLoading(false);
        }
      }
    }

    loadRepos();
    return () => { cancelled = true; };
  }, []);

  return (
    <article className="paper rot-projetos">
      <h2 className="section-title">Projetos</h2>

      <h3 className="subsection-title">Em destaque</h3>
      <div className="featured-grid">
        {FEATURED_PROJECTS.map((p) => <FeaturedCard key={p.repo} project={p} />)}
      </div>

      <h3 className="subsection-title">Repositórios no GitHub</h3>

      {errorMsg && <div className="projects-status error">{errorMsg}</div>}

      <div className="repos-grid">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line w60"></div>
            <div className="skeleton-line w90"></div>
            <div className="skeleton-line w40"></div>
          </div>
        ))}
        {!loading && repos && repos.length === 0 && (
          <p style={{ fontFamily: "'Kalam',cursive", color: "var(--ink-soft)" }}>Nenhum repositório público encontrado.</p>
        )}
        {!loading && repos && repos.map((r) => <RepoCard key={r.name} repo={r} />)}
      </div>
    </article>
  );
}

/* =====================================================
   PAINEL: CONTATO
   ===================================================== */
function ContatoPanel() {
  return (
    <article className="paper rot-contato">
      <h2 className="section-title">Contato</h2>
      <div className="contact-grid">
        <a className="contact-card" href="https://www.linkedin.com/in/lucasc-inocencio/" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin"></i>
          <h4>LinkedIn</h4>
          <span>lucasc-inocencio</span>
        </a>
        <a className="contact-card" href="https://github.com/lucascardosoinocencio" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-github"></i>
          <h4>GitHub</h4>
          <span>lucascardosoinocencio</span>
        </a>
        <a className="contact-card" href="mailto:lucasdarkpsy@gmail.com">
          <i className="fa-solid fa-envelope"></i>
          <h4>E-mail</h4>
          <span>lucasdarkpsy@gmail.com</span>
        </a>
        <a className="contact-card" href="https://wa.me/5514996490494" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
          <h4>WhatsApp</h4>
          <span>(14) 99649-0494</span>
        </a>
      </div>
    </article>
  );
}

const PANELS = {
  sobre: SobrePanel,
  habilidades: HabilidadesPanel,
  projetos: ProjetosPanel,
  contato: ContatoPanel,
};

/* =====================================================
   PAINEL DE CONTEÚDO (troca com fade via Tailwind transition-opacity)
   ===================================================== */
function ContentPanel({ activeTab }) {
  // 'idle' = folha atual parada na frente · 'exiting' = sendo guardada antes de puxar a próxima
  const [renderedTab, setRenderedTab] = useState(activeTab); // começa null (só a capa aparece)
  const [phase, setPhase] = useState("idle");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (activeTab === renderedTab) return;

    if (renderedTab === null) {
      // nenhuma folha na frente ainda: a primeira aba clicada só entra, sem sair de lugar nenhum
      setRenderedTab(activeTab);
      setPhase("idle");
      return;
    }

    setPhase("exiting");
    timeoutRef.current = setTimeout(() => {
      setRenderedTab(activeTab);
      setPhase("idle");
    }, 480);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (!renderedTab) return null; // nada sobreposto: só a capa fica visível

  const Panel = PANELS[renderedTab];

  return (
    <div id="content-panel" className={phase === "exiting" ? "exiting" : ""}>
      <Panel key={renderedTab} />
    </div>
  );
}

/* =====================================================
   APP (estado da aba ativa fica aqui, via useState)
   ===================================================== */
function App() {
  // null = nenhuma aba clicada ainda, só a capa aparece
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div id="page">
      <TabsNav activeTab={activeTab} onChange={setActiveTab} />
      <div className="stage">
        <HeroPanel />
        <ContentPanel activeTab={activeTab} />
      </div>
      <footer>
        Lucas Cardoso Inocêncio · 2026 ·{" "}
        <a href="https://www.linkedin.com/in/lucasc-inocencio/" target="_blank" rel="noopener noreferrer">LinkedIn</a>{" "}
        ·{" "}
        <a href="https://github.com/lucascardosoinocencio" target="_blank" rel="noopener noreferrer">GitHub</a>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

const preferenciaReduzida = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const anoAtual = new Date().getFullYear();

document.querySelectorAll("[data-ano]").forEach((elemento) => {
  elemento.textContent = anoAtual;
});

const titulo = document.querySelector(".homeinfo h1");

if (titulo) {
  const texto = titulo.textContent.trim();

  const textoAcessivel = document.createElement("span");
  textoAcessivel.className = "sr-only";
  textoAcessivel.textContent = texto;

  const textoVisivel = document.createElement("span");
  textoVisivel.setAttribute("aria-hidden", "true");

  const alturaReservada = titulo.getBoundingClientRect().height;

  titulo.style.minHeight = `${alturaReservada}px`;
  titulo.textContent = "";
  titulo.append(textoAcessivel, textoVisivel);

  if (preferenciaReduzida.matches) {
    textoVisivel.textContent = texto;
    titulo.style.minHeight = "";
  } else {
    let indice = 0;

    const escreverTitulo = () => {
      if (indice < texto.length) {
        textoVisivel.textContent += texto[indice];
        indice++;

        setTimeout(escreverTitulo, 60);
        return;
      }

      titulo.style.minHeight = "";
    };

    escreverTitulo();
  }
}

const elementosAnimados = document.querySelectorAll(
  ".homeinfo, .home-image, .section-title, .skills-header, .skills-interface, .project-card, .ver-todos, .sobre-content, .contato-links",
);

const observador = new IntersectionObserver(
  (elementos, instancia) => {
    elementos.forEach((elemento) => {
      if (elemento.isIntersecting) {
        elemento.target.classList.add("mostrar");

        instancia.unobserve(elemento.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

elementosAnimados.forEach((elemento) => {
  elemento.classList.add("animar");
  observador.observe(elemento);
});

const cabecalho = document.querySelector("header");
const secoes = document.querySelectorAll("section");
const linksMenu = [...document.querySelectorAll("nav a")].filter((link) =>
  link.getAttribute("href").startsWith("#"),
);

let atualizacaoAgendada = false;

function atualizarMenu() {
  atualizacaoAgendada = false;

  const recuo = (cabecalho ? cabecalho.offsetHeight : 77) + 110;

  let secaoAtual = "";

  secoes.forEach((secao) => {
    if (window.scrollY >= secao.offsetTop - recuo) {
      secaoAtual = secao.id;
    }
  });

  const fimDoScroll =
    document.documentElement.scrollHeight - window.innerHeight - 2;

  if (secoes.length && window.scrollY >= fimDoScroll) {
    secaoAtual = secoes[secoes.length - 1].id;
  }

  linksMenu.forEach((link) => {
    const ativo = link.getAttribute("href") === `#${secaoAtual}`;

    link.classList.toggle("ativo", ativo);

    if (ativo) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function agendarAtualizacaoDoMenu() {
  if (!atualizacaoAgendada) {
    atualizacaoAgendada = true;
    requestAnimationFrame(atualizarMenu);
  }
}

window.addEventListener("scroll", agendarAtualizacaoDoMenu, { passive: true });
window.addEventListener("resize", agendarAtualizacaoDoMenu);

atualizarMenu();

const estrelas = document.querySelector("#stars");

if (estrelas && !preferenciaReduzida.matches) {
  const fragmento = document.createDocumentFragment();

  for (let i = 0; i < 120; i++) {
    const estrela = document.createElement("span");
    const tamanho = Math.random() * 2 + 1;

    estrela.classList.add("star");
    estrela.style.left = `${Math.random() * 100}%`;
    estrela.style.top = `${Math.random() * 100}%`;
    estrela.style.width = `${tamanho}px`;
    estrela.style.height = `${tamanho}px`;
    estrela.style.animationDelay = `${Math.random() * 5}s`;

    fragmento.appendChild(estrela);
  }

  estrelas.appendChild(fragmento);

  const criarEstrelaCadente = () => {
    if (document.hidden) {
      return;
    }

    const estrela = document.createElement("span");
    const duracao = Math.random() * 2 + 3;

    estrela.classList.add("shooting-star");
    estrela.style.left = `${Math.random() * 120 - 20}%`;
    estrela.style.top = `${Math.random() * 40}%`;
    estrela.style.animationDuration = `${duracao}s`;

    estrelas.appendChild(estrela);

    setTimeout(() => {
      estrela.remove();
    }, duracao * 1000);
  };

  setInterval(criarEstrelaCadente, 2500);
}

const skillData = {
  html: {
    number: "01",
    icon: "</>",
    category: "FRONT END",
    title: "HTML",
    description:
      "Estrutura e organização de páginas web utilizando HTML5 e boas práticas de semântica.",
    keywords: ["HTML5", "SEMÂNTICA", "ESTRUTURA"],
  },

  css: {
    number: "02",
    icon: "#",
    category: "FRONT END",
    title: "CSS",
    description:
      "Criação de interfaces, layouts responsivos, estilização, animações e organização visual das páginas.",
    keywords: ["CSS3", "RESPONSIVO", "LAYOUT"],
  },

  javascript: {
    number: "03",
    icon: "JS",
    category: "PROGRAMAÇÃO",
    title: "JavaScript",
    description:
      "Utilização de JavaScript para criar interações, comportamentos e funcionalidades dinâmicas nas páginas.",
    keywords: ["JAVASCRIPT", "DOM", "INTERAÇÃO"],
  },

  git: {
    number: "04",
    icon: "GH",
    category: "VERSIONAMENTO",
    title: "Git / GitHub",
    description:
      "Controle de versões e organização dos projetos através de Git e repositórios no GitHub.",
    keywords: ["GIT", "GITHUB", "VERSIONAMENTO"],
  },
};

const skillOptions = [...document.querySelectorAll(".skill-option")];
const displayContent = document.querySelector(".display-content");
const skillIcon = document.querySelector("#skillIcon");
const skillCategory = document.querySelector("#skillCategory");
const skillTitle = document.querySelector("#skillTitle");
const skillDescription = document.querySelector("#skillDescription");
const skillNumber = document.querySelector("#skillNumber");
const skillKeywords = document.querySelector("#skillKeywords");

const DURACAO_TROCA = 250;

let trocaAgendada = null;

function preencherPainel(dados) {
  skillIcon.textContent = dados.icon;
  skillCategory.textContent = dados.category;
  skillTitle.textContent = dados.title;
  skillDescription.textContent = dados.description;
  skillNumber.textContent = dados.number;

  skillKeywords.innerHTML = "";

  dados.keywords.forEach((keyword) => {
    const tag = document.createElement("span");
    tag.textContent = keyword;
    skillKeywords.appendChild(tag);
  });
}

function selecionarSkill(option) {
  const dados = skillData[option.dataset.skill];

  if (!dados || option.classList.contains("active")) {
    return;
  }

  const indiceAtual = skillOptions.findIndex((item) =>
    item.classList.contains("active"),
  );
  const novoIndice = skillOptions.indexOf(option);
  const direcao = novoIndice > indiceAtual ? 1 : -1;

  skillOptions.forEach((item) => {
    const ativo = item === option;

    item.classList.toggle("active", ativo);
    item.setAttribute("aria-pressed", String(ativo));
  });

  if (preferenciaReduzida.matches) {
    preencherPainel(dados);
    return;
  }

  clearTimeout(trocaAgendada);

  displayContent.style.setProperty("--deslocamento", `${direcao * 40}px`);
  displayContent.classList.add("saindo");

  trocaAgendada = setTimeout(() => {
    preencherPainel(dados);

    displayContent.style.transition = "none";
    displayContent.style.setProperty("--deslocamento", `${direcao * -40}px`);
    void displayContent.offsetWidth;
    displayContent.style.transition = "";

    displayContent.classList.remove("saindo");
  }, DURACAO_TROCA);
}

skillOptions.forEach((option, indice) => {
  option.addEventListener("click", () => {
    selecionarSkill(option);
  });

  option.addEventListener("keydown", (evento) => {
    let alvo = null;

    if (evento.key === "ArrowDown" || evento.key === "ArrowRight") {
      alvo = skillOptions[(indice + 1) % skillOptions.length];
    } else if (evento.key === "ArrowUp" || evento.key === "ArrowLeft") {
      alvo =
        skillOptions[(indice - 1 + skillOptions.length) % skillOptions.length];
    }

    if (alvo) {
      evento.preventDefault();
      alvo.focus();
      selecionarSkill(alvo);
    }
  });
});

const suportaHover = window.matchMedia("(hover: hover) and (pointer: fine)");

if (suportaHover.matches && !preferenciaReduzida.matches) {
  const cards = document.querySelectorAll(
    ".project-card:not(.project-loading)",
  );

  cards.forEach((card) => {
    let quadroAgendado = false;

    card.addEventListener("mouseenter", () => {
      card.classList.add("inclinando");
    });

    card.addEventListener("mousemove", (evento) => {
      if (quadroAgendado) {
        return;
      }

      quadroAgendado = true;

      const { clientX, clientY } = evento;

      requestAnimationFrame(() => {
        quadroAgendado = false;

        const rect = card.getBoundingClientRect();

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const rotacaoX = (y - rect.height / 2) / 25;
        const rotacaoY = (rect.width / 2 - x) / 25;

        card.style.transform = `perspective(800px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateY(-8px)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("inclinando");
      card.style.transform = "";
    });
  });
}

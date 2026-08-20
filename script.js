const titulo = document.querySelector(".homeinfo h1");

if (titulo) {
    const texto = titulo.textContent.trim();
    titulo.textContent = "";

    let indice = 0;

    function escreverTitulo() {
        if (indice < texto.length) {
            titulo.textContent += texto[indice];
            indice++;

            setTimeout(escreverTitulo, 60);
        }
    }

    escreverTitulo();
}


const elementosAnimados =
    document.querySelectorAll(
        ".homeinfo, .home-image, .section-title, .skills-header, .skills-interface, .project-card, .sobre-content, .contato-links"
    );

const observador =
    new IntersectionObserver(
        (elementos) => {
            elementos.forEach((elemento) => {
                if (elemento.isIntersecting) {
                    elemento.target.classList.add("mostrar");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

elementosAnimados.forEach((elemento) => {
    elemento.classList.add("animar");
    observador.observe(elemento);
});


const secoes = document.querySelectorAll("section");
const linksMenu = document.querySelectorAll("nav a");

function atualizarMenu() {
    let secaoAtual = "";

    secoes.forEach((secao) => {
        const distancia = secao.offsetTop - 180;

        if (window.scrollY >= distancia) {
            secaoAtual = secao.id;
        }
    });

    linksMenu.forEach((link) => {
        link.classList.remove("ativo");

        if (
            link.getAttribute("href") ===
            `#${secaoAtual}`
        ) {
            link.classList.add("ativo");
        }
    });
}

window.addEventListener(
    "scroll",
    atualizarMenu
);

atualizarMenu();


const estrelas = document.querySelector("#stars");

if (estrelas) {
    for (let i = 0; i < 120; i++) {
        const estrela = document.createElement("span");

        estrela.classList.add("star");

        estrela.style.left =
            `${Math.random() * 100}%`;

        estrela.style.top =
            `${Math.random() * 100}%`;

        const tamanho =
            Math.random() * 2 + 1;

        estrela.style.width =
            `${tamanho}px`;

        estrela.style.height =
            `${tamanho}px`;

        estrela.style.animationDelay =
            `${Math.random() * 5}s`;

        estrelas.appendChild(estrela);
    }

    function criarEstrelaCadente() {
        const estrela =
            document.createElement("span");

        estrela.classList.add(
            "shooting-star"
        );

        estrela.style.left =
            `${Math.random() * 100 + 20}%`;

        estrela.style.top =
            `${Math.random() * 40}%`;

        estrela.style.animationDuration =
            `${Math.random() * 2 + 3}s`;

        estrelas.appendChild(estrela);

        setTimeout(() => {
            estrela.remove();
        }, 5000);
    }

    setInterval(
        criarEstrelaCadente,
        2500
    );
}


const skillData = {
    html: {
        number: "01",
        icon: "</>",
        category: "FRONT END",
        title: "HTML",
        description:
            "Estrutura e organização de páginas web utilizando HTML5 e boas práticas de semântica.",
        keywords: [
            "HTML5",
            "SEMÂNTICA",
            "ESTRUTURA"
        ]
    },

    css: {
        number: "02",
        icon: "#",
        category: "FRONT END",
        title: "CSS",
        description:
            "Criação de interfaces, layouts responsivos, estilização, animações e organização visual das páginas.",
        keywords: [
            "CSS3",
            "RESPONSIVO",
            "LAYOUT"
        ]
    },

    javascript: {
        number: "03",
        icon: "JS",
        category: "PROGRAMAÇÃO",
        title: "JavaScript",
        description:
            "Utilização de JavaScript para criar interações, comportamentos e funcionalidades dinâmicas nas páginas.",
        keywords: [
            "JAVASCRIPT",
            "DOM",
            "INTERAÇÃO"
        ]
    },

    git: {
        number: "04",
        icon: "GH",
        category: "VERSIONAMENTO",
        title: "Git / GitHub",
        description:
            "Controle de versões e organização dos projetos através de Git e repositórios no GitHub.",
        keywords: [
            "GIT",
            "GITHUB",
            "VERSIONAMENTO"
        ]
    }
};


const skillOptions =
    document.querySelectorAll(
        ".skill-option"
    );

const skillDisplay =
    document.querySelector(
        ".skill-display"
    );

const displayContent =
    document.querySelector(
        ".display-content"
    );

const skillIcon =
    document.querySelector(
        "#skillIcon"
    );

const skillCategory =
    document.querySelector(
        "#skillCategory"
    );

const skillTitle =
    document.querySelector(
        "#skillTitle"
    );

const skillDescription =
    document.querySelector(
        "#skillDescription"
    );

const skillNumber =
    document.querySelector(
        "#skillNumber"
    );

const skillKeywords =
    document.querySelector(
        "#skillKeywords"
    );


skillOptions.forEach((option) => {

    option.addEventListener(
        "click",
        () => {

            const skill =
                option.dataset.skill;

            const dados =
                skillData[skill];

            if (!dados) {
                return;
            }

            if (
                option.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            const indiceAtual =
                [...skillOptions].indexOf(
                    document.querySelector(
                        ".skill-option.active"
                    )
                );

            const novoIndice =
                [...skillOptions].indexOf(
                    option
                );

            const direcao =
                novoIndice > indiceAtual
                    ? 1
                    : -1;

            skillOptions.forEach(
                (item) => {
                    item.classList.remove(
                        "active"
                    );
                }
            );

            option.classList.add(
                "active"
            );

            displayContent.style.transform =
                `translateX(${direcao * 40}px)`;

            displayContent.style.opacity =
                "0";


            setTimeout(() => {

                skillIcon.textContent =
                    dados.icon;

                skillCategory.textContent =
                    dados.category;

                skillTitle.textContent =
                    dados.title;

                skillDescription.textContent =
                    dados.description;

                skillNumber.textContent =
                    dados.number;

                skillKeywords.innerHTML =
                    "";

                dados.keywords.forEach(
                    (keyword) => {

                        const tag =
                            document.createElement(
                                "span"
                            );

                        tag.textContent =
                            keyword;

                        skillKeywords.appendChild(
                            tag
                        );
                    }
                );

                displayContent.style.transform =
                    `translateX(${direcao * -40}px)`;

                requestAnimationFrame(() => {

                    displayContent.style.opacity =
                        "1";

                    displayContent.style.transform =
                        "translateX(0)";

                });

            }, 250);

        }
    );

});


const cards =
    document.querySelectorAll(
        ".project-card:not(.project-loading)"
    );

cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (evento) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                evento.clientX -
                rect.left;

            const y =
                evento.clientY -
                rect.top;

            const centroX =
                rect.width / 2;

            const centroY =
                rect.height / 2;

            const rotacaoX =
                (y - centroY) / 25;

            const rotacaoY =
                (centroX - x) / 25;

            card.style.transform = `
                perspective(800px)
                rotateX(${rotacaoX}deg)
                rotateY(${rotacaoY}deg)
                translateY(-8px)
            `;
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {
            card.style.transform = "";
        }
    );

});
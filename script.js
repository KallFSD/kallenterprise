//#region HeaderContent
function headerContent(indexedLevels) {
  let deviceType = defHeaderNavBar();
 
  // Estrutura de dados unificada para os itens de navegação
  const navItems = [
    { href: `${indexedLevels}index.html`, text: 'Página Principal', icon: 'home.svg', group: 'main' },
    { href: `${indexedLevels}pages/aboutus.html`, text: 'Sobre Nós', icon: 'about.svg', group: 'main' },
    { href: 'https://link.mercadopago.com.br/supportkallbusiness', text: 'Ajude-nos', group: 'help' },
    // Adicione mais itens aqui facilmente
    { href: `${indexedLevels}pages/history.html`, text: 'História', group: 'expanded' },
    { href: `${indexedLevels}pages/support_contact.html`, text: 'Suporte e Contato', group: 'expanded' },
    { href: `${indexedLevels}terms-of-use.html`, text: 'Termos de Uso', group: 'expanded' },
  ];
  
  // Função para gerar o conteúdo de um item de navegação
  const createNavItemContent = (item) => {
    if (deviceType === 'smallDevice' && item.icon) {
      return `<img src="${indexedLevels}assets/images/nav/${item.icon}" width="20px" height="20px" alt="${item.text} icon">`;
    }
    return item.text;
  };
  
  // Gera o HTML para cada grupo de navegação
  const generateNavList = (group) => {
    return navItems
      .filter(item => item.group === group)
      .map(item => `<li><a href="${item.href}">${createNavItemContent(item)}</a></li>`)
      .join('');
  };
  
  // Gera o HTML para o menu expandido (sempre com texto)
  const generateExpandedMenuList = () => {
      return navItems
        .filter(item => item.group === 'expanded') // Mostra apenas os itens do grupo 'expanded'
        .map(item => `<li><a href="${item.href}">${item.text}</a></li>`)
        .join('');
  };
  
  //#region DeviceDebug
    //Retorno para debuger para console
    console.log(`Tipo de Dispositivo: ${deviceType}`);
    //#endregion

  //Variável de Armazenamento de Header Dinâmico
  let headerContent = `
                <section>
                    <div class="logo">
                        <img src="${indexedLevels}assets/images/Logo_KallFullstackDevelopment.svg" width="50px" height="50px" alt="Logo Kall Fullstack Developer">
                    </div>

                    <div class="titlebar">
                        <p>Kall Enterprise</p>
                    </div>

                    <div class="logo">
                        <img src="${indexedLevels}assets/images/Logo_KallProductions.svg" width="50px" height="50px" alt="Logo Kall Productions">
                    </div>
                </section>

                <nav>
                    <div class="headerNavigation">
                        <div class="nav-left-group">
                            <ul class="expandMenu">
                                <li>
                                    <button class="expandButton">
                                        <img src="${indexedLevels}assets/images/nav/menu.svg" width="20px" height="20px" alt="menu_lateral">
                                    </button>
                                </li>
                            </ul>
                            <ul class="mainNavigation">
                                ${generateNavList('main')}
                            </ul>
                        </div>
                        <ul class="helpUs">
                            ${generateNavList('help')}
                        </ul>
                    </div>
                    <div id="expandedMenu" class="hidedMenu">
                        <ul class="completeMenu">
                            ${generateExpandedMenuList()}
                        </ul>
                    </div>
                </nav>
        `;
  return headerContent;
}

function defHeaderNavBar() {
  const deviceScreen = screen.width; // Usa a largura da janela, mais preciso para responsividade

  if (deviceScreen) {
    if (deviceScreen <= 430) {
      return "smallDevice";
    } else {
      return "largeDevice";
    }
  }
  console.error("Tamanho de tela não identificado!");
  return null;
}
//#endregion

//#region FooterContent
function footerContent(indexedLevels) {
  let footerContent = `
        <section class="footer_container">
            <div class="footer_element">
                <h1>Sobre Nós</h1>
            </div>
        </section>
        <section class="footer_container">
            <div class="footer_element">
                <a href="${indexedLevels}pages/support_contact.html">Suporte e Contato</a>
            </div>

            <div class="footer_element">
                <a href="${indexedLevels}terms-of-use.html">Termos de Uso</a>
            </div>
        </section>
        <section class="footer_license">
            <p>
                <a href="https://kallfsd.github.io/kallenterprise">Kall Enterprise</a>
                © 2025 by
                <a href="https://github.com/joaopedrogabriel">João Pedro Gabriel</a>
                is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
                <img src="${indexedLevels}assets/images/cc.svg" style="width: 1em;height:1em;margin-left: .2em;" alt="license_CC">
                <img src="${indexedLevels}assets/images/by.svg" style="width: 1em;height:1em;margin-left: .2em;" alt="license_BY">
            </p>
        </section>
    `;
  return footerContent;
}
//#endregion

//#region PathConfig
//Função de Cálculo de Indexação de Itens de Caminhos
function indexedpaths(levelpath) {
    if (levelpath === 0) {
        return "";
    }
    // Solução mais curta e escalável
    return "../".repeat(levelpath);
}
//#endregion

//#region StyleFunctions
//Função para Aplicar Todas as Folhas de Estilo
function applyAllStyles(levelPath) {
  let hrefHeader = levelPath + "assets/styles/header.css";
  let hrefBody = levelPath + "assets/styles/style.css";
  let hrefFooter = levelPath + "assets/styles/footer.css";
  let hrefMainStyle = levelPath + "assets/styles/mainstyle.css";
  let hrefAside = levelPath + "assets/styles/aside.css";


  loadStyleSheet(hrefBody);
  loadStyleSheet(hrefHeader);
  loadStyleSheet(hrefFooter);
  loadStyleSheet(hrefMainStyle);
  loadStyleSheet(hrefAside);
}

function loadStyleSheet(href) {
  //Variável Link
  const existingLink = document.querySelector(`link[href="${href}"]`);

  //Verificação de Existência de Link de Folha de Estilo
  if (existingLink) {
    return; //Já está lá, não faz nada
  }

  //Criação de Link para a Folha de Estilo
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;

  //Integração do Link para o HTML
  document.head.appendChild(link);
  console.log(`Folha de estilo carregada: ${href}`);
}
//#endregion

//#region Build Website
//Função de Construção de Conteúdo
function build(levelPath) {
  //Definição de Variáveis
  let indexedLevels = indexedpaths(levelPath);
  const dinamicHeaderContent = document.querySelector(".dinamicHeader");
  const dinamicFooterContent = document.querySelector(".dinamicFooter");
  
  //Verificação de Construção
  if (dinamicHeaderContent && dinamicFooterContent) {
    // Aplicação de Elementos Dinâmicos: Insere o HTML gerado diretamente
    dinamicHeaderContent.innerHTML = headerContent(indexedLevels);
    dinamicFooterContent.innerHTML = footerContent(indexedLevels);

    // Aplicação das Folhas de Estilo
    applyAllStyles(indexedLevels);

    // ANEXA O EVENTO DEPOIS QUE O BOTÃO FOI CRIADO E INSERIDO NO DOM
    const botao = document.querySelector(".expandButton");
    const menuIcon = botao.querySelector('img');
    const menu = document.getElementById("expandedMenu");

    if (botao && menu) {
        botao.addEventListener("click", function () {
            menu.classList.toggle("hidedMenu");
            menu.classList.toggle("showedMenu");

            // Troca o ícone com base na visibilidade do menu
            if (menu.classList.contains('showedMenu')) {
                menuIcon.src = `${indexedLevels}assets/images/nav/close.svg`;
            } else {
                menuIcon.src = `${indexedLevels}assets/images/nav/menu.svg`;
            }
        });
    }

    // Lógica para o formulário de contato
    const saveButton = document.getElementById('save-button');
    const sendButton = document.getElementById('send-button');
    const emailSubject = document.getElementById('email-subject');
    const emailBody = document.getElementById('email-body');

    // Verifica se os elementos do formulário de contato existem na página atual
    if (saveButton && sendButton && emailSubject && emailBody) {
        let mailtoUrl = ''; // Armazena a URL do mailto

        saveButton.addEventListener('click', () => {
            const subjectValue = emailSubject.value.trim();
            const bodyValue = emailBody.value.trim();
 
            // Verifica se ambos os campos têm conteúdo
            if (subjectValue && bodyValue) {
                const targetEmail = 'kall.fsd@gmail.com'; 
 
                const subject = encodeURIComponent(subjectValue);
                const body = encodeURIComponent(bodyValue);
                
                // Prepara e armazena a URL
                mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
                sendButton.disabled = false;
 
                alert('Dados salvos! Agora você pode clicar em "Enviar".');
                console.log('Dados do e-mail preparados. O botão de envio foi habilitado.');
            } else {
                // Informa o usuário que os campos são obrigatórios
                alert('Por favor, preencha o assunto e o conteúdo do e-mail antes de salvar.');
            }
        });

        sendButton.addEventListener('click', () => {
            // Se o botão estiver habilitado, dispara o e-mail
            if (!sendButton.disabled) {
                window.location.href = mailtoUrl;
                alert('Enviado com sucesso!');
                window.location.reload();
            }
        });
    }

    // Retorno de Sucesso de Construção
    console.log("Cabeçalho e rodapé dinâmicos construídos com sucesso!");
  } else {
    // Erro de Construção
    console.error("Elemento com a classe 'dinamicHeader' ou 'dinamicFooter' não encontrado.");
  }
}
//#endregion
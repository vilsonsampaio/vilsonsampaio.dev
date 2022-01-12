// Executando funções apenas quando todo o documento for carregado
document.addEventListener("DOMContentLoaded", () => {
  // Adicionando tempo para animação de loading
  setTimeout(() => {
    document.querySelector('html').classList.remove("loading");
  }, 500);


  // Inicializando a lib AOS
  AOS.init();



  // Inicializando slides
  // Hero
  const slideBanner = new Swiper('.s-banner', {
    autoplay: {
      delay: 6000,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Hero
  const slideSobreMobile = new Swiper('.s-sobre-mobile .slide-container', {
    loop: true,
    navigation: {
      prevEl: '.prev-slide',
      nextEl: '.next-slide',
    },
  });

  // Parceiros
  const slideParceiros = new Swiper('.s-parceiros .slide-parceiros', {
    navigation: {
      nextEl: '.chevron-right',
      prevEl: '.chevron-left',
    },
  });

  // Galeria (fullscreen)
  // Thumbs (previews)
  const slideGalleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 8,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  // Slide principal
  const slideGalleryTop = new Swiper('.gallery-top', {
    navigation: {
      nextEl: '.arrow-right',
      prevEl: '.arrow-left',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    thumbs: {
      swiper: slideGalleryThumbs
    }
  });

  // Depoimentos
  const slideDepoimentos = new Swiper('.s-depoimentos .testimonials-container', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });



  // Adicionando funcionalidade do scroll suave
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    const id = $(this).attr('href');
    const targetOffset = $(id).offset().top;
        
    $('html, body').animate({ scrollTop: targetOffset - 72 }, 500);
  });


  // Sidebar
  // Adicionando o abre-fecha da sidebar com formulário de contato
  // Botão pra abrir
  [...document.querySelectorAll('.contato'), document.querySelector('a[href="#contato"]')]
    .forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
  
        document.querySelector('html').classList.add("open-form");
      })
    })
  ;
  
  // Botão pra fechar
  document
    .querySelector('aside#contact .close-button')
    .addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector('html').classList.remove("open-form");
    })
  ;

  // Adicionando a navegação por abas (tab navigation)
  const advisorTabButton = document.querySelector('aside#contact .tab-nav-container .advisor-button');
  const careersTabButton = document.querySelector('aside#contact .tab-nav-container .careers-button');

  // Alterando para a aba "fale com um consultor" ao clique
  advisorTabButton.addEventListener('click', (event) => {
    event.preventDefault();

    careersTabButton.classList.remove("active");
    event.currentTarget.classList.add("active");

    document.querySelector('form.sidebar-form').classList.remove("careers-form-selected");
    document.querySelector('form.sidebar-form').classList.add("advisor-form-selected");
  });
  // Alterando para a aba "trabalhe conosco" ao clique
  careersTabButton.addEventListener('click', (event) => {
    event.preventDefault();

    advisorTabButton.classList.remove("active");
    event.currentTarget.classList.add("active");

    document.querySelector('form.sidebar-form').classList.remove("advisor-form-selected");
    document.querySelector('form.sidebar-form').classList.add("careers-form-selected");
  });

  // Para envio do formulário
  document
    .querySelector('aside#contact form.sidebar-form')
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const isCareersForm = event.currentTarget.classList.contains("careers-form-selected");

      // Inserir código para enviar formulário abaixo.
      if (isCareersForm) {
        alert("Submitou formulário de trabalhar conosco");
      } else {
        alert("Submitou fomulário de falar com um consultor");
      }
    })
  ;



  // Sobre
  const sobreSection = document.querySelector('.s-sobre');

  // Alterando para a seção "Como?"
  document
    .querySelector('.s-sobre .open-como-button')
    .addEventListener("click", (event) => {
      event.preventDefault();
      
      sobreSection.classList.remove("opened-o-que");
      sobreSection.classList.add("opened-como");
    })
  ;
  // Alterando para a seção "O que?"
  document
    .querySelector('.s-sobre .open-o-que-button')
    .addEventListener("click", (event) => {
      event.preventDefault();
      
      sobreSection.classList.remove("opened-como");
      sobreSection.classList.add("opened-o-que");
    })
  ;

  // Inicializando modal para vídeo institucional.
  $('.video-thumb').modalVideo(); 



  // FAQ
  const faqTitle = document.querySelectorAll('.s-faq .faq-title');

  // Abrindo a primeira pergunta e resposta do FAQ
  faqTitle[0].classList.add('active');
  faqTitle[0].nextElementSibling.classList.add('active');

  // Adicionando a funcionalidade de abrir e fechar 
  faqTitle.forEach((element) => {
    element.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('active');
      event.currentTarget.nextElementSibling.classList.toggle('active');
    });
  });



  // Proposta
  // Condicionando campos do formulário
  const checkboxes = document.querySelectorAll('.s-proposta .invoice-form .options .checkbox');
  const inputCheckbox = document.querySelector('.s-proposta .invoice-form .options input#implantation');
  const conditionalInputs = document.querySelector('.s-proposta .invoice-form .conditional-inputs');
  
  // Adicionando event listener para o campo que irá condicionar o formulário
  checkboxes.forEach(element => {
    element.addEventListener('click', (event) => {
      checkboxes.forEach((element) => element.classList.remove('checked'));
      
      event.currentTarget.classList.add('checked');

      inputCheckbox.value = event.currentTarget.innerText;

      if (inputCheckbox.value == 'sim') {
        conditionalInputs.classList.add("hide");
        conditionalInputs.nextElementSibling.firstElementChild.innerText = 'Observações';
        conditionalInputs.nextElementSibling.lastElementChild.placeholder = '';
      } else {
        conditionalInputs.classList.remove("hide");
        conditionalInputs.nextElementSibling.firstElementChild.innerText = 'Descrição dos colaboradores';
        conditionalInputs.nextElementSibling.lastElementChild.placeholder = 'Ex: 03 porteiros, 02 ASG, 01 supervisor, 02 jardineiros';
      }
    });
  });

  // Configurando envio do formulário
  document
    .querySelector('.s-proposta form.invoice-form')
    .addEventListener("submit", (event) => {
      event.preventDefault();

      alert("Submitou formulário de proposta");
    })
  ;



  // Galeria
  // Configurando abrir e fechar da galeria
  const galleryFullScreenContainer = document.querySelector('.gallery-fullscreen');

  const images = document.querySelectorAll(".s-galeria .gallery-image");
  images.forEach(image => {
    image.addEventListener("click", (event) => {
      // Add tab navigation on gallery's slide
      const imageId = Number(event.currentTarget.getAttribute('data-id'));
      slideGalleryTop.slideTo(imageId, false, false);

      galleryFullScreenContainer.classList.add("opened");
      document.querySelector("html").classList.add("open-gallery");
    });
  });

  // Fechar galeria
  document
    .querySelector('.gallery-fullscreen .close-gallery-button')
    .addEventListener("click", () => {
      galleryFullScreenContainer.classList.remove("opened");
      document.querySelector("html").classList.remove("open-gallery");
    })
  ;



  // Newsletter
  // Configurando envio do formulário de newsletter
  document
    .querySelector('footer form.newsletter-form')
    .addEventListener("submit", (event) => {
      event.preventDefault();

      alert("Submitou formulário de newsletter");
    })
  ;



  // Mobile
  // Menu
  const openMenuMobile = document.querySelector('header .menu-mobile-btn');
  const closeMenuMobile = document.querySelector('header .close-menu-mobile-btn');
  const menuMobile = document.querySelector('header .menu-mobile');

  openMenuMobile.addEventListener("click", (event) => {
    event.currentTarget.classList.add("opened");
    menuMobile.classList.add("opened")
  });

  closeMenuMobile.addEventListener("click", (event) => {
    menuMobile.classList.remove("opened");
    openMenuMobile.classList.remove("opened");
  });

  menuMobile.addEventListener("click", (event) => {
    event.currentTarget.classList.remove("opened");
    openMenuMobile.classList.remove("opened");
  });
});
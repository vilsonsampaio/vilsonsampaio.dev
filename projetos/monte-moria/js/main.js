document.addEventListener('DOMContentLoaded', async () => {
  // Animação de loading
  await new Promise(resolve => {
    setTimeout(() => {
      document.querySelector('html').classList.remove('loading');

      return resolve();
    }, 500);
  });
  

  // Notificação de cookies
  setTimeout(() => {
    const isCookiesAccepted = Boolean(localStorage.getItem("acceptedCookies"));
    if (isCookiesAccepted) return;


    const cookiesSection = document.querySelector('.cookies');
    const acceptButton = document.querySelector('.cookies button');

    cookiesSection.classList.remove('hide');

    acceptButton.addEventListener('click', (event) => {
      cookiesSection.classList.add('hide');
      localStorage.setItem("acceptedCookies", "true");
    });
  }, 700);


  // Iniciando biblioteca de animação ao scroll
  AOS.init({
    duration: 1000,
    once: true,
    disable: window.innerWidth <= 990
  });
  

  // Scrool suave
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    const id = $(this).attr('href');
    const targetOffset = $(id).offset().top;

    const headerHeight = ($(window).width() > 1024) ? $('header').height() : $('#menu-mobile').height();
    
    $('html, body').animate({ scrollTop: targetOffset - headerHeight }, 700);
  });

  // Menu mobile

  document
    .querySelector('#menu-mobile .open-menu')
    .addEventListener('click', e => {
      e.currentTarget.parentElement.parentElement.classList.toggle('active');
    })
  ;

  document
    .querySelectorAll('#menu-mobile .menu-links-mobile a')
    .forEach(e => e.addEventListener('click', e => {
      document.querySelector('#menu-mobile').classList.remove('active');
    }))
  ;

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
    thumbs: {
      swiper: slideGalleryThumbs
    }
  });

  // Galeria
  const slideGaleria = new Swiper('.s-galeria .gallery-container', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.s-galeria .next-slide',
      prevEl: '.s-galeria .prev-slide',
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
      }
    }
  });

  // Configurando abrir e fechar da galeria
  const galleryFullScreenContainer = document.querySelector('.gallery-fullscreen');

  const images = document.querySelectorAll('.s-galeria .gallery-container .swiper-slide');
  images.forEach(image => {
    image.addEventListener('click', (event) => {
      // Add tab navigation on gallery's slide
      const imageId = Number(event.currentTarget.getAttribute('data-id'));
      slideGalleryTop.slideTo(imageId, false, false);

      galleryFullScreenContainer.classList.add('opened');
      document.querySelector('html').classList.add('open-gallery');
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

  // Interação com o formulário
  const subjects = document.querySelectorAll('.s-contato form .subjects .subject');
  const inputSubject = document.querySelector('.s-contato form input#subject');

  // Selecionando o primeiro assunto do grupo dos assuntos como o escolhido
  subjects[0].classList.add('active');
  inputSubject.value = subjects[0].innerText;


  // Adicionando a classe active no assunto clicado
  subjects.forEach(subject => {
    subject.addEventListener("click", (event) => {
      subjects.forEach(subject => subject.classList.remove('active'));

      const selectedSubject = event.currentTarget;
      selectedSubject.classList.add('active');
      inputSubject.value = selectedSubject.innerText;
    });
  });
});
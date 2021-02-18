$(document).ready(() => {
  const scrollTop = () => $('html, body').animate({ scrollTop: 0 }, '200');
  const backToTopBtn = $('.scroll-top');
  const menuBtn = $('.menu');

  const backTopListener = () => {
    if ($(window).scrollTop() > 1300) {
      backToTopBtn.addClass('show');
    } else {
      backToTopBtn.removeClass('show');
    }
  };

  // Do header sticky onscroll
  const stickyHeader = () => {
    const scrolled = $(window).scrollTop();

    if (scrolled > 110) {
      $('.header').addClass('header__sticky');
    } else if (scrolled === 0) {
      $('.header').removeClass('header__sticky');
    }
  };

  const defaultCall = () => {
    stickyHeader();
    backTopListener();
  };

  // Carousels
  $('.works-carousel').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ['<img src="res/icons/arrow-left.svg" alt="left button">', '<img src="res/icons/arrow-right.svg" alt="right button">'],
    dots: false,
    autoHeight: false,
    responsive: {
      0: {
        items: 1.3,
      },
    },
  });

  $('.contributor-carousel').owlCarousel({
    loop: true,
    margin: 50,
    nav: true,
    navText: ['<img src="res/icons/arrow-left.svg" alt="arrow left">', '<img src="res/icons/arrow-right.svg" alt="arrow right">'],
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
    },
  });

  // Tabs changer
  $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .closest('section.tabs')
      .find('div.tabs__content')
      .removeClass('active')
      .eq($(this).index())
      .addClass('active');
  });

  // Scroll to top onclick
  backToTopBtn.on('click', scrollTop);
  $('.logo').on('click', scrollTop);

  // Scroll event
  $(window).scroll(() => {
    defaultCall();
  });

  menuBtn.on('click', () => $('.aside-menu').toggleClass('show'));
});

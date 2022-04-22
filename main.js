import './style.css';

/*---------  NAVMENU  ----------*/
const navMenu = document.getElementById('navMenu'),
      navToggle = document.getElementById('navToggle'),
      navToggleIcon = document.getElementById("navToggleIcon"),
      navToggleText = document.querySelector('.menu-text'),
      navLink = document.querySelectorAll('.nav__link'),
      navSocialLink = document.querySelectorAll('.nav__social-link'),
      body = document.getElementById('top');


/*---------  SHOW NAVMENU  ----------*/
const showMenu = () => {
  navMenu.classList.toggle('show');
  navToggleIcon.classList.toggle('min');
  body.classList.toggle('disable-scroll');
  navMenu.classList.remove('delay');
  if(navMenu.classList.contains('show')) {
    navToggleText.setAttribute('data-hover', 'Close');
  } else {
    navToggleText.setAttribute('data-hover', 'Open');
  }
}

navToggle.addEventListener('click', showMenu);


/*---------  CLOSE NAVMENU  ----------*/
const closeMenu = () => {
  navMenu.classList.remove('show');
  navMenu.classList.add('delay');
  navToggleIcon.classList.remove('min');
  body.classList.remove('disable-scroll');
  if(navMenu.classList.contains('show')) {
    navToggleText.setAttribute('data-hover', 'Close');
  } else {
    navToggleText.setAttribute('data-hover', 'Open');
  }
}

navLink.forEach(n => n.addEventListener('click', closeMenu));
navSocialLink.forEach(n => n.addEventListener('click', closeMenu));


/*---------  FADED NAVBRAND  ----------*/
const home = document.getElementById('home'),
      navLogo = document.querySelector('.nav__logo');

const appearNavBrand = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      navLogo.classList.remove('active');
    } else {
      navLogo.classList.add('active');
    }
  })
}

const observerHome = new IntersectionObserver(appearNavBrand, {
  root: null,
  rootMargin: '0px',
  threshold: 0.4
});

observerHome.observe(home);


/*---------  ABOUT CARDS  ----------*/

const about = document.querySelector('.about'),
      aboutBg = document.querySelector('.about__card-bg'),
      aboutCard = document.querySelectorAll('.about__card'),
      aboutCard1 = document.querySelector('.about__card[data-index="0"]'),
      aboutCard2 = document.querySelector('.about__card[data-index="1"]');

window.addEventListener('click', (e) => {
  if(e.target.className !== 'about__card') {
    aboutBg.setAttribute('data-position', 'false');
    aboutCard1.setAttribute('data-active', 'false');
    aboutCard2.setAttribute('data-active', 'false');
  } 
})


aboutCard.forEach(c => c.addEventListener('click', (e) => {

  const cursor = document.querySelector('.cursor');

  (c.getAttribute('data-index') === '0')
    ? aboutBg.setAttribute('data-position', 'left')
    : aboutBg.setAttribute('data-position', 'right')

  if(e.target.getAttribute('data-index') === '0'){
    aboutCard1.setAttribute('data-active', 'true');
    aboutCard2.setAttribute('data-active', 'false');
  }

  if(e.target.getAttribute('data-index') === '1'){
    aboutCard1.setAttribute('data-active', 'false');
    aboutCard2.setAttribute('data-active', 'true');
  }

  if(c.getAttribute('data-active') === 'true'){
    cursor.classList.remove('is-action');
    cursor.classList.add('is-link');
  }

}));





/*---------  REDIRECTION GREET TO CONTACT  ----------*/
const navLinkContact = document.querySelector('.nav__link[href="#greet"]');

navLinkContact.onclick = () => {
  setTimeout(() => {
    location.href='#contact';
  }, 3000)
}


/*---------  TEXT SCROLL HORIZONTAL  ----------*/
const greet = document.getElementById('greet');
const greetText = document.getElementById('greetText');
const greetText2 = document.getElementById('greetText2');

const moveTextHorizontal = () => {
  let posTop = greet.getBoundingClientRect().top + scrollY;
  let pos = Math.trunc(window.scrollY - posTop) + '';

  greetText.style.setProperty('--move', `${-1 * pos - 300}px`)
  greetText2.style.setProperty('--move', `${pos - 300}px`)
}

const textHorizontalScroll = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      window.onscroll = moveTextHorizontal;
      greetText.classList.add('text-animated');
      greetText2.classList.add('text-animated-reverse');
    } else {
      window.onscroll = false;
      greetText.classList.remove('text-animated');
      greetText2.classList.remove('text-animated-reverse');
    }
  })
}

const observerGreet = new IntersectionObserver(textHorizontalScroll, {
  root: null,
  rootMargin: '500px',
  threshold: 0
});

observerGreet.observe(greet);


/*---------  CURSOR CUSTOM  ----------*/
function isTouchDevice() {
  return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

const isTouch = isTouchDevice();

if (!isTouch) {

  const cursor = document.querySelector('.cursor');

  const cursorEvents = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    handleHoverEvents();
  }

  const onMouseMove = (e) => {
    cursor.style.setProperty('--x', e.clientX + 'px');
    cursor.style.setProperty('--y', e.clientY + 'px');
  }

  const onMouseDown = () => {
    cursor.classList.add('is-clicked');
  }

  const onMouseUp = () => {
    cursor.classList.remove('is-clicked');
  }

  const handleHoverEvents = () => {
    document.querySelectorAll('.contact-items__link, .nav__social-link, .nav__toggle, .nav__logo').forEach((el) => {
      el.addEventListener('mouseover', () => cursor.classList.add('is-link'));
      el.addEventListener('mouseout', () => cursor.classList.remove('is-link'));
    });

    document.querySelectorAll('.nav__link').forEach((el) => {
      el.addEventListener('mouseover', () => cursor.classList.add('is-hidden'));
      el.addEventListener('mouseout', () => cursor.classList.remove('is-hidden'));
    });

    document.querySelectorAll('.work-card__figure, .home__scrolldown').forEach((el) => {
      el.addEventListener('mouseover', () => {
        const cursorText = el.getAttribute('data-cursor');
        const cursorPoint = document.querySelector('.cursor__point');

        cursor.classList.add('is-action');
        cursorPoint.setAttribute('data-cursor', cursorText);
      });

      el.addEventListener('mouseout', () => {
        cursor.classList.remove('is-action')
      });
    });

    document.querySelectorAll('.about__card').forEach((el) => {
      el.addEventListener('mouseover', () => {
        const cursorText = el.getAttribute('data-cursor');
        const cursorPoint = document.querySelector('.cursor__point');

        if(el.getAttribute('data-active') === 'false') {
          cursor.classList.add('is-action');
          cursorPoint.setAttribute('data-cursor', cursorText);
        } else{
          cursor.classList.add('is-link');
        }
      });

      el.addEventListener('mouseout', () => {
        cursor.classList.remove('is-action')
        cursor.classList.remove('is-link')
      });
    })

    document.querySelectorAll('.greet').forEach((el) => {
      el.addEventListener('mouseover', () => cursor.classList.add('is-full'));
      el.addEventListener('mouseout', () => cursor.classList.remove('is-full'));
    });

    document.querySelectorAll('.tag').forEach((el) => {
      el.addEventListener('mouseover', () => cursor.classList.add('is-link')); 
      el.addEventListener('mouseout', () => cursor.classList.remove('is-link')); 
    });
  }

  cursorEvents();
}

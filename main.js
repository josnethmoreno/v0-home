import './style.css'

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


/*---------  REDIRECTION GREET TO CONTACT  ----------*/
const navLinkContact = document.querySelector('.nav__link[href="#greet"]');

navLinkContact.onclick = () => {
  setTimeout(() => {
    location.href='#contact';
  }, 2000)
}


/*---------  OPEN CARD  ----------*/
const cards = document.querySelectorAll('.about-card');
const cardBtn = document.querySelectorAll('.about-card__btn');

const openCard = (c) => {

  let cardTarget = c.target.getAttribute('data-target');

  for(let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card.getAttribute('id') === cardTarget) {
      const cursor = document.querySelector('.cursor');
      card.classList.toggle('active');
      if(card.classList.contains('active')){
        card.classList.remove('delay');
        cursor.classList.add('is-link')
        cursor.classList.remove('is-action');
      } else {
        card.classList.add('delay');
        cursor.classList.add('is-action')
        cursor.classList.remove('is-link');
      }
    }
  }
}

cardBtn.forEach(c => c.addEventListener('click', openCard ));


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

if (!isTouch){

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

    document.querySelectorAll('.work-card__img, .home__scrolldown').forEach((el) => {
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

    document.querySelectorAll('.about-card').forEach((el) => {
      el.addEventListener('mouseover', () => {
        const cursorText = el.getAttribute('data-cursor');
        const cursorPoint = document.querySelector('.cursor__point');

        if(el.classList.contains('active')){
          cursor.classList.add('is-link');
        } else {
          cursor.classList.add('is-action');
        }

        cursorPoint.setAttribute('data-cursor', cursorText);
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

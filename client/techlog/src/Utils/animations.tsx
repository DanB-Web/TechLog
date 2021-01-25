import { gsap } from 'gsap';

const modalAnimationIn = () => {
  gsap.from('.backdrop__container', 1, {y:-400});
  gsap.from('.modal__container', 1, {opacity: 0});
}

const listItemAnimation = () => {
  gsap.from('.searchlist__searchitems', 1, {opacity: 0});
}

const formAnimations = () => {
  gsap.from('.form__container', 1, {opacity: 0, y: 200});
}

const modeAnimation = () => {
  gsap.to('.navbar__container', {duration: 0.2, y: -100, opacity: 0});
  gsap.to('.searchitem__container', {duration: 0.2, x: -1000, opacity: 0});
  gsap.to('.searchbar__container', {duration: 0.2, x: 1000, opacity: 0});
  gsap.from('.navbar__container', 2, {y:-100, delay:1, opacity:0, ease: 'bounce'});
  gsap.from('.searchitem__container', 3, {opacity:0, x:-1000, delay: 1, ease: 'back'});
  gsap.from('.searchbar__container', 3, {opacity:0, x:1000, delay: 1, rotate:720, ease: 'back'});
}

const animations =  {
        modalAnimationIn,
        listItemAnimation,
        formAnimations,
        modeAnimation
      };
export default animations;

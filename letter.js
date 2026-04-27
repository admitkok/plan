const body = document.body;
const stage = document.getElementById('envelope-stage');
const openTrigger = document.getElementById('open-trigger');
const replayButton = document.getElementById('replay-button');
const hint = document.getElementById('letter-hint');
const paperScroll = document.querySelector('.paper-scroll');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let isOpen = false;

const focusPaper = () => {
  if (!(paperScroll instanceof HTMLElement)) {
    return;
  }

  try {
    paperScroll.focus({preventScroll: true});
  } catch {
    paperScroll.focus();
  }
};

const openLetter = ({shouldFocus = true} = {}) => {
  if (isOpen) {
    return;
  }

  isOpen = true;
  body.classList.add('is-open');
  stage.classList.add('is-open');
  openTrigger.setAttribute('aria-expanded', 'true');
  hint.textContent = 'Письмо открыто — можно читать и прокручивать текст';

  if (shouldFocus) {
    window.setTimeout(focusPaper, 1250);
  }
};

const closeLetter = () => {
  isOpen = false;
  body.classList.remove('is-open');
  stage.classList.remove('is-open');
  openTrigger.setAttribute('aria-expanded', 'false');
  hint.textContent = 'Нажми на конверт, чтобы открыть письмо';

  if (paperScroll) {
    paperScroll.scrollTop = 0;
  }
};

openTrigger?.addEventListener('click', () => {
  openLetter({shouldFocus: true});
});

replayButton?.addEventListener('click', () => {
  closeLetter();
  window.setTimeout(() => {
    openLetter({shouldFocus: false});
  }, 260);
});

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r' && isOpen) {
    replayButton?.click();
  }
});

if (!prefersReducedMotion) {
  window.setTimeout(() => {
    openLetter({shouldFocus: false});
  }, 520);
}

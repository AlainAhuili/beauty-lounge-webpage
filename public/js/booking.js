// Booking landing page: mobile menu, photo slider and click-to-load map.

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
});

// Photo slider: dots switch photos, and it advances every 5 seconds
const track = document.querySelector('.slider__track');
const dots = [...document.querySelectorAll('.slider__dots button')];
let current = 0;

function show(index) {
  current = (index + dots.length) % dots.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
}

dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => show(current + 1), 5000);
}

// Map: only contact Google after the visitor clicks
document.getElementById('load-map').addEventListener('click', () => {
  const map = document.getElementById('map');
  const iframe = document.createElement('iframe');
  iframe.title = 'Karte: YehMee Beauty Lounge, Brendelweg 155a, 27755 Delmenhorst';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.src = 'https://maps.google.com/maps?q=Brendelweg%20155a%2C%2027755%20Delmenhorst&z=15&output=embed';
  map.replaceChildren(iframe);
  map.classList.add('is-loaded');
});

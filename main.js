'use strict';

let root = document.documentElement;
const burgerBtn = document.querySelector('#nav-burger');
const headerNav = document.querySelector('.nav');
const headerNavItems = document.querySelectorAll('#top-bar .main-nav-item');
const miniLogo = document.querySelector('.logo-mini-link');
const circleText = document.querySelector('.circle .text');

// ----- BURGER BTN ANIMATION HANDLE

burgerBtn.addEventListener('click', (e) => {
	if (e.target !== burgerBtn) return;
	burgerBtn.classList.toggle('open');
	headerNav.classList.toggle('open');
});

// ----- CLOSING NAV MENU AFTER ITEM CHOICE / MINI LOGO CLICK

headerNav.addEventListener('click', (e) => {
	if (e.target.classList.contains('main-nav-item')) {
		burgerBtn.classList.toggle('open');
		headerNav.classList.toggle('open');
	}
	return;
});

miniLogo.addEventListener('click', (e) => {
	if (!e.target.classList.contains('logo-mini-link')) return;
	burgerBtn.classList.remove('open');
	headerNav.classList.remove('open');
});

// ----- TURNING TEXT IN MENU SECTION
circleText.innerHTML = circleText.innerText
	.split('')
	.map(
		(char, i) => `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
	)
	.join('');

// ----- CHANGE IMG POSITION DURING SCROLLING
const handleImgPosition = () => {
	const scroll = window.scrollY;
	const pageHeight = document.body.offsetHeight;
	const viewHeight = window.innerHeight;
	const restScroll = pageHeight - viewHeight;
	const remainScrollValue = (scroll / restScroll) * 100;

	root.style.setProperty('--scrollX-position', remainScrollValue + '%');
};

window.addEventListener('scroll', handleImgPosition);


// ----- LEAFLET MAP
function initializeMap() {
	try {
		const map = L.map('map').setView([50.0849, 19.9718], 15);

		// STYLING MAP
		L.tileLayer(
			'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 19,
				// attribution:
				// 	'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> & <a href="https://carto.com/">CartoDB</a>',
			}
		).addTo(map);

		// CREATING CUSTOM ICON & SETTING POPUP
		const customIcon = L.icon({
			iconUrl: './img/map-pin.svg',
			iconSize: [48, 48],
			iconAnchor: [24, 48],
			popupAnchor: [0, -63],
		});

		// ADD ICON TO MAP
		const marker = L.marker([50.0849, 19.9718], { icon: customIcon }).addTo(
			map
		);
		marker
			.bindPopup(
				'<b>Hello! Tu jesteśmy</b><br>Concrete COFFEE & BAKERY<hr>Codziennie 6 - 17'
			)
			.openPopup();
	} catch (error) {
		console.log(
			'🔴🔴🔴 Wystąpił błąd podczas inicjalizacji mapy: ',
			error,
			' 🔴🔴🔴'
		);
		alert('Nie udało się załadować mapy. Spróbuj ponownie później.');
	}
}

initializeMap();

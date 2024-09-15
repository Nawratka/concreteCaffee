'use strict';

const menuItems = document.querySelectorAll('.menu-item');
const price = document.querySelectorAll('.price');
const circleText = document.querySelector('.circle .text');
let root = document.documentElement;

// DOTS IN MENU ITEM
menuItems.forEach((item, i) => {
	if (i === 0) {
		item.parentElement.innerText =
			item.textContent.padEnd(21, '.') + price[i].textContent;
		return;
	}
	item.parentElement.innerText =
		item.textContent.padEnd(20, '.') + price[i].textContent;
});

// TURNING TEXT IN MENU SECTION
circleText.innerHTML = circleText.innerText
	.split('')
	.map(
		(char, i) => `<span style="transform:rotate(${i * 12}deg)">${char}</span>`
	)
	.join('');

// CHANGE IMG POSITION DURING SCROLLING
const handleImgPosition = () => {
	const scroll = window.scrollY;
	const pageHeight = document.body.offsetHeight;
	const viewHeight = window.innerHeight;
	const restScroll = pageHeight - viewHeight;
	const remainScrollValue = (scroll / restScroll) * 100;

	root.style.setProperty('--scrollX-position', remainScrollValue + '%');
};

window.addEventListener('scroll', handleImgPosition);

// LEAFLET MAP
const map = L.map('map').setView([50.0849, 19.9718], 15);

// STYLING MAP
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	maxZoom: 19,
	attribution:
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> & <a href="https://carto.com/">CartoDB</a>',
}).addTo(map);

// CREATING CUSTOM ICON & SETTING POPUP
const customIcon = L.icon({
	iconUrl: './img/map-pin.svg',
	iconSize: [48, 48],
	iconAnchor: [24, 48],
	popupAnchor: [0, -63],
});

// ADD ICON TO MAP
const marker = L.marker([50.0849, 19.9718], { icon: customIcon }).addTo(map);
marker
	.bindPopup(
		'<b>Hello! Tu jesteśmy</b><br>Concrete CAFFE & BAKERY<hr>ul.Majowa 5, Kraków<br>tel. 888 999 777<br>Codziennie 6 - 17'
	)
	.openPopup();

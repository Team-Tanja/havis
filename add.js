// Kartan alustaminen
let map = L.map('map').setView([60.192059, 24.945831], 7); //Suomi keskellä
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker;

// Lisää marker kartalle, kun käyttäjä klikkaa
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);
});

// Viestielementit
const paikkaVirhe = document.getElementById('paikka-virhe');
const successViesti = document.getElementById('success-viesti');

// Lomakkeen lähetys 
document.getElementById('havainto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const bird = document.getElementById('lintulaji').value;
    const date = document.getElementById('paivamaara').value;

    paikkaVirhe.style.display = 'none';
    successViesti.style.display = 'none';

    if (!marker) {
        paikkaVirhe.textContent = 'Valitse havaintopaikka kartalta!';
        paikkaVirhe.style.display = 'block'
        return;
    }

    const spot = marker.getLatLng();

    // Havainto-objekti
    const havainto = { bird, date, spot };

    // Hae vanhat havainnot localStoragesta
    let havainnot = JSON.parse(localStorage.getItem('havainnot')) || [];
    havainnot.push(havainto);

    // Tallenna takaisin
    localStorage.setItem('havainnot', JSON.stringify(havainnot));

    successViesti.textContent = 'Havainto tallennettu!';
    successViesti.className = 'text-success mt-2';
    successViesti.style.display = 'block';

    this.reset(); // tyhjennä lomake
    if (marker) map.removeLayer(marker);
});
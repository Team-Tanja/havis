// Haetaan havainnot localStoragesta
let havainnot = JSON.parse(localStorage.getItem('havainnot')) || [];

//Lasketaan havainnot vuosittain
let tilastot = {};

havainnot.forEach(h => {
    let year = new Date(h.date).getFullYear(); // Otetaan vuosi päivämäärästä
    if (!tilastot[year]) {
        tilastot[year] = 0;
    }
    tilastot[year]++;
});

// Järjestetään vuodet (uusin ensin)
let vuodet = Object.keys(tilastot).sort((a, b) => b - a);

// Renderöidään lista
const lista = document.getElementById('tilasto-lista');
vuodet.forEach(year => {
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = year;

    let badge = document.createElement('span');
    badge.className = 'badge bg-primary rounded-pill';
    badge.textContent = tilastot[year] + ' havaintoa';

    li.appendChild(badge);
    lista.appendChild(li)
});
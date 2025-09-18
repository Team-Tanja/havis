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
const vahvistusTeksti = document.getElementById('vahvistusTeksti');
const vahvistaTallennus = document.getElementById('vahvistaTallennus');

// Bootstrap modal -olio
let vahvistusModal = new bootstrap.Modal(document.getElementById('vahvistusModal'));

// Tähän tallennetaan havainto ennen vahvistusta
let pendingHavainto = null;

// Lomakkeen lähetys 
document.getElementById('havainto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const bird = document.getElementById('lintulaji').value;
    const placeName = document.getElementById('paikannimi').value;
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
    pendingHavainto = { bird, placeName, date, spot };

    // Muutetaan päivämäärä pp.kk.vvvv-muotoon
    const parts = date.split('-');
    const finnishDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

    // Päivitetään modalin sisältö
    vahvistusTeksti.innerHTML = `
        <strong>Laji:</strong> ${bird}<br>
        <strong>Paikka:</strong> ${placeName}<br>
        <strong>Päivämäärä:</strong> ${finnishDate}<br>`;

    // Näytetään modal
    vahvistusModal.show();
});

    // Kun käyttäjä vahvistaa tallennuksen
    vahvistaTallennus.addEventListener('click', () => {
        if (!pendingHavainto) return;
    
        // Hae vanhat havainnot localStoragesta
        let havainnot = JSON.parse(localStorage.getItem('havainnot')) || [];
        havainnot.push(pendingHavainto);

        // Tallenna takaisin
        localStorage.setItem('havainnot', JSON.stringify(havainnot));

        successViesti.textContent = 'Havainto tallennettu!';
        successViesti.className = 'text-success mt-2';
        successViesti.style.display = 'block';

        // Piilota modal
        vahvistusModal.hide();

        // Nollataan lomake
        document.getElementById('havainto-form').reset();
        if (marker) map.removeLayer(marker);

        // Tyhjennetään pendingHavainto
        pendingHavainto = null;
});
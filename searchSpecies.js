// Hae lintua -toiminto

// Globaalit muuttujat
let map; // Leaflet-kartta
let markers = []; // Tallennetaan markerit, jotta ne voidaan poistaa myöhemmin

// Alustetaan hakukomponentti
function searchInit() {
  console.log("searchSpecies.js ladattu");
  // Kartta alustetaan heti
  searchInitMap();
}

// Haetaan havainnot localStoragesta
function getStoredObservations() {
  return JSON.parse(localStorage.getItem("havainnot")) || [];
}

// Suodatetaan havainnot hakusanan perusteella
function searchFilterData(data, hakusana) {
  return data.filter(havainto =>
    havainto.laji.toLowerCase().includes(hakusana.toLowerCase())
  );
}

// Näytetään hakutulokset listana
function searchRenderList(havainnot) {
  const listaelementti = document.getElementById("hakutulokset");
  listaelementti.innerHTML = "";

  havainnot.forEach(havainto => {
    const item = document.createElement("li");
    item.textContent = `${havainto.laji} – ${havainto.paikka} (${havainto.pvm})`;
    listaelementti.appendChild(item);
  });
}

// Alustetaan kartta (vain kerran)
function searchInitMap() {
  map = L.map("kartta").setView([60.192059, 24.945831], 6); // Helsinki

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);
}

// Päivitetään markerit kartalle
function searchUpdateMapMarkers(havainnot) {
  // Poistetaan vanhat markerit
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  // Lisätään uudet markerit
  havainnot.forEach(havainto => {
    const marker = L.marker([havainto.lat, havainto.lng])
      .addTo(map)
      .bindPopup(`${havainto.laji} – ${havainto.paikka}`);
    markers.push(marker);
  });

  // Zoomataan kaikkiin markereihin
  if (markers.length > 0) {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds());
  }
}

// DOM (html rakenne)-valmiina: kytketään hakunappi
document.addEventListener("DOMContentLoaded", () => {
  searchInit();

  const hakunappi = document.getElementById("hakunappi");
  hakunappi.addEventListener("click", () => {
    const hakusana = document.getElementById("hakukentta").value.trim();
    const data = getStoredObservations();

    if (data.length === 0) {
      alert("Ei havaintoja tallennettuna!");
      return;
    }

    const tulokset = searchFilterData(data, hakusana);

    if (tulokset.length === 0) {
      alert("Ei hakutuloksia tälle lajille.");
      return;
    }

    searchRenderList(tulokset);
    searchUpdateMapMarkers(tulokset);
  });
});

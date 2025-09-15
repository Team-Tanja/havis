// Hae lintua -toiminto
(function() {

  // Päivämäärä suomalaisittain
  function formatDateFi(dateStr, leadingZeros = false) {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('fi-FI', leadingZeros
      ? { day: '2-digit', month: '2-digit', year: 'numeric' }
      : undefined
    );
  }

  // Kartta ja markerit vain tämän tiedoston sisällä
  let speciesMap; 
  let speciesMarkers = []; 

  // Alustetaan hakutoiminto ja kartta
  function searchInit() {
    console.log("searchSpecies.js ladattu");
    initMap();
  }

  // Haetaan havainnot localStoragesta
  function getStoredObservations() {
    return JSON.parse(localStorage.getItem("havainnot")) || [];
  }

  // Suodatetaan havainnot hakusanan perusteella
  function filterObservations(data, hakusana) {
    return data.filter(havainto =>
      havainto.bird.toLowerCase().includes(hakusana.toLowerCase())
    );
  }

  // Näytetään hakutulokset listana
  function renderObservationList(havainnot) {
    const listElement = document.getElementById("hakutulokset");
    listElement.innerHTML = "";

    if (havainnot.length === 0) {
      const noResultsItem = document.createElement("li");
      noResultsItem.textContent = "Ei hakutuloksia tälle lajille.";
      noResultsItem.classList.add("list-group-item", "text-danger", "fw-bold");
      listElement.appendChild(noResultsItem);
      return;
    }

    havainnot.forEach(havainto => {
      const item = document.createElement("li");
      item.textContent = `${havainto.bird} – ${havainto.placeName}, (${formatDateFi(havainto.date, true)})`;
      item.classList.add("list-group-item");
      listElement.appendChild(item);
    });
  }

  // Alustetaan Leaflet-kartta
  function initMap() {

    // Luodaan uusi Leaflet-kartta ja kiinnitetään se HTML-elementtiin, jonka id on "kartta".
    // setView([lat, lng], zoom) määrittää aloitusnäkymän koordinaatit ja zoom-tason.
    // Tässä käytetään Helsingin koordinaatteja ja zoom-tasoa 6 (näkyy koko Suomi).
    speciesMap = L.map("kartta").setView([60.192059, 24.945831], 6);

    // Lisätään karttalaatat (map tiles) OpenStreetMap-palvelusta.
    // {s} = palvelimen alidomain (a, b, c), {z} = zoom-taso, {x} ja {y} = laattarivin ja -sarakkeen koordinaatit.
    // Tämä URL on Leafletin oletusesimerkki OSM:n käyttöön.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    
      // Attribution on tekijänoikeus- ja lähdemerkintä, joka näytetään kartan kulmassa.
      // OpenStreetMap vaatii tämän, kun sen karttalaattoja käytetään.
      attribution: "© OpenStreetMap"

    // .addTo(speciesMap) lisää tämän laattakerroksen juuri luotuun karttaobjektiin.
    }).addTo(speciesMap);
  }

  // Päivitetään markerit kartalle
  function updateMapMarkers(havainnot) {

    // Poistetaan kaikki vanhat markerit kartalta
    // Käydään läpi speciesMarkers-taulukko ja poistetaan jokainen marker kartasta
    speciesMarkers.forEach(marker => speciesMap.removeLayer(marker));

    // Tyhjennetään taulukko, jotta siihen voidaan lisätä uudet markerit
    speciesMarkers = [];

    // Lisätään uudet markerit jokaisesta havainnosta
    havainnot.forEach(havainto => {

      // Luodaan uusi marker havainnon koordinaateilla (lat, lng)
      const marker = L.marker([havainto.spot.lat, havainto.spot.lng])

        // Lisätään marker kartalle
        .addTo(speciesMap)

        // Liitetään markerin popup-ikkunaan teksti, jossa laji, paikan nimi ja päivämäärä
        .bindPopup(`${havainto.bird} – ${havainto.placeName} – ${formatDateFi(havainto.date, true)}`);

      // Tallennetaan marker taulukkoon, jotta se voidaan myöhemmin poistaa tai käsitellä
      speciesMarkers.push(marker);
    });

    // Jos markereita on lisätty, zoomataan niin että kaikki näkyvät kartalla
    if (speciesMarkers.length > 0) {

      // Luodaan Leafletin featureGroup kaikista markereista
      const group = new L.featureGroup(speciesMarkers);

      // Sovitetaan kartan näkymä niin, että kaikki markerit mahtuvat näkyviin
      speciesMap.fitBounds(group.getBounds());
    }
  }

  // Kun DOM on valmis
  document.addEventListener("DOMContentLoaded", () => {
    searchInit();

    const hakunappi = document.getElementById("hakunappi");
    hakunappi.addEventListener("click", () => {
      const hakusana = document.getElementById("hakukentta").value.trim();
      const data = getStoredObservations();

      if (data.length === 0) {
        renderObservationList([]); // Näyttää "Ei hakutuloksia"
        return;
      }

      const tulokset = filterObservations(data, hakusana);
      renderObservationList(tulokset);
      updateMapMarkers(tulokset);
    });
  });

})();

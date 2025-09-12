// Havainnot vuosittain
(function() {

  let yearlyMap;           // Leaflet-kartta
  let yearlyMarkers = [];  // Lista kartalla näkyvistä markkereista

  // Alustetaan kartta
  function initYearlyMap() {
    yearlyMap = L.map("vuosikartta").setView([60.192059, 24.945831], 6); // Helsinki
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(yearlyMap);

    // Varmistetaan, että koko lasketaan oikein
    setTimeout(() => yearlyMap.invalidateSize(), 0);
  }

  // Haetaan havainnot localStoragesta
  function getStoredObservations() {
    return JSON.parse(localStorage.getItem("havainnot")) || [];
  }

  // Päivitetään markerit kartalle annetun vuoden perusteella
  function updateYearlyMarkers(year) {
    const infoDiv = document.getElementById("vuosiInfo");
    infoDiv.textContent = ""; // Tyhjennetään virheviesti

    // Poistetaan vanhat markerit
    yearlyMarkers.forEach(marker => yearlyMap.removeLayer(marker));
    yearlyMarkers = [];

    // Suodatetaan havainnot vuoden mukaan
    const data = getStoredObservations().filter(h =>
      new Date(h.date).getFullYear() === year
    );

    if (data.length === 0) {
      // Ei havaintoja → näytetään virheviesti punaisella
      infoDiv.textContent = "Ei havaintoja syötetyllä vuodella.";
      infoDiv.classList.remove("text-success");
      infoDiv.classList.add("text-danger");
      return;
    }

    // On havaintoja → näytetään määrä vihreällä
    infoDiv.textContent = `${data.length} havaintoa vuonna ${year}.`;
    infoDiv.classList.remove("text-danger");
    infoDiv.classList.add("text-success");

    // Lisätään markerit kartalle
    data.forEach(havainto => {
      const marker = L.marker([havainto.spot.lat, havainto.spot.lng])
        .addTo(yearlyMap)
        .bindPopup(`${havainto.bird} – ${havainto.placeName} – ${havainto.date}`);
      yearlyMarkers.push(marker);
    });

    // Zoomataan kaikkiin markkereihin
    if (yearlyMarkers.length > 0) {
      const group = new L.featureGroup(yearlyMarkers);
      yearlyMap.fitBounds(group.getBounds());
    }
  }

  // Kun DOM on valmis
  document.addEventListener("DOMContentLoaded", () => {
    initYearlyMap();

    const haeBtn = document.getElementById("haeVuosiBtn");
    haeBtn.addEventListener("click", () => {
      const year = parseInt(document.getElementById("vuosiInput").value, 10);
      if (!year) {
        document.getElementById("vuosiVirhe").textContent = "Anna kelvollinen vuosi.";
        return;
      }
      updateYearlyMarkers(year);
    });
  });

})();


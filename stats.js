document.addEventListener('DOMContentLoaded', function () {
    const naytaBtn = document.getElementById('naytaLajit');
    const tuloksetDiv = document.getElementById('tulokset');
    const lajimaara = document.getElementById('lajimaara');
    const lajilista = document.getElementById('lajilista');
    const vuosiVirhe = document.getElementById('vuosi-virhe');

    naytaBtn.addEventListener('click', () => {
        const vuosi = document.getElementById('vuosi').value;
        if (!vuosi) {
            vuosiVirhe.textContent = 'Anna vuosi!';
            vuosiVirhe.style.display = 'block';
            return;
        }

        // Haetaan havainnot localStoragesta
        let havainnot = JSON.parse(localStorage.getItem('havainnot')) || [];

        // Suodata valitun vuoden mukaan
        let vuodenHavainnot = havainnot.filter(h => {
            return h.date && h.date.startsWith(vuosi);
        });

        if (vuodenHavainnot.length === 0) {
            tuloksetDiv.style.display = 'block';
            lajimaara.textContent = `Vuodelle ${vuosi} ei löytynyt havaintoja.`;
            lajilista.innerHTML = '';
            return;
        }

        // Kerää uniikit lajit
        let lajit = [...new Set(vuodenHavainnot.map(h => h.bird.trim()))];
        lajit.sort((a, b) => a.localeCompare(b, 'fi')); //aakkosjärjestys

        // Päivitä näkymä
        tuloksetDiv.style.display ='block';
        lajimaara.textContent = `Vuonna ${vuosi} havaittiin ${lajit.length} lajia:`;

        lajilista.innerHTML = '';
        lajit.forEach(laji => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = laji;
            lajilista.appendChild(li);
        });
    });
});
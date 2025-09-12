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
            vuosiVirhe.style.display = 'block'
            return;
        }

        // Haetaan havainnot localStoragesta
        const havainnot = JSON.parse(localStorage.getItem('havainnot')) || [];

        // Suodata valitun vuoden havainnot
        let vuodenHavainnot = havainnot.filter(h => {
            const hDate = new Date(h.date);
            return hDate.getFullYear() === parseInt(vuosi);
        });

        if (vuodenHavainnot.length === 0) {
            tuloksetDiv.style.display = 'block';
            lajimaara.textContent = `Vuodelle ${vuosi} ei löytynyt havaintoja.`;
            lajilista.innerHTML = '';
            return;
        }

        // Järjestetään päivämäärän mukaan nousevasti
        vuodenHavainnot.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Muodostetaan lista päivämäärä + lintulaji
        lajilista.innerHTML = '';
        vuodenHavainnot.forEach(h => {
            const d = new Date(h.date);
            const paiva = String(d.getDate()).padStart(2,"0");
            const kk = String(d.getMonth() + 1).padStart(2, "0");
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${paiva}.${kk}. ${h.bird}`;
            lajilista.appendChild(li);
        });

        tuloksetDiv.style.display = 'block';
        lajimaara.textContent = `Vuonna ${vuosi} havaintoja yhteensä ${vuodenHavainnot.length}:`;
    });
});
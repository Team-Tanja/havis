# Käyttötapauskuvaukset – Lintuhavainnot App

## Käyttötapaus: Lisää havainto
 
**Laukaisija:** Käyttäjä valitsee valikosta "Lisää havainto"  
**Esiehto:**   
- Sovellus on käynnissä ja kartta ladattu  

**Jälkiehto:**  
- Uusi lintuhavainto on tallennettu järjestelmään  

**Käyttötapauksen kulku:**  
1. Käyttäjä valitsee valikosta "Lisää havainto"  
2. Sovellus avaa havaintolomakkeen  
3. Käyttäjä syöttää:
   - Lintulajin nimi
   - Havainnointipaikka: valinta kartalta ja kirjoitus kenttään
   - Havainnointipäivämäärä  
4. Käyttäjä vahvistaa ja tallentaa havainnon  
5. Sovellus lisää havainnon tietokantaan  

**Poikkeuksellinen toiminta:**  
- Käyttäjä ei täytä kaikkia pakollisia kenttiä → sovellus näyttää virheilmoituksen

---

## Käyttötapaus: Hae lajia

**Laukaisija:** Käyttäjä valitsee valikosta "Hae lajia"  
**Esiehto:**    
- Sovellus on käynnissä, tietokanta käytettävissä ja kartta ladattu 

**Jälkiehto:**  
- Käyttäjä näkee valitun lintulajin tiedot ja havainnot kartalla  

**Käyttötapauksen kulku:**  
1. Käyttäjä valitsee valikosta "Hae lajia"  
2. Sovellus avaa hakunäkymän ja kartan
3. Käyttäjä syöttää lintulajin nimen hakukenttään  
4. Sovellus hakee kaikki kyseisen lajin havainnot tietokannasta tai ilmoittaa jos syötetylle lajille ei ole havaintoja
5. Sovellus näyttää:
   - Tuloket listana, jossa näkyy lajin nimi, paikkakunta ja havaintopäivämäärä 
   - Havainnointipaikat kartalla ja markkeria klikatessa samat tiedot kuin listassa

**Poikkeuksellinen toiminta:**  
- Hakutuloksia ei löydy → sovellus ilmoittaa, ettei lajista ole havaintoja  

---

## Käyttötapaus: Havainnot vuosittain

**Laukaisija:**  
Käyttäjä valitsee valikosta "Havainnot vuosittain"

**Esiehto:**  
- Sovellus on käynnissä, tietokanta käytettävissä ja kartta ladattu

**Jälkiehto:**  
- Käyttäjä näkee kaikki syötetyn vuoden lintuhavainnot kartalla

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee valikosta "Havainnot vuosittain"
2. Sovellus avaa hakunäkymän ja kartan
3. Sovellus hakee kaikki havainnot syötetyllä vuodella tai ilmoittaa jos syötetyllä vuodella ei ole havaintoja
4. Sovellus näyttää:
   - Vuoden syöttökenttä ja kartta
   - Kaikki syötetyn vuoden havainnot kartalla ja markkeria klikatessa havainnon tiedot

**Poikkeuksellinen toiminta:**
- Jos havaintoja ei ole → sovellus näyttää viestin "Ei havaintoja syötetyllä vuodella"

---

## Käyttötapaus: Tilastot

**Laukaisija:**  
Käyttäjä valitsee valikosta "Tilastot"

**Esiehto:**    
- Sovellus on käynnissä ja tietokanta käytettävissä

**Jälkiehto:**  
- Käyttäjä näkee valitun vuoden lintuhavaintojen määrän ja lajilistan

**Käyttötapauksen kulku:**
1. Käyttäjä valitsee valikosta "Tilastot"
2. Sovellus avaa tilastonäkymän
3. Käyttäjä syöttää vuoden
4. Sovellus hakee syötetyn vuoden havainnot tai lmoittaa jos syötetyllä vuodella ei ole havaintoja
4. Sovellus näyttää kaikki kyseisen vuoden havainnot päivämäärällä ja lajin nimellä listana päiväysjärjestyksessä

**Poikkeuksellinen toiminta:**
- Jos valitulle vuodelle ei ole havaintoja → sovellus näyttää viestin "Ei havaintoja syötetyllä vuodella"

---

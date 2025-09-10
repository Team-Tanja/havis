# Käyttötapauskuvaukset – Lintuhavainnot App

## Käyttötapaus: Lisää havainto
 
**Laukaisija:** Käyttäjä valitsee valikosta "Lisää havainto"  
**Esiehto:**   
- Sovellus on käynnissä ja kartta ladattu  

**Jälkiehto:**  
- Uusi lintuhavainto on tallennettu järjestelmään ja näkyy kartalla  

**Käyttötapauksen kulku:**  
1. Käyttäjä valitsee päävalikosta "Lisää havainto"  
2. Sovellus avaa havaintolomakkeen  
3. Käyttäjä syöttää:
   - Lintulajin nimi
   - Havainnointipaikka (esim. kartalta valiten tai tekstinä)
   - Havainnointipäivämäärä  
4. Käyttäjä tallentaa havainnon  
5. Sovellus lisää havainnon tietokantaan ja päivittää karttanäkymän  

**Poikkeuksellinen toiminta:**  
- Käyttäjä ei täytä kaikkia pakollisia kenttiä → sovellus näyttää virheilmoituksen  
- Paikkatietoa ei saada → käyttäjää pyydetään syöttämään paikka manuaalisesti osoitteella 

---

## Käyttötapaus: Hae lajia

**Laukaisija:** Käyttäjä valitsee valikosta "Hae lajia"  
**Esiehto:**  
- Sovelluksessa tallennettu vähintään yksi havainto  
- Sovellus on käynnissä ja tietokanta käytettävissä  

**Jälkiehto:**  
- Käyttäjä näkee valitun lintulajin tiedot ja havainnot kartalla  

**Käyttötapauksen kulku:**  
1. Käyttäjä valitsee päävalikosta "Hae lajia"  
2. Sovellus avaa hakunäkymän  
3. Käyttäjä syöttää lintulajin nimen hakukenttään  
4. Sovellus hakee kaikki kyseisen lajin havainnot tietokannasta  
5. Sovellus näyttää:
   - Lajin nimen
   - Kaikki tallennetut havaintopäivät
   - Havainnointipaikat kartalla  

**Poikkeuksellinen toiminta:**  
- Hakutuloksia ei löydy → sovellus ilmoittaa, ettei lajista ole havaintoja  

---
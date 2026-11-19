# ConnecTag – Produkt-Website

**brings your tag a level up**

Schlichte, statische Website für ConnecTag. Reines HTML und CSS, ein kleines Skript für Menü und Kontaktformular.
Keine Cookies, keine Tracker, keine externen Ressourcen – auch die Schrift (Inter) liegt im Repository.

> Die App selbst liegt in einem eigenen Repository (`JS-3000/Tagnera`, `https://js-3000.github.io/Tagnera/`).
> Dieses Repository verändert die App nicht – die gedruckten QR-Codes zeigen weiter dorthin.

## Aufbau

```
site/                 alles, was veröffentlicht wird
  index.html          Startseite (Funktionen, Einblick, So funktioniert es, Preise, Kontakt)
  impressum.html      Impressum            – ENTWURF, vor Veröffentlichung prüfen!
  datenschutz.html    Datenschutzerklärung – ENTWURF, vor Veröffentlichung prüfen!
  404.html            Fehlerseite
  assets/style.css    Gestaltung (Farben wie die App: #1F2A36, #F28C28)
  assets/site.js      Handy-Menü und Kontaktformular (mailto)
  assets/fonts/       Inter, lokal (Open Font License, siehe LICENSE-Inter.txt)
  assets/img/         Logo-Bildmarke hell/dunkel (aus der App)
  assets/screens/     Screenshots aus der Demo-App
scripts/check.mjs     Prüfung auf seitlichen Überlauf bei 375 / 768 / 1440 px, legt Screenshots ab
scripts/serve.mjs     kleiner lokaler Server
docs/screenshots/     Ergebnis der letzten Prüfung
.github/workflows/    Veröffentlichung auf GitHub Pages
```

## Lokal ansehen und prüfen

Voraussetzung: Node.js ab Version 20.

```bash
npm install
```

```bash
npx playwright install chromium
```

```bash
npm run serve
```

Dann <http://localhost:8080> öffnen. Die Prüfung aller Seiten bei 375, 768 und 1440 px:

```bash
npm run check
```

Die Screenshots landen in `docs/screenshots/`.

## Veröffentlichen auf GitHub Pages (Schritt für Schritt)

1. **Texte prüfen:** Impressum und Datenschutzerklärung sind Entwürfe. Gelb markierte Platzhalter ausfüllen, den
   orangefarbenen Entwurfs-Hinweis oben auf beiden Seiten entfernen, am besten rechtlich prüfen lassen.
2. Auf GitHub das Repository öffnen → **Settings** → **Pages**.
3. Unter **Build and deployment → Source** den Eintrag **GitHub Actions** wählen.
4. Unter **Actions** den Workflow „Website veröffentlichen“ öffnen → **Run workflow** (oder einfach etwas auf `main`
   pushen). Nach ca. einer Minute erscheint ein grüner Haken.
5. Die Website ist erreichbar unter **`https://js-3000.github.io/connectag-website/`**.

Jede Änderung auf `main` wird danach automatisch veröffentlicht.

## Eigene Domain verbinden (später)

Beispiel `connectag.de` mit `www.connectag.de`:

1. **Domain bestätigen (Schutz vor Übernahme):** GitHub → Profilbild → **Settings → Pages → Add a domain**.
   GitHub nennt einen TXT-Eintrag; diesen beim Domain-Anbieter anlegen und auf **Verify** klicken.
2. **DNS-Einträge beim Domain-Anbieter anlegen:**
   - `www` → **CNAME** → `js-3000.github.io`
   - Hauptdomain (`@`) → **A**-Einträge `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - optional **AAAA** `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   (Aktuelle Werte stehen in der GitHub-Hilfe „Managing a custom domain for your GitHub Pages site“.)
3. Im Repository → **Settings → Pages → Custom domain** `www.connectag.de` eintragen → **Save**.
4. Warten, bis die DNS-Prüfung grün ist (Minuten bis einige Stunden), dann **Enforce HTTPS** aktivieren.
5. Eine `CNAME`-Datei ist bei Veröffentlichung per GitHub Actions **nicht nötig** – die Domain wird in den
   Einstellungen gespeichert. `CNAME.example` dient nur als Merkzettel. Falls du später ohne Actions veröffentlichst,
   die Datei als `site/CNAME` mit nur der Domain darin anlegen.

Alle Links der Website sind relativ – sie funktionieren unter der GitHub-Adresse und unter der eigenen Domain.
Die App-Adresse für die QR-Codes bleibt davon unberührt.

## Kontaktformular

GitHub Pages kann keine Formulare empfangen. Das Formular öffnet deshalb das E-Mail-Programm des Besuchers mit einer
vorbereiteten Nachricht (`mailto:`) – es werden keine Daten an Dritte übertragen. Die Adresse steht zusätzlich als
Link daneben, falls kein E-Mail-Programm eingerichtet ist.

**Adresse ändern:** in `site/assets/site.js` (`CONTACT_EMAIL`) sowie in `site/index.html`, `site/impressum.html`
und `site/datenschutz.html` (Suchen & Ersetzen nach `JSimon.og+connectag@gmail.com`).

**Später ein echtes Formular:** z. B. ein Formular-Dienst mit Sitz in der EU (Tally, Belgien; Formbricks,
Deutschland – Speicherort und Auftragsverarbeitungsvertrag vor der Wahl prüfen) oder ein eigener Endpunkt auf dem
späteren ConnecTag-Server in Deutschland. Dann in `site.js` statt `mailto:` per `fetch` an die neue Adresse senden und
den Abschnitt in der Datenschutzerklärung anpassen.

## Englisch (vorbereitet)

Für eine englische Fassung den Ordner `site/en/` mit Kopien der Seiten anlegen (`lang="en"`, Pfade zu `assets/`
mit `../` beginnen) und im Kopf beider Sprachen einen Link „DE | EN“ ergänzen.

## Screenshots aktualisieren

Die Bilder in `site/assets/screens/` stammen aus der Demo-App („Demoanlage ConnecTag“). Neue Screenshots einfach
mit gleichem Dateinamen ersetzen (Handy: 1170 × 2532 px, PC: 2880 × 1800 px).

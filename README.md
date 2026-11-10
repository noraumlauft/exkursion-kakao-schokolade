# Kakao-Abenteuer – virtuelle Exkursion auf eine Kakaoplantage

360°-Rundgang mit Ama über eine Kakaoplantage in Ghana und anschließendes Lernspiel
(Bestäuben, Ernten, Öffnen, Gären, Trocknen, Abpacken, Fahrt zum Hafen).

- Originalpanorama, KI-Vergleichsversion und Spiel sind in `index.html` eingebettet. Unter `assets/` liegen die Bilddateien zusätzlich separat.
- Läuft im Browser auf iPad, Tablet, Handy und Computer.
- Auf iPad/Handy funktioniert das Umschauen per Bewegungssensor nur über eine https-Adresse (z. B. GitHub Pages).
- Lehrermodus: 10× schnell oben links tippen (im Spiel auf „☰ Kakao-Expedition“, im 360°-Rundgang auf den Titel).

## Plantage mit Hof: KI-Vergleichsversion

Alle Versionen des verworfenen zweiten Motivs wurden entfernt, einschließlich
16K-Export, klassischer Schärfung und Verarbeitungsskript.

Die Auswahl unten rechts wechselt zwischen Original (4096 × 2048 Pixel) und
KI-Detailrekonstruktion (1774 × 887 Pixel). Das Original bleibt die Startansicht.
Die KI-Version wurde mit dem integrierten image_gen-Werkzeug aus dem Original
bearbeitet, ohne nachträgliche Skalierung oder klassische Schärfefilter.
Sie verändert Details und einzelne Formen; sie ist weder ein verifiziertes Foto
noch ein echter hochauflösender Ersatz. Absolute Pol-/Nahtfreiheit und exakte
Übereinstimmung aller Lernmarkierungen sind nicht bestätigt.

Dateien: `assets/plantage-mit-hof-original.webp`,
`assets/plantage-mit-hof-ki.webp`, vollständiger Bearbeitungsprompt in
`assets/plantage-mit-hof-ki-prompt.txt`.

Geprüft: eingebettete Bilddaten und JavaScript-Syntax. Browserprüfung steht aus.

## Überarbeitung mit dem abgestimmten Prompt

Die KI-Auswahl verwendet nun `assets/plantage-mit-hof-ki-v2.webp`.
Der vollständig und unverändert eingesetzte deutsche Prompt steht in
`assets/plantage-mit-hof-ki-v2-prompt.txt`. Werkzeug: integriertes image_gen,
Bearbeitung des Originalpanoramas, keine nachträgliche Skalierung oder Schärfung.
Gelieferte native Auflösung: 1774 × 887 Pixel. Das Original bleibt als Vergleich und Startansicht erhalten.

## Aktuelle Startansicht: realistischere Kakaobäume

Die aktuelle KI-Auswahl und Startansicht verwendet `assets/plantage-mit-hof-botanik.webp`
(1774 × 887 Pixel), mit dem integrierten image_gen-Werkzeug aus dem Original erzeugt.
Der vollständige Prompt liegt in `assets/plantage-mit-hof-botanik-prompt.txt`.
Kakaobäume wurden stärker verzweigt, die Fruchtzahl reduziert und Früchte an Stämme
und stärkere Holzäste verlegt. Boden und Hauslehm wurden dezent wärmer rotbraun.
Das Original ist weiterhin auswählbar; frühere Hof-KI-Dateien sind separat erhalten.
Blüten- und Fruchtmarkierung wurden an das neue Motiv angepasst. Keine klassische
Skalierung oder Nachschärfung. Vollständige botanische Fehlerfreiheit und nahtlose
Pole sind nicht bestätigt. Browserprüfung steht aus.

## Aktuelle Korrektur: schlankere Kakaobäume

Die KI-Startansicht verwendet jetzt `assets/plantage-mit-hof-schlank.webp`.
Mit image_gen wurden übermäßig dicke Kakaostämme und Hauptäste gezielt verschlankt;
Verzweigungen, Früchte an altem Holz sowie die warmen Erdtöne wurden weitgehend
beibehalten. Native Ausgabe: 1774 × 887 Pixel. Keine klassische Skalierung.
Vollständiger Prompt: `assets/plantage-mit-hof-schlank-prompt.txt`.
Vorherige Dateien bleiben als Arbeitsstände erhalten. Einbettung und JavaScript-
Syntax geprüft; Browserprüfung steht aus.

Aktueller Stand: Das unveränderte Original ist wieder die Startansicht. Die KI-Version mit schlankeren Bäumen bleibt ausschließlich zum Vergleich auswählbar.

## Station 2: fotorealistische Ernte

Die Erntestation kombiniert einen fotorealistischen KI-Kakaobaum mit separat
anklickbaren Früchten aus einem PNG mit echtem Alphakanal. Fünf gelbe/orange
Früchte fallen beim Abschlagen in den Korb; vier grüne bleiben am Baum.
Die Bildfläche behält ihr Seitenverhältnis, damit Früchte und Trefferflächen
auch auf kleinen Bildschirmen am Baum bleiben. Tastaturbedienung über Tab und
Enter/Leertaste; reduzierte Bewegung wird berücksichtigt.

Assets: `assets/station-2-kakaobaum.webp` (1536 × 1024) und
`assets/station-2-fruechte-alpha.webp` (2172 × 724, RGBA; drei Spritezellen).
Vollständige Prompts liegen in den gleichnamigen `-prompt.txt`-Dateien.
Erzeugt mit dem integrierten image_gen-Werkzeug. Beide PNGs sind zusätzlich
im GAME-Block von `index.html` eingebettet, damit der bestehende Blob-Wechsel
und die Nutzung ohne weitere Bilddownloads funktionieren. Station 1 behält
ihr bestehendes interaktives Foto; die Stationen 3–6 sind weiterhin gezeichnet.

Geprüft: JavaScript-Syntax aller Spielskripte, PNG-Alphakanal und Erntelogik
(grüne Früchte, Mehrfachklicks, Zähler, Korb und Abschluss). Visuelle
Browserprüfung ausstehend: Chromium startet in dieser Umgebung nicht
(gesperrter Systemaufruf beim Start).

## Station 2: natürlicher Fruchtansatz und Ernte mit Machete

Der Erntekorb verwendet jetzt sechs fotorealistische Ansichten (leer bis fünf
Früchte) aus `assets/station-2-korb-stufen.webp`, mit transparentem Hintergrund.
Die Früchte liegen unterschiedlich ausgerichtet im Korb und werden vom Rand
teilweise verdeckt. Der vollständige image_gen-Prompt liegt daneben.
Die Fruchtstiele am Baum sind auf Stamm und kräftigen Ästen verankert; Größe,
Neigung und Positionen wurden angepasst. Beim Antippen einer reifen Frucht
schneidet eine animierte Machete am Stiel, danach bewegt sich die Frucht zum
Korb. Zähler und Korbfüllung ändern sich erst nach der Animation. Während
eines Schnitts sind weitere Schnitte gesperrt. Grüne Früchte bleiben hängen.
Das neue Korbbild ist ebenfalls direkt im GAME-Block eingebettet.

Geprüft: Syntax aller neun Spielskripte und isolierter Ernteablauf mit vier
grünen und fünf reifen Früchten, Mehrfachklickschutz, sechs Korbstufen und
Abschluss nach der letzten Animation. Visuelle Browserprüfung steht aus.
Änderungen lokal gespeichert; keine Veröffentlichung vorgenommen.

Die neun Baumfrüchte in Station 2 haben nun feste individuelle Varianten:
leicht unterschiedliche Breite, Länge und Asymmetrie, teilweise gespiegelte
Rippen und Flecken sowie minimale Farbton-, Sättigungs- und Helligkeitsabweichungen.
Die Transformationen setzen am Stiel an, damit der Baumkontakt erhalten bleibt.
JavaScript-Syntax und Ernteablauf erneut geprüft; visuelle Browserprüfung ausstehend.

## Station 2: sichtbarer Korb und fotorealistische Machete

Der Korb wird als echtes eingebettetes Bild mit expliziter Breite und Höhe in
einem ausgeschnittenen Bildfenster dargestellt. Die sechs Füllstände wechseln
über die Position des Bildes; ein leeres Element mit automatischer Höhe und
Hintergrundbild ist nicht mehr erforderlich.

`assets/station-2-machete-foto.webp` ist ein mit dem integrierten image_gen
gefertigtes Werkzeugfoto mit Alphakanal (2172 × 724 Pixel). Vollständiger Prompt:
`assets/station-2-machete-foto-prompt.txt`. Die Schnittanimation führt die untere
Schneide an den individuellen oberen Fruchtansatz. Kontaktpunkt anhand des
Alphakanals gemessen (42 % / 68,37 % im Werkzeugbild). Annäherung, kurzer ziehender
Schnitt und Rückzug ersetzen die schnelle Drehbewegung. Die Frucht löst sich
beim Kontakt nach 476 ms; reduzierte Bewegung wird berücksichtigt.

Syntax aller neun Spielskripte, Erntelogik, Korbstufen, Schnittposition und
Einbettung beider Bilddateien geprüft. Chromium startet wegen gesperrtem
Systemaufruf (setsockopt) weiterhin nicht; visuelle Browserprüfung offen.
Lokal gespeichert, nicht veröffentlicht.

## Station 2: rötliche reife Früchte

Der Baum verwendet jetzt `assets/station-2-fruechte-rot-alpha.webp` als 2×2-Atlas
(gelb, orange, rotbraun, grün). Zwei der fünf reifen Früchte sind rotbraun;
vier grüne Früchte bleiben am Baum. Farbhinweise und zugängliche Beschriftungen
berücksichtigen die roten Früchte. Formvarianten und Schnittpunkte bleiben erhalten.
Die sechs Korbansichten in `assets/station-2-korb-rot-stufen.webp` zeigen nun eine
Mischung aus gelben, orangen und rotbraunen Früchten. Beide Bilder wurden mit dem
integrierten image_gen aus den bisherigen Assets bearbeitet; die vollständigen
Prompts liegen in den zugehörigen `-prompt.txt`-Dateien. Vorherige Assets bleiben
erhalten. Neue PNGs sind vollständig im Spiel eingebettet.

Geprüft: Alphakanäle, Syntax aller neun Spielskripte und Ernteablauf einschließlich
zweier erntbarer rotbrauner Früchte, vier grüner Früchte, Zähler und Korbstufen.
Visuelle Browserprüfung weiterhin ausstehend. Lokal gespeichert.

## Station 2: tatsächliche Erntereihenfolge im Korb

Die vorgerenderten Füllstände werden nicht mehr umgeschaltet. Die leere Ansicht
des Korbbilds bildet die Rückseite; eine zweite, per CSS ausgeschnittene Ansicht
stellt den vorderen Korbrand dar. Jede geerntete Frucht wandert als dasselbe
Bild-Element zwischen diese Ebenen. Atlaszelle, individuelle Form und Farbfilter
bleiben erhalten. Fünf vorbereitete Liegepositionen geben Richtung, Überlappung
und Perspektive vor. Zielpunkt und Drehung der Fallanimation folgen dem jeweiligen
Liegeplatz. Der zugängliche Korbtext zählt auch die tatsächlich geernteten Farben
in ihrer Reihenfolge auf. Es wurden keine neuen Rasterbilder erzeugt.

Geprüft: alle 120 Erntereihenfolgen mit und ohne reduzierte Bewegung (240 Abläufe),
Identität der übertragenen Fruchtbilder, Farb- und Formparameter, grüne Früchte,
Mehrfachklickschutz, Zähler und Abschluss. Syntax aller neun Skripte geprüft.
Visuelle Browserprüfung weiterhin ausstehend. Änderungen lokal gespeichert.

## Aktuell: Station 2 wieder mit vollständigen Korbbildern

Die zusammengesetzten Einzelfrüchte im Korb wurden auf Wunsch durch vollständig
fotorealistische Korbansichten ersetzt. Alle 18 möglichen Farbzusammenstellungen
(0–2 gelbe, 0–2 rotbraune, 0–1 orange Frucht) sind in drei 3×2-Bildatlanten unter
`assets/station-2-korb-kombinationen-rot-0.webp` bis `-2.webp` abgelegt. Die Zahl
rotbrauner Früchte wählt den Atlas, die Gelbzahl die Spalte und die Orangezahl
die Zeile. Somit wird jede Erntereihenfolge korrekt dargestellt. Alle drei
Atlanten sind direkt im Spiel eingebettet; zusätzliche Downloads entfallen.

## Aktuell: Station 3 fotorealistisch öffnen und sammeln

Die Station zeigt eine liegende Kakaofrucht auf einem Holzklotz und eine
Holzschüssel im Plantagenfoto. Eine fotorealistische Machete führt die drei
Schläge aus; anschließend liegen zwei echte fotografische Fruchthälften auf
dem Klotz. Die interaktiven Bohnen verwenden ein eigenes Foto mit weißem
Fruchtfleisch. Eine fotorealistische Hand mit hellem, vollständig geschlossenem
Handschuh greift beim Einsammeln zum Fruchtfleisch und zur Schüssel. Es ist keine
Haut sichtbar. Die Fruchthälften enthalten keine fest eingebrannten Bohnen;
nach dem Sammeln bleibt die leere Schale sichtbar.

Die ursprünglichen Regeln bleiben erhalten: drei Schläge, zufällig 30–50 Bohnen,
1–5 Bohnen pro Sammeltipp, spätestens zwölf Tipps und derselbe Stationsabschluss.
Der vorhandene Zähler und `window.__s3NB` bleiben erhalten. Tastaturbedienung und
reduzierte Bewegung sind berücksichtigt.

Neue Dateien (alle zusätzlich direkt im GAME-Block eingebettet):
- `assets/station-3-holzklotz.webp`
- `assets/station-3-frucht-zustaende.webp`
- `assets/station-3-bohne-fruchtfleisch.webp`
- `assets/station-3-handschuh.webp`

Die neuen Bilder wurden mit dem integrierten image_gen-Werkzeug erstellt.
Die vollständigen Prompts liegen jeweils in der gleichnamigen `-prompt.txt`-Datei.
Beim Handschuh wurde der zunächst sichtbare Handgelenkbereich per image_gen
vollständig durch Handschuhmaterial ersetzt. Die Zwischenbilder mit sichtbarer
Haut sind nicht im Projekt oder im Spiel eingebunden.

Geprüft: Syntax aller neun Spielskripte; Station 2 mit allen 120 Erntereihenfolgen
und allen 18 Korbzuständen, jeweils bei normaler/reduzierter Bewegung;
Station 3 für sämtliche Bohnenzahlen von 30 bis 50, ebenfalls in beiden Modi.
Auch Bilddaten und Alphakanäle wurden geprüft. Wiederholbare Logikprüfungen:
`node tools/check-station-2.cjs` und `node tools/check-station-3.cjs`.
Die Tests verwenden eine isolierte DOM-Simulation; sie ersetzen keine visuelle
Browserprüfung. Diese ist wegen des bekannten Chromium-Startfehlers weiterhin
offen. Änderungen lokal gespeichert, nicht veröffentlicht.

## Station 2: Abstände und Verbindungsstiele korrigiert

Die tatsächliche Spritebreite ist wieder auf 9 % der Fotobreite festgelegt;
damit stimmt sie mit der Berechnung der Stiel- und Fruchtpositionen überein.
Die Früchte stehen abwechselnd links und rechts vom Stamm mit größeren Abständen.
Kurze, individuell verlängerte Stiele verbinden sie mit Stamm und Hauptästen.
Der Machetenschnitt erfolgt weiterhin am oberen Fruchtende. Stiele verschwinden
bei der Fallanimation. Korbzustände und Farbanzahlen bleiben unverändert.

Geprüft: Die tatsächlich sichtbaren Alphaflächen aller neun Früchte wurden mit
ihren individuellen Skalierungen, Spiegelungen, Scherungen und Drehungen in
Fotokoordinaten berechnet. Sie überschneiden sich nicht und liegen vollständig
innerhalb der Bildfläche. Syntax sowie die bestehenden Tests für beide Stationen
bestanden. Eine visuelle Browserprüfung steht weiterhin aus.

## Station 3: Längsschnitt und weiße Pulpa

Drei Schnitte verlängern die Schnittlinie vom Stiel bis zur Spitze. Die längs
geöffneten Schalen zeigen dicht versetzte, einzeln sammelbare Bohnen in weißer,
feuchter Pulpa. Die neue Fotografik wurde mit dem integrierten image_gen erzeugt:
`assets/station-3-bohne-weisse-pulpa.webp`; vollständiger Prompt:
`assets/station-3-bohne-weisse-pulpa-prompt.txt`. Sie ist zusätzlich im Spiel
eingebettet. Vorherige Grafik bleibt erhalten.

Geprüft: JavaScript-Syntax, Station 3 für 30–50 Bohnen und beide
Bewegungseinstellungen sowie Station 2. Visuelle Browserprüfung steht aus.

## Station 3: frische Bohnen mit realistischeren Pulpaformen

Drei unterschiedliche, fotografisch erzeugte Bohnenformen ersetzen die einzelne
flache Pulpa-Grafik. Weiße, feucht glänzende Schleimhüllen umgeben die Kerne;
sie sitzen leicht versetzt in fünf Längsreihen innerhalb der Schale. Jede Bohne
behält ihre Form auf dem Weg in die Schüssel. Die Zahl bleibt bei 30–50.

Bild: `assets/station-3-frische-bohnen-varianten.webp` (integriertes image_gen).
Vollständiger Prompt: `assets/station-3-frische-bohnen-varianten-prompt.txt`.
Die Darstellung entsättigt den leichten Rosaton der Grafik für eine weißere Pulpa.
Botanische Referenz: https://apps.worldagroforestry.org/treesandmarkets/inaforesta/documents/agrof_cons_biodiv/cocoa%20frm%20bud%20to%20bean.htm

Geprüft: isolierte Station-3-Browseransicht in Chromium, JavaScript-Syntax,
Station-3-Interaktionen für alle Bohnenzahlen und Bewegungseinstellungen sowie
Station-2-Regressionstest.

## Station 3: zusammenhängender Kern nach Fotoreferenz

Die Herausnahme-Technik ist vorerst entfernt. Nach drei Schnitten zeigt die
Station einen statischen, zusammenhängenden Fruchtfleischkern und die zweite
leere Schalenhälfte. Der Zähler zählt jetzt die drei Schnitte. Hinweise,
Aufgabentext und Vorlesetext verlangen kein Einsammeln mehr. Der normale
Stationsabschluss ist direkt nach dem Öffnen verfügbar.

Neue eingebettete Grafik: `assets/station-3-frucht-referenz-kern.webp`.
Erstellt mit integriertem image_gen anhand der bisherigen Fruchtgrafik und
der vom Nutzer angegebenen Roastmarket-Fotoreferenz. Vollständiger Prompt
und Referenzlink: `assets/station-3-frucht-referenz-kern-prompt.txt`.
Das Referenzfoto dient nur als Vorlage und wird nicht als Spielgrafik ausgeliefert.
Ältere Einzelbohnen-Grafiken bleiben für mögliche spätere Arbeiten erhalten.

Geprüft: Chromium-Ansicht nach dem Öffnen, JavaScript-Syntax, aktualisierter
Station-3-Test (Schnittzähler, Mehrfachtipps, Abbruch, Abschluss ohne Sammeln,
beide Bewegungseinstellungen) sowie Station-2-Regressionstest.


## Ama: gespeicherte deutsche Sprachausgabe

Amas Texte werden jetzt als echte MP3-Aufnahmen abgespielt, in der 360°-Ansicht
und im eingebetteten Spiel. Stimme: Microsoft `de-DE-AmalaNeural`, weiblich,
mit leicht erhöhter Tonlage (`+28Hz`) und ruhigem Tempo (`-8%`) für einen
jüngeren Klang. Es handelt sich um eine synthetische Stimme, keine Aufnahme
eines Kindes. Die MP3s liegen zusätzlich einzeln unter `assets/audio/`.
`ama-manifest.json` ordnet jede Datei ihrem unveränderten gesprochenen Satz zu.

Beide Dokumente laden die Aufnahmen aus `assets/audio/`: Beim Öffnen der Seite
werden alle MP3s im Hintergrund geholt, im Browser-Cache abgelegt und im
Speicher bereitgehalten. Ein noch nicht geladener Clip wird direkt gestreamt.
`index.html` braucht deshalb den Ordner `assets/audio/` neben sich.
Alle Bohnenzahlen von 30 bis 50 und die unterschiedlichen Wegbeschreibungen
sind vorbereitet. Im Spiel zeigt ein Untertitel jeweils den gesprochenen Satz.
Begrüßungen verwenden keinen frei eingegebenen Namen, damit die gespeicherte
Aufnahme und der angezeigte Satz übereinstimmen. Der Name auf der Urkunde
bleibt erhalten. Zusätzliche gesprochene Einleitungen wie „Deine Aufgabe“ und
„Super“ vor einer Wegbeschreibung wurden entfernt. Amas Papa verwendet
weiterhin die bisherige männliche Browserstimme.

Erzeugung: `tools/generate-ama-audio.py` mit installiertem `edge-tts` und
Internetzugang; bereits vorhandene Dateien werden übersprungen.
Einbettung nach Änderungen: `python3 tools/pack-ama-audio.py`.
Prüfung: `node tools/check-ama-audio.cjs` kontrolliert Textabdeckung, dynamische
Bohnenzahlen und Wegtexte, Wiedergabeende/Abbruch sowie die Skriptsyntax beider
Dokumente. Die MP3-Dateien wurden zusätzlich vollständig mit FFmpeg dekodiert.
Eine Hörprobe und ein manueller Wiedergabetest im Browser stehen noch aus.


### Korrektur: Amas Texte im 2D-Spiel

Die im eingebetteten GAME-Dokument fehlende Audio- und Untertitel-Einbindung
wurde wiederhergestellt. Der aktuelle Satz erscheint mit „Ama:“ und bleibt
nach der Wiedergabe lesbar, bis die nächste Ansage kommt oder übersprungen
wird. Stations-Erklärungen stehen weiterhin neben Amas Figur.
Der lokale Chromium-Test bestätigt Textanzeige, Sichtbarkeit nach Audioende,
Überspringen und Stationserklärung. Der automatische Audiotest prüft jetzt
zusätzlich den tatsächlich eingebetteten 2D-Sprachcontroller.

## Station 3: Herausnehmen auf Basis des zusammenhängenden Fotokerns

Nach drei Schnitten lassen sich zwölf Portionen Bohnen mit Fruchtfleisch per
Tipp/Klick oder über die fokussierten Schaltflächen herausnehmen. Die Portionen
verwenden Ausschnitte der eingebetteten Referenz-Kerngrafik; sie werden nicht
durch separate Bohnen-Sprites ersetzt. Vor dem ersten Herausnehmen ist die
zusammenhängende Grafik unverändert sichtbar. Masken legen anschließend die
leere, faserige Schaleninnenseite frei. Die Portionen landen animiert in der
Holzschüssel. Der Zähler zählt Portionen, nicht die insgesamt 30–50 Bohnen.
Der Stationsabschluss erscheint erst, wenn die letzte Portion angekommen ist.
Mehrfachtipps während des Transports werden gesperrt; Schließen bricht die
laufende Animation ab. Reduzierte Bewegung wird berücksichtigt.

Keine neue Bildgenerierung; bestehende Foto-Texturen werden im Browser
zugeschnitten und maskiert. Prüfungen: JavaScript-Syntax, Station-3-Logiktest
inklusive Abbruch/Fokus/Mehrfachtipps, Station-2-Regressionstest und echter
Chromium-Ablauf mit zwölf Pointer-Klicks für normale/reduzierte Bewegung.
Reproduzierbarer Browsercheck (Chromium, ChromeDriver und Python benötigt):
`python tools/check-station-3-browser.py`; Screenshots in `/tmp/kakao-extraction-*.png`.


## Aktuell: fotorealistische Leerungsstufen und Amas Sprechweise

Station 3 ersetzt die Masken bzw. Tiefenlagen der älteren Arbeitsstände durch
zwölf eigens mit dem integrierten `image_gen` erzeugte fotorealistische Zustände
derselben geöffneten Frucht: voll bis vollständig leer. Das unverändert
übernommene RGBA-Bild `assets/station-3-frucht-leeren-stufen.webp` ist ein
4×3-Atlas mit 1448×1086 Pixeln. Vollständiger Prompt und Referenzen:
`assets/station-3-frucht-leeren-stufen-prompt.txt`. Keine programmatische
Bildbearbeitung oder Skalierung. Die Fotos zeigen Füllstände; nicht jede
unter dem Fruchtfleisch versteckte Bohne ist einzeln sichtbar.

Nach drei Schnitten werden pro Klick 2–5 Bohnen mit Fruchtfleisch herausgenommen,
in elf Portionen insgesamt genau 40 Bohnen. Jedes Mal wechselt das vollständige
Foto der Fruchthälfte. Separate fotorealistische Bohnen bewegen sich in die
Schüssel. Zähler und Abschluss folgen erst nach deren Ankunft; Mehrfachklicks
während des Transports sind gesperrt. Tastatur, Abbruch und reduzierte Bewegung
werden berücksichtigt. Der editierbare Stationscode liegt in
`tools/station-3-photo-stages-setup.js`, das CSS daneben. Der Packschritt
übernimmt diese Quelle in das jeweils aktuelle GAME-Dokument.

Amas zusätzliche Textanzeige unten im 2D-Spiel wurde auf ausdrücklichen Wunsch
entfernt. Ihre vorhandenen Sprechblasen und Aufgabentexte bleiben erhalten.
Gedankenstriche (–, — und ein alleinstehendes -) erzeugen in den MP3-Dateien
350 ms zusätzliche Stille zwischen den Satzteilen. Wortbindestriche bleiben
unverändert. Die Sprachvorlage verwendet „Ahma“ bzw. „Ahmas“, damit ihr Name
zusammenhängend gesprochen wird; der sichtbare Text lautet weiterhin „Ama“.
245 MP3s liegen unter `assets/audio/` und werden von beiden Ansichten geladen.
`ama-manifest.json` enthält die angezeigten Originaltexte, `ama-render-state.json`
die Prüfsummen der zuletzt erzeugten Sprachvorlagen. Die Erzeugung benötigt
jetzt zusätzlich FFmpeg. Unveränderte Audios werden beibehalten.

Geprüft: alle Bilderstufen, Portionen von 2–5, exakt 40 Bohnen, Zähler nach
Ankunft, Abbruch und Mehrfachklicks; keine zusätzliche Transkriptanzeige;
Text-/Audioabdeckung und JavaScript-Syntax; alle 245 MP3s dekodieren fehlerfrei.
350-ms-Pausen in kodierten Audios mittels FFmpeg bestätigt.
Chromium-Gesamtablauf mit zwölf Fotozuständen und schmaler Mobilansicht geprüft.
Befehle: `node tools/check-photo-stages.cjs`,
`node tools/check-ama-audio.cjs`, `python tools/check-ama-speech.py` mit
installiertem edge-tts; `python tools/check-photo-stages-browser.py` mit
Chromium/ChromeDriver. Einbettung: `python3 tools/pack-ama-audio.py`.


## Amas Papa: persönliche Sprachaufnahme

Papas vier Sätze beim Abholen der Kakaosäcke verwenden jetzt die bereitgestellte
Aufnahme. Das Original liegt unter `assets/audio/papa-user-aufnahme.m4a`; vier
MP3-Clips (`papa-user-1.mp3` bis `papa-user-4.mp3`) sind an den Sprechpausen
geschnitten und in beiden HTML-Ansichten eingebettet. Die Satzwarteschlange
spielt Papas Sätze nacheinander und lässt anschließend Ama mit ihrer eigenen
Stimme weiterreden. Die vorhandenen Figurenanimationen bleiben daran gekoppelt.

Die Zuordnung steht in `assets/audio/papa-manifest.json`. Zum erneuten
Einbetten nach Audioänderungen: `python tools/pack-ama-audio.py`. Die generierten
TTS-Dateien bleiben erhalten, werden von Papas aktuellem Manifest aber nicht
mehr verwendet. Geprüft: `node tools/check-ama-audio.cjs`.

## Station 5: fotorealistische Trocknungsanlage in Ghana

Die Trocknungsstation verwendet zwei neue Fotografiken einer erhöhten
Bambusmatte auf Holzstützen: offen mit fermentierten braunen Bohnen und mit
ausgebreiteter blauer Regenplane. Der vorhandene 360°-Hof
(`plantage-mit-hof-botanik.webp`) dient als Orts- und Gestaltungsvorlage.
Fachlicher Abgleich zu erhöhten Bambusmatten in Ghana:
https://www.cocoafederation.com/education/cocoa-production

Grafiken: `assets/station-5-trocknungsanlage-offen.webp` und
`assets/station-5-trocknungsanlage-abgedeckt.webp` (je 1536 × 1024).
Beide mit integriertem image_gen erstellt und zusätzlich im GAME-Dokument
eingebettet; vollständige Prompts liegen jeweils in der gleichnamigen
`-prompt.txt`-Datei. Die abgedeckte Ansicht wurde aus der offenen bearbeitet.
Regen und Wetterabdunklung werden im Browser über die Fotografiken gelegt.
Die bisherige Plane-Steuerung und die Sonne/Regen-Regeln bleiben bestehen.
Aufgaben- und Vorlesetexte bleiben gleich. Der Fortschrittsbalken hat
zusätzlich eine zugängliche Prozentanzeige; nach Abschluss stoppt der Timer.

Bearbeitbare Stationslogik: `tools/station-5-drying-setup.js`.
Geprüft: `node tools/check-station-5.cjs`,
`python tools/check-station-5-browser.py` (Chromium/ChromeDriver benötigt),
JavaScript-Syntax sowie die vorhandenen Prüfungen für Station 2, Station 3
und Ama-Audio. Browsercheck mit echten Schaltflächenklicks auf 1150 und
390 Pixel Breite sowie reduzierter Bewegung. Screenshots:
`/tmp/kakao-station5-sun-*.png`, `/tmp/kakao-station5-rain-covered-*.png`.

## Station 5: Rundholzplattform, verzweigte Kakaobäume und fotografischer Regen

Aktuelle Grafiken ersetzen die erste schwere Holzkonstruktion durch schlanke
Rundholzstützen und -streben mit einfachen dünnen Brettern. Die Kakaobäume
stehen niedrig und verzweigen sich früh; hohe Schattenbäume bilden eine
zweite Kronenschicht im Hintergrund. Botanische Referenz:
https://ecocrop.apps.fao.org/ecocrop/srv/en/cropView?id=2074

Verwendete Bilder (je 1536 × 1024):
- `assets/station-5-trocknungsanlage-offen-v2.webp`
- `assets/station-5-trocknungsanlage-abgedeckt-v2.webp`
- `assets/station-5-regentropfen.webp` (RGBA mit fotografischen Tropfen)

Alle drei wurden mit integriertem image_gen erstellt. Die vollständigen
Prompts stehen jeweils in der gleichnamigen `-prompt.txt`-Datei. Die erste
Fotoversion bleibt separat erhalten. Die neue offene Ansicht entstand als
Bearbeitung der ersten; die neue Planenansicht als Bearbeitung der neuen
offenen Ansicht. Alle aktiven Bilder sind zusätzlich in GAME eingebettet.

Der Regen verwendet zwei leicht gegeneinander versetzte fotografische
Tropfenebenen mit unterschiedlicher Größe und Fallgeschwindigkeit. Die
regelmäßigen gezeichneten Regenstreifen sind entfernt. Bei reduzierter
Bewegung bleibt die fotografische Regenansicht ohne Fallanimation sichtbar.
Vorlesetexte und Wetter-/Trocknungsregeln bleiben gleich.

Geprüft: Station-5-Logik einschließlich Einbettung aller drei Grafiken;
Chromium mit echten Schaltflächenklicks, 1150/390 Pixel Breite und reduzierter
Bewegung; JavaScript-Syntax; Regressionstests für Station 2, Station 3 und
Amas Audio. Sichtprüfung der offenen und abgedeckten Ansicht im Browser.

## Station 6: fotorealistischer Packplatz und Jutesack

Der Packplatz greift Hof, niedrige verzweigte Kakaobäume und hohe Schattenbäume
aus Station 5 auf. Trockene braune Bohnen liegen in einer Holzwanne auf einem
Rundholzgestell. Die Bohnen in Wanne, Schaufel und Sack sind aufeinander
abgestimmt; die Schaufel- und Sackatlanten zeigen kleinere, zahlreichere Bohnen
als die erste Fassung. Die Metallschaufel wird mit Finger oder Maus zur offenen
Sacköffnung gezogen und leert sich dort. Anschließend zieht man die leere
Schaufel zurück zur Bohnenwanne, wo sie sich automatisch wieder füllt. Fünf
Füllgänge schließen den Sack, danach erscheint der Aufdruck „KAKAO / 60 kg“.
Tastaturbedienung bleibt über Enter/Leertaste möglich. Beim Schließen werden
laufende Bewegungen und Zeitgeber abgebrochen.

Neue Bilddateien, jeweils mit integriertem image_gen erstellt:
- `assets/station-6-packplatz.webp` (1536 × 1024)
- `assets/station-6-jutesack-fuellstufen-v2.webp` (1774 × 887, 4 × 2 Felder; leer,
  20/40/60/80/100 Prozent offen, voll zugebunden, Ersatz-Endzustand)
- `assets/station-6-schaufel-und-bohnen-v2.webp` (2172 × 724, 3 Felder: beladene
  Schaufel, leere Schaufel, fallende trockene Bohnen)

Die vollständigen Prompts stehen in den gleichnamigen `-prompt.txt`-Dateien.
Als Ortsvorlage diente `station-5-trocknungsanlage-offen-v2.webp`. Alle aktiven
Bilder sind zusätzlich in GAME eingebettet. Der große Sackatlas verwendet
eine einmalig angelegte Blob-URL, damit die CSS-Hintergrundgrafik auch bei
Browser-Grenzen für große Daten-URLs zuverlässig sichtbar bleibt.
Bearbeitbare Quellen: `tools/station-6-packing-setup.js` und
`tools/station-6-packing.css`.

Geprüft: `node tools/check-station-6.cjs` (Bildatlanten und Bedienungszustände);
`python tools/check-station-6-browser.py` mit Chromium/ChromeDriver (Mausziehen,
simulierte Touch-Ereignisse, Tastatur, Nachfüllen, Abbruch und reduzierte
Bewegung bei 1150/390 Pixel Breite). Sichtprüfung: leere, teilweise gefüllte
und zugebundene Säcke, Ausschütten sowie Größenvergleich am Tisch. Screenshots liegen unter
`/tmp/kakao-station6-*.png`. JavaScript-Syntax und die vorhandenen
Prüfungen für Station 2, 3, 5 sowie Ama-Audio bestanden.


## Dateigröße: eingebettete Bilder als WebP

GitHub lehnt Dateien über 100 MB ab. Deshalb sind alle Bilder als WebP
(Qualität 90, Originalauflösung, Transparenz bleibt erhalten) gespeichert, sowohl in
`index.html` eingebettet als auch unter `assets/`. Die früheren PNG- und JPG-Originale
sind im Commit „Kakao-Plantage: Station 4 Fermentation mit Fotoszenen“ in der
Git-Historie erhalten. Nach dem Einbetten neuer PNGs oder JPGs erneut ausführen
(benötigt Pillow): `python3 tools/compress-embedded-images.py`.

## Station 4: Fermentation auf Bananenblättern

Die Bohnen liegen als flacher, breiter Haufen auf einem Bett aus großen,
überlappenden Bananenblättern im ghanaischen Plantagenwald. Zu Beginn deckt man
den Haufen mit Bananenblättern ab. An Tag 2 und 4 wird er zum Durchrühren
aufgedeckt; danach werden die Blätter wieder darübergelegt. Im Verlauf der
sechs Tage blendet die frische, weiß umhüllte Bohnenmasse in den braunen
fermentierten Zustand über. Der vorhandene Temperaturverlauf bis 50 °C bleibt.

Als fotografische Referenz diente das [Naturata-Foto der Bohnen auf
Bananenblättern](https://www.naturata.de/fileadmin/_processed_/5/f/csm_Kakao_Cabruca_940x800pixel_9ddc7778a0.jpg).
Die vier erzeugten und in GAME eingebetteten Bilder liegen optimiert unter
`assets/station-4-fermentation-offen-v2.webp`,
`assets/station-4-fermentation-braun-v2.webp`,
`assets/station-4-bananenblatt-abdeckung.webp` und
`assets/station-4-umruehren-paddel.webp`. Die zugehörigen Prompts sind in den
gleichnamigen `-prompt.txt`-Dateien gespeichert. Bearbeitbare Quellen:
`tools/station-4-fermentation-setup.js` und
`tools/station-4-fermentation.css`.

Die erste Bildfassung bleibt als `station-4-fermentation-offen.webp` und
`station-4-fermentation-braun.webp` erhalten. In v2 sind die einzelnen Bohnen
kleiner und zahlreicher, der Haufen nimmt weniger Bildfläche ein und die
Abdeckung sowie das Paddel sind auf die neuen Proportionen abgestimmt.

## Einstieg an einzelnen Stationen

Mit `#station1` bis `#station6` am Ende der Adresse startet das 2D-Spiel direkt
an dieser Station, ohne 360°-Rundgang, z. B.
`https://noraumlauft.github.io/exkursion-kakaoplantage/#station3`.
Machete und Zwischenprodukte der vorherigen Stationen sind dann schon vorhanden.
Der Link überschreibt einen gespeicherten Spielstand, sobald auf „Los geht's!“
getippt wird. QR-Codes liegen in `qr-codes/`, zum Drucken in
`qr-codes/alle-stationen.pdf`.

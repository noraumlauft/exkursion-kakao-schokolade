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

Dateien: `assets/plantage-mit-hof-original.jpg`,
`assets/plantage-mit-hof-ki.png`, vollständiger Bearbeitungsprompt in
`assets/plantage-mit-hof-ki-prompt.txt`.

Geprüft: eingebettete Bilddaten und JavaScript-Syntax. Browserprüfung steht aus.

## Überarbeitung mit dem abgestimmten Prompt

Die KI-Auswahl verwendet nun `assets/plantage-mit-hof-ki-v2.png`.
Der vollständig und unverändert eingesetzte deutsche Prompt steht in
`assets/plantage-mit-hof-ki-v2-prompt.txt`. Werkzeug: integriertes image_gen,
Bearbeitung des Originalpanoramas, keine nachträgliche Skalierung oder Schärfung.
Gelieferte native Auflösung: 1774 × 887 Pixel. Das Original bleibt als Vergleich und Startansicht erhalten.

## Aktuelle Startansicht: realistischere Kakaobäume

Die aktuelle KI-Auswahl und Startansicht verwendet `assets/plantage-mit-hof-botanik.png`
(1774 × 887 Pixel), mit dem integrierten image_gen-Werkzeug aus dem Original erzeugt.
Der vollständige Prompt liegt in `assets/plantage-mit-hof-botanik-prompt.txt`.
Kakaobäume wurden stärker verzweigt, die Fruchtzahl reduziert und Früchte an Stämme
und stärkere Holzäste verlegt. Boden und Hauslehm wurden dezent wärmer rotbraun.
Das Original ist weiterhin auswählbar; frühere Hof-KI-Dateien sind separat erhalten.
Blüten- und Fruchtmarkierung wurden an das neue Motiv angepasst. Keine klassische
Skalierung oder Nachschärfung. Vollständige botanische Fehlerfreiheit und nahtlose
Pole sind nicht bestätigt. Browserprüfung steht aus.

## Aktuelle Korrektur: schlankere Kakaobäume

Die KI-Startansicht verwendet jetzt `assets/plantage-mit-hof-schlank.png`.
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

Assets: `assets/station-2-kakaobaum.png` (1536 × 1024) und
`assets/station-2-fruechte-alpha.png` (2172 × 724, RGBA; drei Spritezellen).
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
Früchte) aus `assets/station-2-korb-stufen.png`, mit transparentem Hintergrund.
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

`assets/station-2-machete-foto.png` ist ein mit dem integrierten image_gen
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

Der Baum verwendet jetzt `assets/station-2-fruechte-rot-alpha.png` als 2×2-Atlas
(gelb, orange, rotbraun, grün). Zwei der fünf reifen Früchte sind rotbraun;
vier grüne Früchte bleiben am Baum. Farbhinweise und zugängliche Beschriftungen
berücksichtigen die roten Früchte. Formvarianten und Schnittpunkte bleiben erhalten.
Die sechs Korbansichten in `assets/station-2-korb-rot-stufen.png` zeigen nun eine
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
`assets/station-2-korb-kombinationen-rot-0.png` bis `-2.png` abgelegt. Die Zahl
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
- `assets/station-3-holzklotz.png`
- `assets/station-3-frucht-zustaende.png`
- `assets/station-3-bohne-fruchtfleisch.png`
- `assets/station-3-handschuh.png`

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
`assets/station-3-bohne-weisse-pulpa.png`; vollständiger Prompt:
`assets/station-3-bohne-weisse-pulpa-prompt.txt`. Sie ist zusätzlich im Spiel
eingebettet. Vorherige Grafik bleibt erhalten.

Geprüft: JavaScript-Syntax, Station 3 für 30–50 Bohnen und beide
Bewegungseinstellungen sowie Station 2. Visuelle Browserprüfung steht aus.

## Station 3: frische Bohnen mit realistischeren Pulpaformen

Drei unterschiedliche, fotografisch erzeugte Bohnenformen ersetzen die einzelne
flache Pulpa-Grafik. Weiße, feucht glänzende Schleimhüllen umgeben die Kerne;
sie sitzen leicht versetzt in fünf Längsreihen innerhalb der Schale. Jede Bohne
behält ihre Form auf dem Weg in die Schüssel. Die Zahl bleibt bei 30–50.

Bild: `assets/station-3-frische-bohnen-varianten.png` (integriertes image_gen).
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

Neue eingebettete Grafik: `assets/station-3-frucht-referenz-kern.png`.
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

Die Aufnahmen sind außerdem in beiden Dokumenten eingebettet: Nach dem Laden
werden für Amas Sprachausgabe keine weiteren Netzwerkzugriffe benötigt.
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
übernommene RGBA-Bild `assets/station-3-frucht-leeren-stufen.png` ist ein
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
245 MP3s liegen unter `assets/audio/` und sind in beiden Ansichten eingebettet.
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


## Amas Papa: gespeicherte männliche Sprachausgabe

Auch Papas unveränderter Text beim Abholen der Kakaosäcke liegt jetzt in vier
MP3-Aufnahmen vor. Stimme: `de-DE-ConradNeural`, erwachsen und männlich,
Tempo `-8%`, natürliche Tonlage (`+0Hz`). Dateien: `assets/audio/papa-*.mp3`;
Originaltexte und Stimme: `assets/audio/papa-manifest.json`.
Beide HTML-Ansichten enthalten die Aufnahmen zusätzlich direkt eingebettet.
Die bestehende Satzwarteschlange wählt anhand von `who` die Aufnahmen von
Papa oder Ama. Nach Papas letztem Satz spricht Ama mit ihrer eigenen Stimme
weiter; die jeweils richtige Figur bewegt den Mund. Es gibt keine zusätzliche
Textanzeige unten im Spiel.

Erneute Erzeugung mit installiertem edge-tts und FFmpeg:
`python tools/generate-ama-audio.py --manifest assets/audio/papa-manifest.json`.
Einbettung: `python tools/pack-ama-audio.py`.
Geprüft: alle vier Originaltexte, korrekte Stimmzuordnung, Papa→Ama-Reihenfolge,
Wiedergabeende/Abbruch, identische eingebettete MP3-Daten, JavaScript-Syntax
beider Ansichten und fehlerfreie FFmpeg-Dekodierung der neuen Aufnahmen.

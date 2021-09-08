# marioGoesFHDW

Mario ist auf der suche nach seinem Bachelorabschluss und muss verschiedene Hindernisse überwinden um diesen zu erreichen.

https://kollock5.github.io/marioGoesFHDW/

# Setting up the Project

1. clone the project

2. install a local webserver (xampp or python SimpleHTTPServer or other)
 python link -> https://www.python.org/downloads/windows/

3. start the webserver in your directory (with python form console "python -m SimpleHTTPServer 8000" or python -m http.server 8000)

# Github branch rules 

 neue branch soll beschreiben was der neue code tut 
 
 z.B. movment für mario -> feature/movement
 
 z.B. bugfix das mario nicht durch den boden fählt -> bugfix/stop_mario_from_falling_to_the_ground
 
 # Github merge
 
 Beim pull request auf main ist ein code review erforderlich
 
 # Github Hilfe
 
 0. Einrichten der Umgebung
 git config --global user.email kacper.rogala@edu.fhdw.de
 git config --global user.name "Kacper"
 
 1. Geh zu deinem Ordner in der Konsole
 
 2. Clone das Projekt
 git clone https://github.com/Kollock5/marioGoesFHDW.git
 
 3. Neue Branch erstellen mit einem gewissen feature/movement
 git checkout -b feature/<feature name>
 
 4. Jetzt kann man in dem Projektordner arbeiten, Änderungen machen und alles was man möchte
 fall man eine neue Datei hinzugefügt hat, dann muss man die zum Git hinzufügen
 git add test.txt
 
 5. Jetzt muss man die Änderungen commiten 
 git commit -m "add test.txt"
 DIE MESSAGE SOLL SINNVOLL SEIN
 
 6. Um die Änderungen zu Git zu schicken muss man die pushen
 git push --set-upstream origin feature/test
 
 7. Die Neuste Version des Projekts kann man sich von der main holen
 git checkout main
 git pull
 # MarioGoesFHDW
 ## Projektname
 MarioGoesFHDW
 ## Autoren
 Max Klein
 Lorin Smith
 Felix Relovski
 Kacper Rogala
 ## Veröffentlichungsdatum
 08.09.2021
 ## Version
 1.0.0
 ## Browserkompatibilität
 Chromium Browser
 ## Known Bugs
 Flackern vom Bildschirm im EditorMode
 ## Installation
 1. Git bash öffnen
 2. Das Projekt vom Git herunterladen
 2.2. "git clone https://github.com/Kollock5/marioGoesFHDW.git"
 3. XAMP / python in dem Projektordner ausführen
 3.3. Für python: "python -m http.server 8000"
 4. Auf localhost:8000 gehen und spielen
 ## Lizenz
MIT License

Copyright (c) 2021 Max

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
#  FAQ
### Kann ich das Spiel auf dem Handy spielen?
Nein
### Was ist das für ein Spiel?
MarioGoesFHDW ist ein von Super Mario inspiriertes Adventure-Spiel, welches im Zusammenhang eines Projektes von FHDW-Studenten entwickelt wurde.
### Wie installiere ich das spiel? 
Sehe "Installation"
### Steuerung
[!Steuerung](https://github.com/Kollock5/marioGoesFHDW/blob/main/res/manual.png)
### Was muss ich in diesem Spiel machen?
Sammle Coins, EnergyDrinks, Brot und erreiche das Ziel (Flagge)
 # Github Teilleistung
 ## Requirements Engineering
 ### Mandatory 
 ### Functional Requirements
 ### Non-Functional Requirements
 ### Nice-to-have Requirements
 Max Klein
 Lorin Smith
 Felix Relovski
 Kacper Rogala
 ## Design and Development Menu
 ### Menu Design
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ### Menu Options
 Max Klein, Felix Relovski
 ### Menu Sounds
 Lorin Smith
 ### Menu Development
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ## Design and Development Game
 ### Game Design
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ### Level Editor
 Max Klein, Felix Relovski
 ### Sounds
 Lorin Smith
 ### Sprites
 Kacper Rogala
 ### Engine (Development)
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ## Testing, Correction and Submission
 ### Functionality Testing
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ### Final Correction
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ### Final Testing
 Max Klein, Lorin Smith, Felix Relovski, Kacper Rogala
 ### Preperation PSP & Pitch Slide
 Lorin Smith, Kacper Rogala
 ### Licensing and Rights
 Max Klein, Felix Relovski
 ### ReadMe
 Lorin Smith, Kacper Rogala
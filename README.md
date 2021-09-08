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
 # INFOS

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
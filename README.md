# 11_Gewerbe_Tool_MA

## Anmerkung 
* in diesem Github Repository befindet sich nur das frontend des Projekts, da das Backend auf Skripten der Forschungsgruppe für Solarspeichersysteme basiert, welche nicht öffentlich sind 

## Requirements 
* Python3 
* Node 

## Installation Projekt Linux / MacOS

### Backend

```
# Virtuelle Umgebung anlegen und aktivieren
    cd backend
    python3 -m venv gewerbe_tool_venv
    source gewerbe_tool_venv/bin/activate
# Packages installieren
    python -m pip install -r requirements.txt
# Backend starten (Debug Mode)
    FLASK_APP=app.py FLASK_DEBUG=1 flask run
```

### Frontend

```
# Packages installieren
    cd frontend
    npm i
# Frontend starten
    npm start
```

## Installation Windows 

### Requirements 
* node ^=18.12.1
* python ^= 3.11.1

### Backend starten 

```
# Virtuelle Umgebung anlegen und aktivieren 
    cd backend 
    py -3 -m venv gewerbe_tool_venv
    .\gewerbe_tool_venv\Scripts\activate.bat
# Packages installieren 
    pip install -r requirements_windows.txt
# Backend starten 
    flask run 
```

### Frontend 
```
# Packages installieren 
    cd .. 
    cd frontend 
    npm i 
# Frontend starten 
    npm start 
```

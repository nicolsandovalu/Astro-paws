# 🌌 Astro-Paws: Terminal de Estabilización Emocional (MVP)

Astro-Paws es una aplicación web interactiva diseñada para ofrecer contención emocional mediante la gamificación. A través de una interfaz inspirada en videojuegos retro (Pixel Art / 8-bits), los usuarios interactúan con "Astro", un compañero virtual que propone misiones cortas de activación conductual para ayudar a regular el estrés o la ansiedad.

## 🚀 Características Principales

* **Asistente Gamificado:** Chatbot impulsado por IA que asume el rol de un explorador espacial.
* **Misiones de Activación:** El sistema no da consejos clínicos, sino que propone pausas activas y tareas recreativas (15 minutos).
* **Sistema de Recompensas (XP):** Los usuarios ganan "Puntos de Calma" al confirmar que completaron sus misiones, los cuales actualizan el HUD visual en tiempo real.
* **Arquitectura Cliente-Servidor:** Separación limpia entre el Frontend (UI) y el Backend (Lógica de IA).

## 🛠️ Tecnologías Utilizadas

* **Backend:** Python, Flask, Flask-CORS.
* **Inteligencia Artificial:** Google Gemini API (`gemini-2.5-flash`).
* **Frontend:** HTML5, CSS3 (Estética Retro/Pixel Art), JavaScript Vanilla.
* **Control de Entorno:** `python-dotenv`.

## ⚙️ Instalación y Uso Local

Sigue estos pasos para ejecutar la terminal en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/astro-paws-terminal.git](https://github.com/tu-usuario/astro-paws-terminal.git)
   cd astro-paws-terminal```

## Crear y activar un entorno virtual (Recomendado):
```python -m venv venv```

# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate

## Instalar las dependencias:
```pip install -r requirements.txt```

## Configurar las Variables de Entorno:

 * **Crea un archivo llamado .env en la raíz del proyecto.** 

 * **Añade tu clave de API de Google AI Studio:
GEMINI_API_KEY=tu_clave_secreta_aqui**

## Ejecutar el Servidor:
```python app.py```

## Abrir la Interfaz:
Haz doble clic en el archivo index.html ubicado en tu carpeta de frontend para abrirlo en tu navegador y comenzar la interacción.

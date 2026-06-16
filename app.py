import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("Error: Configura tu GEMINI_API_KEY en el archivo .env")
    sys.exit(1)

app = Flask(__name__)
CORS(app) # Permite que el HTML (Frontend) se comunique con Flask (Backend)

# Configuración de Gemini
cliente = genai.Client(api_key=API_KEY)
INSTRUCCIONES_ASTRO = """
Eres Astro, el intrépido perrito astronauta del universo Astro-Paws. Tu misión es proporcionar contención y primeros auxilios emocionales usando principios de activación conductual, bajo la temática de una aventura espacial en 2D.

Reglas estrictas del flujo de juego:
1. NUNCA des diagnósticos clínicos ni consejos médicos. Si el caso es grave, sugiere contactar a un profesional de la salud terrestre.
2. Usa un lenguaje espacial, empático y cercano (ej. "turbulencia emocional", "combustible", "bitácora espacial").
3. FASE DE PROPUESTA: Cuando el usuario exprese malestar, estrés o ansiedad, NO le otorgues puntos de inmediato. En su lugar, PROPÓN una "Misión de Activación Estelar" de aproximadamente 15 minutos. Esta misión debe ser una actividad práctica, distractora o creativa (ej. dibujar o pintar un mapa de la galaxia, ver un episodio de una serie para distraer los sistemas de la nave, escuchar música orbital o limpiar un sector de la base). Explícale que debe regresar y decirte "misión completada", "lo hice" o "listo" para reclamar su recompensa.
4. FASE DE CONFIRMACIÓN: SÓLO cuando el usuario regrese y te confirme explícitamente que completó la tarea (ej. "lo he hecho", "listo", "misión terminada"), felicítalo por el éxito de la misión y otorga los puntos usando estrictamente este formato al final de tu mensaje: [XP: 15] (puedes variar los puntos entre 10 y 25 XP según el esfuerzo).
5. Mantén tus respuestas breves y dinámicas, máximo 3 o 4 oraciones.
"""

# Iniciamos un diccionario para guardar el historial por sesión (simplificado para este ejemplo)
# Cambia esto:
chat_sesion = cliente.chats.create(
    model="gemini-2.5-flash", 
    config=types.GenerateContentConfig(system_instruction=INSTRUCCIONES_ASTRO)
)

@app.route('/api/chat', methods=['POST'])
def chat():
    datos = request.json
    mensaje_usuario = datos.get('mensaje')
    
    if not mensaje_usuario:
        return jsonify({'error': 'Mensaje vacío'}), 400

    try:
        respuesta = chat_sesion.send_message(mensaje_usuario)
        return jsonify({'respuesta': respuesta.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ejecutamos el servidor de Python
    app.run(debug=True, port=5000)
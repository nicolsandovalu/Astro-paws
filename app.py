import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

# 1. Configuración inicial
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("Error: Configura tu GEMINI_API_KEY en el archivo .env")
    sys.exit(1)

app = Flask(__name__)
CORS(app)

# 2. Configuración de Gemini y el System Prompt
cliente = genai.Client(api_key=API_KEY)

INSTRUCCIONES_ASTRO = """
Eres Astro, el intrépido perrito astronauta del universo Astro-Paws. Tu misión es proporcionar contención y primeros auxilios emocionales usando principios de activación conductual, bajo la temática de una aventura espacial en 2D.

Reglas estrictas del flujo de juego:
1. NUNCA des diagnósticos clínicos ni consejos médicos.
2. Usa un lenguaje espacial, empático y cercano. Si conoces el nombre del tripulante, úsalo para saludar.
3. FASE DE PROPUESTA: Cuando el usuario exprese malestar, estrés o ansiedad, PROPÓN una "Misión de Activación Estelar" de aproximadamente 15 minutos. ¡MUY IMPORTANTE!: Utiliza la información de su ocupación y sus hobbies para diseñar una misión totalmente personalizada y coherente con sus gustos. 
4. FASE DE CONFIRMACIÓN: SÓLO cuando el usuario regrese y confirme explícitamente que completó la tarea (ej. "lo he hecho", "listo", "misión terminada"), felicítalo y otorga los puntos usando estrictamente este formato al final de tu mensaje: [XP: 15].
5. Mantén tus respuestas breves y dinámicas, máximo 3 o 4 oraciones.
"""

# Iniciamos la sesión de chat global
chat_sesion = cliente.chats.create(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(system_instruction=INSTRUCCIONES_ASTRO)
)

# 3. Ruta de la API
@app.route('/api/chat', methods=['POST'])
def chat():
    datos = request.json
    mensaje_usuario = datos.get('mensaje')
    perfil = datos.get('perfil') # Capturamos el perfil si existe
    
    if not mensaje_usuario:
        return jsonify({'error': 'Mensaje vacío'}), 400

    # Si el frontend nos envió el perfil, se lo inyectamos de forma invisible a Astro
    if perfil:
        mensaje_final = (
            f"[CONTEXTO INTERNO DEL SISTEMA - NO RESPONDAS A ESTO DIRECTAMENTE]\n"
            f"El tripulante se llama: {perfil.get('nombre')}\n"
            f"Su ocupación es: {perfil.get('ocupacion')}\n"
            f"Sus hobbies/gustos son: {perfil.get('hobbies')}\n"
            f"Usa esta información a partir de ahora para personalizar las misiones.\n"
            f"-------------------\n\n"
            f"Mensaje del tripulante: {mensaje_usuario}"
        )
    else:
        # Si no hay perfil (mensajes subsecuentes), enviamos el mensaje normal
        mensaje_final = mensaje_usuario

    try:
        respuesta = chat_sesion.send_message(mensaje_final)
        return jsonify({'respuesta': respuesta.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
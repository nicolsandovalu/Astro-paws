const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const scoreDisplay = document.getElementById('score-display'); // Capturamos el contador de XP

// Variable global para guardar los puntos
let puntosTotales = 0;

// Función para agregar mensajes al DOM
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Función para detectar puntos, actualizar el HUD y limpiar el texto
function procesarPuntos(textoBot) {
    // Busca exactamente la etiqueta oculta [XP: numero] sin importar mayúsculas
    const regex = /\[XP:\s*(\d+)\]/i;
    const coincidencia = textoBot.match(regex);

    if (coincidencia) {
        // Extraemos el número y lo sumamos
        const puntosGanados = parseInt(coincidencia[1]);
        puntosTotales += puntosGanados;
        
        // Actualizamos el HTML
        scoreDisplay.textContent = puntosTotales + ' XP';
        
        // Pequeña animación: hace que el texto parpadee en blanco al ganar puntos
        scoreDisplay.style.color = '#ffffff';
        setTimeout(() => {
            scoreDisplay.style.color = '#00ffcc';
        }, 300);

        // Devolvemos el texto SIN la etiqueta [XP: 15] para que no se vea en pantalla
        return textoBot.replace(regex, '').trim();
    }
    
    // Si no hay puntos, devolvemos el texto original tal cual
    return textoBot;
}

// Función principal
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    try {
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mensaje: text })
        });

        const data = await response.json();

        if (response.ok) {
            // 1. Procesamos y limpiamos la respuesta de la IA (buscando los XP)
            const textoLimpio = procesarPuntos(data.respuesta); 
            
            // 2. Mostramos en pantalla el texto ya limpio, sin corchetes
            appendMessage(textoLimpio, 'bot');
        } else {
            appendMessage('Error en la nave: ' + (data.error || 'Desconocido'), 'bot');
        }
    } catch (error) {
        appendMessage('Error de conexión con la base espacial.', 'bot');
        console.error(error);
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
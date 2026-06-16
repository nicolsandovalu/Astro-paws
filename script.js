// Referencias al DOM
const onboardingScreen = document.getElementById('onboarding-screen');
const terminalScreen = document.getElementById('terminal-screen');
const onboardingForm = document.getElementById('onboarding-form');
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');

// Memoria del juego
let perfilUsuario = {};
let puntosTotales = 0;
let primerMensajeEnviado = false; // Bandera para saber si es el inicio de la charla

// 1. Manejo del Onboarding
onboardingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    perfilUsuario = {
        nombre: document.getElementById('user-name').value.trim(),
        ocupacion: document.getElementById('user-job').value.trim(),
        hobbies: document.getElementById('user-hobbies').value.trim()
    };

    // Cambiar de pantalla
    onboardingScreen.style.display = 'none';
    terminalScreen.style.display = 'flex';
    
    // Auto-foco en el input del chat para que sea rápido escribir
    userInput.focus();
});

// 2. Funciones de UI del Chat
function appendMessage(text, sender) {
    const messageDiv = document.createElement('article');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function procesarPuntos(textoBot) {
    const regex = /\[XP:\s*(\d+)\]/i;
    const coincidencia = textoBot.match(regex);

    if (coincidencia) {
        const puntosGanados = parseInt(coincidencia[1]);
        puntosTotales += puntosGanados;
        scoreDisplay.textContent = puntosTotales + ' XP';
        
        scoreDisplay.style.color = '#ffffff';
        setTimeout(() => { scoreDisplay.style.color = '#00ffcc'; }, 300);

        return textoBot.replace(regex, '').trim();
    }
    return textoBot;
}

// 3. Comunicación con el Backend
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Preparamos los datos a enviar
    // Si es el primer mensaje, enviamos el perfil para que Astro lo aprenda
    const payload = {
        mensaje: text,
        perfil: primerMensajeEnviado ? null : perfilUsuario 
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            primerMensajeEnviado = true; // Ya enviamos el perfil, no hace falta repetirlo
            const textoLimpio = procesarPuntos(data.respuesta); 
            appendMessage(textoLimpio, 'bot');
        } else {
            appendMessage('Error en la nave: ' + (data.error || 'Desconocido'), 'bot');
        }
    } catch (error) {
        appendMessage('Error de conexión con la base espacial.', 'bot');
        console.error(error);
    }
}

// 4. Evento del Chat
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});
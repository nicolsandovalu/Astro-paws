<<<<<<< Updated upstream
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const scoreDisplay = document.getElementById('score-display'); // Capturamos el contador de XP

// Variable global para guardar los puntos
let puntosTotales = 0;

// Función para agregar mensajes al DOM
=======
// =========================================
// Astro-Paws: Retro Galáctica Backend (JS)
// =========================================

// 1. Referencias al DOM (Conectando el HTML con JS)
const onboardingScreen = document.getElementById('onboarding-screen');
const terminalScreen = document.getElementById('terminal-screen');
const onboardingForm = document.getElementById('onboarding-form');
const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const scoreDisplay = document.getElementById('score-display');
const astroMapCharacter = document.getElementById('astro-on-map'); // NUEVO: El sprite en el mapa

// 2. Memoria y Estado del Juego
let perfilUsuario = {};
let puntosTotales = 0;
let primerMensajeEnviado = false; 

// 3. Lógica del Onboarding (Pasar de la pantalla inicial al chat)
onboardingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página intente recargar
    
    // Guardamos los datos
    perfilUsuario = {
        nombre: document.getElementById('user-name').value.trim(),
        ocupacion: document.getElementById('user-job').value.trim(),
        hobbies: document.getElementById('user-hobbies').value.trim()
    };

    // Ocultamos el registro y mostramos la terminal
    onboardingScreen.style.display = 'none';
    terminalScreen.style.display = 'flex';
    
    // Aseguramos que Astro esté en la posición inicial (Node 1) al empezar
    actualizarMapaMisiones(0);
    userInput.focus();
});

// 4. Lógica de Navegación del Personaje (Estilo Mario / Crash Bandicoot)

// Función para mover al personaje (Astro) suavemente al nodo activo
function moverAstroGalactico(nodoActivo) {
    if (!nodoActivo) return;
    
    // Primero, desbloqueamos la animación de Astro si estaba oculta
    if (astroMapCharacter.classList.contains('locked')) {
        astroMapCharacter.classList.remove('locked');
    }

    // Calculamos las coordenadas del nodo activo en relación al mapa
    const nodoRect = nodoActivo.getBoundingClientRect();
    const mapaRect = nodoActivo.parentElement.getBoundingClientRect();
    
    // Calculamos la posición horizontal objetivo (left) para centrar a Astro sobre el nodo
    // (Ajustar los números para centrado fino del sprite)
    const targetLeft = nodoRect.left - mapaRect.left + (nodoRect.width / 2) - (astroMapCharacter.offsetWidth / 2);
    
    // Aplicamos la nueva posición como un estilo de CSS
    // El CSS .map-character se encargará de la transición suave gracias a 'transition: left'
    astroMapCharacter.style.left = targetLeft + 'px';
    
    // Opcional: Podrías añadir una animación de 'caminando' aquí usando clases de CSS
}

// Actualizada para incluir el movimiento del personaje
function actualizarMapaMisiones(xp) {
    const niveles = [
        { id: 'node-1', xpReq: 0 },
        { id: 'node-2', xpReq: 15 },
        { id: 'node-3', xpReq: 30 },
        { id: 'node-4', xpReq: 45 },
        { id: 'node-5', xpReq: 60 } 
    ];

    let currentActiveNode = null; // Variable para encontrar el nodo activo

    niveles.forEach((nivel, index) => {
        const nodo = document.getElementById(nivel.id);
        
        if (xp >= nivel.xpReq) {
            const superoElSiguiente = (index < niveles.length - 1) && (xp >= niveles[index + 1].xpReq);
            
            if (superoElSiguiente) {
                // Nivel superado por completo
                nodo.className = 'level-node completed';
            } else {
                // Este es el nodo en el que se encuentra
                nodo.className = 'level-node active';
                currentActiveNode = nodo; // Guardamos este nodo para mover a Astro
            }
        } else {
            // Nivel bloqueado
            nodo.className = 'level-node locked';
        }
    });

    // ¡NUEVO! Movemos al personaje al nodo activo
    moverAstroGalactico(currentActiveNode);
}

// 5. Funciones de UI del Chat
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        
        // Actualizamos el HTML
        scoreDisplay.textContent = puntosTotales + ' XP';
        
        // Pequeña animación: hace que el texto parpadee en blanco al ganar puntos
=======
        
        // Actualizamos contador de texto
        scoreDisplay.textContent = puntosTotales + ' XP';
>>>>>>> Stashed changes
        scoreDisplay.style.color = '#ffffff';
        setTimeout(() => {
            scoreDisplay.style.color = '#00ffcc';
        }, 300);

<<<<<<< Updated upstream
        // Devolvemos el texto SIN la etiqueta [XP: 15] para que no se vea en pantalla
=======
        // Actualizamos el mapa visual y movemos a Astro
        actualizarMapaMisiones(puntosTotales);

>>>>>>> Stashed changes
        return textoBot.replace(regex, '').trim();
    }
    
    // Si no hay puntos, devolvemos el texto original tal cual
    return textoBot;
}

<<<<<<< Updated upstream
// Función principal
=======
// 6. Comunicación con el Backend (Flask / Python)
>>>>>>> Stashed changes
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

<<<<<<< Updated upstream
=======
    const payload = {
        mensaje: text,
        perfil: primerMensajeEnviado ? null : perfilUsuario 
    };

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            // 1. Procesamos y limpiamos la respuesta de la IA (buscando los XP)
=======
            primerMensajeEnviado = true; 
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
=======
// 7. Evento de Envío de Chat
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
>>>>>>> Stashed changes
});
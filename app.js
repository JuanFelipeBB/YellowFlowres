const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const content = document.getElementById("content");
const message = document.getElementById("message");
const music = document.getElementById("bgMusic");

const messages = [
    "Sé que te gustan las flores amarillas...",

    "...y no podía dejar pasar la ocasión sin regalarte las tuyas.",

    "Nile mereces todo lo que la vida pueda ofrecerte...",

    "...Y aun asi ella quedaría en deuda contigo!  🌻"
];


// =========================================
// INICIAR EXPERIENCIA
// =========================================

startBtn.addEventListener("click", startExperience);


async function startExperience() {

    // Evitar doble ejecución
    startBtn.disabled = true;

    // -----------------------------------------
    // Música
    // -----------------------------------------

    music.volume = 0.6;

    try {

        // Importante para Safari/iPhone:
        // play() ocurre directamente dentro del click.
        await music.play();

    } catch (error) {

        console.warn(
            "La música no pudo reproducirse:",
            error
        );

    }


    // -----------------------------------------
    // Ocultar pantalla inicial
    // -----------------------------------------

    intro.classList.add("hide");


    // -----------------------------------------
    // Mostrar contenido
    // -----------------------------------------

    setTimeout(() => {

        content.classList.remove("hidden");

    }, 400);


    // -----------------------------------------
    // Lluvia de pétalos
    // -----------------------------------------

    startPetalRain();


    // -----------------------------------------
    // Mostrar mensajes
    // -----------------------------------------

    showMessages();

    // NUEVO
    startInteractiveGarden();
}


// =========================================
// MENSAJES
// =========================================

function showMessages() {

    let currentMessage = 0;

    function showNextMessage() {

        if (currentMessage >= messages.length) {
            return;
        }

        // Mostrar mensaje
        message.textContent = messages[currentMessage];

        message.classList.add("show");


        // Después de ~6 segundos comienza a desaparecer
        setTimeout(() => {

            message.classList.remove("show");


            // Esperamos a que termine el fade
            // antes de mostrar el siguiente
            setTimeout(() => {

                currentMessage++;

                showNextMessage();

            }, 1000);

        }, 6000);
    }

    // Pequeña espera para que aparezca primero la flor
    setTimeout(() => {

        showNextMessage();

    }, 1800);
}


// =========================================
// LLUVIA DE PÉTALOS
// =========================================

function startPetalRain() {

    const duration = 180000;

    const startTime = Date.now();


    const interval = setInterval(() => {

        createPetal();


        if (Date.now() - startTime >= duration) {

            clearInterval(interval);

        }

    }, 350);
}


// =========================================
// CREAR PÉTALO
// =========================================

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal-rain";


    // Posición horizontal aleatoria
    petal.style.left =
        Math.random() * 100 + "vw";


    // Tamaño aleatorio
    const size =
        8 + Math.random() * 10;

    petal.style.width = size + "px";
    petal.style.height = size * 1.5 + "px";


    // Duración aleatoria
    const duration =
        5 + Math.random() * 5;

    petal.style.animationDuration =
        duration + "s";


    // Retraso aleatorio
    petal.style.animationDelay =
        Math.random() * 1.5 + "s";


    // Variación de opacidad
    petal.style.opacity =
        0.4 + Math.random() * 0.5;


    document.body.appendChild(petal);


    // Eliminar cuando termine
    setTimeout(() => {

        petal.remove();

    }, (duration + 2) * 1000);
}

// =========================================
// GIRASOLES INTERACTIVOS
// =========================================

const interactiveGarden =
    document.getElementById(
        "interactiveGarden"
    );

const popupMessage =
    document.getElementById(
        "popupMessage"
    );


// =========================================
// MENSAJES ALEATORIOS
// =========================================

const randomMessages = [

    "Espero que hoy tengas un día tan bonito como un atardecer el playa mansa. 💛",

    "Negra que nunca te falten motivos para sonreír. 🌻",

    "Un pequeño girasol para recordarte que pienso en ti y en tus jojitos.",

    "Gracias por formar parte de mis días, antes como amiga y ahora como pareja. 💛",

    "Si pudiera, hoy llenaría tu habitación de flores amarillas.",

    "Nunca olvide hasta donde ha llegado y todo lo que ha construido solita. 💛",

    "Que este pequeño detalle te saque una sonrisa que haga visibles tus ayuelos. 🌻",

    "Tú iluminas los días de la gente que quieres sin siquiera intentarlo.",

    "Este girasol encontró su camino hasta ti, espero yo encontrarlo tambien. 💛",

    "Ojalá pudiera regalarte mucho más, algun día lo tendremos.",

    "Tu has sido la primavera 💛 que llego a mi vida para quedarse.",

    "Eres tan preciosa como una puesta de sol en Playa Mansa 🌄☀️.",

    "Cada momento a tu lado se siente tan calido como el sol mañanero.",

    "Eres esa canción que no me canso de escuchar.",

    "Solo quería recordarte lo especial ⭐ que eres para mí. 🤭🌻"

];


// =========================================
// CREAR GIRASOL
// =========================================

function createInteractiveSunflower() {

    const existing =
        document.querySelectorAll(
            ".mini-sunflower"
        );

    if (existing.length >= 3) {
        return;
    }

    const flower =
        document.createElement("div");

    flower.className =
        "mini-sunflower";


    // -----------------------------------------
    // Posición aleatoria
    // -----------------------------------------

    const margin = 10;

    const x =
        margin +
        Math.random() *
        (100 - margin * 2);

    const y =
        margin +
        Math.random() *
        (100 - margin * 2);


    flower.style.left =
        x + "vw";

    flower.style.top =
        y + "vh";


    // -----------------------------------------
    // Click / Touch
    // -----------------------------------------

    flower.addEventListener(
        "click",
        () => {

            showRandomMessage();

            flower.style.animation =
                "miniFlowerDisappear .5s ease forwards";


            setTimeout(() => {

                flower.remove();

            }, 500);

        },
        {
            once: true
        }
    );


    interactiveGarden.appendChild(
        flower
    );
}


// =========================================
// MENSAJE ALEATORIO
// =========================================

let lastMessageIndex = -1;


function showRandomMessage() {

    let index;


    // Evitar repetir inmediatamente
    do {

        index =
            Math.floor(
                Math.random() *
                randomMessages.length
            );

    } while (
        index === lastMessageIndex &&
        randomMessages.length > 1
    );


    lastMessageIndex = index;


    popupMessage.textContent =
        randomMessages[index];


    popupMessage.classList.add(
        "show"
    );


    // Ocultar después de 4 segundos

    setTimeout(() => {

        popupMessage.classList.remove(
            "show"
        );

    }, 4000);
}


// =========================================
// APARICIÓN CADA 10 SEGUNDOS
// =========================================

let sunflowerInterval;


function startInteractiveGarden() {

    // Primero aparece uno
    // para que el usuario descubra
    // que son interactivos.

    setTimeout(() => {

        createInteractiveSunflower();

    }, 5000);


    // Después cada 10 segundos

    sunflowerInterval =
        setInterval(() => {

            createInteractiveSunflower();

        }, 10000);
}

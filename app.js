const PIEDRA = "rock";
const PAPEL= "paper";
const TIJERA = "scissors";

const EMPATE = 0;
const GANAR = 1;
const PERDER = 2;

let jugando = false;

const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tijeraBtn = document.getElementById("tijera");
const resultadoTexto = document.getElementById("start-texto");
const userImg = document.getElementById("user-img");
const machineImg = document.getElementById("machine-img");

piedraBtn.addEventListener("click", () => {
    play(PIEDRA);
});
papelBtn.addEventListener("click", () => {
    play(PAPEL);
});
tijeraBtn.addEventListener("click", () => {
    play(TIJERA);
});

function play(userOption) {
    if(jugando) return;

    jugando = true;

    userImg.src = "img/" + userOption + ".svg";

    resultadoStyle('Pensando...', 'black', '100')

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "img/" + machineOption + ".svg";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResultado(userOption, machineOption);

        machineImg.src = "img/" + machineOption + ".svg";

        switch (result) {
            case EMPATE:
                resultadoStyle('¡Empate!', 'black', 'bolder')
                break;
            case GANAR:
                resultadoStyle('¡Ganaste!', 'Green', 'bolder')
                break;
            case PERDER:
                resultadoStyle('¡Perdiste!', 'Red', 'bolder')
                break;
        }
        jugando = false;
    }, 2000);
}
function resultadoStyle(texto, color, weight){
    resultadoTexto.innerHTML = texto;
    resultadoTexto.style.color = color;
    resultadoTexto.style.fontWeight = weight;
}

function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERA;
    }
}

function calcResultado(userOption, machineOption) {
    if (userOption === machineOption) {
        return EMPATE;

    } else if (userOption === PIEDRA) {

        if (machineOption === PAPEL) return PERDER;
        if (machineOption === TIJERA) return GANAR;

    } else if (userOption === PAPEL) {

        if (machineOption === TIJERA) return PERDER;
        if (machineOption === PIEDRA) return GANAR;

    } else if (userOption === TIJERA) {

        if (machineOption === PIEDRA) return PERDER;
        if (machineOption === PAPEL) return GANAR;

    }
}




let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosPC = 0;

// referencias del html
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computer-cartas')
const puntosHTML = document.querySelectorAll('small')



// esta funcion crea una nueva baraja
const crearDeck = () => {
    for ( let i = 2; i <= 10; i++) {
        for( let tipo of tipos ) {
            deck.push( i + tipo)
        }
    }
    for( let tipo of tipos) {
        for( let esp of especiales ) {
            deck.push( esp + tipo)
        }
    }
    // console.log(deck)
    deck = _.shuffle(deck)
    console.log(deck)
    return deck;
 
}

crearDeck();

//esta funcion para pedir carta

const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop()
    return carta;
};


    // pedirCarta()
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? ( puntos = ( valor === 'A' ) ? 11 : 10 ) : puntos = valor *1;   
};

//Turno PC
const turnoPC = (puntosMinimos) => {
  do {
        
    const carta = pedirCarta(); 

    puntosPC = puntosPC + valorCarta(carta);
    puntosHTML[1].innerText = puntosPC;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')

    divCartasComputadora.append(imgCarta)

    if (puntosMinimos > 21) {
        break;
    }
} while ((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

setTimeout(()=> {
    if (puntosPC === puntosMinimos) {
        alert('Nadie gana :(')
    } else if (puntosMinimos > 21) {
        alert('Gano la Computadora!!')
    } else if (puntosPC > 21) {
        alert('Gana el Jugador 1 !!!!!')
    } else {
        alert('Gana la compútadora!')
    }

}, 500)

}


// Eventos
btnPedir.addEventListener('click', function() {
    const carta = pedirCarta(); 

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta')

    divCartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true; 
        btnDetener.disabled = true;
        turnoPC(puntosJugador);   
    } else if (puntosJugador === 21 ) {
        console.warn('Genial!! hiciste 21.')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoPC(puntosJugador);      
    }
    });
    
    btnDetener.addEventListener('click', function() {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoPC(puntosJugador);
        
    });


    btnNuevo.addEventListener('click', () => {
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosPC = 0;
        puntosHTML[0].innerHTML = 0;
        puntosHTML[1].innerHTML = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
    });


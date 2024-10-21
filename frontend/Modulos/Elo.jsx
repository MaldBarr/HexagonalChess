//Sistema de Elo, los calculos se hacen en este archivo
//Formula para calcular el Elo
//Ra' = Ra + K * (Sa - Ea)
//Donde:
//Ra' = Nuevo Elo del jugador
//Ra = Elo actual del jugador
//K = Constante, en este caso 20
//Sa = Puntuación del jugador en la partida 1 si gana, 0.75 si realiza stalemate, 0.25 si recibe stalemate, 0 si pierde
//Ea = Puntuación esperada del jugador
//Ea = 1 / (1 + 10^((Rb - Ra) / 400))

function calcularElo(Ra, Rb, Sa) {
    const K = 20;
    var Ea = 1 / (1 + Math.pow(10, ((Rb - Ra) / 400)));
    return Ra + K * (Sa - Ea);
}

export default calcularElo;
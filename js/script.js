//Generar el mundo de pacman
//Establecemos el tamaño del mapa, tomando como limites un mínimo de 10 y máximo de 15 tanto para ancho como alto
var setX = Math.floor(Math.random() * 6) + 10;
var setY = Math.floor(Math.random() * 6) + 10;
//Definimos la probabilidad de que se generen muros
var wallProb = 0.1;
//Definimos la probabilidad de que aparezcan onigiris
var cerezaProb = 0.2;
//Definimos la variable para almacenar los puntos necesarios para ganar
var winPoints = 0;
//Definimos la variable para almacenar los puntos de pacman
var score = 0;
//Definimos el diccionario de elementos
var elementos = {
    1: "blank",
    2: "wall",
    3: "coin",
    4: "cereza",
};
//Generamos el mundo de manera aleatoria
var mundo = new Array(setY);

for (var i = 0; i < setY; i++) {
    mundo[i] = new Array(setX);
    for (var j = 0; j < setX; j++) {
        //Generamos los bordes
        if (i == 0 || i == setY - 1 || j == 0 || j == setX - 1) {
            mundo[i][j] = 2;
        } else if (i == 1 && j == 1) {
            //usamos la posicion 1,1 del mapa como posición inicial de pacman
            mundo[i][j] = 1;
        } else {
            //Generamos el resto del mapa
            if (Math.random() < wallProb) {
                mundo[i][j] = 2;
            } else if (Math.random() < cerezaProb) {
                mundo[i][j] = 4;
                winPoints += 50;
            } else {
                mundo[i][j] = 3;
                winPoints += 10;
            }
        }
    }
}
//Mostramos el mundo en pantalla
function drawWorld() {
    var output = "";
    for (var i = 0; i < setY; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < setX; j++) {
            output += "<div class='" + elementos[mundo[i][j]] + "'></div>";
        }
        output += "</div>";
    }
    console.log(output);
    document.getElementById("world").innerHTML = output;
    if (score >= winPoints) {
        alert("Ganaste!");
        location.reload();
    }
}
drawWorld();
//Definimos la posición inicial de pacman
var pacman = {
    x: 1,
    y: 1,
};
//mostramos a pacman por pantalla
function drawPacman() {
    document.getElementById("pacman").style.top = pacman.y * 40 + "px";
    document.getElementById("pacman").style.left = pacman.x * 40 + "px";
}
drawPacman();
//Definimos la función para mover a pacman y contabilizar sus puntos
document.onkeydown = function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 37) {
        //Izquierda
        if (mundo[pacman.y][pacman.x - 1] != 2) {
            pacman.x--;
            document.getElementById("pacman").style.transform = "rotate(0deg)";
        }
    } else if (e.keyCode == 39) {
        //Derecha
        if (mundo[pacman.y][pacman.x + 1] != 2) {
            pacman.x++;
            document.getElementById("pacman").style.transform =
                "rotate(180deg)";
        }
    } else if (e.keyCode == 38) {
        //Arriba
        if (mundo[pacman.y - 1][pacman.x] != 2) {
            pacman.y--;
            document.getElementById("pacman").style.transform = "rotate(90deg)";
        }
    } else if (e.keyCode == 40) {
        //Abajo
        if (mundo[pacman.y + 1][pacman.x] != 2) {
            pacman.y++;
            document.getElementById("pacman").style.transform =
                "rotate(270deg)";
        }
    }
    drawPacman();
    drawWorld();
    if (mundo[pacman.y][pacman.x] == 3) {
        score += 10;
        mundo[pacman.y][pacman.x] = 1;
    } else if (mundo[pacman.y][pacman.x] == 4) {
        score += 50;
        mundo[pacman.y][pacman.x] = 1;
    }
    document.getElementById("score").innerHTML = "Puntos: " + score;
    if (score >= winPoints) {
        alert("¡Felicidades, Has Ganado!");
        location.reload();
    }
};

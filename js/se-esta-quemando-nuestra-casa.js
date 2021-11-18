var canvas;
var ctx;
var fuente = new FontFace(
  "Orbitron-Bold",
  "url(fuente/Orbitron-Bold.ttf) format('truetype')"
);
document.fonts.add(fuente);
fuente.load().then(dibujar);

var inicio = false;
var instrucciones = false;
var intervalo;
var volar;
var colorBoton = "#f0c337";
var posicionFondo = 0;

var puntos = 0;
var vidas = 3;

var imgPersonaje1;
var imgFuego;
var imgGota;
var imgGusano;
var imgTronco;
var imgCorazonUno;
var imgCorazonDos;
var imgCorazonTres;
var imgFondo;

// var audioPerdida;
// var audioTraga;
// var audioAmbiente;
// var audioFuego;

var personajeUno = new Personaje(100, 200, 146, 107);
var fuegoUno = new Elemento(820, 300, "fuego", 68, 68);
var gotaUno = new Elemento(1000, 200, "gota", 68, 68);
var gusanoUno = new Elemento(820, 300, "gusano", 68, 68);
var troncoUno = new Elemento(1000, 200, "tronco", 68, 68);
var corazonUno = new Corazon(690, 10, 30, 30);
var corazonDos = new Corazon(725, 10, 30, 30);
var corazonTres = new Corazon(760, 10, 30, 30);

function dibujar() {
  clearInterval(intervalo);
  canvas = document.getElementById("canvas");
  canvas.style.backgroundImage = "url(img/inicio.png)";
  canvas.style.backgroundSize = "cover";
  canvas.style.backgroundPosition = "0px 0px";
  ctx = canvas.getContext("2d");
}

function instruye() {
  inicio = true;
  canvas.style.backgroundImage = "url(img/instrucciones.png)";
  canvas.style.backgroundSize = "cover";
  dibujarTextoInstrucciones();
}

function juego() {
  instrucciones = true;
  canvas.style.cursor = "";

  canvas.style.backgroundImage = "url(img/fondo1.png)";
  canvas.style.backgroundSize = "cover";

  imgPersonaje1 = new Image();
  imgPersonaje1.src = `img/personaje.png`;
  imgPersonaje1.onload = function () {
    personajeUno.dibujaPersonaje();
  };

  imgGusano = new Image();
  imgGusano.src = "img/gusano.png";
  imgGusano.onload = function () {
    gusanoUno.dibujaElemento(imgGusano);
  };

  imgTronco = new Image();
  imgTronco.src = "img/tronco.png";
  imgTronco.onload = function () {
    troncoUno.dibujaElemento(imgTronco);
  };

  imgFuego = new Image();
  imgFuego.src = "img/fuego.png";
  imgFuego.onload = function () {
    fuegoUno.dibujaElemento(imgFuego);
  };

  imgGota = new Image();
  imgGota.src = "img/gota.png";
  imgGota.onload = function () {
    gotaUno.dibujaElemento(imgGota);
  };

  imgCorazonUno = new Image();
  imgCorazonUno.src = "img/corazonLleno.png";
  imgCorazonUno.onload = function () {
    corazonUno.dibujaCorazon(imgCorazonUno);
  };

  imgCorazonDos = new Image();
  imgCorazonDos.src = "img/corazonLleno.png";
  imgCorazonDos.onload = function () {
    corazonDos.dibujaCorazon(imgCorazonDos);
  };

  imgCorazonTres = new Image();
  imgCorazonTres.src = "img/corazonLleno.png";
  imgCorazonTres.onload = function () {
    corazonTres.dibujaCorazon(imgCorazonTres);
  };

  /* audioPerdida = new Audio();
  audioPerdida.src = "audios/pierde.mp3";
  audioTraga = new Audio();
  audioTraga.src = "audios/traga.mp3";
  audioAmbiente = new Audio();
  audioAmbiente.src = "audios/ambiente.mp3";
  audioFuego = new Audio();
  audioFuego.src = "audios/fuego.mp3"; */

  intervalo = setInterval(function () {
    borrar();
    if (vidas == 0 || puntos == -1000) {
      ctx.font = "80px Orbitron-Bold";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("PERDISTE", 300, 300);
      ctx.fillStyle = colorBoton;
      ctx.font = "30px Orbitron-Bold";
      ctx.fillText("REINICIAR", 350, 350);

      inicio = false;
    } else if (puntos == 1000) {
      ctx.font = "80px Orbitron-Bold";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("GANASTE!", 300, 300);
      ctx.fillStyle = colorBoton;
      ctx.font = "30px Orbitron-Bold";
      ctx.fillText("REINICIAR", 350, 350);

      inicio = false;
    } else if (inicio == true) {
      dibujaTexto();
      posicionFondo -= 3;
      canvas.style.backgroundPosition = posicionFondo + "px 0";
      gusanoUno.mover();
      troncoUno.mover();
      fuegoUno.moverRapido();
      gotaUno.moverRapido();
      gusanoUno.colision();
      troncoUno.colision();
      fuegoUno.colisionRapida();
      gotaUno.colisionRapida();
      if (vidas == 3) {
        imgCorazonTres.src = "img/corazonLleno.png";
        imgCorazonDos.src = "img/corazonLleno.png";
        imgCorazonUno.src = "img/corazonLleno.png";
        canvas.style.backgroundImage = "url(img/fondo1.png)";
        canvas.style.backgroundSize = "cover";
        // audioFuego.volume = 0;
      } else if (vidas == 2) {
        imgCorazonTres.src = "img/corazonVacio.png";
        imgCorazonDos.src = "img/corazonLleno.png";
        imgCorazonUno.src = "img/corazonLleno.png";
        canvas.style.backgroundImage = "url(img/fondo2.png)";
        canvas.style.backgroundSize = "cover";
        // audioFuego.volume = 0.2;
      } else if (vidas == 1) {
        imgCorazonTres.src = "img/corazonVacio.png";
        imgCorazonDos.src = "img/corazonVacio.png";
        imgCorazonUno.src = "img/corazonLleno.png";
        canvas.style.backgroundImage = "url(img/fondo3.png)";
        canvas.style.backgroundSize = "cover";
        // audioFuego.volume = 0.7;
      }
      personajeUno.dibujaPersonaje();
      gusanoUno.dibujaElemento(imgGusano);
      troncoUno.dibujaElemento(imgTronco);
      fuegoUno.dibujaElemento(imgFuego);
      gotaUno.dibujaElemento(imgGota);
      corazonUno.dibujaCorazon(imgCorazonUno);
      corazonDos.dibujaCorazon(imgCorazonDos);
      corazonTres.dibujaCorazon(imgCorazonTres);
      // audioAmbiente.play();
      // audioFuego.play();
    } else {
      dibujar();
    }
  }, 1000 / 25);
}

function dibujarTextoInstrucciones() {
  borrar();
  ctx.font = "40px Orbitron-Bold";
  ctx.fillStyle = colorBoton;
  ctx.fillText("¡Jugar!", 330, 300);
}

function dibujaTexto() {
  ctx.font = "35px Orbitron-Bold"; //definia la fuente
  ctx.fillStyle = "#ffffff"; //definia el color
  //Dibuja un texto recibe 3 valores, el texto, posX, posY
  ctx.fillText("Puntos: " + puntos, 20, 40);
}

function Personaje(x, y, ancho, alto) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;

  this.arriba = function () {
    if (this.y > 10) {
      this.y -= 20;
    }
    imgPersonaje1.src = `img/personaje.png`;
  };
  this.abajo = function () {
    if (this.y < 340) {
      //depende del fondo
      this.y += 20;
      //this.x+=20; //esto si quiero q salte, e incremento y en 30
    }
    imgPersonaje1.src = `img/personaje2.png`;
  };

  this.dibujaPersonaje = function () {
    ctx.drawImage(imgPersonaje1, this.x, this.y, this.ancho, this.alto);
  };
}

function Corazon(x, y, ancho, alto) {
  this.x = x;
  this.y = y;
  this.ancho = ancho;
  this.alto = alto;

  this.dibujaCorazon = function (img) {
    ctx.drawImage(img, this.x, this.y, this.ancho, this.alto);
  };
}

function Elemento(x, y, tipo, ancho, alto) {
  //agregar unafuncion mas segun si cae o se mueve, con una coalision diferente!!!y movimiento diferente
  this.x = x;
  this.y = y;
  this.tipo = tipo;
  this.ancho = ancho;
  this.alto = alto;

  this.dibujaElemento = function (img) {
    ctx.drawImage(img, this.x, this.y, this.ancho, this.alto);
  };

  this.mover = function () {
    if (this.x > -10) {
      this.x -= 10;
    } else {
      this.sortear();
    }
  };
  this.sortear = function () {
    //sorteo en x
    //formula(maximo-minimo+1)+minimo
    //en x, entre 900 y 1500

    this.x = Math.floor(Math.random() * (1000 - 900 + 1)) + 900;

    //en y, entre 0 y 450 (depende del fondo)
    this.y = Math.floor(Math.random() * (500 - 0 + 1)) + 0;
  };

  this.colision = function () {
    if (
      this.y + this.alto > personajeUno.y &&
      this.y < personajeUno.y + personajeUno.alto &&
      this.x + this.ancho > personajeUno.x &&
      this.x < personajeUno.x + personajeUno.ancho
    ) {
      this.sortear();
      if (this.tipo == "gusano") {
        //aca creo q deberiamos hacer un switch pq tenemos 4 elementos, no ?
        puntos += 100;
        // audioTraga.play();
      } else if (this.tipo == "tronco") {
        puntos -= 100;
        // audioPerdida.play();
      }
    }
  };

  this.moverRapido = function () {
    if (this.x > -15) {
      this.x -= 15;
    } else {
      this.sortear();
    }
  };

  this.colisionRapida = function () {
    if (
      this.y + this.alto > personajeUno.y &&
      this.y < personajeUno.y + personajeUno.alto &&
      this.x + this.ancho > personajeUno.x &&
      this.x < personajeUno.x + personajeUno.ancho
    ) {
      this.sortear();
      if (this.tipo == "gota" && vidas == 3) {
        // audioTraga.play();
      } else if (this.tipo == "gota" && vidas < 3) {
        vidas++;
        // audioTraga.play();
      } else if (this.tipo == "fuego") {
        vidas--;
        // audioPerdida.play();
      }
    }
  };
}

function borrar() {
  canvas.width = 800;
  canvas.heigth = 450;
}

document.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 38:
      //teclaSalto=true; //solo si hay salto
      personajeUno.arriba(); //
      break;
    case 40:
      personajeUno.abajo(); //o agachar, si lo necesito
      break;
  }
});

document.addEventListener("click", function (e) {
  //Acá evaluo en función de vidas y de la variable inicio, si estoy al principio o al final del juego
  if (vidas == 0 || puntos == 1000 || puntos == -1000) {
    if (e.x > 200 && e.x < 500 && e.y > 300 && e.y < 380) {
      vidas = 3;
      puntos = 0;
      // audioFuego.volume = 0;
    }
  } else if (inicio == false) {
    instruye();
  } else if (inicio == true) {
    if (e.x > 690 && e.x < 760 && e.y > 400 && e.y < 450) {
      juego();
    }
  }
});
document.addEventListener("mousemove", function (e) {
  //si está al final o al principio del juego:
  if (vidas == 0 || puntos == 1000 || puntos == -1000) {
    if (e.x > 390 && e.x < 500 && e.y > 330 && e.y < 380) {
      canvas.style.cursor = "pointer";
      colorBoton = "#ffffff";
    } else {
      canvas.style.cursor = "";
      colorBoton = "#f0c337";
    }
  } else if (inicio == true && instrucciones == false) {
    if (e.x > 690 && e.x < 800 && e.y > 400 && e.y < 450) {
      canvas.style.cursor = "pointer";
      colorBoton = "#ffffff";
      dibujarTextoInstrucciones();
    } else {
      canvas.style.cursor = "";
      colorBoton = "#f0c337";
      dibujarTextoInstrucciones();
    }
  } else if (inicio == false) {
    if (
      (e.x > 70 && e.x < 220 && e.y > 185 && e.y < 315) ||
      (e.x > 310 && e.x < 510 && e.y > 185 && e.y < 315) ||
      (e.x > 550 && e.x < 750 && e.y > 185 && e.y < 315)
    ) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "";
      colorBoton = "#f0c337";
    }
  }
});

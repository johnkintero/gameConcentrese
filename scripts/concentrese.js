let arrgame = ['0', '0'];
let nScore = 0;

function inicio() {
  var arr = new Array('1', '1', '2', '2', '3', '3', '4', '4', '0');
  var box = mezclar();
  for (i = 0; i < arr.length; i++) {
    var caja = document.getElementById('box' + box[i]);
    caja.innerHTML = arr[i];
  }
}

$(function () {
  $('#divScore').css('background', 'red');
  $( 'p' ).text = 'hola funciona';
});

function mezclar() {
  var arrbox = new Array(8);
  var boxaux;
  for (i = 0; i <= 8; i++) {
    //alert("evalua posicion: "+i +" valor: "+arrbox[i])
    while (arrbox[i] == undefined) {
      boxaux = getRandom(1, 10);

      //alert("el aleatorio es: "+ boxaux);
      if (repetidos(boxaux, arrbox) == false) {
        //alert("falso asigna");
        arrbox[i] = boxaux;
      }

    }
  }

  //alert(arrbox[0]+","+arrbox[1]+","+arrbox[2]+","+arrbox[3]+","+arrbox[4]
  //+","+arrbox[5]+","+arrbox[6]+","+arrbox[7]+","+arrbox[8])
  return arrbox;
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//valida repetidos en el arreglo
function repetidos(rnd, arrbox) {
  var valid = false;
  for (var x of arrbox)//for (x = 0; x <= arrbox.length; x++)
   {
    if (x  == rnd) { //arrbox[x]
      //console.log('estes es el rnd: ' + rnd + 'esto hay en la caja: ' + x);
      valid = true;
      break;
    }
  }

  return valid;
}

/**
 * Funcion que detecta los click que se ralizan en los elementos div
 * del formulario
 */
$('div').click(function () {
  console.log(this.id);
  let idCadena = this.id;
  if (idCadena.includes('box')) {
    console.log(arrgame);
    if ($(this).css('color') != 'white') {
      $(this).css('color', 'red');
      $(this).effect('slide', 'slow');
    }

    setTimeout(juego, 1000, this.innerHTML, idCadena);
  }
});

function juego(objcomp, obj) {
  if (arrgame[0] == '0' && arrgame[1] == '0') {
    arrgame[0] = new Game(obj, objcomp, 'white', 'v');
  }else if (arrgame[0] != '0' && arrgame[1] == '0') {
    arrgame[1] = new Game(obj, objcomp, 'white', 'v');
    console.log(arrgame);
    console.log(arrgame[0].valor);
    console.log(arrgame[1].valor);
    if (arrgame[0].valor == arrgame[1].valor) {
      console.log('IGUALES');
      arrgame[0] = '0';
      arrgame[1] = '0';
      score();
    }else {
      console.log('DIFERENTES');
      $('#' + arrgame[0].box).css('color', 'white');
      $('#' + arrgame[1].box).css('color', 'white');
      console.log(arrgame[0].box);
      console.log(arrgame[1].box);
      arrgame[0] = '0';
      arrgame[1] = '0';
    }
  }
}

function score() {
  nScore++;
  $('#pScore').innerHTML = nScore;
}

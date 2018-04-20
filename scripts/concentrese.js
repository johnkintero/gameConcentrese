let arrgame = ['0', '0'];
let nScore = 0;
const TABLERO = 496;
let numCajas = 0;
let str = '';
let auxScore = document.getElementById('pScore');

//function inicio() {
$(function () {
    $('#divScore').css('background', 'orange');
  });

/**
 * Function para detectar el select
 */
$('select').change(function () {
  limpiavariables();
  if ($('select option:selected').value != 0) {
    $('select option:selected').each(function () {
      str += $(this).text() + '';
      $('#newTablero').empty();
    });

    numCajas = parseInt(str);
    var raiz;
    raiz = Math.floor(Math.sqrt(numCajas));
    var anchoBox = TABLERO / raiz;
    var leftInicio = 1;
    var topValue = 1;

    //console.log('la raiz es: ' + raiz);
    for (var i = 0; i < str; i++) {
      $('#newTablero').append('<div class="caja aling-middle" id="box' + i + '"></div>');
    }

    for (var i = 0; i < str; i++) {
      for (var x = 0; x < raiz; x++) {
        $('#box' + i).css({
          'top': topValue,
          'left': leftInicio,
        });

        //console.log('i:' + i + ' x: '+ x);
        leftInicio = leftInicio + anchoBox + 2;
        i++;
      }

      i--;
      topValue = topValue + anchoBox + 2;
      leftInicio = 1;
    }

    //$('#box1').css( { 'background-color' : 'rgb(132,255,' + leftInicio + ')'})
    $('#newTablero div').css({
      'width': anchoBox,
      'height': anchoBox
    });
    addArreglo();
  }
}).change();

function addArreglo() {
  let arr = [];
  for (a = 0; a < numCajas / 2; a++) {
    arr.push(a + 1);
    arr.push(a + 1);
  }

  //console.log(arr);
  var box = mezclar();
  //console.log(box);
  //console.log('largo del arreglo: ' + arr.length);
  for (var i in arr) {
    //console.log('i: ' + i);
    var caja = document.getElementById('box' + box[i]);
    //console.log(caja);
    caja.innerHTML = arr[i];
  }
}

function mezclar() {
  var arrbox = [];
  var boxaux;
  for (i = 0; i < numCajas; i++) {
    //alert("evalua posicion: "+i +" valor: "+arrbox[i])
    while (arrbox[i] == undefined) {
      boxaux = getRandom(0, numCajas);

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
$('#newTablero').on('click', '.caja', function () {
  //console.log('el elemento es: ' + this.id);
  let idCadena = this.id;
  if (idCadena.includes('box')) {
    //console.log(arrgame);
    if ($(this).css('color') != 'white') {
      $(this).css('color', 'red');
      $(this).effect('shake', 'slow');
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
  auxScore.innerHTML = nScore;
  if (nScore == numCajas / 2) {
    alert('You Win!!!');
  }

}

function limpiavariables() {
  str = '';
  nScore = 0;
  $('#newTablero').empty();
}

$('#btnNewGame').click(function () {
  limpiavariables();
  $('select option:eq(0)').prop('selected', true);
  auxScore.innerHTML = nScore;
});

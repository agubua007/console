
      var numTablet = 2;
      var numCabina = 1;
    anime({
      targets: '#svg-preloader',
      rotate: 180,
      duration: 2000,
      loop: true
    });
      anime({
          targets: '.texto-ulang',
          rotate: 360,
          duration: 2000,
          loop: true,
        });
    anime({
      targets: 'rect',
      fill: ['#e86b1f', '#35383f'],
      duration: 2000,
      direction: 'alternate',
      loop: true
    });
      
       function mostrarVentana(el) {
            var t = "#" + el;
            $(t).css('display','block');
            $('#overlay-modal').css('display', 'block');
        }
      
      function ocultarVentana(el) {
            var t = "#" + el;
            $(t).css('display','none');
            $('#overlay-modal').css('display', 'none');
        }
      
      function agregarTablet() {
          $("#tabla-de-tablets").append('<tr id="tablet-' + numCabina + '-' + numTablet + '" class="par-1 tablet-enabled"><td class="columna-numero"><div class="indicator num-tablet" id="pulsate-regular"><div class="indicator toggle"><button class="btn btn-xs  mic-toggle"><i class="fa fa-microphone" aria-hidden="true"> </i> </button> </div>' + numCabina + ' - ' + numTablet + '</div> </td> <td class="columna-language" title="English speaking and listening in Spanish"><div class="indicator"> <i class="fa fa-headphones fa-2" aria-hidden="true" > </i> <button class="btn btn-xs btn-idioma" onclick="mostrarVentana(\'modal-idiomas\')"> <img src="/assets/img/flags/Spain.png" class="idioma" /> </button> </div> <div class="indicator"><button class="btn btn-xs btn-idioma" onclick="mostrarVentana(\'modal-idiomas\')"> <img src="/assets/img/flags/United-States.png" class="idioma"/> </button> <i class="fa fa-microphone fa-2" aria-hidden="true"> </i> </div> </td> <td class="columna-actions"> <div class="indicator switch"> <button class="btn btn-xs btn-state btn-switch "> <i class="fa fa-random" aria-hidden="true"> </i> Switch </button> </div> <div class="indicator"> <button class="btn btn-xs btn-success btn-state"> <i class="fa fa-television" aria-hidden="true"> </i>  </button> <button class="btn btn-xs btn-info btn-state"> <i class="fa fa-headphones" aria-hidden="true"> </i> </button> <button class="btn btn-xs btn-info btn-state"> <i class="fa fa-music" aria-hidden="true"> Audio test </i> </button> </div> <div class="indicator ganancia" title="gain control"> <img src="/assets/img/icons/mic-gain.svg" width="35px" alt=""> <button class="btn btn-xs "> <i class="fa fa-minus" aria-hidden="true"> </i> </button> 5 <button class="btn btn-xs "> <i class="fa fa-plus" aria-hidden="true"> </i> </button> </div> </td> <td class="indicators columna-indicadores" > <div class="indicator" title="battery level (10%)"> <img src="/assets/img/icons/battery-2.svg" width="20px"  alt=""> </div><div class="indicator" title="wifi level (98%)"> <img src="/assets/img/icons/wifi.svg" width="20px"  alt=""> </div> <div class="indicator oculto" title="square wave"> <i class="fa fa-line-chart " aria-hidden="true"> </i> </div> <div class="indicator oculto" title="loss packets"> <img src="/assets/img/icons/box.svg" width="20px"  alt=""> </div> </td> <td class="columna-alarma"> <i class="fa fa-exclamation-circle iconTablets blink_me" style="color: red;" aria-hidden="true"> </i> </td> </tr>');
          numTablet++;
          if(numTablet > 2){
              numTablet = 1;
              numCabina++;
          }
      }

(function() {
	"use strict";

	var regalo = document.getElementById('regalo');

	document.addEventListener('DOMContentLoaded', function(){

		if(document.getElementById('mapa')){
			var map = L.map('mapa').setView([-17.783282, -63.181965], 16);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			L.marker([-17.783282, -63.181965]).addTo(map)
			    .bindPopup('Este es mi primer proyecto <br> Espero hacerlo bien')
			    .openPopup();
		}
		

		// Datos de Usuarios
		var nombre = document.getElementById('nombre');
		var apellido = document.getElementById('apellido');
		var email = document.getElementById('email');

		// Campos Pases
		var pase_dia = document.getElementById('pase_dia');
		var pase_dosdias = document.getElementById('pase_dosdias');
		var pase_completo = document.getElementById('pase_completo');

		//Botones y divs
		var calcular = document.getElementById('calcular');
		var errorDiv = document.getElementById('error');
		var botonRegistro = document.getElementById('btnRegistro');
		var lista_productos = document.getElementById('lista-productos');
		var total =document.getElementById('uma-total');

		//Extras
		var camisas = document.getElementById('camisa_evento');
		var etiquetas = document.getElementById('etiquetas');


        if(document.getElementById('nombre')){
        	pase_dia.addEventListener('blur', mostrartDias);
    		pase_dosdias.addEventListener('blur', mostrartDias);
	    	pase_completo.addEventListener('blur', mostrartDias);
		    calcular.addEventListener('click', calcularMontos);

		    nombre.addEventListener('blur', validarCampos);
		    apellido.addEventListener('blur', validarCampos);
		    email.addEventListener('blur', validarCampos);
		    email.addEventListener('blur', validarEmail);
        }
		

		function calcularMontos(event){
			event.preventDefault();
			if (regalo.value === '') {
				// statement
				alert("Debes elegir un regalo");
				regalo.focus();
			} else {
				// statement
				var boletosDia = parseInt(pase_dia.value, 10) || 0,
					boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
					boletoCompleto = parseInt(pase_completo.value, 10) || 0,
					cantidadCamisas = parseInt(camisas.value, 10) || 0,
					cantidadEtiquetas = parseInt(etiquetas.value, 10) || 0;

				var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantidadCamisas * 100) * 0.93) + (cantidadEtiquetas * 2) ;

				var listadoProductos = [];


				if(boletosDia >= 1){
					listadoProductos.push(boletosDia + ' Pases por día');
				}
				if(boletos2Dias >= 1){
					listadoProductos.push(boletos2Dias + ' Pases por 2 día');
				}
				if(boletoCompleto >= 1){
					listadoProductos.push(boletoCompleto + ' Pases Completos');
				}
				if(cantidadCamisas >= 1){
					listadoProductos.push(cantidadCamisas + ' Camisas');
				}
				if(cantidadEtiquetas >= 1){
					listadoProductos.push(cantidadEtiquetas + ' Etiquetas');
				}

				lista_productos.style.display = "block";
				lista_productos.innerHTML = '';
				for(var i = 0; i < listadoProductos.length; i++){
					lista_productos.innerHTML += listadoProductos[i] + '<br/>'
				}

				total.innerHTML = '$ ' + totalPagar.toFixed(2);

			}			
		}

		function mostrartDias(){
			var boletosDia = parseInt(pase_dia.value, 10) || 0,
				boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
				boletoCompleto = parseInt(pase_completo.value, 10) || 0;
			var diasElegidos = [];

			if (boletosDia > 0){
				diasElegidos.push('viernes');
			}
			if(boletos2Dias > 0){
				diasElegidos.push('viernes', 'sabado');
			}
			if(boletoCompleto){
				diasElegidos.push('viernes', 'sabado', 'domingo');
			}

			for(var i = 0; i < diasElegidos.length; i ++){
				document.getElementById(diasElegidos[i]).style.display = 'block';
			}
		}

		function validarCampos(){
			
			if(this.value == ''){
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = 'Este campo es obligatorio';
				this.style.border = '1px solid red';
				errorDiv.style.border = '1px solid red';
			} else {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #cccccc';				
			}
		}

		function validarEmail(){
			if (this.value.indexOf('@') > -1) {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #cccccc';
			} else {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = 'El email debe ser valido';
				this.style.border = '1px solid red';
				errorDiv.style.border = '1px solid red';
			}
		}

	});

})();



$(function() {
	// Lettering titulo

	$('.nombre-sitio').lettering();

	// Menu Fijo

	$(window).scroll(function () { 
		var scroll =$(window).scrollTop();	
		console.log(scroll);	
	});

	$('.programa-evento .info-cursos:first').show();
	$('.menu-programa a:first').addClass('activo');
	$('.menu-programa a').on('click', function(){
		$('.menu-programa a').removeClass('activo');
		$('.ocultar').hide();
		$(this).addClass('activo');
		var enlace = $(this).attr('href');
		$(enlace).fadeIn(1000);
		return false;
	});

	// Animaciones para los Numeros
	$('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6}, 1200);
	$('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15}, 1200);
	$('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3}, 1200);
	$('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9}, 1200);


	// Animacion de cuenta regresiva

	$('.cuenta-regresiva').countdown('2018/12/09 09:00:00', function(event){
		$('#dias').html(event.strftime('%D'));
		$('#horas').html(event.strftime('%H'));
		$('#minutos').html(event.strftime('%M'));
		$('#segundos').html(event.strftime('%S'));
	});
});




























/* Oliver Fabián Stetcu Stepanov | 2º DAW */
/*----------------------------------------*/
/* Esto se ejecutará siempre que el documento esté cargado */
window.addEventListener('load', iniciar, false);  // Me aseguro primero de que la página está creada
/*----------------------------------------------------------------------*/
/* Función que se ejecuta al arrancar el programa */
function iniciar() {
	// Aplico foco a los input

	// Evento para cambiar el color de fondo a amarillo al enfocar en un input
	document.querySelectorAll('.input-container input').forEach(input => {
		input.addEventListener('focusin', (event) => {
			event.target.style.background = "yellow";
			event.target.style.color = "black";
		});
	});

	// Evento para restaurar el color de fondo original al perder el foco del input
	document.querySelectorAll('.input-container input').forEach(input => {
		input.addEventListener('focusout', (event) => {
			// Restauro el color de fondo y de texto al valor original
			event.target.style.background = "";
			event.target.style.color = "";
		});
	});

	// Además debes usar localStorage para contabilizar el numero de veces que ha entrado ese usuario en la página web.  Ningún botón reinicia el valor.
	// MUESTRO EL NÚMERO DE VISITAS (VECES QUE ENTRA EN LA PÁGINA ARTURO)

	// Compruebo si existe una visita a la página para el contador de visitas en el "localStorage"
    let visitasPlanes = localStorage.getItem('visitasPlanes');

    // Si no hay visita, inicializar el contador de visitas en 0
    if (!visitasPlanes) {
        visitasPlanes = 0;
    } else {
        // Si hay una visita, la convierto a entero
        visitasPlanes = parseInt(visitasPlanes);
    }//end else

    // Incremento el contador de visitas en 1 cada vez que se carga la página
    visitasPlanes++;

    // Guardo el nuevo valor del contador en el "localStorage"
    localStorage.setItem('visitasPlanes', visitasPlanes);

    // Muestro el número de visitas en el formulario de "Planes Malvados"
    document.getElementById('contadorVisitasPlanes').innerText = visitasPlanes;

	// Según vas escribiendo debe convertirse en mayúsculas
	document.getElementById("nombrePlan").addEventListener("input", function() {
		// Convierto a mayúsculas el nombre según va escribiendo el usuario
		document.getElementById("nombrePlan").value = document.getElementById("nombrePlan").value.toUpperCase();
	});

	// Muestro los datos de los campos del formulario

    // Evento para validar el formulario cuando se haga clic en el botón de enviar
	document.getElementById("enviarPlan").addEventListener('click', function(event) {
		event.preventDefault(); // Evitar el envío del formulario por defecto
		
		// Valido el formulario y muestro los resultados
		mostrarResultados(validar());

		/*
		// OTRA FORMA
		// Valido el formulario
    	let formValido = validar();

    	// Muestro los resultados
    	mostrarResultados(formValido);
		*/
	});

	/* OTRA FORMA
	// Al hacer click en el botón de enviar llamo a la función validar() 
	document.getElementById("enviarPlan").addEventListener('click', validar ,false);
	// enviarPlan..addEventListener('click',validar);		// SE PUEDE USAR ESTO TAMBIÉN
	*/

	// Evento para limpiar el formulario cuando se haga clic en el botón de reiniciar
	document.getElementById("reiniciarPlan").addEventListener('click', function(event) {
		event.preventDefault(); // Evitar el envío del formulario por defecto
		
		// Limpio el formulario
		limpiarCamposPlan();
	});

	/* OTRA FORMA
	/* Al hacer click en el botón de enviar llamo a la función limpiar()
	document.getElementById("reiniciarPlan").addEventListener('click', limpiar ,false);
	*/
	// reiniciarPlan..addEventListener('click',validar);		// SE PUEDE USAR ESTO TAMBIÉN
}//end function iniciar()

/* Función que gestiona el evento por defecto del botón enviar */
function validar(eventoPredeterminado) {
	let devolver = "";
	salidaPlan.innerHTML = "";

	// Valido cada uno de los campos llamando a cada función
	if (validarNombre() & validarCodigo() & validarTipo() && confirm("¿Deseas enviar el formulario?")) {	// Si no se cumplen las funciones no se ejecuta el confirm()
		devolver = true;
	} else {
		eventoPredeterminado.preventDefault();
		devolver = false;
	}//end else

	// Devuelvo si se validan los campos o no (true o false)
	return devolver;
}//end function validar()
/*----------------------------------------------------------------------*/
/* Función para validar el campo nombre del formulario */
function validarNombre() {
	let devolver = true;

	// Aunque no lo pida en la actividad le aplico un patrón al nombre para más control de los datos
	// Patrón para el nombre del plan.
	let patron = /^[A-Za-zñÑ]{1,}$/;

	// Compruebo si caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
	if (document.getElementById("nombrePlan").type == "text" && (!patron.test(document.getElementById("nombrePlan").value) || document.getElementById("nombrePlan").value == "")) {
		salidaPlan.innerHTML+="<span class='span-error'>ERROR:</span> ¡El nombre del plan no es correcto!\n\n<br>";

		// Situo el foco en el campo password y le asigno la clase error
		document.getElementById("nombrePlan").className="error";
		document.getElementById("nombrePlan").focus();
		devolver=false;
	} else {
		document.getElementById("nombrePlan").className="success";
		document.getElementById("nombrePlan").focus();
		devolver=true;
	}//end else

	// Devuelvo si se valida el campo o no (true o false)
	return devolver;
}//end function validarNombre()
/*----------------------------------------------------------------------*/
/* Función para validar el campo codigo del formulario */
function validarCodigo() {
	let devolver = true;

	// Patrón para el código del plan. 
	// La primera posición es una letra seguida de 3 a 7 números
	let patron = /^[A-Za-z]\d{3,7}$/;

	// Compruebo si caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
	if (document.getElementById("codPlan").type == "text" && (!patron.test(document.getElementById("codPlan").value) || document.getElementById("codPlan").value == "")) {
		salidaPlan.innerHTML+="<span class='span-error'>ERROR:</span> ¡El código del plan no es correcto!\n\n<br>";

		// Situo el foco en el campo password y le asigno la clase error
		document.getElementById("codPlan").className="error";
		document.getElementById("codPlan").focus();
		devolver=false;
	} else {
		document.getElementById("codPlan").className="success";
		document.getElementById("codPlan").focus();
		devolver=true;
	}//end else

	// Devuelvo si se valida el campo o no (true o false)
	return devolver;
}//end function validarCodigo()
/*----------------------------------------------------------------------*/
/* Función para validar el campo tipo del formulario */
function validarTipo() {
	let devolver = false;
	let radiosTipoPlan = document.getElementsByName("tipoPlan");

	// Verifico si se ha seleccionado algún tipo de plan
	for (let tipoPlan of radiosTipoPlan) {
		if (tipoPlan.checked) {
			devolver = true;
		}//end else
	}//end for

	// Si no se ha seleccionado un plan muestro error
	if (!devolver) {
		salidaPlan.innerHTML+="<span class='span-error'>ERROR:</span> ¡Debes seleccionar un tipo de plan!\n\n<br>";
	}//end if
	
	return devolver;
}//end validarTipo()
/*----------------------------------------------------------------------*/
/* Función para limpiar los datos y estilos del formulario */
function limpiarCamposPlan() {
	let devolver = false;
	salidaPlan.innerHTML = "";

	// Limpio clases de estilos
	document.getElementById("nombrePlan").className = "";
	document.getElementById("codPlan").className = "";
	document.getElementById("paises").className = "";

	// Limpio los estilos de los elementos del grupo de radios 'tipoPlan'
    let radiosTipoPlan = document.getElementsByName("tipoPlan");

	// Compruebo si se ha seleccionado o insertado un tipo de plan
    for (let i = 0; i < radiosTipoPlan.length; i++) {
		radiosTipoPlan[i].className = ""; // Limpio los estilos
		radiosTipoPlan[i].checked = false; // Deselecciono el elemento del radio button
    }//end for

	// Limpio los valores de los campos de texto y selecciono la opción predeterminada en el desplegable
    document.getElementById("nombrePlan").value = "";
	document.getElementById("codPlan").value = "";
	document.getElementById("paises").value = "";

	devolver = true;

	return devolver;
}//end function limpiarCamposPlan()
/*----------------------------------------------------------------------*/
/* Función para mostrar los resultados en el div "salidaPlan" */
function mostrarResultados(esFormValido) {
    salidaPlan.innerHTML = ""; // Limpio contenido anterior

    if (esFormValido) {
        // Si el formulario es válido, muestro mensaje de éxito
		let nombrePlan = document.getElementById("nombrePlan").value;
		let codPlan = document.getElementById("codPlan").value;
		let tipoPlan = "";
		
		let radiosTipoPlan = document.getElementsByName("tipoPlan");
		for (let i = 0; i < radiosTipoPlan.length; i++) {
			if (radiosTipoPlan[i].checked) {
				tipoPlan = radiosTipoPlan[i].value;
			}//end if
		}//end for

		// Compruebo si se ha escrito un valor del datalist
		let pais = "";
		let paisInput = document.getElementById("paises");
		let paisSeleccionado = paisInput.value;
		let paisDatalist = document.getElementById("paisesPlan");
		let opcionesPaises = paisDatalist.querySelectorAll("option");
		let esPaisValido = false;

		// Compruebo si se ha insertado un país de los posibles
		for (let opcion of opcionesPaises) {
			if (opcion.value === paisSeleccionado) {
				esPaisValido = true;
			}//end if
		}//end for

		// Compruebo si se ha seleccionado un país válido
		if (esPaisValido) {
			pais = paisSeleccionado;
		} else {
			pais = "¡No has seleccionado un país válido!";
		}//end if

		// Muestro los datos
		salidaPlan.innerHTML = "<span class='span-success'>¡Formulario enviado correctamente!</span><br><br>" +
        "<strong>Nombre:</strong> " + nombrePlan + "<br>" +
        "<strong>Código:</strong> " + codPlan + "<br>" +
        "<strong>País:</strong> " + pais + "<br>" +
		"<strong>Tipo:</strong> " + tipoPlan + "<br>";
    } else {
        // Si el formulario no es válido, muestro mensajes de error
        salidaPlan.innerHTML = "<span class='span-error'>¡Formulario contiene errores, por favor revíselo!</span>";
    }//end else
}//end mostrarResultados(esFormValido)
/*----------------------------------------------------------------------*/

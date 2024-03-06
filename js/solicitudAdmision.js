/* Oliver Fabián Stetcu Stepanov | 2º DAW */
/*----------------------------------------*/
/* Esto se ejecutará siempre que el documento esté cargado */
window.addEventListener('load', iniciar, false);  // Me aseguro primero de que la página está creada
/*----------------------------------------------------------------------*/
/* Función que se ejecuta al arrancar el programa */
function iniciar() {
	mostrarContrasenia();

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

	// Compruebo si existe una visita a la página para el contador de visitas en el "localStorage"
    let visitasSolicitud = localStorage.getItem('visitasSolicitud');

    // Si no hay visita, inicializar el contador de visitas en 0
    if (!visitasSolicitud) {
        visitasSolicitud = 0;
    } else {
        // Si hay una visita, la convierto a entero
        visitasSolicitud = parseInt(visitasSolicitud);
    }//end else

    // Incremento el contador de visitas en 1 cada vez que se carga la página
    visitasSolicitud++;

    // Guardo el nuevo valor del contador en el "localStorage"
    localStorage.setItem('visitasSolicitud', visitasSolicitud);

    // Muestro el número de visitas en el formulario de "Planes Malvados"
    document.getElementById('contadorVisitasSolicitud').innerText = visitasSolicitud;

	/* OTRA FORMA (pero también hace focus a la nacionalidad la cual no es obligatoria, no recomendada esta forma)
	document.getElementById("formSolicitud").addEventListener("focusin", (event) => {
		event.target.style.background = "yellow";
	});
	
	document.getElementById("formSolicitud").addEventListener("focusout", (event) => {
		event.target.style.background = "";
	});
	*/

	// Muestro los datos de los campos del formulario

	// Evento para validar el formulario cuando se haga clic en el botón de enviar
	document.getElementById("enviar").addEventListener('click', function(event) {
		event.preventDefault(); // Evitar el envío del formulario por defecto
		
		// Valido el formulario y muestro los resultados
		mostrarResultados(validar());

		/* OTRA FORMA
		// Valido el formulario
    	let formValido = validar();

    	// Muestro los resultados
    	mostrarResultados(formValido);
		*/
	});
	
    /* OTRA FORMA
	// Al hacer click en el botón de enviar llamo a la función validar() 
	document.getElementById("enviar").addEventListener('click', validar ,false);
	*/
	// enviar..addEventListener('click',validar);		// SE PUEDE USAR ESTO TAMBIÉN

	// Evento para limpiar el formulario cuando se haga clic en el botón de reiniciar
	document.getElementById("reiniciar").addEventListener('click', function(event) {
		event.preventDefault(); // Evitar el envío del formulario por defecto
		
		// Limpio el formulario
		limpiar();
	});

	/* OTRA FORMA
	/* Al hacer click en el botón de enviar llamo a la función limpiar()
	document.getElementById("reiniciar").addEventListener('click', limpiar ,false);
	*/
	// reiniciar..addEventListener('click',validar);		// SE PUEDE USAR ESTO TAMBIÉN
}//end function iniciar()
/*----------------------------------------------------------------------*/
/* Función que gestiona el evento por defecto del botón enviar */
function validar(eventoPredeterminado) {
	let devolver = "";
	salida.innerHTML = "";

	// Valido cada uno de los campos llamando a cada función
	if (validarNombre() & validarContrasenia() && confirm("¿Deseas enviar el formulario?")) {	// Si no se cumplen las funciones no se ejecuta el confirm()
		devolver = true;
	} else {
		eventoPredeterminado.preventDefault();
		devolver = false;
	}//end else

	// Devuelvo si se validan los campos o no (true o false)
	return devolver;
}//end function validar()
/*----------------------------------------------------------------------*/
/* Función para validar el campo nombre del formulario. CAMPO OBLIGATORIO */
function validarNombre() {
	let devolver = true;

	// Patrón para el nombre. 
	// Caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
	let patron = /(?=[a-zA-ZñÑ])(^.{10,25}$)/;

	// Compruebo si caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
	if (document.getElementById("nombre").type == "text" && (!patron.test(document.getElementById("nombre").value) || document.getElementById("nombre").value == "")) {
		salida.innerHTML+="<span class='span-error'>ERROR:</span> ¡El nombre no es correcto!\n\n<br>";

		// Situo el foco en el campo password y le asigno la clase error
		document.getElementById("nombre").className="error";
		document.getElementById("nombre").focus();
		devolver=false;
	} else {
		document.getElementById("nombre").className="success";
		document.getElementById("nombre").focus();
		devolver=true;
	}//end else

	// Devuelvo si se valida el campo o no (true o false)
	return devolver;
}//end function validarNombre()
/*----------------------------------------------------------------------*/
/* Función para validar el campo contraseña del formulario. CAMPO OBLIGATORIO */
function validarContrasenia() {
	let devolver = true;

	// Patrón para la contraseña
	/* 
	· No puede comenzar "ç",  "," o "$".
	· Debe tener solo de 1 a 3 números (no es necesariamente que sean consecutivos).
	· Dentro de la contraseña no puede aparecer la cadena 'select' o 'where' para evitar que te los hackers accedan a nuestra base de datos a través del formulario.
	· No debe tener ";".
	· Puede tener otros caracteres no indicados en los puntos anteriores. Vamos, que no hay restricciones sobre los caracteres permitidos.
	· Debe terminar en el carácter "." precedido de un número. Por ejemplo 8.
	· Al menos 8 caracteres y máximo 21. 
	*/

	let patron = /(?!^[çÇ,$])(?!.*select)(?!.*SELECT)(?!.*where)(?!.*WHERE)(?=^[^0-9]*[0-9][^0-9]*[0-9]?[^0-9]*[0-9]?[^0-9]*$)(?!.*;)(?=.*[0-9]\.$)(^.{8,21}$)/;

	// Compruebo si coinciden los 2 campos de contraseña
	if (document.getElementById("password").value !== document.getElementById("repePassword").value) {
		salida.innerHTML += "<span class='span-error'>ERROR:</span> ¡Los campos de contraseña NO coinciden!\n\n<br>";

		document.getElementById("password").className = "error";
		document.getElementById("password").focus();

		document.getElementById("repePassword").className = "error";
		document.getElementById("repePassword").focus();
		
		devolver = false;
	} else {
		// Compruebo si caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
		if (document.getElementById("password").type == "password" || document.getElementById("password").type == "text") {	// Hago la comprobación de si es de tipo text para cuando muestro la contraseña
			// Compruebo si el campo no está vacío y si cumple con el patrón establecido
			if (!patron.test(document.getElementById("password").value) || document.getElementById("password").value == "") {
				salida.innerHTML+="<span class='span-error'>ERROR:</span> ¡La contraseña no es correcta!\n\n<br>";
				
				// Situo el foco en el campo password y le asigno la clase error
				document.getElementById("password").className = "error";
				document.getElementById("password").focus();
				devolver=false;
			} else {
				document.getElementById("password").className = "success";
				document.getElementById("password").focus();
			}//end else

			// Compruebo si el campo no está vacío y si cumple con el patrón establecido
			if (!patron.test(document.getElementById("repePassword").value) || document.getElementById("repePassword").value == "") {
				salida.innerHTML += "<span class='span-error'>ERROR:</span> ¡La repetición de la contraseña no es correcta!\n\n<br>";
				
				document.getElementById("repePassword").className = "error";
				document.getElementById("repePassword").focus();
				devolver = false;
			} else {
				document.getElementById("repePassword").className = "success";
				document.getElementById("repePassword").focus();
			}//end else
		}//end if
	}//end else

	// Devuelvo si se valida el campo o no (true o false)
	return devolver;
}//end function validarContrasenia()
/*----------------------------------------------------------------------*/
/* Función para validar que se elige una nacionalidad. CAMPO NO OBLIGATORIO
function validarNacionalidad() {
	let devolver = true;

	// Compruebo si caracteres mayúsculas y minúsculas, si tiene entre 0 a 25 caracteres alfabéticos incluyendo la ñ, minúsculas y mayúsculas.
	if (document.getElementById("nacionalidad").selectedIndex==0) {
		salida.innerHTML+="<span class='span-error'>ERROR:</span> ¡Tienes que seleccionar una nacionalidad!\n\n<br>";

		// Situo el foco en el campo password y le asigno la clase error
		document.getElementById("nacionalidad").className="error";
		document.getElementById("nacionalidad").focus();
		devolver=false;
	} else {
		document.getElementById("nacionalidad").className="success";
		document.getElementById("nacionalidad").focus();
		devolver=true;
	}//end else

	// Devuelvo si se valida el campo o no (true o false)
	return devolver;
}//end validarNacionalidad()
*/
/*----------------------------------------------------------------------*/
/* Función para mostrar la contraseña */
function mostrarContrasenia() {
	// Muestro la contraseña y cambio el icono al mostrar o no la contraseña al pulsar el icono
	document.querySelector(".bx").addEventListener("mousedown", (event) => {			// CAMBIAR EL click POR QUE SI SE MANTIENE PULSADO SE MUESTRE Y SINO NO SE MUESTRA
		if (document.getElementById('password').type === "password" && document.getElementById('repePassword').type === "password") {
			document.getElementById('password').type = "text";
			document.getElementById('repePassword').type = "text";
			document.querySelector(".bx").classList.remove("bx-show-alt");
			document.querySelector(".bx").classList.add("bx-hide");
		}//end if
	});

	// Muestro la contraseña y cambio el icono al mostrar o no la contraseña al soltar el icono
	document.querySelector(".bx").addEventListener("mouseup", (event) => {
		if (document.getElementById('password').type === "text" && document.getElementById('repePassword').type === "text") {
			document.getElementById('password').type = "password";
			document.getElementById('repePassword').type = "password";
			document.querySelector(".bx").classList.add("bx-show-alt");
			document.querySelector(".bx").classList.remove("bx-hide");
		}//end if
	});
}//end function mostrarContrasenia()
/*----------------------------------------------------------------------*/
/* Función para limpiar los datos y estilos del formulario */
function limpiar() {
	let devolver = false;
	salida.innerHTML = "";

	// Limpio clases de estilos
	document.getElementById("nombre").className = "";
	document.getElementById("password").className = "";
	document.getElementById("repePassword").className = "";
	document.getElementById("nacionalidad").className = "";

	// Limpio los valores de los campos de texto y selecciono la opción predeterminada en el desplegable
    document.getElementById("nombre").value = "";
	document.getElementById("password").value = "";
	document.getElementById("repePassword").value = "";
	document.getElementById("nacionalidad").selectedIndex = 0;
	devolver = true;

	return devolver;
}//end function limpiar()
/*----------------------------------------------------------------------*/
/* Función para mostrar los resultados en el div "salida" */
function mostrarResultados(esFormValido) {
    salida.innerHTML = ""; // Limpio contenido anterior

    if (esFormValido) {
        // Si el formulario es válido, muestro mensaje de éxito
		let nombre = document.getElementById("nombre").value;
		let password = document.getElementById("password").value;
		let nacionalidad = "";
		
		// Compruebo si la nacionalidad se ha seleccionado
		if (document.getElementById("nacionalidad").selectedIndex == 0) {
			nacionalidad = "¡No has seleccionado nacionalidad!";
		} else {
			nacionalidad = document.getElementById("nacionalidad").value;
		}//end else

		// Muestro los datos
		salida.innerHTML = "<span class='span-success'>¡Formulario enviado correctamente!</span><br><br>" +
        "<strong>Nombre:</strong> " + nombre + "<br>" +
        "<strong>Contraseña:</strong> " + password + "<br>" +
        "<strong>Nacionalidad:</strong> " + nacionalidad + "<br>";
    } else {
        // Si el formulario no es válido, muestro mensajes de error
        salida.innerHTML = "<span class='span-error'>¡Formulario contiene errores, por favor revíselo!</span>";
    }//end else
}//end mostrarResultados(esFormValido)
/*----------------------------------------------------------------------*/

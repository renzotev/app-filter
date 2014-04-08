/* Creamos un Array donde guardaremos los parametros que mandaremos por la URL*/
var consulta_url = ["?"];


/* Creamos una funcion que retornara la ruta de nuestro JSON con los parametros asignados*/
var $ruta_json = function (filtro) {
	if (filtro == 0) {
		var consulta_get = "php/consult_autos.php";
	}else {
		var ma = $("#marca").val();
		var mo = $("#modelo").val();
		var ver = $("#version").val();
		var an = $("#anio").val();

		if (filtro == "marca") {
			var consulta_get = "php/consult_autos.php?marca="+ma;
		}else if (filtro == "modelo")  {
			var consulta_get = "php/consult_autos.php?marca="+ma+"&modelo="+mo;
		}else if (filtro == "version") {
			var consulta_get = "php/consult_autos.php?marca="+ma+"&modelo="+mo+"&version="+ver;
		}else if (filtro == "anio") {
			var consulta_get = "php/consult_autos.php?marca="+ma+"&modelo="+mo+"&version="+ver+"&anio="+an;
		}
	}
	return consulta_get;
};


/* Creamos una funcion que pinta los datos en nuestro select*/
var $pinta_select = function (items, id) {
	if (items.length != 0) {

		/* Pintamos los datos en nuestro select*/
 		var opt_text = $( id ).find("option[value='-1']").text();
	   	$( id ).html("<option value='-1'>" + opt_text + "</option>");
	   	$( id ).append(items);

	   	/* Removemos los estilos que hacen parecer nuestro select como desabilitado */
	   	$( id ).parent().removeClass("input-disabled");
	   	$( id ).prop("disabled", false);
 	}else {

 		/* Mandamos un mensaje de alerta en caso no se encuentren mas datos del auto seleccionado */
 		$(".msg-error").text("No tenemos mas datos del auto seleccionado, por favor dar clic en consultar.")
 						.css({"color":"#f0ad4e","display":"block"});
 	}
};


/* Creamos una funcion para resetear los select */
var $reset_select = function () {
	for(i=0;i<arguments.length;i++) {
		var opt_text = $( arguments[i] ).find("option[value='-1']").text();
		$( arguments[i] ).html("<option value='-1'>" + opt_text + "</option>");
		$( arguments[i] ).parent().addClass("input-disabled");
		$( arguments[i] ).prop("disabled", true);
	}
}

/* Creamos nuestra funcion que obtendra los datos del JSON */
var $consultas_auto = function (id, filtro) {

	/* Pintamos nuestro Loader */
	$('#loadingDiv').show();

	/* Hacemos la consulta y guardamos nuestros resultados en un Array*/
	$.getJSON( $ruta_json(filtro), function( data ) {
	  	var items = [];
	  	$.each( data.autos, function( key, val ) {
	  		if (filtro == "marca") {
	  			items.push( "<option value="+val.modelo_id+">"+val.modelo+"</option>" );
	  		}else if (filtro == "modelo") {
	  			items.push( "<option value="+val.version+">"+val.version+"</option>" );
	  		}else if (filtro == "version") {
	  			var val_anio = val.anio.replace('+', '%2B').replace(' ', '%20');
	  			items.push( "<option value="+val_anio+">"+val.anio+"</option>" );
	  		}else {
	  			var val_marca = val.marca.replace(' ', '%20');
	  			items.push( "<option value="+val_marca+">"+val.marca+"</option>" );
	  		}
	  	});
	 	
	  	/* Pintamos nuestro select y ocultamos el loader */
	 	$pinta_select(items, id);
		$('#loadingDiv').hide();

	});
};


/* Creamos una funcion para detectar la seleccion de opciones en nuestro select de marcas */
$("#marca").change( function () {

	/* Ocultamos el mensaje de error en caso hubiera alguno */
	$(".msg-error").css("display","none");

	/* Buscamos y guardamos nuestro valor seleccionado en nuestro array */
	var selected = $(this).find("option:selected").val();
	consulta_url[1]= "marca="+selected;

	/* Reseteamos los valores de los select que esten por debajo */
	$reset_select('#version', '#anio');

	/* Reseteamos el valor de modelo en caso no seleccionemos ninguna opcion*/
	if (selected == "-1") {
		$reset_select('#modelo');

		consulta_url.splice(1, 4);	
	}else {

		/* Hacemos la consulta de los modelos segun la marca seleccionada*/
		$consultas_auto("#modelo","marca");
	}

	/* Actualizamos el href de nuestro boton consultar*/
	$("#consultar").attr("href", "#");
});


/* Creamos una funcion para detectar la seleccion de opciones en nuestro select de modelos */
$("#modelo").change( function () {

	/* Ocultamos el mensaje de error en caso hubiera alguno */
	$(".msg-error").css("display","none");

	/* Buscamos y guardamos nuestro valor seleccionado en nuestro array */
	var selected = $(this).find("option:selected").val();
	consulta_url[2] = "&modelo="+selected;

	/* Reseteamos los varoles de los select que esten por debajo */
	$reset_select('#anio');

	/* Reseteamos el valor de version en caso no seleccionemos ninguna opcion*/
	if (selected == "-1") {
		$reset_select('#version');
		
		consulta_url.splice(2, 3);

		/* Actualizamos el href de nuestro boton consultar*/
		$("#consultar").attr("href", "#");
	}else {

		/* Hacemos la consulta de las versiones segun el modelo seleccionado*/
		$consultas_auto("#version","modelo");

		/* Actualizamos el href de nuestro boton consultar*/
		$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
	}
});


/* Creamos una funcion para detectar la seleccion de opciones en nuestro select de version */
$("#version").change( function () {

	/* Buscamos y guardamos nuestro valor seleccionado en nuestro array */
	var selected = $(this).find("option:selected").val();
	consulta_url[3] = "&version="+selected;

	/* Reseteamos el valor de año en caso no seleccionemos ninguna opcion*/
	if (selected == "-1") {
		$reset_select('#anio');

		consulta_url.splice(3, 2);
	}else {

		/* Hacemos la consulta de los años segun la version seleccionada*/
		$consultas_auto("#anio","version");
	}

	/* Actualizamos el href de nuestro boton consultar*/	
	$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
});


/* Creamos una funcion para detectar la seleccion de opciones en nuestro select de año */
$("#anio").change( function () {

	/* Buscamos y guardamos nuestro valor seleccionado en nuestro array */
	var selected = $(this).find("option:selected").val();
	consulta_url[4] = "&anio="+selected;

	if (selected == "-1") {
		consulta_url.splice(4, 1);
	}

	/* Actualizamos el href de nuestro boton consultar*/	
	$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
});


/* Inicializamos el filtro con los valores de marca */
$consultas_auto("#marca", 0);

/* Creamos una funcion para detectar si marca y modelo han sido seleccionados */
$("#consultar").on("click", function (e) {
	if ($(this).attr("href") == "#") {
		e.preventDefault();
		$(".msg-error").text("Por favor, selecciona una marca y un modelo.").css("display","block");
	}
});


/* Creamos una funcion para resetear los valores de los select en caso se use el boton "back" del browser */
(function () {
	var id = ["#modelo", "#version", "#anio"];
	
	for (i=0; i<id.length; i++) {
		var opt_text = $( id[i] ).find("option[value='-1']").text();
		$( id[i] ).html("<option value='-1'>" + opt_text + "</option>");
	}
})();

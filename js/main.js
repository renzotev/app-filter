var consulta_url = ["resultados.html?"];

var $consultas_auto = function (id, filtro, value) {
	if (filtro == 0) {
		var consulta_get = "php/consult_autos.php";
	}else {
		var consulta_get = "php/consult_autos.php?"+filtro+"="+value;
	}

	$.getJSON( consulta_get, function( data ) {
	  var items = [];
	  $.each( data.autos, function( key, val ) {
	  		if (filtro == "marca") {
	  			items.push( "<option value="+val.modelo+">"+val.modelo+"</option>" );
	  		}else if (filtro == "modelo") {
	  			items.push( "<option value="+val.version+">"+val.version+"</option>" );
	  		}else if (filtro == "version") {
	  			items.push( "<option value="+val.anio+">"+val.anio+"</option>" );
	  		}else {
	  			items.push( "<option value="+val.marca+">"+val.marca+"</option>" );
	  		}
	  	});
	 	
	   	var opt_text = $( id ).find("option[value='-1']").text();
	   	$( id ).html("<option value='-1'>" + opt_text + "</option>");
	   	$( id ).append(items);

	});
};

$("#marca").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[1]= "marca="+selected;
	//alert(consulta_url);
	$("#consultar").attr("href", consulta_url);

	if (selected == "-1") {
		$("#modelo").html("<option value='-1'>Modelo</option>");
		$("#version").html("<option value='-1'>Versión</option>");
		$("#anio").html("<option value='-1'>Anio</option>");
	}else {
		$consultas_auto("#modelo","marca",selected);
	}
	
});

$("#modelo").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[2] = "&modelo="+selected;
	$("#consultar").attr("href", consulta_url);

	if (selected == "-1") {
		$("#version").html("<option value='-1'>Versión</option>");
		$("#anio").html("<option value='-1'>Anio</option>");
	}else {
		$consultas_auto("#version","modelo",selected);
	}
	
});

$("#version").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[3] = "&version="+selected;
	$("#consultar").attr("href", consulta_url);

	if (selected == "-1") {
		$("#anio").html("<option value='-1'>Anio</option>");
	}else {
		$consultas_auto("#anio","version",selected);
	}
	
});

$("#anio").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[4] = "&anio="+selected;			
});


$consultas_auto("#marca", 0, "");
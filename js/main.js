var consulta_url = ["?"];

/*String.prototype.allReplace = function(obj) {
  var retStr = this;
  console.log(this);
  for (var x in obj) {
    retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
  }
  return retStr;
}*/

var $consultas_auto = function (id, filtro) {
	
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

	$('#loadingDiv').show();

	$.getJSON( consulta_get, function( data ) {
	  var items = [];
	  $.each( data.autos, function( key, val ) {
	  		if (filtro == "marca") {
	  			items.push( "<option value="+val.modelo_id+">"+val.modelo+"</option>" );
	  		}else if (filtro == "modelo") {
	  			items.push( "<option value="+val.version+">"+val.version+"</option>" );
	  		}else if (filtro == "version") {
	  			var val_anio = val.anio.replace('+', '%2B').replace(' ', '%20');

	  			if (val.anio.charAt(val.anio.length - 1) == '-') {
					var minus = ' o anteriores';
				}else {
					var minus = ' al '
				}

				var text_anio = val.anio.replace('+', ' en adelante').replace('-', minus);
	  			//var text_anio = "sdas + - asda".allReplace({' ': '%20', '+': 'o más', '-': minus, });

	  			items.push( "<option value="+val_anio+">"+text_anio+"</option>" );
	  		}else {
	  			var val_marca = val.marca.replace(' ', '%20');
	  			items.push( "<option value="+val_marca+">"+val.marca+"</option>" );
	  		}
	  	});
	 	
	 	if (items.length != 0) {
	 		var opt_text = $( id ).find("option[value='-1']").text();
		   	$( id ).html("<option value='-1'>" + opt_text + "</option>");
		   	$( id ).append(items);
		   	$(id).parent().removeClass("input-disabled");
		   	$(id).prop("disabled", false);
	 	}

		$('#loadingDiv').hide();

	});
};

$("#marca").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[1]= "marca="+selected;

	$("#version").html("<option value='-1'>Versión</option>");
	$("#anio").html("<option value='-1'>Año</option>");

	$("#version").parent().addClass("input-disabled");
	$("#anio").parent().addClass("input-disabled");

	$("#version").prop("disabled", true);
	$("#anio").prop("disabled", true);

	if (selected == "-1") {
		$("#modelo").html("<option value='-1'>Modelo</option>");

		$("#modelo").parent().addClass("input-disabled");

		$("#modelo").prop("disabled", true);
		
		consulta_url.splice(1, 4);	
	}else {
		$consultas_auto("#modelo","marca");
	}
	$("#consultar").attr("href", "#");
});

$("#modelo").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[2] = "&modelo="+selected;

	$("#anio").html("<option value='-1'>Año</option>");

	$("#anio").parent().addClass("input-disabled");

	$("#anio").prop("disabled", true);

	if (selected == "-1") {
		$("#version").html("<option value='-1'>Versión</option>");

		$("#version").parent().addClass("input-disabled");

		$("#version").prop("disabled", true);
		
		consulta_url.splice(2, 3);
	}else {
		$consultas_auto("#version","modelo");
	}
	$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
});

$("#version").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[3] = "&version="+selected;

	if (selected == "-1") {
		$("#anio").html("<option value='-1'>Año</option>");

		$("#anio").parent().addClass("input-disabled");

		$("#anio").prop("disabled", true);

		consulta_url.splice(3, 2);
	}else {
		$consultas_auto("#anio","version");
	}	

	$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
});

$("#anio").change( function () {
	var selected = $(this).find("option:selected").val();
	consulta_url[4] = "&anio="+selected;
	if (selected == "-1") {
		consulta_url.splice(4, 1);
	}
	$("#consultar").attr("href", "resultados.html"+consulta_url.join(""));
});


$consultas_auto("#marca", 0);

(function () {
	var id = ["#modelo", "#version", "#anio"];
	
	for (i=0; i<id.length; i++) {
		var opt_text = $( id[i] ).find("option[value='-1']").text();
		$( id[i] ).html("<option value='-1'>" + opt_text + "</option>");
	}
})();

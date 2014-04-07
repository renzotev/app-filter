<?php

	/* Traemos todos los datos para la conexión*/
	include("conexion.php");
	

	/* Nos conectamos a la base de datos*/
	$con=mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if (mysqli_connect_errno()) {
		echo "Error al conectarse con MYSQL: " . mysqli_connect_error();
		die;
	} else {
		mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
	}


	/* Declaramos una variable que guardara el número de GETS que mandamos por la url*/
	$get_num = 0;


	/*Guardamos todos los GETS en variables*/
	foreach($_GET as $key => $value)
	{
	   $get = $key;
		extract(array($get => $value));
		$get_num +=1;
	}


	/* Asignamos las consulta según el número de GETS obtenidos */
	if ($get_num >= 1 && $get_num <= 3 ) {	
		if ($get_num == 1) { 
			$query = "SELECT DISTINCT modelo_id,modelo_auto FROM ".DB_TABLE." WHERE marca_auto='$marca' ORDER BY modelo_id ASC";
			$columID = "modelo_id";
			$colum = "modelo_auto";
			$columJ = "modelo";
		}
		if ($get_num == 2) {
			$query = "SELECT DISTINCT version_auto FROM ".DB_TABLE." WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto<>'' ORDER BY version_auto ASC";
			$colum = "version_auto";
			$columJ = "version";
		}
		if ($get_num == 3) {
			$query = "SELECT DISTINCT anio_auto FROM ".DB_TABLE." WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto='$version' AND anio_auto<>'' ORDER BY anio_auto ASC";
			$colum = "anio_auto";
			$columJ = "anio";
		}
	} else {
		$colum = "marca_auto";
		$query = "SELECT DISTINCT marca_auto FROM ".DB_TABLE." ORDER BY marca_auto ASC";
		$columJ = "marca";
	}
	

	/* Mandamos la consulta a la base de datos */
	$result = mysqli_query($con,$query);
	$response = array();
	$autos = array();


	/* Armamos nuestro JSON*/
	while($row = mysqli_fetch_array($result)) {
		if (isset($columID)) {
			$to_json=$row[$colum];
			$to_jsonID=$row[$columID];
			$autos[] = array($columJ => $to_json, $columID => $to_jsonID);
		}else {
			$to_json=$row[$colum];
			$autos[] = array($columJ => $to_json);
		}
	}
	$response['autos'] = $autos;


	/*Cerramos la conexión con la base de datos*/
	mysqli_close($con);
	

	/* Declaramos el tipo de documento como JSON */
	header('Content-Type: application/json');


	/* Renderizamos nuestro JSON, renderizamos un JSONP en caso exista la variable "callback" */
	if (isset($callback)) {
		echo $callback.'('.json_encode($response).')';
	}else {
		echo json_encode($response);
	}	
	
?> 
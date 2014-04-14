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
	if ($get_num >= 2 && $get_num <= 4 ) {

		/* Declaramos nombres cortos para usarlos en nuestro JSON*/
		$colum = array("marca" => "marca_bateria", "modelo" => "modelo_bateria", "sku" => "sku_bateria");
		$columJ = array("marca","modelo","sku");

		if ($get_num == 2) {  
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM ".DB_TABLE." WHERE marca_auto='$marca' AND modelo_id='$modelo' ORDER BY modelo_bateria ASC"; 
		}
		if ($get_num == 3) {   
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM ".DB_TABLE." WHERE marca_auto='$marca' AND modelo_id='$modelo' AND (version_auto='$version' OR version_auto='') ORDER BY modelo_bateria ASC"; 
		}
		if ($get_num == 4) {  
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM ".DB_TABLE." WHERE marca_auto='$marca' AND modelo_id='$modelo' AND (version_auto='$version' OR version_auto='') AND (anio_auto='$anio' OR anio_auto='') ORDER BY modelo_bateria ASC"; 
		}
		
	} else {
		die;
	}


	/* Mandamos la consulta a la base de datos */
	$result = mysqli_query($con,$query);
	$response = array();
	$baterias = array();


	/* Armamos nuestro JSON*/
	while($row = mysqli_fetch_array($result)) {
		$marca_b = $row[$colum["marca"]];
		$modelo_b = $row[$colum["modelo"]];
		$sku_b = $row[$colum["sku"]];
		$baterias[] = array($columJ[0] => $marca_b, $columJ[1] => $modelo_b, $columJ[2] => $sku_b);
	}
	$response['baterias'] = $baterias;


	/*Cerramos la conexión con la base de datos*/
	mysqli_close($con);


	/* Declaramos el tipo de documento como JSON */
	header('Content-Type: application/json');


	/* Renderizamos nuestro JSON, renderizamos un JSONP en caso exista la variable "callback" */
	if (isset($_GET["callback"])) {
		echo $_GET['callback'].'('.json_encode($response).')';
	}else {
		echo json_encode($response);
	}
	
?> 
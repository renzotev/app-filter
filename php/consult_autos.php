<?php

	if (isset($_GET["marca"]) || isset($_GET["modelo"]) || isset($_GET["version"])) {
		if (isset($_GET["marca"])) { 
			$marca = $_GET["marca"];
			$query = "SELECT  DISTINCT modelo_id,modelo_auto FROM datos WHERE marca_auto='$marca' ORDER BY modelo_id ASC";
			$columID = "modelo_id";
			$colum = "modelo_auto";
			$columJ = "modelo";
		}
		if (isset($_GET["marca"]) && isset($_GET["modelo"])) {
			unset($columID); 
			$marca = $_GET["marca"];
			$modelo = $_GET["modelo"];
			$query = "SELECT DISTINCT version_auto FROM datos WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto<>'' ORDER BY version_auto ASC";
			$colum = "version_auto";
			$columJ = "version";
		}
		if (isset($_GET["marca"]) && isset($_GET["modelo"]) && isset($_GET["version"])) {
			unset($columID); 
			$marca = $_GET["marca"];
			$modelo = $_GET["modelo"];
			$version = $_GET["version"];
			$query = "SELECT DISTINCT anio_auto FROM datos WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto='$version' AND anio_auto<>'' ORDER BY anio_auto DESC";
			$colum = "anio_auto";
			$columJ = "anio";
		}
	} else {
		$colum = "marca_auto";
		$query = "SELECT DISTINCT marca_auto FROM datos ORDER BY marca_auto ASC";
		$columJ = "marca";
	}

	$con=mysqli_connect("localhost","root","","autos_baterias");

	if (mysqli_connect_errno()) {
		echo "Error al conectarse con MYSQL: " . mysqli_connect_error();
	}

	$result = mysqli_query($con,$query);
	$response = array();
	$autos = array();

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

	mysqli_close($con);
	
	header('Content-Type: application/json');

	if (isset($_GET["callback"])) {
		echo $_GET['callback'].'('.json_encode($response).')';
	}else {
		echo json_encode($response);
	}	
	
?> 
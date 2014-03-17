<?php

	if (isset($_GET["marca"]) || isset($_GET["modelo"]) || isset($_GET["version"])) {
		if (isset($_GET["marca"])){ $marca = $_GET["marca"]; $query = "SELECT  DISTINCT modelo_id,modelo_auto FROM datos WHERE marca_auto='$marca'"; $columID = "modelo_id"; $colum = "modelo_auto"; $columJ = "modelo"; }
		if (isset($_GET["modelo"])){ $modelo = $_GET["modelo"]; $query = "SELECT DISTINCT version_auto FROM datos WHERE modelo_auto='$modelo'"; $colum = "version_auto"; $columJ = "version"; }
		if (isset($_GET["version"])){ $version = $_GET["version"]; $query = "SELECT DISTINCT anio_auto FROM datos WHERE version_auto='$version'"; $colum = "anio_auto"; $columJ = "anio"; }
	} else {
		$colum = "marca_auto";
		$query = "SELECT DISTINCT marca_auto FROM datos";
		$columJ = "marca";
	}

	$con=mysqli_connect("localhost","root","","autos_baterias");
	// Check connection
	if (mysqli_connect_errno()) {
		echo "Error al conectarse con MYSQL: " . mysqli_connect_error();
	}

	//$query = "SELECT * FROM datos WHERE marca_auto='$marca' AND modelo_auto='$modelo_auto' AND version_auto='$version_auto' AND anio_auto='$anio_auto'";
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
	//$fp = fopen('results.json', 'w');
	//fwrite($fp, json_encode($response));
	header('Content-Type: application/json');
	echo json_encode($response);
	//echo $marca;
	//fclose($fp);	
	
?> 
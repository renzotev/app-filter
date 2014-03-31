<?php

	if (isset($_GET["marca"]) || isset($_GET["modelo"]) || isset($_GET["version"]) || isset($_GET["anio"])) {
		$colum = array("marca" => "marca_bateria", "modelo" => "modelo_bateria", "sku" => "sku_bateria");
		$columJ = array("marca","modelo","sku");

		if (isset($_GET["marca"]) && isset($_GET["modelo"])) { 
			$marca = $_GET["marca"]; 
			$modelo = $_GET["modelo"];  
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM datos WHERE marca_auto='$marca' AND modelo_id='$modelo' ORDER BY modelo_bateria ASC"; 
		}
		if (isset($_GET["marca"]) && isset($_GET["modelo"]) && isset($_GET["version"])) { 
			$marca = $_GET["marca"]; 
			$modelo = $_GET["modelo"];
			$version = $_GET["version"];    
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM datos WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto='$version' ORDER BY modelo_bateria ASC"; 
		}
		if (isset($_GET["marca"]) && isset($_GET["modelo"]) && isset($_GET["version"]) && isset($_GET["anio"])) { 
			$marca = $_GET["marca"]; 
			$modelo = $_GET["modelo"];
			$version = $_GET["version"];
			$anio = $_GET["anio"];
			$query = "SELECT DISTINCT marca_bateria,modelo_bateria,sku_bateria FROM datos WHERE marca_auto='$marca' AND modelo_id='$modelo' AND version_auto='$version' AND anio_auto='$anio' ORDER BY modelo_bateria ASC"; 
		}
		
	} 

	$con=mysqli_connect("localhost","root","","autos_baterias");

	if (mysqli_connect_errno()) {
		echo "Error al conectarse con MYSQL: " . mysqli_connect_error();
	}

	$result = mysqli_query($con,$query);
	$response = array();
	$baterias = array();

	while($row = mysqli_fetch_array($result)) {
		$marca_b = $row[$colum["marca"]];
		$modelo_b = $row[$colum["modelo"]];
		$sku_b = $row[$colum["sku"]];
		$baterias[] = array($columJ[0] => $marca_b, $columJ[1] => $modelo_b, $columJ[2] => $sku_b);
	}

	$response['baterias'] = $baterias;

	mysqli_close($con);
	header('Content-Type: application/json');
	if (isset($_GET["callback"])) {
		echo $_GET['callback'].'('.json_encode($response).')';
	}else {
		echo json_encode($response);
	}
	
?> 
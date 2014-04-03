<?php 
	$con=mysqli_connect("localhost","root","","autos_baterias");

	mysqli_query($con, "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");


	if (mysqli_connect_errno()) {
		echo "Error al conectarse con MYSQL: " . mysqli_connect_error();
	}
?>
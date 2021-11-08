<?php
	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];
		
		mysqli_close($conn);

		echo json_encode($output);
		
		exit;

	}	

	$query = 'SELECT p.departmentID, d.name as department, l.id as locationID, l.name as location, COUNT(*) as employees FROM personnel p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID) GROUP BY p.departmentID ORDER BY department';

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);
		
		echo json_encode($output); 
		
		exit;

	}

   	$with = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($with, $row);

	}

	// second query

	$query = 'SELECT d.id AS departmentID, d.name AS department, d.locationID AS locationID, l.name as location FROM department d LEFT JOIN location l ON (l.id = d.locationID) WHERE d.id NOT IN (SELECT p.departmentID FROM personnel p)';

	$result = $conn->query($query);

	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

	$without = [];

    while ($row = mysqli_fetch_assoc($result)) {

		array_push($without, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['with'] = $with;
	$output['data']['without'] = $without;

    mysqli_close($conn);

	echo json_encode($output); 
?>
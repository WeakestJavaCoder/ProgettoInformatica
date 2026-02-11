<?php
$host = "localhost";       
$user = "root";            
$password = "";            
$database = "infinity_school";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>

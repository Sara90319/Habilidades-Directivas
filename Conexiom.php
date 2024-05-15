<?php

$host_db = "";
$user_db = "";
$pass_db = "";
$db_name = "cartelera.sql";



$conexion = new mysqli($host_db,$user_db,$pass_db,$db_name);

if($conexion->connect_error){
    echo"<h1>MySQL no le  esta dando permisos para ejecutar</h1>";
}

?>
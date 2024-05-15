<?php
require 'conexion.php';
session_start();

$usuario = $_POST['correo_electronico'];
$clave = $_POST['clave'];


$q = "SELECT COUNT(*) as contar from cusuario where correo_electronico= '$usuario' and password = '$clave'";

$consulta = mysqli_query($conexion, $q);

$array = mysqli_fetch_array($consulta);

if ($array['contar'] > 0) {

    // en la variable session se guarda el correo electronico esto para poder acarrearlo
    $_SESSION['usermane'] = $no_cuenta;

    header("location: ../index.html");
} else {

    header("location: ../indexError.php");
}
?>
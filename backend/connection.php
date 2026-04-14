<?php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = 'ellos_teste';
$connection = new mysqli($host, $usuario, $senha, $banco, );

if ($connection->connect_error) {
    die("Erro na conexão: " . $connection->connect_error);
}

$connection->set_charset("utf8mb4");
?>
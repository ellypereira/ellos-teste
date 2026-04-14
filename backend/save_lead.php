<?php
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/connection.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Método não permitido."
    ]);
    exit;
}

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$telefone = trim($_POST["telefone"] ?? "");
$mensagem = trim($_POST["mensagem"] ?? "");

if ($nome === "" || $email === "" || $telefone === "" || $mensagem === "") {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Preencha todos os campos."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "E-mail inválido."
    ]);
    exit;
}

$sql = "INSERT INTO leads (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)";
$stmt = $connection->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao preparar a consulta SQL."
    ]);
    exit;
}

$stmt->bind_param("ssss", $nome, $email, $telefone, $mensagem);

if ($stmt->execute()) {
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Dados enviados com sucesso!"
    ]);
} else {
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao salvar os dados no banco."
    ]);
}

$stmt->close();
$connection->close();
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

$body = json_decode(file_get_contents('php://input'), true);

if (empty($body['usuario']) || empty($body['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Usuario y contraseña son obligatorios']);
    exit();
}

$archivo = __DIR__ . '/usuarios.json';

if (!file_exists($archivo)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se encontró la base de datos de usuarios']);
    exit();
}

$usuarios = json_decode(file_get_contents($archivo), true) ?? [];
$usuarioEncontrado = null;

foreach ($usuarios as $u) {
    if ($u['usuario'] === $body['usuario']) {
        $usuarioEncontrado = $u;
        break;
    }
}

if (!$usuarioEncontrado) {
    http_response_code(401); 
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
    exit();
}

if (!password_verify($body['password'], $usuarioEncontrado['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
    exit();
}

http_response_code(200);
echo json_encode([
    'ok'      => true,
    'usuario' => $usuarioEncontrado['usuario']
]);
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$archivo = __DIR__ . '/tareas.json';

function leerTareas($archivo) {

    if (!file_exists($archivo) || filesize($archivo) === 0) {
        return [];
    }
    $contenido = file_get_contents($archivo);

    return json_decode($contenido, true) ?? [];
}

function guardarTareas($archivo, $tareas) {
    file_put_contents($archivo, json_encode(array_values($tareas), JSON_PRETTY_PRINT));
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $tareas = leerTareas($archivo);
    echo json_encode(array_values($tareas));
    exit();
}

if ($metodo === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);

    if (empty($body['titulo'])) {
        http_response_code(400); 
        echo json_encode(['error' => 'El título es obligatorio']);
        exit();
    }

    $tareas = leerTareas($archivo);

    $nuevaTarea = [
        'id'          => time() * 1000, 
        'titulo'      => $body['titulo'],
        'descripcion' => $body['descripcion'] ?? '',
        'fecha'       => $body['fecha'] ?? date('Y-m-d'),
        'completada'  => false
    ];

    $tareas[] = $nuevaTarea;
    guardarTareas($archivo, $tareas);

    http_response_code(201); // 201 = Created
    echo json_encode($nuevaTarea);
    exit();
}

if ($metodo === 'PUT') {
    $body = json_decode(file_get_contents('php://input'), true);

    if (empty($body['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Se requiere el id de la tarea']);
        exit();
    }

    $tareas = leerTareas($archivo);
    $encontrada = false;

    foreach ($tareas as &$tarea) {
        if ($tarea['id'] == $body['id']) {
            if (isset($body['completada']))  $tarea['completada']  = $body['completada'];
            if (isset($body['titulo']))      $tarea['titulo']      = $body['titulo'];
            if (isset($body['descripcion'])) $tarea['descripcion'] = $body['descripcion'];
            if (isset($body['fecha']))       $tarea['fecha']       = $body['fecha'];
            $encontrada = true;
            $tareaActualizada = $tarea;
            break;
        }
    }

    if (!$encontrada) {
        http_response_code(404); 
        echo json_encode(['error' => 'Tarea no encontrada']);
        exit();
    }

    guardarTareas($archivo, $tareas);
    echo json_encode($tareaActualizada);
    exit();
}

if ($metodo === 'DELETE') {
    $body = json_decode(file_get_contents('php://input'), true);

    if (empty($body['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Se requiere el id de la tarea']);
        exit();
    }

    $tareas = leerTareas($archivo);
    $tareasFiltradas = array_filter($tareas, fn($t) => $t['id'] != $body['id']);

    guardarTareas($archivo, $tareasFiltradas);
    echo json_encode(['mensaje' => 'Tarea eliminada']);
    exit();
}

http_response_code(405); 
echo json_encode(['error' => 'Método no permitido']);
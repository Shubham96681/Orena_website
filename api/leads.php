<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    authenticateAdmin();
    $stmt = $db->query('SELECT * FROM leads ORDER BY created_at DESC');
    $leads = $stmt->fetchAll();
    echo json_encode($leads ?: []);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $interest = $data['interest'] ?? '';
    $type = $data['type'] ?? '';
    $source_page = $data['source_page'] ?? '';

    if (!$name || !$email || !$phone) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email, and phone are required.']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit();
    }

    if (!preg_match("/^(\+91[\-\s]?)?[6789]\d{9}$/", $phone)) {
        http_response_code(400);
        echo json_encode(['error' => 'Please enter a valid 10-digit Indian phone number.']);
        exit();
    }

    $name = sanitizeInput($name);
    $email = sanitizeInput($email);
    $phone = sanitizeInput($phone);
    $interest = sanitizeInput($interest);
    $type = sanitizeInput($type);
    $source_page = sanitizeInput($source_page);

    $stmt = $db->prepare('INSERT INTO leads (name, email, phone, interest, type, source_page) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt->execute([$name, $email, $phone, $interest, $type, $source_page])) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error while saving lead']);
    }
    exit();
}

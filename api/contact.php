<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    authenticateAdmin();
    $stmt = $db->query('SELECT * FROM contacts ORDER BY created_at DESC');
    $contacts = $stmt->fetchAll();
    echo json_encode($contacts ?: []);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $subject = $data['subject'] ?? '';
    $message = $data['message'] ?? '';

    if (!$name || !$email || !$message) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email, and message are required.']);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format.']);
        exit();
    }

    $name = sanitizeInput($name);
    $email = sanitizeInput($email);
    $phone = sanitizeInput($phone);
    $subject = sanitizeInput($subject);
    $message = sanitizeInput($message);

    $stmt = $db->prepare('INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)');
    if ($stmt->execute([$name, $email, $phone, $subject, $message])) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error while saving contact message']);
    }
    exit();
}

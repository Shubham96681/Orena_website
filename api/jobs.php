<?php
require_once 'db.php';

$job_id = $_GET['id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($job_id) {
        $stmt = $db->prepare('SELECT * FROM jobs WHERE id = ?');
        $stmt->execute([$job_id]);
        $job = $stmt->fetch();
        if ($job) {
            echo json_encode($job);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Job not found']);
        }
    } else {
        $stmt = $db->query('SELECT * FROM jobs ORDER BY created_at DESC');
        $jobs = $stmt->fetchAll();
        echo json_encode($jobs ?: []);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    authenticateAdmin();
    $data = json_decode(file_get_contents('php://input'), true);
    
    $title = $data['title'] ?? '';
    $company_name = $data['company_name'] ?? '';
    $description = $data['description'] ?? '';
    $location = $data['location'] ?? '';
    $type = $data['type'] ?? '';
    $department = $data['department'] ?? '';
    $experience_required = $data['experience_required'] ?? '';

    $stmt = $db->prepare('INSERT INTO jobs (title, company_name, description, location, type, department, experience_required) VALUES (?, ?, ?, ?, ?, ?, ?)');
    if ($stmt->execute([$title, $company_name, $description, $location, $type, $department, $experience_required])) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Server error adding job']);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    authenticateAdmin();
    if ($job_id) {
        $stmt = $db->prepare('DELETE FROM jobs WHERE id = ?');
        if ($stmt->execute([$job_id])) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Server error deleting job']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Job ID required']);
    }
    exit();
}

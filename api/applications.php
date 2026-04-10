<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    authenticateAdmin();
    $stmt = $db->query('SELECT * FROM job_applications ORDER BY created_at DESC');
    $applications = $stmt->fetchAll();
    echo json_encode($applications ?: []);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle multipart/form-data for files
    $d = $_POST;
    
    $resume_path = null;
    $certificate_path = null;
    
    $uploadDir = __DIR__ . '/../uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    function handleUpload($fileKey, $uploadDir) {
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
            $uniqueSuffix = time() . '-' . mt_rand(0, 1000000);
            $filename = $fileKey . '-' . $uniqueSuffix . '.' . $ext;
            if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $uploadDir . $filename)) {
                return $filename;
            }
        }
        return null;
    }

    $resume_path = handleUpload('resume', $uploadDir);
    $certificate_path = handleUpload('certificate', $uploadDir);

    $name = $d['name'] ?? '';
    $email = $d['email'] ?? '';
    $phone = $d['phone'] ?? '';

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

    $stmt = $db->prepare("
        INSERT INTO job_applications (
            job_id, name, dob, email, phone, skills, college_name, bachelor_degree,
            engineering_discipline, master_degree, collage_name2, master_discipline,
            certification_course, training_institute, applied_position, ctc, ectc,
            experience, current_location, preferred_location, tenth_percentage,
            twelfth_percentage, diploma_percentage, degree_percentage, pg_percentage,
            notice_period, looking_for_job, holding_offer, resume_path, certificate_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $params = [
        $d['job_id'] ?? null, sanitizeInput($name), sanitizeInput($d['dob'] ?? ''), sanitizeInput($email), sanitizeInput($phone), sanitizeInput($d['skills'] ?? ''),
        sanitizeInput($d['college_name'] ?? ''), sanitizeInput($d['bachelor_degree'] ?? ''), sanitizeInput($d['engineering_discipline'] ?? ''),
        sanitizeInput($d['master_degree'] ?? ''), sanitizeInput($d['collage_name2'] ?? ''), sanitizeInput($d['master_discipline'] ?? ''),
        sanitizeInput($d['certification_course'] ?? ''), sanitizeInput($d['training_institute'] ?? ''), sanitizeInput($d['applied_position'] ?? ''),
        sanitizeInput($d['ctc'] ?? ''), sanitizeInput($d['ectc'] ?? ''), sanitizeInput($d['experience'] ?? ''), sanitizeInput($d['current_location'] ?? ''),
        sanitizeInput($d['preferred_location'] ?? ''), sanitizeInput($d['tenth_percentage'] ?? ''), sanitizeInput($d['twelfth_percentage'] ?? ''),
        sanitizeInput($d['diploma_percentage'] ?? ''), sanitizeInput($d['degree_percentage'] ?? ''), sanitizeInput($d['pg_percentage'] ?? ''),
        sanitizeInput($d['notice_period'] ?? ''), sanitizeInput($d['looking_for_job'] ?? ''), sanitizeInput($d['holding_offer'] ?? ''),
        $resume_path, $certificate_path
    ];

    if ($stmt->execute($params)) {
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Server error submitting application']);
    }
    exit();
}

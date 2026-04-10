<?php
$dbPath = __DIR__ . '/../database.sqlite';
try {
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Ensure basic tables exist
    $db->exec("
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        interest TEXT,
        type TEXT,
        source_page TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company_name TEXT,
        description TEXT,
        location TEXT,
        type TEXT,
        department TEXT,
        experience_required TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER,
        name TEXT NOT NULL,
        dob TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        skills TEXT NOT NULL,
        college_name TEXT NOT NULL,
        bachelor_degree TEXT NOT NULL,
        engineering_discipline TEXT NOT NULL,
        master_degree TEXT,
        collage_name2 TEXT,
        master_discipline TEXT,
        certification_course TEXT NOT NULL,
        training_institute TEXT,
        applied_position TEXT NOT NULL,
        ctc TEXT,
        ectc TEXT NOT NULL,
        experience TEXT NOT NULL,
        current_location TEXT NOT NULL,
        preferred_location TEXT NOT NULL,
        tenth_percentage TEXT NOT NULL,
        twelfth_percentage TEXT NOT NULL,
        diploma_percentage TEXT,
        degree_percentage TEXT NOT NULL,
        pg_percentage TEXT,
        notice_period TEXT NOT NULL,
        looking_for_job TEXT NOT NULL,
        holding_offer TEXT NOT NULL,
        resume_path TEXT,
        certificate_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    ");

    // Insert admin if not exists
    $stmt = $db->query("SELECT COUNT(*) FROM users WHERE username = 'admin'");
    if ($stmt->fetchColumn() == 0) {
        $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->execute(['admin', 'admin_orena_2024']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

function sanitizeInput($str) {
    if (!$str) return '';
    return trim(str_replace(['<', '>', "'", '"'], '', (string)$str));
}

function authenticateAdmin() {
    $headers = null;
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
    } else {
        $headers = $_SERVER; // Fallback for some CGI/FCGI setups
    }
    
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? $headers['HTTP_AUTHORIZATION'] ?? '';
    if ($authHeader === 'Bearer fake-jwt-token-for-demo') {
        return true;
    }
    http_response_code(403);
    echo json_encode(['error' => 'Access denied. Authenticated admin only.']);
    exit();
}

// Ensure proper headers are set for JSON API and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>

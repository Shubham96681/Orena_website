<?php
// router.php - Used ONLY for local PHP built-in server testing.
// This mimics what the .htaccess file does on Hostinger's Apache server.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Mocking the Apache Header behavior for Authorization headers in PHP CLI server
$headers = getallheaders();
if (isset($headers['Authorization']) && !isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $_SERVER['HTTP_AUTHORIZATION'] = $headers['Authorization'];
}

// Route matching for /api/jobs/123
if (preg_match('#^/api/jobs/([0-9]+)$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    include __DIR__ . '/api/jobs.php';
    return true;
}

// Route matching for other /api/* requests
if (preg_match('#^/api/([a-zA-Z0-9_-]+)$#', $uri, $matches)) {
    $script = __DIR__ . '/api/' . $matches[1] . '.php';
    if (file_exists($script)) {
        include $script;
        return true;
    }
}

// For all other requests, serve files directly (e.g., if you access images directly)
return false;

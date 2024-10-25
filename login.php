<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

// Sample user data for validation
$adminData = [
    "admin1" => ["password" => "password1", "page" => "admin1"],
    "admin2" => ["password" => "password2", "page" => "admin2"],
    "admin3" => ["password" => "password3", "page" => "admin3"],
];

// Validate credentials
if (isset($adminData[$username]) && $adminData[$username]['password'] === $password) {
    echo json_encode(['success' => true, 'adminPage' => $adminData[$username]['page']]);
} else {
    echo json_encode(['success' => false]);
}
?>

<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:03 AM
 */

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: content-type');

require_once '../config/Database.php';
require_once '../models/User.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

/* Populate post array from json content
 * SOURCE: https://stackoverflow.com/questions/1282909/php-post-array-empty-upon-form-submission
 * Author: Tiltem
 */
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Get data from post array
$user_username = isset($_POST['user']['username']) ? $_POST['user']['username'] : null;
$user_password = isset($_POST['user']['password']) ? $_POST['user']['password'] : null;
$user_boozebar = isset($_POST['user']['boozebar']) ? $_POST['user']['boozebar'] : null;

if ($user_username!= null && $user_password != null && $user_boozebar != null) {
    $user = new User($db, $user_username, $user_password, $user_boozebar);
    echo ($user->credentialsAreValid() && $user->hasAccessToBoozebar()) ? json_encode(['jwt' => $user->getToken()]) : json_encode(['jwt' => []]);
} else {
  // Incorrect credentials
  echo json_encode(['jwt' => []]);
}

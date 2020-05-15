<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:03 AM
 */

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: authorization, content-type');

include_once '../../config/Database.php';
include_once '../../models/Cocktails.php';
include_once '../../other/Helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
  exit();

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate category object
$cocktails = new Cocktails($db);

// Category read query
if (Helper::isAuthorized()) {
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);

  if (isset($_POST['customMix']) && isset($_POST['customMix']['ingredients']) && $_POST['customMix']['ingredients'] != []) {
    $test = $cocktails->write($_POST['customMix']);
    var_dump($test);
  }
} else {
  echo json_encode('Error');
}

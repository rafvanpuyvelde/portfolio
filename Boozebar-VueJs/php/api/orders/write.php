<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:03 AM
 */

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: authorization, content-type');

include_once '../../config/Database.php';
include_once '../../models/Orders.php';
include_once '../../other/Helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
  exit();

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate category object
$orders = new Orders($db);

// Orders read query
if (Helper::isAuthorized())  {
  $rest_json = file_get_contents("php://input");
  $_POST = json_decode($rest_json, true);

  if (isset($_POST['order']) && count($_POST['order']) > 0) {
    $result = [];
    foreach ($_POST['order'] as $key => $value)
      array_push($result, $orders->placeOrder($value, 1));
    echo json_encode($result);
  }
  else {
    echo('Empty');
  }
}

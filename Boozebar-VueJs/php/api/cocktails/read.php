<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:03 AM
 */

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

// Instantiate Ingredients object
$cocktails = new Cocktails($db);

// Turn to JSON & output
if (Helper::isAuthorized())
  echo json_encode($cocktails->read());
else {
  echo json_encode('Unauthorized');
}

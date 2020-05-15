<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:03 AM
 */

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once '../../config/Database.php';
include_once '../../models/Orders.php';
include_once '../../other/Helper.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate Orders object
$orders = new Orders($db);

echo $orders->getLatestOrder();

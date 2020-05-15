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

include_once '../other/Helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
  exit();

Helper::isAuthorized();

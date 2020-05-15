<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 10:52 AM
 */

require_once $_SERVER["DOCUMENT_ROOT"] . 'boozebar/vendor/autoload.php';
require_once $_SERVER["DOCUMENT_ROOT"] . 'boozebar/config/config.php';

use \Firebase\JWT\JWT;

class Helper
{
    // Helper method
    public static function dbResultsToObjectArray($dbResult, $resultName)
    {
        $result = array($resultName => array());

        while($row = $dbResult->fetch(PDO::FETCH_ASSOC))
            array_push($result[$resultName], $row);

        return $result;
    }

    //
    // Authentication Logic
    //
    public static function isAuthorized()
    {
        try {
            $jwt = Helper::getAuth();
            $key = base64_decode(KEY);
            $token = JWT::decode($jwt, $key, array('HS512'));
            return true;
        } catch (Exception $e) {
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }
    }

    private static function getAuth()
    {
        return (array_key_exists('Authorization', getallheaders())) ? explode(' ', getallheaders()['Authorization'])[1] : null;
    }
}

<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 9:53 AM
 */

require_once '../other/Helper.php';
require_once '../vendor/autoload.php';
require_once '../config/config.php';

use \Firebase\JWT\JWT;

class User
{
  // DB Stuff
  private $conn;
  private $table = 'users';

  // User info
  private $id;
  private $name;
  private $password;
  private $boozebarId;

  // Constructor with DB
  public function __construct($db, $username, $password, $boozebarId) {
    $this->conn = $db;
    $this->name = $username;
    $this->password = $password;
    $this->boozebarId = $boozebarId;
  }

  // Check user credentials
  public function credentialsAreValid() {
    return password_verify($this->password, $this->getHashedPassword());
  }

  public function hasAccessToBoozebar() {
    $query = 'SELECT BoozeBars_Id, Name FROM ' . $this->table . ' INNER JOIN boozebars_has_users ON users.Id = boozebars_has_users.Users_Id WHERE BoozeBars_Id = ? AND Name = ?;';

    $stmt = $this->conn->prepare($query);
    $stmt->execute(array($this->boozebarId, $this->name));
    $result = $stmt->fetchAll();

    return $stmt->rowCount() > 0;
  }

  // Get hashed password from DB
  private function getHashedPassword() {
    $query = 'SELECT Id, Password FROM ' . $this->table . ' WHERE Name = ?';

    $stmt = $this->conn->prepare($query);
    $stmt->execute(array($this->name));

    $result = $stmt->fetchAll();

    if ($result != [])
      $this->id = $result[0]['Id'];

    return ($stmt->rowCount() > 0) ? $result[0]['Password'] : null;
  }

  public function getToken() {
    // Decode stored key for further use
    $key = base64_decode(KEY);

    /** Documentation about JWT Claims
     * SOURCE: https://tools.ietf.org/html/rfc7519#section-4.1
     * M. Jones, Microsoft, J. Bradley, Ping Identity, N. Sakimura, NRI
     */
    $tokenId   = base64_encode(random_bytes(32));  // Generate random id
    $issuedAt  = time();
    $notBefore = $issuedAt;
    $expire    = $notBefore + 1800;                  // Adding 30 minutes

    $token = array (
        'iat'  => $issuedAt,         // Issued at: time when the token was generated
        'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
        'iss'  => SERVER_NAME,       // Issuer
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expire
        'data' => [
          'userId' => $this->id,     // User id
        ]
    );

    return JWT::encode (
      $token,
      $key,
      'HS512'
    );
  }
}

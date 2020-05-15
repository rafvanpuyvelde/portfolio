<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 9:53 AM
 */

include_once '../../other/Helper.php';

class Ingredients
{
    // DB Stuff
    private $conn;
    private $table = 'ingredients';

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Ingredients
    public function read() {
        $query = 'SELECT Id, Name, Alcohol, Location, Contents FROM ' . $this->table . ' 
                  INNER JOIN boozebars_has_ingredients ON Id = Ingredients_Id 
                  ORDER BY Location ASC;';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'ingredients') : array('ingredients' => array());
    }
}

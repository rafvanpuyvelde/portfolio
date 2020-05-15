<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 9:53 AM
 */

include_once '../../other/Helper.php';

class Cocktails
{
    // DB Stuff
    private $conn;
    private $table = 'cocktails';

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Ingredients
    public function read() {
        $query = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'cocktails') : array('cocktails' => array());
    }

    // Add new cocktail
    public function write($data) {
        $query = 'INSERT INTO cocktails (Name, Discription) VALUES (?, ?)';
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($data['name'], $data['description']));

        foreach ($data['ingredients'] as $key => $value)
            $this->writeIngredients($value, $this->getCocktailID($data['name']));
    }

    private function writeIngredients($data, $cocktailID) {
        $query = 'INSERT INTO cocktails_has_ingredients (Cocktails_Id, Ingredients_Id, Units) VALUES(?, ?, ?)';
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($cocktailID, $data['id'], $data['amount']));
    }

    private function getCocktailID($cocktailName) {
        $query = 'SELECT Id FROM cocktails WHERE Name = ?';

        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($cocktailName));

        return (int)$stmt->fetch(PDO::FETCH_ASSOC)['Id'];
    }
}

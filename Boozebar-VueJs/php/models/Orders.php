<?php
/**
 * @author Raf Vanpuyvelde
 * Date: 3/18/2019
 * Time: 9:53 AM
 */

include_once '../../other/Helper.php';

class Orders
{
    // DB Stuff
    private $conn;
    private $table = 'orders';

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    public function getOldestOrder() {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY Id ASC LIMIT 1';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'order') : array('order' => array());
    }

    public function getLatestFinishedOrder() {
        $query = "SELECT * FROM " . $this->table . " WHERE Status = 'Finished' ORDER BY StopTime DESC LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'order') : array('order' => array());
    }

    public function getLatestOrder() {
        $result = null;
        $query = "SELECT Id, OrderString FROM " . $this->table . " WHERE Status IS NULL ORDER BY Id ASC LIMIT 1;";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Update order status
        if ($result != null)
            $this->updateOrderStatus((int)$result['Id']);

        return implode(',', $result);
    }

    private function updateOrderStatus($orderID) {
        $query = "UPDATE orders SET Status = 'Finished' WHERE Id = ?;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($orderID));
    }

    public function getAllOrders() {
        $query = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'queue') : array('queue' => array());
    }

    // TODO: Allow multiple boozebar('s)
    // TODO: Check if user is boozebar user
    public function placeOrder($order, $boozebarID) {
        $result = [];
        $ingredients = $this->getCocktailIngredients($order)['cocktail_ingredients'];
        $orderString = $this->getOrderStringCocktail($ingredients);

        for ($i=0; $i < (int)$order['Amount']; $i++) {
            $orderSuccessful = $this->isCommitOrderSuccessful($order);
            if ($orderSuccessful === true) {
                $this->insertOrderStringIntoDB($orderString, $boozebarID); // Insert db orderstrings
                $this->updateBottleContents($order['Name'], $ingredients); // Update db bottle contents
                array_push($result, 'Successfully ordered ' . $order['Name']);
            } else
                array_push($result, 'Unable to request cocktail: ' . $order['Name'] . '. Insufficient ' . implode(', ', $orderSuccessful));
        }

        return $result;
    }

    private function updateBottleContents($cocktailName, $ingredients) {
        $query = "UPDATE boozebars_has_ingredients
                  INNER JOIN cocktails_has_ingredients ON boozebars_has_ingredients.Ingredients_Id = cocktails_has_ingredients.Ingredients_Id
                  SET Contents = Contents - (cocktails_has_ingredients.units * 2)
                  WHERE boozebars_has_ingredients.Ingredients_Id = ?;";

        foreach ($ingredients as $key => $ingredient) {
            $stmt = $this->conn->prepare($query);
            $stmt->execute(array((int)$ingredient['Ingredients_Id']));
        }
    }

    private function insertOrderStringIntoDB($orderString, $boozebarID) {
        $query = "INSERT INTO orders (OrderString, StartTime, StopTime, Status, BoozeBars_Id) VALUES (?, null, null, null, ?);";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($orderString, $boozebarID));
    }

    private function isCommitOrderSuccessful($order) {
        $inadequateIngredients = [];
        $ingredients = $this->getCocktailIngredients($order)['cocktail_ingredients'];

        foreach ($ingredients as $key => $ingredient)
            if (!$this->isIngredientSufficient($ingredient))
                array_push($inadequateIngredients, $this->getIngredientNameById($ingredient['Ingredients_Id'])['Name']);

        return (count($inadequateIngredients) != 0) ? $inadequateIngredients : true;
    }

    private function isIngredientSufficient($ingredient) {
        $isSufficient = false;
        $shot = (int)$ingredient['Units'] * 2; // Units * 2Cl = (n)Cl
        $contents = (int)$this->getIngredientContents((int)$ingredient['Ingredients_Id'])['ingredients'][0]['Contents'];

        if ($contents - $shot >= 0)
            $isSufficient = true;

        return $isSufficient;
    }

    private function getIngredientNameById($ingredientID) {
        $query = "SELECT Name FROM ingredients WHERE Id = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($ingredientID));

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    private function getIngredientContents($ingredientID) {
        $query = "SELECT Contents FROM boozebars_has_ingredients WHERE Ingredients_Id = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($ingredientID));

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'ingredients') : array('ingredients' => array());
    }

    private function getCocktailIngredients($cocktail) {
        $query = "SELECT cocktails_has_ingredients.Cocktails_Id, cocktails_has_ingredients.Ingredients_Id, Units, Contents FROM cocktails_has_ingredients
                  INNER JOIN boozebars_has_ingredients ON cocktails_has_ingredients.Ingredients_id = boozebars_has_ingredients.Ingredients_id
                  INNER JOIN cocktails ON cocktails_has_ingredients.Cocktails_Id = cocktails.id
                  WHERE cocktails.Name = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->execute(array($cocktail['Name']));

        return ($stmt->rowCount() > 0) ? Helper::dbResultsToObjectArray($stmt, 'cocktail_ingredients') : array('cocktail_ingredients' => array());
    }

    private function getOrderStringCocktail($cocktail_ingredients) {
        $orderString = '000000000';

        // Stel Gin tonic, 2x ingr_id 2 & 6x ingr_id 8
        // 020 000 060 :: Order string
        // 123 456 789 :: Posities

        foreach ($cocktail_ingredients as $key => $ingredient)
            $orderString = substr_replace($orderString, $ingredient['Units'], (string)((int)$ingredient['Ingredients_Id'] - 1), 1);

        return $orderString;
    }
}

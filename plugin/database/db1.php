<?php

$servername = "localhost";
$username = "root";
$password = "";

try {

    $conn = new PDO("mysql:host=$servername;dbname=country", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if (isset($_POST['id'])===true) {
        $id = $_POST['id'];
        $stmt = $conn->prepare("SELECT * FROM country_list WHERE continent_id =:id");
        $stmt->bindParam(':id', $id);
    }else{
        $stmt = $conn->prepare(" SELECT * FROM continent ");
    }
    $stmt->execute();
    // set the resulting array to associative
    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    $data=$result;

    echo json_encode($data);

}
catch(PDOException $e)
{
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;


?>

<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
    // you want to allow, and if so:
    header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 1000');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
    }
    exit(0);
}
    require_once "./db.php";

    class Api{
        private $action;
        private $data;
        private $con;

        function __construct(){
            $this->con = dbConnect();
            $_POST = json_decode(file_get_contents("php://input"),true);
            if(!empty($_POST)) {
                $this->action = $_POST['action'];
                $this->data = $_POST['data'];
            }elseif(!empty($_GET)) {
                $this->action = $_GET['action'];
                $this->data = $_GET['data'];
            }

            if(!empty($_POST) || !empty($_GET)){
                $this->whichAction();
            }
        }

        function getAction(){
            return $this->action;
        }

        function getData(){
            return $this->data;
        }

        function getCon(){
            return $this->con;
        }

        function whichAction(){
            switch($this->getAction()){
                case "insertProduct":
                    $this->insertProduct();
                break;

                default:
                return null;
            }
        }

        function insertProduct(){
            $data = $this->getData();

            $sql = "INSERT INTO product(name,`is_archived`) VALUES(?,?)";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute([$data['name'],false]);

            $value = $this->getCon()->lastInsertId();

            $sql = "INSERT INTO customer_product(`customer_id`,`product_id`) VALUES(?,?)";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute([$data['customerId'],$value]);
        }
    }

    new Api(); 
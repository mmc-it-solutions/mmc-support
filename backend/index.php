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
    require_once "./statements/index.php";
    
    require_once "./functions/ticket.php";
    require_once "./functions/customer.php";
    require_once "./functions/product.php";
    require_once "./functions/user.php";

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
                case "login":
                    echo json_encode(login($this->getData(),$this->getCon()));
                break;

                case "getTicket":
                    echo json_encode(getTicket($this->getData(),$this->getCon()));
                break;

                case "getTickets":
                    echo json_encode(getTickets($this->getData(),$this->getCon()));
                break;

                case "getCustomer":
                    echo json_encode(getCustomer($this->getData(),$this->getCon()));
                break;

                case "getCustomers":
                    echo json_encode(getCustomers($this->getData(),$this->getCon()));
                break;
                
                case "getUser":
                    echo json_encode(getUser($this->getData(),$this->getCon()));
                break;

                case "getUsers":
                    echo json_encode(getUsers($this->getData(),$this->getCon()));
                break;

                case "insertProduct":
                    echo json_encode(insertProduct($this->getData(),$this->getCon()));
                break;

                case "insertCustomer":
                    echo json_encode(insertCustomer($this->getData(),$this->getCon()));
                break;

                case "insertTicket":
                    echo json_encode(insertTicket($this->getData(),$this->getCon()));
                break;

                case "insertUser":
                    echo json_encode(insertUser($this->getData(),$this->getCon()));
                break;

                default:
                return null;
            }
        }
    }

    new Api(); 
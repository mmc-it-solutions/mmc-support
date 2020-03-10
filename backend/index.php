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
                case "getTicket":
                    $this->getTicket();
                break;

                case "getTickets":
                    $this->getTickets();
                break;

                case "getCustomers":
                    $this->getCustomers();
                break;

                case "getProducts":
                    $this->getProducts();
                break;

                case "insertProduct":
                    $this->insertProduct();
                break;

                case "insertCustomer":
                    $this->insertCustomer();
                break;

                case "insertTicket":
                    $this->insertTicket();
                break;

                default:
                return null;
            }
        }

        function getTicket(){
            $data = $this->getData();

            $sql = "SELECT * FROM ticket WHERE id=?";
            $value = $this->getCon()->prepare($sql)->execute($data['id']);
            $returnArray[$data['id']] = [
                 'id'            => $value['id'],
                'titel'         => $value['titel'],
                 'description'   => $value['description'],
                 'status'        => $value['status'],
                  'worktime'      => $value['worktime'],
                 'is_archived'   => $value['is_archived'],
                 'date_created'  => $value['date_created'] 
            ];
            echo json_encode($returnArray);
        }

        function getTickets(){
            $sql = "SELECT * FROM ticket";
            $statement = $this->getCon()->prepare($sql)->execute();
            $returnArray = [];
            foreach ($statement as $key => $value) {
                $returnArray[$key] = [
                    'id'            => $value['id'],
                    'titel'         => $value['titel'],
                    'description'   => $value['description'],
                    'status'        => $value['status'],
                    'worktime'      => $value['worktime'],
                    'is_archived'   => $value['is_archived'],
                    'date_created'  => $value['date_created'] 
                ];
            }
            echo json_encode($returnArray);
        }

        function getCustomers(){
            $sql = "SELECT * FROM customer";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute();
            $customers = $statement->fetchAll();
            $returnArray = [];
            foreach ($customers as $key => $value) {
                $returnArray[$key] = [
                    'id'            => $value['id'],
                    'name'          => $value['company_name'],
                    'email'         => $value['email'],
                    'products'      => 2,
                    'actions'       => ""
                ];
            }
            echo json_encode($returnArray);
        }

        function getProducts(){
            $sql = "SELECT * FROM product";
            $statement = $this->getCon()->prepare($sql)->execute();
            $returnArray = [];
            foreach ($statement as $key => $value) {
                $returnArray[$key] = [
                    'id'            => $value['id'],
                    'name'         => $value['name'],
                    'is_archived'   => $value['is_archived'],
                ];
            }
            echo json_encode($returnArray);
        }

        function insertTicket(){
            $data = $this->getData();

            $sql = "INSERT INTO ticket(`titel`, `description`, `status`, `worktime`,`is_archived`,`date_created`) 
                    VALUES(?,?,?,?,?,?)";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute([$data['title'],$data['description'],1,0,false,date("Y-m-d")]);

            $value = $this->getCon()->lastInsertId();

            if($data['customerId'] !== 0){
                $sql = "INSERT INTO ticket_customer(`ticket_id`,`customer_id`) 
                        VALUES(?,?)";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value,$data['customerId']]);    
            }
            if($data['productId'] !== 0){
                $sql = "INSERT INTO ticket_product(`ticket_id`,`product_id`) 
                        VALUES(?,?)";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value,$data['productId']]);    
            }
        }

        function insertCustomer(){
            $data = $this->getData();

            $sql = "INSERT INTO `customer`(`name`, `company_name`, `email`, `phone_number`) 
                    VALUES (?,?,?,?)";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute([
                $data['name'],
                $data['company_name'],
                $data['email'],
                $data['phone_number']
                ]);
                $customerId = $this->getCon()->lastInsertId();

                $sql = "SELECT * FROM customer WHERE id=?";
                $value = $this->getCon()->prepare($sql)->execute([$customerId]);
                $returnArray[$data['id']] = [
                    'id'            => $value['id'],
                    'titel'         => $value['titel'],
                    'description'   => $value['description'],
                    'status'        => $value['status'],
                    'worktime'      => $value['worktime'],
                    'is_archived'   => $value['is_archived'],
                    'date_created'  => $value['date_created'] 
               ];

                echo json_encode($statement);
        }

        function insertProduct(){
            $data = $this->getData();

            $sql = "INSERT INTO product(name,`is_archived`) 
                    VALUES(?,?)";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute([$data['name'],false]);

            try {
                $value = $this->getCon()->lastInsertId();
                $sql = "INSERT INTO customer_product(`customer_id`,`product_id`) 
                        VALUES(?,?)";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$data['customerId'],$value]);            
            } catch (Exception $fout) {
                echo "Error adding customer_product: " . $fout->getMessage();
                exit;
            }
        }
    }

    new Api(); 
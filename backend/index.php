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

                case "getCustomer":
                    $this->getCustomer();
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
            $value = $this->getCon()->prepare($sql);
            $value->execute([$data['ticketId']]);
            $ticket = $value->fetchAll();
            foreach ($ticket as $key => $value) {
                $returnArray = [
                    'id'            => $value['id'],
                    'title'         => $value['title'],
                    'description'   => $value['description'],
                    'status'        => $value['status'],
                    'worktime'      => $value['worktime'],
                    'is_archived'   => $value['is_archived'],
                    'date_created'  => $value['date_created'] 
                ];
            }
            echo json_encode($returnArray);
        }

        function getTickets(){
            $sql = "SELECT * FROM ticket";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute();
            $tickets = $statement->fetchAll();
            $returnArray = [];
            foreach ($tickets as $key => $value) {
                $companyName = "none";

                $sql = "SELECT * FROM ticket_customer WHERE `ticket_id`=?";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value['id']]);
                $companyId = $statement->fetchAll();

                if(!empty($companyId)){
                    foreach ($companyId as $key2 => $value2) {

                        $sql = "SELECT * FROM customer WHERE `id`=?";
                        $statement = $this->getCon()->prepare($sql);
                        $statement->execute([$value2['customer_id']]);
                        $company = $statement->fetchAll();

                        foreach ($company as $key3 => $value3) {
                            $companyName = $value3['company_name'];
                        }
                    }
                }

                $employeeName = "none";

                $sql = "SELECT * FROM user_ticket WHERE `ticket_id`=?";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value['id']]);
                $userId = $statement->fetchAll();
                
                if(!empty($userId)){
                    foreach ($userId as $key2 => $value2) {

                        $sql = "SELECT * FROM user WHERE `id`=?";
                        $statement = $this->getCon()->prepare($sql);
                        $statement->execute([$value2['user_id']]);
                        $employee = $statement->fetchAll();

                        foreach ($employee as $key3 => $value3) {
                            $sql = "SELECT * FROM `profile` WHERE `id`=?";
                            $statement = $this->getCon()->prepare($sql);
                            $statement->execute([$value3['profile_id']]);
                            $profile = $statement->fetchAll();

                            foreach ($profile as $key4 => $value4) {
                                $employee = $value4['first_name']." ".$value4['last_name'];
                            }
                        }
                    }
                }

                $returnArray[$key] = [
                    'id'            => $value['id'],
                    'name'          => $value['title'],
                    'status'        => $value['status'],
                    'company'       => $companyName,
                    'employee'      => $employeeName
                ];
            }
            echo json_encode($returnArray);
        }

        function getCustomer(){
            $data = $this->getData();

            $sql = "SELECT * FROM customer WHERE id=?";
            $value = $this->getCon()->prepare($sql);
            $value->execute($data['id']);
            $returnArray[$data['id']] = [
                'id'            => $value['id'],
                'name'          => $value['name'],
                'company_name'  => $value['company_name'],
                'email'         => $value['email'],
                'phone_number'  => $value['phone_number'],
            ];
            echo json_encode($returnArray);
        }

        function getCustomers(){
            $sql = "SELECT * FROM customer";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute();
            $customers = $statement->fetchAll();
            $returnArray = [];
            foreach ($customers as $key => $value) {
                $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value['id']]);
                $amountProducts = $statement->fetchColumn();

                $returnArray[$key] = [
                    'id'            => $value['id'],
                    'name'          => $value['company_name'],
                    'email'         => $value['email'],
                    'products'      => $amountProducts,
                    'actions'       => ""
                ];
            }
            echo json_encode($returnArray);
        }

        function getProducts(){
            $sql = "SELECT * FROM product";
            $statement = $this->getCon()->prepare($sql);
            $statement->execute();
            $products = $statement->fetchAll();
            $returnArray = [];
            foreach ($products as $key => $value) {
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

            $sql = "INSERT INTO ticket(`title`, `description`, `status`, `worktime`,`is_archived`,`date_created`) 
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
                    'title'         => $value['title'],
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
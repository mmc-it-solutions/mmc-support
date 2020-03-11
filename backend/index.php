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
                    echo json_encode($this->getTicket());
                break;

                case "getTickets":
                    echo json_encode($this->getTickets());
                break;

                case "getCustomer":
                    echo json_encode($this->getCustomer());
                break;

                case "getCustomers":
                    echo json_encode($this->getCustomers());
                break;

                case "getProducts":
                    echo json_encode($this->getProducts());
                break;

                case "insertProduct":
                    echo json_encode($this->insertProduct());
                break;

                case "insertCustomer":
                    echo json_encode($this->insertCustomer());
                break;

                case "insertTicket":
                    echo json_encode($this->insertTicket());
                break;

                default:
                return null;
            }
        }

        function getTicket(){
            $data = $this->getData();
            $con = $this->getCon();

            $ticket = selectStatement($con, 'ticket', true, 'id=?', [$data['ticketId']]);
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
            return $returnArray;
        }

        function getTickets(){
            $con = $this->getCon();
            $returnArray = [];

            $tickets = selectStatement($con,'ticket',false,null,null);
            foreach ($tickets as $key => $value) {

                $companyName = "none";
                $employeeName = "none";

                $companyId = selectStatement($con, "ticket_customer",true,'`ticket_id`=?',[$value['id']]);

                if(!empty($companyId)){
                    foreach ($companyId as $key2 => $value2) {
                        $company = selectStatement($con,'customer',true,'`id`=?',[$value2['customer_id']]);

                        foreach ($company as $key3 => $value3) {
                            $companyName = $value3['company_name'];
                        }
                    }
                }

                $userId = selectStatement($con, 'user_ticket', true, '`ticket_id`=?', [$value['id']]);
                
                if(!empty($userId)){
                    foreach ($userId as $key2 => $value2) {
                        $employee = selectStatement($con, 'user', true, '`id`=?', [$value2['user_id']]);

                        foreach ($employee as $key3 => $value3) {
                            $profile = selectStatement($con, 'profile',true,'`id`=?',[$value3['profile_id']]);

                            foreach ($profile as $key4 => $value4) {
                                $employeeName = $value4['first_name']." ".$value4['last_name'];
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
            return $returnArray;
        }

        function getCustomer(){
            $data = $this->getData();
            $con = $this->getCon();
            
            $customer = selectStatement($con,'customer',true,'`id`=?',[$data['customerId']]);

            foreach ($customer as $key => $value) {
                $returnArray = [
                    'id'            => $value['id'],
                    'name'          => $value['name'],
                    'company_name'  => $value['company_name'],
                    'email'         => $value['email'],
                    'phone_number'  => $value['phone_number'],
                ];
            }

            return $returnArray;
        }

        function getCustomers(){
            $con = $this->getCon();
            $returnArray = [];

            $customers = selectStatement($con,'customer', false, null, null);

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
            return $returnArray;
        }

        function getProducts(){
            $con = $this->getCon();
            $data = $this->getData();
            $returnArray = [];

            $products = selectStatement($con, 'product', false, null, null);

            foreach ($products as $key => $value) {
                $checker = false;
                $products = selectStatement($con, 
                                            'customer_product',
                                            true,
                                            'customer_id=? AND product_id=?',
                                            [$data['customerId'],$value['id']]
                                        );
                foreach ($products as $key2 => $value2) {
                    $checker = true;
                }

                if($checker){
                    $returnArray[$key] = [
                        'id'            => $value['id'],
                        'name'          => $value['name'],
                        'is_archived'   => $value['is_archived'],
                    ];
                }
            }
            return $returnArray;
        }

        function insertTicket(){
            $con = $this->getCon();
            $data = $this->getData();

            $columnNames = ['title', 'description', 'status', 'worktime','is_archived','date_created'];
            $values = [$data['title'],$data['description'],1,0,false,date("Y-m-d")];
            insertStatement($con, "ticket", $columnNames, $values);

            $value = $this->getCon()->lastInsertId();

            if($data['customerId'] != 0){
                $columnNames = ['ticket_id', 'customer_id'];
                $values = [$value,$data['customerId']];
                insertStatement($con, "ticket_customer", $columnNames, $values);
            }

            if($data['productId'] != 0){
                $columnNames = ['ticket_id', 'product_id'];
                $values = [$value,$data['productId']];
                insertStatement($con, "ticket_product", $columnNames, $values);
            }

            $tickets = selectStatement($con, 'ticket', true, '`id`=?', [$value]);
            foreach ($tickets as $key => $value) {

                $companyName = "none";
                $employeeName = "none";

                $companyId = selectStatement($con, "ticket_customer",true,'`ticket_id`=?',[$value['id']]);

                if(!empty($companyId)){
                    foreach ($companyId as $key2 => $value2) {
                        $company = selectStatement($con,'customer',true,'`id`=?',[$value2['customer_id']]);

                        foreach ($company as $key3 => $value3) {
                            $companyName = $value3['company_name'];
                        }
                    }
                }
                $userId = selectStatement($con, 'user_ticket', true, '`ticket_id`=?', [$value['id']]);
                
                if(!empty($userId)){
                    foreach ($userId as $key2 => $value2) {
                        $employee = selectStatement($con, 'user', true, '`id`=?', [$value2['user_id']]);

                        foreach ($employee as $key3 => $value3) {
                            $profile = selectStatement($con, 'profile',true,'`id`=?',[$value3['profile_id']]);

                            foreach ($profile as $key4 => $value4) {
                                $employeeName = $value4['first_name']." ".$value4['last_name'];
                            }
                        }
                    }
                }

                $returnArray = [
                    'id'            => $value['id'],
                    'name'          => $value['title'],
                    'status'        => $value['status'],
                    'company'       => $companyName,
                    'employee'      => $employeeName
                ];
            }

            return $returnArray;
        }

        function insertCustomer(){
            $con = $this->getCon();
            $data = $this->getData();

            $columnNames = ['name', 'company_name', 'email', 'phone_number'];
            $values = [
                $data['name'],
                $data['company_name'],
                $data['email'],
                $data['phone_number']
                ];
            insertStatement($con,'customer',$columnNames,$values);

            $customerId = $this->getCon()->lastInsertId();

            $customer = selectStatement($con, 'customer', true, '`id`=?', [$customerId]);

            foreach ($customer as $key => $value) {
                $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
                $statement = $this->getCon()->prepare($sql);
                $statement->execute([$value['id']]);
                $amountProducts = $statement->fetchColumn();

                $returnArray = [
                    'id'            => $value['id'],
                    'name'          => $value['company_name'],
                    'email'         => $value['email'],
                    'products'      => $amountProducts,
                    'actions'       => ""
                ];
            }

            return $returnArray;
        }

        function insertProduct(){
            $con = $this->getCon();
            $data = $this->getData();

            $columnNames = ['name', 'is_archived'];
            $values = [$data['name'],false];
            insertStatement($con,'product',$columnNames,$values);

            $value = $con->lastInsertId();

            $columnNames = ['customer_id', 'product_id'];
            $values = [$data['customerId'],$value];
            insertStatement($con,'customer_product',$columnNames,$values);

            $products = selectStatement($con, 'product', true, "`id`=?", [$value]);
            foreach ($products as $key => $value) {
                $checker = false;
                $products = selectStatement($con, 
                                            'customer_product',
                                            true,
                                            'customer_id=? AND product_id=?',
                                            [$data['customerId'],$value['id']]
                                        );
                foreach ($products as $key2 => $value2) {
                    $checker = true;
                }

                if($checker){
                    $returnArray = [
                        'id'            => $value['id'],
                        'name'          => $value['name'],
                        'is_archived'   => $value['is_archived'],
                    ];
                }
            }

            return $returnArray;
        }
    }

    new Api(); 
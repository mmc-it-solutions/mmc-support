<?php

function getTicket($data,$con){
    $customerInfo = [
        'id' => 0,
        'company_name'=> "None"
    ];
    $productInfo = [
        'id' => 0,
        'product_name' => 'None'
    ];
    $userInfo = [
        'id' => 0,
        'user_name' => "None"
    ];
    
    $customerIdColoration = selectStatement($con,'ticket_customer', true, '`ticket_id`=?', [$data['ticketId']]);
    foreach ($customerIdColoration as $customerId) {
        $customer = selectStatement($con, 'customer', true, '`id`=?', [$customerId['customer_id']]);
        foreach ($customer as $customerData) {
            $customerInfo = [
                'id' => $customerData['id'],
                'company_name' => $customerData['company_name']
            ];
        }
    }
    
    $productIdColoration = selectStatement($con,'ticket_product', true, '`ticket_id`=?', [$data['ticketId']]);
    foreach ($productIdColoration as $productId) {
        $product = selectStatement($con, 'product', true, '`id`=?', [$productId['product_id']]);
        foreach ($product as $productData) {
            $productInfo = [
                'id' => $productData['id'],
                'product_name' => $productData['name']
            ];
        }
    }

    $userIdColoration = selectStatement($con,'user_ticket', true, '`ticket_id`=?', [$data['ticketId']]);
    foreach ($userIdColoration as $userId) {
        $user = selectStatement($con, 'user', true, '`id`=?', [$userId['user_id']]);
        foreach ($user as $userData) {
            $profile = selectStatement($con, 'profile', true, '`id`=?', [$userData['profile_id']]);
            foreach ($profile as $profileData) {
                $userInfo = [
                    'id' => $userData['id'],
                    'user_name' => $profileData['first_name'] . ' ' . $profileData['last_name']
                ];
            }
        }
    }


    $ticket = selectStatement($con, 'ticket', true, 'id=?', [$data['ticketId']]);
    foreach ($ticket as $ticketData) {
        $returnArray = [
            'title'         => $ticketData['title'],
            'description'   => $ticketData['description'],
            'status'        => $ticketData['status'],
            'worktime'      => $ticketData['worktime'],
            'date_created'  => $ticketData['date_created'],
            'customer'      => $customerInfo,
            'product'       => $productInfo,
            'user'          => $userInfo
        ];
    }
    return $returnArray;
}

function getTickets($data,$con){
    $returnArray = [];

    $tickets = selectStatement($con,'ticket',false,null,null);
    foreach ($tickets as $ticketData) {

        $companyName = "none";
        $employeeName = "none";

        $companyIdColoration = selectStatement($con, "ticket_customer",true,'`ticket_id`=?',[$ticketData['id']]);

        if(!empty($companyIdColoration)){
            foreach ($companyIdColoration as $companyId) {
                $company = selectStatement($con,'customer',true,'`id`=?',[$companyId['customer_id']]);

                foreach ($company as $companyData) {
                    $companyName = $companyData['company_name'];
                }
            }
        }

        $userIdColoration = selectStatement($con, 'user_ticket', true, '`ticket_id`=?', [$ticketData['id']]);
        
        if(!empty($userIdColoration)){
            foreach ($userIdColoration as $userId) {
                $employee = selectStatement($con, 'user', true, '`id`=?', [$userId['user_id']]);

                foreach ($employee as $employeeData) {
                    $profile = selectStatement($con, 'profile',true,'`id`=?',[$employeeData['profile_id']]);

                    foreach ($profile as $profileData) {
                        $employeeName = $profileData['first_name']." ".$profileData['last_name'];
                    }
                }
            }
        }

        $returnArray[] = [
            'id'            => $ticketData['id'],
            'name'          => $ticketData['title'],
            'status'        => $ticketData['status'],
            'company'       => $companyName,
            'employee'      => $employeeName
        ];
    }
    return $returnArray;
}

function insertTicket($data,$con){
    $columnNames = ['title', 'description', 'status', 'worktime','is_archived','date_created'];
    $values = [$data['title'],$data['description'],1,0,false,date("Y-m-d")];
    insertStatement($con, "ticket", $columnNames, $values);

    $id = $con->lastInsertId();

    if($data['customerId'] != 0){
        $columnNames = ['ticket_id', 'customer_id'];
        $values = [$id,$data['customerId']];
        insertStatement($con, "ticket_customer", $columnNames, $values);
    }

    if($data['productId'] != 0){
        $columnNames = ['ticket_id', 'product_id'];
        $values = [$id,$data['productId']];
        insertStatement($con, "ticket_product", $columnNames, $values);
    }

    $tickets = selectStatement($con, 'ticket', true, '`id`=?', [$id]);
    foreach ($tickets as $ticketData) {

        $companyName = "none";
        $employeeName = "none";

        $companyIdColoration = selectStatement($con, "ticket_customer",true,'`ticket_id`=?',[$ticketData['id']]);

        if(!empty($companyIdColoration)){
            foreach ($companyIdColoration as $companyId) {
                $company = selectStatement($con,'customer',true,'`id`=?',[$companyId['customer_id']]);

                foreach ($company as $companyData) {
                    $companyName = $companyData['company_name'];
                }
            }
        }
        $userIdColoration = selectStatement($con, 'user_ticket', true, '`ticket_id`=?', [$ticketData['id']]);
        
        if(!empty($userIdColoration)){
            foreach ($userIdColoration as $userId) {
                $employee = selectStatement($con, 'user', true, '`id`=?', [$userId['user_id']]);

                foreach ($employee as $employeeData) {
                    $profile = selectStatement($con, 'profile',true,'`id`=?',[$employeeData['profile_id']]);

                    foreach ($profile as $profileData) {
                        $employeeName = $profileData['first_name']." ".$profileData['last_name'];
                    }
                }
            }
        }

        $returnArray = [
            'id'            => $ticketData['id'],
            'name'          => $ticketData['title'],
            'status'        => $ticketData['status'],
            'company'       => $companyName,
            'employee'      => $employeeName
        ];
    }

    return $returnArray;
}

function updateTicketStatus($data, $con){

    $sql = "UPDATE ticket SET `status`=? WHERE id=?";
    $statement = $con->prepare($sql);
    $statement->execute([$data['newStatus'],$data['id']]);

    return getTickets($data, $con);
}

function updateCustomerOfTicket($data, $con){
    if($data['customerId'] == 0) {
        $sql = "DELETE FROM `ticket_customer` WHERE `ticket_id`=?";
        $statement = $con->prepare($sql);
        $statement->execute([$data['ticketId']]);
    } else {
        $sql = "SELECT * FROM ticket_customer WHERE `ticket_id`=?";
        $statement = $con->prepare($sql);
        $statement->execute([$data['ticketId']]);
        $ticketColaration = $statement->fetchAll();

        if(empty($ticketColaration)){
            $columnNames = ['ticket_id','customer_id'];
            $values = [$data['ticketId'],$data['customerId']];
            insertStatement($con, "ticket_customer", $columnNames, $values);
        } else {
            $sql = "UPDATE `ticket_customer` SET `customer_id`=? WHERE `ticket_id`=?";
            $statement = $con->prepare($sql);
            $statement->execute([$data['customerId'],$data['ticketId']]);
        }
    }

    return getTicket($data, $con);
}
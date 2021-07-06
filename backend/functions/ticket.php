<?php

function getTicket($data,$con){
    $customerInfo = [
        'id' => 0,
        'name'=> "None",
        'products' => []
    ];
    $productInfo = [
        'id' => 0,
        'product_name' => 'None'
    ];
    $userInfo = [
        'id' => 0,
        'user_name' => "None"
    ];
    
    $customerIdColoration = selectStatement($con,'ticket_customer', true, ['ticket_id'], [$data['ticketId']]);
    foreach ($customerIdColoration as $customerId) {
        $data2 = [
            "customerId" => $customerId['customer_id']
        ];
        $customerInfo = getCustomer($data2, $con);
    }
    
    $productIdColoration = selectStatement($con,'ticket_product', true, ['ticket_id'], [$data['ticketId']]);
    foreach ($productIdColoration as $productId) {
        $product = selectStatement($con, 'product', true, ['id'], [$productId['product_id']]);
        foreach ($product as $productData) {
            $productInfo = [
                'id' => $productData['id'],
                'product_name' => $productData['name']
            ];
        }
    }

    $userIdColoration = selectStatement($con,'user_ticket', true, ['ticket_id'], [$data['ticketId']]);
    foreach ($userIdColoration as $userId) {
        $user = selectStatement($con, 'user', true, ['id'], [$userId['user_id']]);
        foreach ($user as $userData) {
            $profile = selectStatement($con, 'profile', true, ['id'], [$userData['profile_id']]);
            foreach ($profile as $profileData) {
                $userInfo = [
                    'id' => $userData['id'],
                    'user_name' => $profileData['first_name'] . ' ' . $profileData['last_name']
                ];
            }
        }
    }


    $ticket = selectStatement($con, 'ticket', true, ['id'], [$data['ticketId']]);
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
        $productName = "none";
        $employeeName = "none";

        $companyIdColoration = selectStatement($con, "ticket_customer",true,['ticket_id'],[$ticketData['id']]);
        if(!empty($companyIdColoration)){
            foreach ($companyIdColoration as $companyId) {
                $company = selectStatement($con,'customer',true,['id'],[$companyId['customer_id']]);

                foreach ($company as $companyData) {
                    $companyName = $companyData['company_name'];
                }
            }
        }

        $productIdColoration = selectStatement($con, "ticket_product",true,['ticket_id'],[$ticketData['id']]);
        if(!empty($productIdColoration)){
            foreach ($productIdColoration as $productId) {
                $product = selectStatement($con,'product',true,['id'],[$productId['product_id']]);

                foreach ($product as $productData) {
                    $productName = $productData['name'];
                }
            }
        }

        $userIdColoration = selectStatement($con, 'user_ticket', true, ['ticket_id'], [$ticketData['id']]);
        if(!empty($userIdColoration)){
            foreach ($userIdColoration as $userId) {
                $employee = selectStatement($con, 'user', true, ['id'], [$userId['user_id']]);

                foreach ($employee as $employeeData) {
                    $profile = selectStatement($con, 'profile',true,['id'],[$employeeData['profile_id']]);

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
            'product'       => $productName,
            'employee'      => $employeeName,
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

    $tickets = selectStatement($con, 'ticket', true, ['id'], [$id]);
    foreach ($tickets as $ticketData) {

        $companyName = "none";
        $employeeName = "none";

        $companyIdColoration = selectStatement($con, "ticket_customer",true,['ticket_id'],[$ticketData['id']]);

        if(!empty($companyIdColoration)){
            foreach ($companyIdColoration as $companyId) {
                $company = selectStatement($con,'customer',true,['id'],[$companyId['customer_id']]);

                foreach ($company as $companyData) {
                    $companyName = $companyData['company_name'];
                }
            }
        }
        $userIdColoration = selectStatement($con, 'user_ticket', true, ['ticket_id'], [$ticketData['id']]);
        
        if(!empty($userIdColoration)){
            foreach ($userIdColoration as $userId) {
                $employee = selectStatement($con, 'user', true, ['id'], [$userId['user_id']]);

                foreach ($employee as $employeeData) {
                    $profile = selectStatement($con, 'profile',true,['id'],[$employeeData['profile_id']]);

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

function updateTicketStatusOne($data, $con){
    updateStatement($con,'ticket',['status'],[$data['newStatus']],['id'],[$data['ticketId']]);

    return getTicket($data, $con);
}

function updateTicketStatusList($data, $con){
    updateStatement($con,'ticket',['status'],[$data['newStatus']],['id'],[$data['ticketId']]);

    return getTickets($data, $con);
}

function updateCustomerOfTicket($data, $con){
    deleteStatement($con,'ticket_product',['ticket_id'],[$data['ticketId']]);

    if($data['customerId'] == 0) {
        deleteStatement($con,'ticket_customer',['ticket_id'],[$data['ticketId']]);
    } else {
        $ticketCustomerColaration = selectStatement($con, 'ticket_customer', true, ['ticket_id'], [$data['ticketId']]);
        if(empty($ticketCustomerColaration)){
            $columnNames = ['ticket_id','customer_id'];
            $values = [$data['ticketId'],$data['customerId']];
            insertStatement($con, "ticket_customer", $columnNames, $values);
        } else {
            updateStatement($con,'ticket_customer',['customer_id'],[$data['customerId']],['ticket_id'],[$data['ticketId']]);
        }
    }

    return getTicket($data, $con);
}

function updateProductOfTicket($data, $con){
    if($data['productId'] == 0) {
        deleteStatement($con,'ticket_product',['ticket_id'],[$data['ticketId']]);
    } else {
        $ticketColaration = selectStatement($con, 'ticket_product', true, ['ticket_id'], [$data['ticketId']]);
        if(empty($ticketColaration)){
            $columnNames = ['ticket_id','product_id'];
            $values = [$data['ticketId'],$data['productId']];
            insertStatement($con, "ticket_product", $columnNames, $values);
        } else {
            updateStatement($con,'ticket_product',['product_id'],[$data['productId']],['ticket_id'],[$data['ticketId']]);
        }
    }

    return getTicket($data, $con);
}

function updateUserOfTicket($data, $con){
    if($data['userId'] == 0) {
        deleteStatement($con,'user_ticket',['ticket_id'],[$data['ticketId']]);
    } else {
        $ticketColaration = selectStatement($con, 'user_ticket', true, ['ticket_id'], [$data['ticketId']]);
        if(empty($ticketColaration)){
            $columnNames = ['ticket_id','user_id'];
            $values = [$data['ticketId'],$data['userId']];
            insertStatement($con, "user_ticket", $columnNames, $values);
        } else {
            updateStatement($con,'user_ticket',['user_id'],[$data['userId']],['ticket_id'],[$data['ticketId']]);
        }
    }

    return getTicket($data, $con);
}
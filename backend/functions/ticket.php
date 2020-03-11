<?php

function getTicket($data,$con){
    $ticket = selectStatement($con, 'ticket', true, 'id=?', [$data['ticketId']]);
    foreach ($ticket as $ticketData) {
        $returnArray = [
            'id'            => $ticketData['id'],
            'title'         => $ticketData['title'],
            'description'   => $ticketData['description'],
            'status'        => $ticketData['status'],
            'worktime'      => $ticketData['worktime'],
            'is_archived'   => $ticketData['is_archived'],
            'date_created'  => $ticketData['date_created'] 
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

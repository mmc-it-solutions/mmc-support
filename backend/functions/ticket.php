<?php


function getTicket($data,$con){
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

function getTickets($data,$con){
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

function insertTicket($data,$con){
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

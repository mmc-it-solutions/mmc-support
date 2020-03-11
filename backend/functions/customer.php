<?php

function getCustomer($data,$con){
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

function getCustomers($data,$con){
    $returnArray = [];

    $customers = selectStatement($con,'customer', false, null, null);

    foreach ($customers as $key => $value) {
        $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
        $statement = $con->prepare($sql);
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

function insertCustomer($data,$con){
    $columnNames = ['name', 'company_name', 'email', 'phone_number'];
    $values = [
        $data['name'],
        $data['company_name'],
        $data['email'],
        $data['phone_number']
        ];
    insertStatement($con,'customer',$columnNames,$values);

    $customerId = $con->lastInsertId();

    $customer = selectStatement($con, 'customer', true, '`id`=?', [$customerId]);

    foreach ($customer as $key => $value) {
        $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
        $statement = $con->prepare($sql);
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
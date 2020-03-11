<?php

function getCustomer($data,$con){
    $customer = selectStatement($con,'customer',true,'`id`=?',[$data['customerId']]);

    foreach ($customer as $customerData) {
        $returnArray = [
            'id'            => $customerData['id'],
            'name'          => $customerData['name'],
            'company_name'  => $customerData['company_name'],
            'email'         => $customerData['email'],
            'phone_number'  => $customerData['phone_number'],
        ];
    }

    return $returnArray;
}

function getCustomers($data,$con){
    $returnArray = [];

    $customers = selectStatement($con,'customer', false, null, null);

    foreach ($customers as $customerData) {
        $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
        $statement = $con->prepare($sql);
        $statement->execute([$customerData['id']]);
        $amountProducts = $statement->fetchColumn();

        $returnArray[] = [
            'id'            => $customerData['id'],
            'name'          => $customerData['company_name'],
            'email'         => $customerData['email'],
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

    $id = $con->lastInsertId();

    $customer = selectStatement($con, 'customer', true, '`id`=?', [$id]);

    foreach ($customer as $customerData) {
        $sql = "SELECT COUNT(*) FROM customer_product WHERE `customer_id`=?";
        $statement = $con->prepare($sql);
        $statement->execute([$customerData['id']]);
        $amountProducts = $statement->fetchColumn();

        $returnArray = [
            'id'            => $customerData['id'],
            'name'          => $customerData['company_name'],
            'email'         => $customerData['email'],
            'products'      => $amountProducts,
            'actions'       => ""
        ];
    }

    return $returnArray;
}
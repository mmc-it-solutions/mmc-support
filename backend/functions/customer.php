<?php

function getCustomer($data,$con){
    $returnArray = [];
    $customer = selectStatement($con,'customer',true,['id'],[$data['customerId']]);

    foreach ($customer as $customerData) {
        $products = [];
        $productIdColoration = selectStatement($con,'customer_product',true,['customer_id'],[$data['customerId']]);
        foreach ($productIdColoration as $productId) {
            $product = selectStatement($con, 'product', true, ['id'], [$productId['product_id']]);
            foreach ($product as $productData) {
                $products[] = [
                    'id'      => $productData['id'],
                    'name'    => $productData['name']
                ];
            }
        }

        $returnArray = [
            'id'            => $customerData['id'],
            'name'          => $customerData['company_name'],
            'contact'       => [
                'name'          => $customerData['name'],
                'email'         => $customerData['email'],
                'phone'         => $customerData['phone_number']
            ],
            'products'      => $products
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

    $customer = selectStatement($con, 'customer', true, ['id'], [$id]);

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
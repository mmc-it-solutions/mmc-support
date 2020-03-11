<?php

function getProducts($data,$con){
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

function insertProduct($data,$con){
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
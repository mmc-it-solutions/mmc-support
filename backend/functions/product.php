<?php

function insertProduct($data,$con){
    $columnNames = ['name', 'is_archived'];
    $values = [$data['name'],false];
    insertStatement($con,'product',$columnNames,$values);

    $id = $con->lastInsertId();

    $columnNames = ['customer_id', 'product_id'];
    $values = [$data['customerId'],$id];
    insertStatement($con,'customer_product',$columnNames,$values);

    $products = selectStatement($con, 'product', true, ['id'], [$id]);
    foreach ($products as $productData) {
        $checker = false;
        $products = selectStatement($con, 
                                    'customer_product',
                                    true,
                                    ['customer_id','product_id'],
                                    [$data['customerId'],$productData['id']]
                                );
        foreach ($products as $key2 => $value2) {
            $checker = true;
        }

        if($checker){
            $returnArray = [
                'id'            => $productData['id'],
                'name'          => $productData['name'],
                'is_archived'   => $productData['is_archived'],
            ];
        }
    }

    return $returnArray;
}
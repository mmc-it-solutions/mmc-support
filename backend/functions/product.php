<?php

function getProducts($data,$con){
    $returnArray = [];

    $products = selectStatement($con,'product',false,null,null);
    $customer = getCustomer($data,$con);

    if($data['productIdRemove'] !== 0){
        $customer['products'][] = [
            'id' => intval($data['productIdRemove']),
        ];
    }

    foreach ($products as $productData) {
        $sameProduct = false; 
        foreach ($customer['products'] as $customerProductData) {
            if($customerProductData['id'] === $productData['id']){
                $sameProduct = true;
            }
        }

        if(!$sameProduct){
            $returnArray[] = [
                'id'            => $productData['id'],
                'name'          => $productData['name'],
            ];
        }
    }

    return $returnArray;
}

function insertProduct($data,$con){
    $columnNames = ['name', 'is_archived'];
    $values = [$data['name'],false];
    insertStatement($con,'product',$columnNames,$values);

    $id = $con->lastInsertId();

    $columnNames = ['customer_id', 'product_id'];
    $values = [$data['customerId'],$id];
    insertStatement($con,'customer_product',$columnNames,$values);

    $productIdColoration = selectStatement($con,'customer_product',true,['customer_id'],[$data['customerId']]);
    foreach ($productIdColoration as $productId) {
        $product = selectStatement($con, 'product', true, ['id'], [$productId['product_id']]);
        foreach ($product as $productData) {
             $returnArray[] = [
                 'id'      => $productData['id'],
                 'name'    => $productData['name']
             ];
          }
    }

    return $returnArray;
}

function insertExistingProduct($data,$con){
    $returnArray = [];
    if($data['productId'] !== 0){
        $columnNames = ['customer_id', 'product_id'];
        $values = [$data['customerId'],$data['productId']];
        insertStatement($con,'customer_product',$columnNames,$values);
    }

    $productIdColoration = selectStatement($con,'customer_product',true,['customer_id'],[$data['customerId']]);
    foreach ($productIdColoration as $productId) {
        $product = selectStatement($con, 'product', true, ['id'], [$productId['product_id']]);
        foreach ($product as $productData) {
            $returnArray[] = [
                'id'      => $productData['id'],
                'name'    => $productData['name']
            ];
          }
    }

    return $returnArray;
}

function updateProduct($data, $con){
    $updateColumns = ['name'];
    $updateValues = [$data['name']];
    $whereColumns = ['id']; 
    $whereValues = [$data['productId']];
    updateStatement($con,'product',$updateColumns,$updateValues,$whereColumns,$whereValues);

    return getCustomer($data, $con);
}
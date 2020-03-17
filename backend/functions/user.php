<?php

function login($data,$con) {

    $user = selectStatement($con,'user',true,'`email`=?',[$data['username']]);
    if(!empty($user)){
        if (password_verify(base64_decode($data['password']), $user[0]['password'])) {
            return true;
        }    
    }

    return false;
}

function getUser($data,$con) {
    $user = selectStatement($con,'user',true,'`id`=?', [$data['userId']]);
    if(!empty($user)){
        $profile = selectStatement($con,'profile',true,'`id`=?',[$user[0]['profile_id']]);
        $returnData = [
            "id" => $user[0]['id'],
            "email" => $user[0]['email'],
            "is_admin" => $user[0]['is_admin'],
            "profile" => $profile[0]
        ];
        return $returnData;
    }

    return [];
}

function getUsers($data,$con) {
    $returnData = [];

    $users = selectStatement($con,'user',false,null,null);
    foreach ($users as $userData) {
        $profile = selectStatement($con,'profile',true,'`id`=?',[$userData['profile_id']]);
        $returnValue = [
            "id" => $userData['id'],
            "email" => $userData['email'],
            "is_admin" => $userData['is_admin'],
            "profile" => $profile[0]        ];
        $returnData[]= $returnValue;
    }

    return $returnData;

}

function insertUser($data,$con) {
    $columnNames = ['first_name', 'last_name', 'position'];
    $values = [$data['firstName'],$data['lastName'],$data['position']];
    insertStatement($con, "profile", $columnNames, $values);

    $passwordhash = password_hash(base64_decode($data['password']), PASSWORD_DEFAULT);
    $idProfile = $con->lastInsertId();

    $columnNames = ['email', 'password', 'is_admin','profile_id'];
    $values = [$data['email'],$passwordhash,false, $idProfile];
    insertStatement($con, "user", $columnNames, $values);

    $idInsertedUser = $con->lastInsertId();

    $user = selectStatement($con,'user',true,'`id`=?', [$idInsertedUser]);
    $profile = selectStatement($con,'profile',true,'`id`=?',[$user[0]['profile_id']]);
    $returnData = [
        "id" => $user[0]['id'],
        "email" => $user[0]['email'],
        "is_admin" => $user[0]['is_admin'],
        "profile" => $profile[0]
    ];
    return $returnData;
}
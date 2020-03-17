<?php

function login($data,$con) {

    $users = selectStatement($con,'user',false,null,null);

    foreach ($users as $userData) {
        if ($userData['email'] === $data['username'] && password_verify($data['password'], $userData['password'])) {
            return true;
        }    
    }

    return false;
}
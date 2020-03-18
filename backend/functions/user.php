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
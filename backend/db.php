<?php

function dbConnect(){
    try {
    $dsn = "mysql:host=localhost;dbname=mmcsupport";
    $database = new PDO($dsn, "root", "");

    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    return $database;

    } catch (PDOException $fout) {
        echo "Database connectie fout: " . $fout->getMessage();
        exit;
    }

  }
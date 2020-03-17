<?php
    function selectStatement($con, $tableName,$where,$whereStatement,$whereValues){
        if($where){
            $sql = "SELECT * FROM $tableName WHERE $whereStatement";
        } else {
            $sql = "SELECT * FROM $tableName";
        }

        $value = $con->prepare($sql);
        $value->execute($whereValues);
        $returnStatement = $value->fetchAll();

        return $returnStatement;
    }

    function insertStatement($con, $tableName, $columnNames, $values) {
        $sqlColumns = "";
        foreach ($columnNames as $key => $value) {
            if($key !== 0){
                $sqlColumns .= ", ";
            }
            $sqlColumns .= "`$value`";
        }
        $sqlValues = "";
        foreach ($values as $key => $value) {
            if($key !== 0){
                $sqlValues .= ",";
            }
            $sqlValues .= "?";
        }

        $sql = "INSERT INTO $tableName($sqlColumns) 
                VALUES($sqlValues)";
        $statement = $con->prepare($sql);
        $statement->execute($values);
    }

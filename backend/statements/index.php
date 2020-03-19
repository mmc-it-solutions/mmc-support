<?php
    function selectStatement($con, $tableName,$where,$whereColumns,$whereValues){
        if($where){
            $whereStatement = "";
            foreach ($whereColumns as $key => $column) {
                if($key !== 0){
                    $whereStatement .= ", ";
                }
                $whereStatement .= "`$column`=?";
            }
            
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
        $sqlValues = "";

        foreach ($columnNames as $key => $value) {
            if($key !== 0){
                $sqlColumns .= ", ";
            }
            $sqlColumns .= "`$value`";
        }

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

    function updateStatement($con, $tableName, $updateColumns, $updateValues, $whereColumns, $whereValues) {
        $sqlSet = "";
        $sqlWhere = "";
        $allValues = array_merge($updateValues, $whereValues);

        foreach ($updateColumns as $key => $column) {
            if($key !== 0){
                $sqlSet .= ", ";
            }
            $sqlSet .= "`$column`=?";
        }

        foreach ($whereColumns as $key => $column) {
            if($key !== 0){
                $sqlWhere .= " AND ";
            }
            $sqlWhere .= "`$column`=?";
        }

        $sql = "UPDATE $tableName 
                SET $sqlSet 
                WHERE $sqlWhere";
        $statement = $con->prepare($sql);
        $statement->execute($allValues);
    }

    function deleteStatement($con, $tableName, $whereColumns, $whereValues) {
        $sqlWhere = "";

        foreach ($whereColumns as $key => $column) {
            if($key !== 0){
                $sqlWhere .= " AND ";
            }
            $sqlWhere .= "`$column`=?";
        }

        $sql = "DELETE FROM $tableName
                WHERE $sqlWhere";
        $statement = $con->prepare($sql);
        $statement->execute($whereValues);
    }

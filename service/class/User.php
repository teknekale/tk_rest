<?php

require_once("inc/DBUtils.php");

Class USER extends DBUTILS
{
    public function login($email, $password)
    {
        return " SELECT uid,                                    ".
               "        name,                                   ".
               "        email                                   ".
               "   FROM users                                   ".
               "  WHERE email = '$email'                        ".
               "    AND password = '".md5($password)."' LIMIT 1 ".
               "";
    }
}


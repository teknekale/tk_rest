<?php

class DBUTILS
{
    public $_mysqli       = NULL;
    public $_code         = 200;
    public $_allow        = array();
    public $_content_type = "application/json";

    const DB_SERVER       = "127.0.0.1";
    const DB_USER 	      = "root";
    const DB_PASSWORD     = "";
    const DB 		      = "rest_server";

    public function dbConnect() {
        return new mysqli(
            self::DB_SERVER,
            self::DB_USER,
            self::DB_PASSWORD,
            self::DB
        );
    }

    public function response($data, $status) {
        $this->_code = ($status) ? $status : 200;
        $this->set_headers();
        echo $data;

        exit;
    }

    public function get_referer() {
        return $_SERVER['HTTP_REFERER'];
    }

    public function get_request_method() {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function set_headers() {
        header("HTTP/1.1 ".$this->_code." ".$this->get_status_message());
        header("Content-Type:".$this->_content_type);
    }

    public function get_status_message() {
        $status = array(
            200 => 'OK',
            201 => 'Created',
            204 => 'No Content',
            404 => 'Not Found',
            406 => 'Not Acceptable');

        return ($status[$this->_code]) ? $status[$this->_code] : $status[500];
    }

    public function json($data) {
        if(is_array($data)) {
            return json_encode($data);
        }
    }
}


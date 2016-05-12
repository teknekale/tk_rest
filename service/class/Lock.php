<?php

require_once("inc/Rest.php");

Class LOCK extends REST
{
    public function getLocks()
    {
        $this->checkCall("GET");

        $query = " SELECT DISTINCT id,          " .
            "                      user_id,     " .
            "                      what,        " .
            "                      type,        " .
            "                      email,       " .
            "                      password,    " .
            "                      note,        " .
            "                      date_create, " .
            "                      date_edit    " .
            "                 FROM store_lock   " .
            "             ORDER BY type DESC    " .
            "";

        $this->_mysqli = $this->dbConnect();
        $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

        if ($r->num_rows > 0) {
            $result = array();

            while ($row = $r->fetch_assoc()) {
                $result[] = $row;
            }

            $this->response($this->json($result), 200);
        }

        $this->response('', 204);
        $this->_mysqli = null;
    }

    public function getLock()
    {
        $this->checkCall("GET");

        $id = (int)$this->_request['id'];

        if ($id > 0) {

            $query = " SELECT DISTINCT id,          " .
                "                      user_id,     " .
                "                      what,        " .
                "                      type,        " .
                "                      email,       " .
                "                      password,    " .
                "                      note,        " .
                "                      date_create, " .
                "                      date_edit    " .
                "                 FROM store_lock   " .
                "                WHERE id = " . $id;

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200);
            }
        }

        $this->response('', 204);
    }

    public function insertLock()
    {
        $this->checkCall("POST");

        $lock = json_decode(file_get_contents("php://input"), true);
        $column_names = array('user_id', 'what', 'type', 'email', 'password', 'note', 'date_create', 'date_edit');
        $keys = array_keys($lock);
        $columns = '';
        $values = '';

        foreach ($column_names as $desired_key) {
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $lock[$desired_key];
            }

            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }

        $query = " INSERT INTO store_lock(" . trim($columns, ',') . ")" .
                 "      VALUES(" . trim($values, ',') . ")";

        if (!empty($lock)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            $success = array(
                'status' => "Success",
                "msg"    => "Lock Created Successfully.",
                "data"   => $lock
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function updateLock()
    {
        $this->checkCall("POST");

        $lock = json_decode(file_get_contents("php://input"), true);
        $id = (int)$lock['id'];
        $column_names = array('what', 'type', 'email', 'password', 'note', 'date_create', 'date_edit');
        $keys = array_keys($lock['lock']);
        $columns = '';

        foreach ($column_names as $desired_key) {
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $lock['lock'][$desired_key];
            }

            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }

        $query = " UPDATE store_lock SET " . trim($columns, ',') .
                 "  WHERE customerNumber=$id";

        if (!empty($lock)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);
            $success = array(
                'status' => "Success",
                "msg"    => "Lock " . $id . " Updated Successfully.",
                "data"   => $lock
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function deleteLock()
    {
        $this->checkCall("DELETE");

        $id = (int)$this->_request['id'];

        if ($id > 0) {
            $query = " DELETE FROM store_lock" .
                "       WHERE customerNumber = " . $id;

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            $success = array(
                'status' => "Success",
                "msg" => "Successfully deleted one record.");
            $this->response($this->json($success), 200);
        } else {

        }
    }
}


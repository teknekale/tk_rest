<?php

require_once("inc/DBUtils.php");

Class USER extends DBUTILS
{
    public function getUsers()
    {
        $this->checkCall("GET");

        $query = " SELECT DISTINCT c.customerNumber,       " .
            "                 c.customerName,         " .
            "                 c.email,                " .
            "                 c.address,              " .
            "                 c.city,                 " .
            "                 c.state,                " .
            "                 c.postalCode,           " .
            "                 c.country               " .
            "            FROM angularcode_customers c " .
            "        order by c.customerNumber desc   " .
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

    public function getUser()
    {
        $this->checkCall("GET");

        $id = (int)$this->_request['id'];

        if ($id > 0) {
            $query = " SELECT DISTINCT c.customerNumber,         " .
                "                 c.customerName,           " .
                "                 c.email,                  " .
                "                 c.address,                " .
                "                 c.city,                   " .
                "                 c.state,                  " .
                "                 c.postalCode,             " .
                "                 c.country                 " .
                "            FROM angularcode_customers c   " .
                "           WHERE c.customerNumber = " . $id;

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200);
            }
        }

        $this->response('', 204);
    }

    public function insertUser()
    {
        $this->checkCall("POST");

        $customer = json_decode(file_get_contents("php://input"), true);
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer);
        $columns = '';
        $values = '';

        foreach ($column_names as $desired_key) {
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $customer[$desired_key];
            }

            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }

        $query = " INSERT INTO angularcode_customers(" . trim($columns, ',') . ")" .
            "      VALUES(" . trim($values, ',') . ")";

        if (!empty($customer)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            $success = array(
                'status' => "Success",
                "msg" => "Customer Created Successfully.",
                "data" => $customer
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function updateUser()
    {
        $this->checkCall("POST");

        $customer = json_decode(file_get_contents("php://input"), true);
        $id = (int)$customer['id'];
        $column_names = array('customerName', 'email', 'city', 'address', 'country');
        $keys = array_keys($customer['customer']);
        $columns = '';

        foreach ($column_names as $desired_key) {
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $customer['customer'][$desired_key];
            }

            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }

        $query = " UPDATE angularcode_customers SET " . trim($columns, ',') .
            "  WHERE customerNumber=$id";

        if (!empty($customer)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);
            $success = array(
                'status' => "Success",
                "msg" => "Customer " . $id . " Updated Successfully.",
                "data" => $customer
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function deleteUser()
    {
        $this->checkCall("DELETE");

        $id = (int)$this->_request['id'];

        if ($id > 0) {
            $query = " DELETE FROM angularcode_customers" .
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


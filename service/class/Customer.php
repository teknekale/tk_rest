<?php

require_once("inc/Rest.php");

Class CUSTOMER extends REST
{
    public function getCustomers()
    {
        $this->checkCall("GET");

        $query = " SELECT DISTINCT c.customerNumber,     " .
            "                      c.customerName,       " .
            "                      c.email,              " .
            "                      c.address,            " .
            "                      c.city,               " .
            "                      c.state,              " .
            "                      c.postalCode,         " .
            "                      c.country             " .
            "                 FROM customer c            " .
            "             order by c.customerNumber desc " .
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

    public function getCustomer()
    {
        $this->checkCall("GET");

        $id = (int)$this->_request['id'];

        if ($id > 0) {
            $query = " SELECT DISTINCT c.customerNumber,  " .
                "                      c.customerName,    " .
                "                      c.email,           " .
                "                      c.address,         " .
                "                      c.city,            " .
                "                      c.state,           " .
                "                      c.postalCode,      " .
                "                      c.country          " .
                "                 FROM customer c         " .
                "                WHERE c.customerNumber = " . $id;

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200);
            }
        }

        $this->response('', 204);
    }

    public function insertCustomer()
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

        $query = " INSERT INTO customer(" . trim($columns, ',') . ")" .
                 "      VALUES(" . trim($values, ',') . ")";

        if (!empty($customer)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);

            $success = array(
                'status' => "Success",
                "msg"    => "Customer Created Successfully.",
                "data"   => $customer
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function updateCustomer()
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

        $query = " UPDATE customer SET " . trim($columns, ',') .
                 "  WHERE customerNumber=$id";

        if (!empty($customer)) {
            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error . __LINE__);
            $success = array(
                'status' => "Success",
                "msg"    => "Customer " . $id . " Updated Successfully.",
                "data"   => $customer
            );

            $this->response($this->json($success), 200);
        } else {
            $this->response('', 204);
        }
    }

    public function deleteCustomer()
    {
        $this->checkCall("DELETE");

        $id = (int)$this->_request['id'];

        if ($id > 0) {
            $query = " DELETE FROM customer" .
                "            WHERE customerNumber = " . $id;

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


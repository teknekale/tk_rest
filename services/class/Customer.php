<?php

require_once("inc/DBUtils.php");

Class CUSTOMER extends DBUTILS
{
    public function getCustomers()
    {
        if($this->get_request_method() != "GET") {
            $this->response('', 406);
        }

        $query = " SELECT distinct c.customerNumber,       ".
                 "                 c.customerName,         ".
                 "                 c.email,                ".
                 "                 c.address,              ".
                 "                 c.city,                 ".
                 "                 c.state,                ".
                 "                 c.postalCode,           ".
                 "                 c.country               ".
                 "            FROM angularcode_customers c ".
                 "        order by c.customerNumber desc   ".
                 "";

        $this->_mysqli = $this->dbConnect();
        $r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);

        if($r->num_rows > 0) {
            $result = array();
            while($row = $r->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200);
        }
        $this->response('', 204);
        $this->_mysqli = null;
    }
}


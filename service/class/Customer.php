<?php

require_once("inc/Rest.php");

Class CUSTOMER extends REST
{
    public function getCustomers()
    {
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

    public function getCustomer()
    {
        $id = (int)$this->_request['id'];

		if($id > 0)
        {
            $query = " SELECT DISTINCT c.customerNumber,         ".
                     "                 c.customerName,           ".
                     "                 c.email,                  ".
                     "                 c.address,                ".
                     "                 c.city,                   ".
                     "                 c.state,                  ".
                     "                 c.postalCode,             ".
                     "                 c.country                 ".
                     "            FROM angularcode_customers c   ".
                     "           WHERE c.customerNumber = ".$id."".
                     "";

            $this->_mysqli = $this->dbConnect();
			$r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);

			if($r->num_rows > 0) {
				$result = $r->fetch_assoc();
				$this->response($this->json($result), 200);
			}
		}

		$this->response('', 204);
    }
}


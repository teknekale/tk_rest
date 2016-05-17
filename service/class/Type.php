<?php

require_once("inc/Rest.php");

Class TYPE extends REST
{
    public function getTypes()
    {
        $this->checkCall("GET");

        $query = " SELECT DISTINCT id,          " .
            "                      type,        " .
            "                      note,        " .
            "                      date_create, " .
            "                      date_edit    " .
            "                 FROM type         " .
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
}


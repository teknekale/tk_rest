<?php

require_once("inc/Rest.php");

Class AUTH extends REST
{
    public function login()
    {
        $this->checkCall("POST");

        $auth = json_decode(file_get_contents("php://input"), true);

        $error = array(
            'status' => "Failed",
            "msg"    => "Invalid Username address or Password"
        );

		if($auth) {
            $query = " SELECT id,         " .
                "             username,   " .
                "             nome,       " .
                "             cognome,    " .
                "             email,      " .
                "             type,       " .
                "             note        " .
                "        FROM user        " .
                "       WHERE username = '" . $auth['username'] . "'         " .
                "         AND password = '" . $auth['password'] . "' LIMIT 1 " .
                "";

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);

            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200);
            }
            else {
                $this->response($this->json($error), 400);
            }
		}

		$this->response($this->json($error), 400);
    }
}


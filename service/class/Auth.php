<?php

require_once("inc/Rest.php");

Class AUTH extends REST
{
    public function login()
    {
        $this->checkCall("POST");

        $auth = json_decode(file_get_contents("php://input"), true);
        $column_names = array('username\', \'password');
        $keys = array_keys($auth);
        $columns = '';
        $values = '';

        foreach ($column_names as $desired_key) {
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $auth[$desired_key];
            }

            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }

		if(!empty($username) and !empty($password)) {
            $query = " SELECT id,         " .
                "             username,   " .
                "             nome,       " .
                "             cognome,    " .
                "             email,      " .
                "             type,       " .
                "             note,       " .
                "        FROM users       " .
                "       WHERE username = '" . $values['username'] . "'          " .
                "         AND password = '" . $values['password'] . "' LIMIT 1  " .
                "";

            $this->_mysqli = $this->dbConnect();
            $r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);

            if ($r->num_rows > 0) {
                $result = $r->fetch_assoc();
                $this->response($this->json($result), 200);
            }

            $this->response('', 204);
		}

		$error = array(
            'status' => "Failed",
            "msg"    => "Invalid Username address or Password"
        );

		$this->response($this->json($error), 400);
    }
}


<?php

require_once("inc/DBUtils.php");

Class AUTH extends DBUTILS
{
    public function login()
    {
        $this->checkCall("POST");

		$email    = $this->_request['email'];
		$password = $this->_request['password'];

        $query = " SELECT id,                                     " .
            "             username,                               " .
            "             nome,                                   " .
            "             cognome,                                " .
            "             email,                                  " .
            "             password,                               " .
            "             type,                                   " .
            "             note,                                   " .
            "             date_create,                            " .
            "             date_edit,                              " .
            "        FROM users                                   " .
            "       WHERE email = '$email'                        " .
            "         AND password = '".md5($password)."' LIMIT 1 " .
            "";

		if(!empty($email) and !empty($password)) {
			if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
				$r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);

				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();

					$this->response($this->json($result), 200);
				}

				$this->response('', 204);
			}
		}

		$error = array(
            'status' => "Failed",
            "msg"    => "Invalid Email address or Password"
        );

		$this->response($this->json($error), 400);
    }
}


<?php

require_once("inc/Rest.php");

require_once("class/Customer.php");
require_once("class/User.php");

class API extends REST
{
	public $data;

    public $_customer;
    public $_user;

	public function __construct() {
		parent::__construct();

        $this->_customer = new CUSTOMER;
        $this->_user     = new USER;
	}
    
	public function processApi() {
		$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
		if((int)method_exists($this,$func) > 0) {
            $this->$func();
        }
		else {
            $this->response('', 404);
        }
	}

//	private function login() {
//		if($this->get_request_method() != "POST") {
//			$this->response('', 406);
//		}
//		$email = $this->_request['email'];
//		$password = $this->_request['pwd'];
//		if(!empty($email) and !empty($password)) {
//			if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
//				$r = $this->_mysqli->query($this->_user->login($email, $password)) or die($this->_mysqli->error.__LINE__);
//
//				if($r->num_rows > 0) {
//					$result = $r->fetch_assoc();
//					// If success everythig is good send header as "OK" and user details
//					$this->response($this->json($result), 200);
//				}
//				$this->response('', 204);	// If no records "No Content" status
//			}
//		}
//
//		$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
//		$this->response($this->json($error), 400);
//	}

	private function customers() {
        $this->_customer->getCustomers();
	}

	private function customer() {
		$this->checkCall("GET");
		$this->_customer->getCustomer();
	}

	private function insertCustomer() {
		$this->checkCall("POST");
		$this->_customer->insertCustomer();
	}
	private function updateCustomer() {
		$this->checkCall("POST");
		$this->_customer->updateCustomer();
	}

	private function deleteCustomer() {
		$this->checkCall("DELETE");
		$this->_customer->updateCustomer();
	}
}

// Initiiate Library
$api = new API;
$api->processApi();

?>

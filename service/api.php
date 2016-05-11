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
		$this->checkCall("GET");
        $this->_customer->getCustomers();
	}

	private function customer() {
		$this->checkCall("GET");
		$this->_customer->getCustomer();
	}

	private function insertCustomer() {
		$this->checkCall("POST");

//		$customer = json_decode(file_get_contents("php://input"),true);
//		$column_names = array('customerName', 'email', 'city', 'address', 'country');
//		$keys = array_keys($customer);
//		$columns = '';
//		$values = '';
//		foreach($column_names as $desired_key) { // Check the customer received. If blank insert blank into the array.
//		   if(!in_array($desired_key, $keys)) {
//				$$desired_key = '';
//			}else{
//				$$desired_key = $customer[$desired_key];
//			}
//			$columns = $columns.$desired_key.',';
//			$values = $values."'".$$desired_key."',";
//		}
//		$query = "INSERT INTO angularcode_customers(".trim($columns,',').") VALUES(".trim($values,',').")";
//		if(!empty($customer)) {
//			$r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);
//			$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
//			$this->response($this->json($success), 200);
//		}else
//			$this->response('', 204);	//"No Content" status
	}
	private function updateCustomer() {
		$this->checkCall("POST");

//		$customer = json_decode(file_get_contents("php://input"),true);
//		$id = (int)$customer['id'];
//		$column_names = array('customerName', 'email', 'city', 'address', 'country');
//		$keys = array_keys($customer['customer']);
//		$columns = '';
//		$values = '';
//		foreach($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
//		   if(!in_array($desired_key, $keys)) {
//				$$desired_key = '';
//			}else{
//				$$desired_key = $customer['customer'][$desired_key];
//			}
//			$columns = $columns.$desired_key."='".$$desired_key."',";
//		}
//		$query = "UPDATE angularcode_customers SET ".trim($columns,',')." WHERE customerNumber=$id";
//		if(!empty($customer)) {
//			$r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);
//			$success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
//			$this->response($this->json($success), 200);
//		}else
//			$this->response('', 204);	// "No Content" status
	}

	private function deleteCustomer() {
//		if($this->get_request_method() != "DELETE") {
//			$this->response('', 406);
//		}
//		$id = (int)$this->_request['id'];
//		if($id > 0) {
//			$query="DELETE FROM angularcode_customers WHERE customerNumber = $id";
//			$r = $this->_mysqli->query($query) or die($this->_mysqli->error.__LINE__);
//			$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
//			$this->response($this->json($success), 200);
//		}else
//			$this->response('', 204);	// If no records "No Content" status
	}
}

// Initiiate Library

$api = new API;
$api->processApi();

?>

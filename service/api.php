<?php

require_once("inc/Rest.php");

require_once("class/Auth.php");
require_once("class/Customer.php");
require_once("class/Lock.php");
require_once("class/User.php");

class API extends REST
{
	public $_auth;
	public $_customer;
	public $_lock;
	public $_user;

	public function __construct() {
		parent::__construct();

		$this->_auth     = new AUTH;
        $this->_customer = new CUSTOMER;
		$this->_lock     = new LOCK;
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

//////////////////////////////////////////////////////////////////////////////////////////
//	LOGIN
	private function login() { $this->_auth->login(); }

//////////////////////////////////////////////////////////////////////////////////////////
//  CUSTOMER
	private function customers() 	  { $this->_customer->getCustomers(); 	}
	private function customer() 	  { $this->_customer->getCustomer(); 	}
	private function insertCustomer() { $this->_customer->insertCustomer(); }
	private function updateCustomer() { $this->_customer->updateCustomer(); }
	private function deleteCustomer() { $this->_customer->updateCustomer(); }

//////////////////////////////////////////////////////////////////////////////////////////
//  USER
	private function users() 	  { $this->_user->getUsers(); 	}
	private function user() 	  { $this->_user->getUser(); 	}
	private function insertUser() { $this->_user->insertUser(); }
	private function updateUser() { $this->_user->updateUser(); }
	private function deleteUser() { $this->_user->updateUser(); }

//////////////////////////////////////////////////////////////////////////////////////////
//  LOCK
	private function locks() 	  { $this->_lock->getLocks(); 	}
	private function lock() 	  { $this->_lock->getLock(); 	}
	private function insertLock() { $this->_lock->insertLock(); }
	private function updateLock() { $this->_lock->updateLock(); }
	private function deleteLock() { $this->_lock->updateLock(); }

//////////////////////////////////////////////////////////////////////////////////////////

}

// Initiiate Library
$api = new API;
$api->processApi();

?>

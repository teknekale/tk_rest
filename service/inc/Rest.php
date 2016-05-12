<?php

    require_once("inc/DBUtils.php");

	class REST extends DBUTILS
    {
		public $data;
		public $_request = array();

		public function __construct() {
			$this->inputs();
		}
		
		private function inputs() {
			switch($this->get_request_method()) {
				case "POST":
					$this->_request = $this->cleanInputs($_POST);
					break;
				case "GET":
				case "DELETE":
					$this->_request = $this->cleanInputs($_GET);
					break;
				case "PUT":
					parse_str(file_get_contents("php://input"),$this->_request);
					$this->_request = $this->cleanInputs($this->_request);
					break;
				default:
					$this->response('',406);
					break;
			}
		}		
		
		private function cleanInputs($data) {
			$clean_input = array();
            
			if(is_array($data)) {
				foreach($data as $k => $v) {
					$clean_input[$k] = $this->cleanInputs($v);
				}
			}
            else {
				if(get_magic_quotes_gpc()) {
					$data = trim(stripslashes($data));
				}
                
				$data = strip_tags($data);
				$clean_input = trim($data);
			}
            
			return $clean_input;
		}
	}	


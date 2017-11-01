<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ErrorAccess extends CI_Controller 
{
	public function not_found()
	{
		$this->load->view('error/404');
	}
}

?>
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ErrorAccess extends CI_Controller 
{
	public function not_found()
	{
		$this->output->set_status_header('404'); 
		$this->load->view('error/404');
	}

	public function not_found_redirect()
	{
		header( 'Location: ' . BASE_URL . 'error/access/404' );
	}
}

?>
<?php

class Sistema extends CI_Controller 
{
	public function listar()
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Sistema_model', 'accesos')->find_array());
	}
}

?>
<?php

class Modulo extends CI_Controller 
{
	public function listar($sistema_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Modulo_model', 'accesos')->select('id')->select('nombre')->select('url')->where('sistema_id', $sistema_id)->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		
		echo 'guardar!!!';
	}
}

?>
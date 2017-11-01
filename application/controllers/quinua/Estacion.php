<?php

class Estacion extends CI_Controller 
{
	public function listar()
	{
		$params = array('valor' => 5);
		$this->load->library('Acl', $params);
		echo json_encode(Model::factory('Estacion_model', 'quinua')->find_array());
	}
	
}
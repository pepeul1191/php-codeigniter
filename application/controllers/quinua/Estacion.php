<?php

class Estacion extends CI_Controller 
{
	public function listar()
	{
		echo json_encode(Model::factory('Estacion_model')->find_array());
	}
	
}
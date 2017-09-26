<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Estacion extends CI_Controller 
{
	public function index()
	{
		$this->load->model('Estacion_model');
		echo json_encode(Model::factory('Estacion_model')->find_array());
	}
	
}
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller 
{
	public function index()
	{		
		$this->load->view('login/index');
	}

	public function listar()
	{	
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		$uri = 'http://localhost:5000/usuario/listar';
		$response = \Httpful\Request::get($uri)->send();
		echo json_encode($response->body);
	}
}
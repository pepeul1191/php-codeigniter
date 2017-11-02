<?php

require_once 'application/models/accesos/Usuario_model.php';
require_once 'application/models/accesos/Acceso_model.php';

class Usuario extends CI_Controller 
{
	public function listar()
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(ORM::for_table('usuarios', 'accesos')->raw_query('
			SELECT U.id AS id, U.usuario AS usuario, A.momento AS momento, U.correo AS correo
			FROM usuarios U INNER JOIN accesos A ON U.id = A.usuario_id 
			GROUP BY U.usuario ORDER BY U.id', 
			array())->find_array());
	}

	public function logs($usuario_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Acceso_model', 'accesos')->select('id')->select('momento')->where('usuario_id', $usuario_id)->find_array());
	}

	public function obtener_usuario_correo($usuario_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Usuario_model', 'accesos')->select('usuario')->select('correo')->where('id', $usuario_id)->find_array()[0]);
	}
}

?>
<?php

require_once 'application/config/database.php';

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
}

?>
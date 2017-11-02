<?php

require_once 'application/models/accesos/Sistema_model.php';

class Sistema extends CI_Controller 
{
	public function listar()
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Sistema_model', 'accesos')->find_array());
	}

	public function usuario($usuario_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(ORM::for_table('', 'accesos')->raw_query('
	        SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe FROM
	        (
	            SELECT id, nombre, 0 AS existe FROM sistemas
	        ) T
	        LEFT JOIN
	        (
	            SELECT S.id, S.nombre, 1 AS existe FROM sistemas S
	            INNER JOIN usuarios_sistemas US ON US.sistema_id = S.id
	            WHERE US.usuario_id = :usuario_id
	        ) P
	        ON T.id = P.id', 
			array('usuario_id' => $usuario_id))->find_array());
	}
}

?>
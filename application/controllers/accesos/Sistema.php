<?php

require_once 'application/models/accesos/Sistema_model.php';

class Sistema extends CI_Controller 
{
	public function listar()
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Sistema_model', 'accesos')->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $sistema = Model::factory('Sistema_model', 'accesos')->create();
					$sistema->nombre = $nuevo->{'nombre'};
					$sistema->version = $nuevo->{'version'};
					$sistema->repositorio = $nuevo->{'repositorio'};
					$sistema->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $sistema->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$sistema = Model::factory('Sistema_model', 'accesos')->find_one($editado->{'id'});
					$sistema->nombre = $editado->{'nombre'};
					$sistema->version = $editado->{'version'};
					$sistema->repositorio = $editado->{'repositorio'};
					$sistema->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$sistema = Model::factory('Sistema_model', 'accesos')->find_one($eliminado);
			    	$sistema->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los subtitulos', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de subtitulos', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
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
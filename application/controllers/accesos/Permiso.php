<?php

require_once 'application/models/accesos/Permiso_model.php';

class Permiso extends CI_Controller 
{
	public function listar($sistema_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(Model::factory('Permiso_model', 'accesos')->select('id')->select('nombre')->select('llave')->where('sistema_id', $sistema_id)->find_array());
	}

	public function guardar()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$sistema_id = $data->{"extra"}->{'sistema_id'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $permiso = Model::factory('Permiso_model', 'accesos')->create();
					$permiso->nombre = $nuevo->{'nombre'};
					$permiso->llave = $nuevo->{'llave'};
					$permiso->sistema_id = $sistema_id;
					$permiso->save();
				    $temp = [];
				    $temp['temporal'] = $nuevo->{'id'};
	              	$temp['nuevo_id'] = $permiso->id;
	              array_push( $array_nuevos, $temp );
				}
			}
			if(count($editados) > 0){
				foreach ($editados as &$editado) {
					$permiso = Model::factory('Permiso_model', 'accesos')->find_one($editado->{'id'});
					$permiso->nombre = $editado->{'nombre'};
					$permiso->llave = $editado->{'llave'};
					$permiso->save();
				}
			}	
			if(count($eliminados) > 0){
				foreach ($eliminados as &$eliminado) {
			    	$permiso = Model::factory('Permiso_model', 'accesos')->find_one($eliminado);
			    	$permiso->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los permisos', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar la tabla de permisos', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}

	public function listar_asociados($sistema_id, $rol_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(ORM::for_table('', 'accesos')->raw_query('
			SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe, T.llave AS llave FROM 
            (
            SELECT id, nombre, llave, 0 AS existe FROM permisos WHERE sistema_id = :sistema_id
            ) T
            LEFT JOIN
            (
            SELECT P.id, P.nombre,  P.llave, 1 AS existe  FROM permisos P 
            INNER JOIN roles_permisos RP ON P.id = RP.permiso_id
            WHERE RP.rol_id = :rol_id
            ) P
            ON T.id = P.id', 
			array('sistema_id' => $sistema_id, 'rol_id' => $rol_id))->find_array());
	}
}

?>
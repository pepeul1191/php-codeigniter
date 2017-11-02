<?php

require_once 'application/models/accesos/Usuario_model.php';
require_once 'application/models/accesos/Acceso_model.php';
require_once 'application/models/accesos/UsuarioPermiso_model.php';
require_once 'application/models/accesos/UsuarioRol_model.php';
require_once 'application/models/accesos/UsuarioSistema_model.php';

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
	
	public function nombre_repetido()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		$data = json_decode($this->input->post('data'));
		$usuario_id = $data->{'id'};
		$usuario = $data->{'usuario'};
		$rpta = 0;
		if ($usuario_id == 'E'){
			#SELECT COUNT(*) AS cantidad FROM usuarios WHERE usuario = ?
			$rpta = Model::factory('Usuario_model', 'accesos')->where('usuario', $usuario)->count();
		}else{
			#SELECT COUNT(*) AS cantidad FROM usuarios WHERE usuario = ? AND id = ?
			$rpta = Model::factory('Usuario_model', 'accesos')->where('usuario', $usuario)->where('id', $usuario_id)->count();
			if($rpta == 1){
				$rpta = 0;
			}else{
				#SELECT COUNT(*) AS cantidad FROM usuarios WHERE usuario = ?
				$rpta = Model::factory('Usuario_model', 'accesos')->where('usuario', $usuario)->count();
			}
		}
		echo $rpta;
	}

	public function correo_repetido()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		$data = json_decode($this->input->post('data'));
		$usuario_id = $data->{'id'};
		$correo = $data->{'correo'};
		$rpta = 0;
		if ($usuario_id == 'E'){
			#SELECT COUNT(*) AS cantidad FROM usuarios WHERE correo = ?
			$rpta = Model::factory('Usuario_model', 'accesos')->where('correo', $correo)->count();
		}else{
			#SELECT COUNT(*) AS cantidad FROM usuarios WHERE correo = ? AND id = ?
			$rpta = Model::factory('Usuario_model', 'accesos')->where('correo', $correo)->where('id', $usuario_id)->count();
			if($rpta == 1){
				$rpta = 0;
			}else{
				#SELECT COUNT(*) AS cantidad FROM usuarios WHERE correo = ?
				$rpta = Model::factory('Usuario_model', 'accesos')->where('correo', $correo)->count();
			}
		}
		echo $rpta;
	}

	public function guardar_usuario_correo()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		$data = json_decode($this->input->post('usuario'));
		ORM::get_db('accesos')->beginTransaction();
		try {
			$usuario = Model::factory('Usuario_model', 'accesos')->find_one($data->{'id'});
			$usuario->usuario = $data->{'usuario'};
			$usuario->correo = $data->{'correo'};
			$usuario->save();
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado los cambios en los datos generales del usuari', []];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en guardar los datos generales del usuario', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}

	public function listar_permisos($sistema_id, $usuario_id)
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
                INNER JOIN usuarios_permisos UP ON P.id = UP.permiso_id
                WHERE UP.usuario_id = :usuario_id
            ) P
            ON T.id = P.id', 
			array('sistema_id' => $sistema_id, 'usuario_id' => $usuario_id))->find_array());
	}

	public function listar_roles($sistema_id, $usuario_id)
	{
		$this->load->library('HttpAccess', array('allow' => ['GET'], 'received' => $this->input->method(TRUE)));
		echo json_encode(ORM::for_table('', 'accesos')->raw_query('
            SELECT T.id AS id, T.nombre AS nombre, (CASE WHEN (P.existe = 1) THEN 1 ELSE 0 END) AS existe FROM
            (
                SELECT id, nombre, 0 AS existe FROM roles WHERE sistema_id = :sistema_id
            ) T
            LEFT JOIN
            (
                SELECT R.id, R.nombre, 1 AS existe  FROM roles R 
                INNER JOIN usuarios_roles UR ON R.id = UR.rol_id
                WHERE UR.usuario_id = :usuario_id
            ) P
            ON T.id = P.id', 
			array('sistema_id' => $sistema_id, 'usuario_id' => $usuario_id))->find_array());
	}

	public function guardar_sistemas()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$usuario_id = $data->{"extra"}->{'usuario_id'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $usuario_sistema = Model::factory('UsuarioSistema_model', 'accesos')->create();
					$usuario_sistema->sistema_id = $nuevo->{'id'};
					$usuario_sistema->usuario_id = $usuario_id;
					$usuario_sistema->save();
				}
			}
			if(count($eliminados) > 0){
				foreach ($eliminados as &$sistema_id) {
			    	$usuario_sistema = Model::factory('UsuarioSistema_model', 'accesos')->where('sistema_id', $sistema_id)->where('usuario_id', $usuario_id)->find_one();
			    	$usuario_sistema->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado la asociación/deasociación de los sistemas al usuario', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en asociar/deasociar los sistemas al usuario', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}

	public function asociar_roles()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$usuario_id = $data->{"extra"}->{'usuario_id'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $usuario_rol = Model::factory('UsuarioRol_model', 'accesos')->create();
					$usuario_rol->rol_id = $nuevo->{'id'};
					$usuario_rol->usuario_id = $usuario_id;
					$usuario_rol->save();
				}
			}
			if(count($eliminados) > 0){
				foreach ($eliminados as &$rol_id) {
			    	$usuario_rol = Model::factory('UsuarioRol_model', 'accesos')->where('rol_id', $rol_id)->where('usuario_id', $usuario_id)->find_one();
			    	$usuario_rol->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado la asociación/deasociación de los roles al usuario', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en asociar/deasociar los roles al usuario', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}

	public function asociar_permisos()
	{
		$this->load->library('HttpAccess', array('allow' => ['POST'], 'received' => $this->input->method(TRUE)));
		ORM::get_db('accesos')->beginTransaction();
		$data = json_decode($this->input->post('data'));
		$nuevos = $data->{'nuevos'};
		$editados = $data->{'editados'};
		$eliminados = $data->{'eliminados'};
		$usuario_id = $data->{"extra"}->{'usuario_id'};
		$rpta = []; $array_nuevos = [];
		try {
			if(count($nuevos) > 0){
				foreach ($nuevos as &$nuevo) {
				    $usuario_permiso = Model::factory('UsuarioPermiso_model', 'accesos')->create();
					$usuario_permiso->permiso_id = $nuevo->{'id'};
					$usuario_permiso->usuario_id = $usuario_id;
					$usuario_permiso->save();
				}
			}
			if(count($eliminados) > 0){
				foreach ($eliminados as &$permiso_id) {
			    	$usuario_permiso = Model::factory('UsuarioPermiso_model', 'accesos')->where('permiso_id', $permiso_id)->where('usuario_id', $usuario_id)->find_one();
			    	$usuario_permiso->delete();
				}
			}
			$rpta['tipo_mensaje'] = 'success';
        	$rpta['mensaje'] = ['Se ha registrado la asociación/deasociación de los permisos al usuario', $array_nuevos];
        	ORM::get_db('accesos')->commit();
		} catch (Exception $e) {
		    $rpta['tipo_mensaje'] = 'error';
        	$rpta['mensaje'] = ['Se ha producido un error en asociar/deasociar los permisos al usuario', $e->getMessage()];
        	ORM::get_db('accesos')->rollBack();
		}
		echo json_encode($rpta);
	}
}

?>
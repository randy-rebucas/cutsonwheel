<?php
require_once(APPPATH.'controllers/Base.php');

class Entries extends Base {

	public function index()
	{

		$data = array(
	        'title'			=> 'Welcome to cutsonwheel',
	        'heading' 		=> 'Welcome to cutsonwheel!',
	        'environment'	=> (ENVIRONMENT === 'development') ?  'cutsonwheel Version <strong>' . CI_VERSION . '</strong>' : ''
		);

		$this->parser->parse('welcome', $data);

		// $this->load->view('welcome');
	}

	public function create($id = null) {

		$data = array(
			'title'			=> $this->config->item('site_name'),
	        'content'		=> $this->load->view('entries/create', NULL, true)
		);

		$string = $this->parser->parse('default', $data);


	}
}

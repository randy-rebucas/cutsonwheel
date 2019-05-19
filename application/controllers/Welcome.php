<?php
require_once(APPPATH.'controllers/Base.php');

class Welcome extends Base {

	public function __construct()
    {
        parent::__construct();
    }

	public function index()
	{

		$data = array(
			'title'			=> $this->config->item('site_name'),
	        'content'		=> $this->load->view('welcome', NULL, true)
		);

		$string = $this->parser->parse('default', $data);
	}
}

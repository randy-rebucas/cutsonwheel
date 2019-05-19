<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_settings extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'setting_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'setting_key' => array(
                                'type' => 'varchar',
                                'constraint' => '150'
                        ),
                        'setting_value' => array(
                                'type' => 'longtext'
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('setting_id', TRUE);
                $this->dbforge->create_table('settings', FALSE, $attributes);
        }

        public function down()
        {
                $this->dbforge->drop_table('settings');
        }
}
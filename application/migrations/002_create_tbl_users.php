<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_users extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'id' => array(
                                'type' => 'int',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'username' => array(
                                'type' => 'varchar',
                                'constraint' => '50'
                        ),
                        'password' => array(
                                'type' => 'varchar',
                                'constraint' => '255'
                        ),
                        'email' => array(
                                'type' => 'varchar',
                                'constraint' => '100'
                        ),
                        'activated' => array(
                                'type' => 'tinyint',
                                'constraint' => '1',
                                'default' =>1
                        ),
                        'banned' => array(
                                'type' => 'tinyint',
                                'constraint' => '1',
                                'default' =>0
                        ),
                        'ban_reason' => array(
                                'type' => 'varchar',
                                'constraint' => '255',
                                'null' => TRUE
                        ),
                        'new_password_key' => array(
                                'type' => 'varchar',
                                'constraint' => '50',
                                'null' => TRUE
                        ),
                        'new_password_requested' => array(
                                'type' => 'datetime',
                                'null' => TRUE
                        ),
                        'new_email' => array(
                                'type' => 'varchar',
                                'constraint' => '100',
                                'null' => TRUE
                        ),
                        'new_email_key' => array(
                                'type' => 'varchar',
                                'constraint' => '50',
                                'null' => TRUE
                        ),
                        'last_ip' => array(
                                'type' => 'varchar',
                                'constraint' => '40'
                        ),
                        'last_login' => array(
                                'type' => 'datetime',
                                'default' =>'0000-00-00 00:00:00'
                        ),
                        'created' => array(
                                'type' => 'datetime',
                                'default' =>'0000-00-00 00:00:00'
                        ),
                        'modified' => array(
                                'type' => 'timestamp'
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('id', TRUE);
                $this->dbforge->create_table('users', FALSE, $attributes);
        }

        public function down()
        {
                $this->dbforge->drop_table('users');
        }
}
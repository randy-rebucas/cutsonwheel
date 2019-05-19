<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_tbl_users_profile extends CI_Migration {

        public function up()
        {
                $this->dbforge->add_field(array(
                        'profile_id' => array(
                                'type' => 'INT',
                                'constraint' => 11,
                                'auto_increment' => TRUE
                        ),
                        'id' => array(
                                'type' => 'int',
                                'constraint' => 11,
                        ),
                        'first_name' => array(
                                'type' => 'varchar',
                                'constraint' => '150',
                        ),
                        'last_name' => array(
                                'type' => 'varchar',
                                'constraint' => '150',
                        ),
                        'dob_day' => array(
                                'type' => 'char',
                                'constraint' => '5',
                                'null' => TRUE
                        ),
                        'dob_month' => array(
                                'type' => 'char',
                                'constraint' => '5',
                                'null' => TRUE
                        ),
                        'dob_year' => array(
                                'type' => 'char',
                                'constraint' => '5',
                                'null' => TRUE
                        ),
                        'phone' => array(
                                'type' => 'char',
                                'constraint' => '15',
                                'null' => TRUE
                        ),
                        'country' => array(
                                'type' => 'varchar',
                                'constraint' => '100',
                                'null' => TRUE
                        ),
                        'address' => array(
                                'type' => 'varchar',
                                'constraint' => '255',
                                'null' => TRUE
                        ),
                        'city' => array(
                                'type' => 'varchar',
                                'constraint' => '100',
                                'null' => TRUE
                        ),
                        'postal_code' => array(
                                'type' => 'char',
                                'constraint' => '5',
                                'null' => TRUE
                        )
                ));
                
                $attributes = array('ENGINE' => 'InnoDB');
                $this->dbforge->add_key('profile_id', TRUE);
                $this->dbforge->create_table('users_profile', FALSE, $attributes);
                //add fk in properties account
                $this->db->query('ALTER TABLE `users_profile` ADD INDEX(`id`);');
                //add relation table
                $this->db->query('ALTER TABLE `users_profile` ADD FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;');
        }

        public function down()
        {
                $this->dbforge->drop_table('users_profile');
        }

}
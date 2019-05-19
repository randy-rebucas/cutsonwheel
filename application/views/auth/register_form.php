<div id="content" class="container">

	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
			<h1 class="txt-color-orange login-header-big">Realsoft</h1>
			<div class="hero">

				<div class="pull-left login-desc-box-l">
					<h4 class="paragraph-header">It's Okay to be Smart. Experience the simplicity of Realsoft, everywhere you go!</h4>
					<div class="login-app-icons">
						<a href="javascript:void(0);" class="btn btn-rs btn-sm">Frontend Template</a>
						<a href="javascript:void(0);" class="btn btn-rs btn-sm">Find out more</a>
					</div>
				</div>
				
				<img src="<?php echo base_url();?>img/iphoneview.png" alt="" class="pull-right display-image" style="width:210px">
				
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<h5 class="about-heading">About Realsoft - Are you up to date?</h5>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
					</p>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
					<h5 class="about-heading">Not just your average template!</h5>
					<p>
						Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi voluptatem accusantium!
					</p>
				</div>
			</div>

		</div>
		<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
			<div class="well no-padding">
				<?php echo form_open($this->uri->uri_string(), 'id="smart-form-register" class="smart-form client-form"'); ?>
					<?php
					if ($use_username) {
						$username = array(
							'name'	=> 'username',
							'id'	=> 'username',
							'value' => set_value('username'),
							'maxlength'	=> $this->config->item('username_max_length', 'tank_auth'),
							'size'	=> 30,
						);
					}
					$email = array(
						'name'	=> 'email',
						'id'	=> 'email',
						'value'	=> set_value('email'),
						'maxlength'	=> 80,
						'size'	=> 30,
					);
					$password = array(
						'name'	=> 'password',
						'id'	=> 'password',
						'value' => set_value('password'),
						'maxlength'	=> $this->config->item('password_max_length', 'tank_auth'),
						'size'	=> 30,
					);
					$confirm_password = array(
						'name'	=> 'confirm_password',
						'id'	=> 'confirm_password',
						'value' => set_value('confirm_password'),
						'maxlength'	=> $this->config->item('password_max_length', 'tank_auth'),
						'size'	=> 30,
					);
					?>
					<header>
						Registration is FREE*
					</header>

					<fieldset>
						<section>
							<label class="input"> <i class="icon-append fa fa-user"></i>
								<?php echo form_input($username); ?>
								<?php echo form_error($username['name']); ?><?php echo isset($errors[$username['name']])?$errors[$username['name']]:''; ?>
								<b class="tooltip tooltip-bottom-right">Needed to enter the website</b> </label>
						</section>

						<section>
							<label class="input"> <i class="icon-append fa fa-envelope"></i>
								<?php echo form_input($email); ?>
								<?php echo form_error($email['name']); ?><?php echo isset($errors[$email['name']])?$errors[$email['name']]:''; ?>
								<b class="tooltip tooltip-bottom-right">Needed to verify your account</b> </label>
						</section>

						<section>
							<label class="input"> <i class="icon-append fa fa-lock"></i>
								<?php echo form_password($password); ?>
								<?php echo form_error($password['name']); ?>
								<b class="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
						</section>

						<section>
							<label class="input"> <i class="icon-append fa fa-lock"></i>
								<?php echo form_password($confirm_password); ?>
								<?php echo form_error($confirm_password['name']); ?>
								<b class="tooltip tooltip-bottom-right">Don't forget your password</b> </label>
						</section>
					</fieldset>

					<fieldset>
						<div class="row">
							<section class="col col-6">
								<label class="input">
									<input type="text" name="firstname" placeholder="First name">
								</label>
							</section>
							<section class="col col-6">
								<label class="input">
									<input type="text" name="lastname" placeholder="Last name">
								</label>
							</section>
						</div>
					</fieldset>
					<footer>
						<button type="submit" class="btn btn-rs">
							Register
						</button>
					</footer>

					<div class="message">
						<i class="fa fa-check"></i>
						<p>
							Thank you for your registration!
						</p>
					</div>
				</form>

			</div>
			
		</div>
	</div>
</div>

		<script type="text/javascript">
			runAllForms();
			
			// Validation
			$(function() {
				// Validation
				$("#smart-form-register").validate({

					// Rules for form validation
					rules : {
						username : {
							required : true
						},
						email : {
							required : true,
							email : true
						},
						password : {
							required : true,
							minlength : 3,
							maxlength : 20
						},
						passwordConfirm : {
							required : true,
							minlength : 3,
							maxlength : 20,
							equalTo : '#password'
						},
						firstname : {
							required : true
						},
						lastname : {
							required : true
						},
						gender : {
							required : true
						}
					},

					// Messages for form validation
					messages : {
						login : {
							required : 'Please enter your login'
						},
						email : {
							required : 'Please enter your email address',
							email : 'Please enter a VALID email address'
						},
						password : {
							required : 'Please enter your password'
						},
						passwordConfirm : {
							required : 'Please enter your password one more time',
							equalTo : 'Please enter the same password as above'
						},
						firstname : {
							required : 'Please select your first name'
						},
						lastname : {
							required : 'Please select your last name'
						},
						gender : {
							required : 'Please select your gender'
						}
					},

					// Ajax form submition
					submitHandler : function(form) {
						$(form).ajaxSubmit({
							success : function() {
								$("#smart-form-register").addClass('submited');
							}
						});
					},

					// Do not change code below
					errorPlacement : function(error, element) {
						error.insertAfter(element.parent());
					}
				});

			});
		</script>

<!-- MAIN CONTENT -->
<div id="content" class="container">

	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
			<h1 class="txt-color-orange login-header-big">Realsoft</h1>
			<div class="hero">

				<div class="pull-left login-desc-box-l">
					<h4 class="paragraph-header">It's Okay to be Smart. Experience the simplicity of Realsoft, everywhere you go!</h4>
					<div class="login-app-icons">
						<a href="javascript:void(0);" class="btn btn-rs btn-sm">Contact us</a>
						<a href="javascript:void(0);" class="btn btn-rs btn-sm">Find out more</a>
					</div>
				</div>
				
				<img src="<?php echo base_url();?>img/iphoneview.png" class="pull-right display-image" alt="" style="width:210px">

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
		<div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
			<div class="well no-padding">
				<?php echo form_open($this->uri->uri_string(), 'id="login-form" class="smart-form client-form"'); ?>

					<header>
						Sign In
					</header>
					<?php
					$login = array(
						'name'	=> 'login',
						'id'	=> 'login',
						'value' => set_value('login'),
						'maxlength'	=> 80,
						'size'	=> 30,
					);
					if ($login_by_username AND $login_by_email) {
						$login_label = 'Email or login';
					} else if ($login_by_username) {
						$login_label = 'Login';
					} else {
						$login_label = 'Email';
					}
					$password = array(
						'name'	=> 'password',
						'id'	=> 'password',
						'size'	=> 30,
					);
					$remember = array(
						'name'	=> 'remember',
						'id'	=> 'remember',
						'value'	=> 1,
						'checked'	=> set_value('remember'),
						'style' => 'margin:0;padding:0',
					);
					?>
					<fieldset>
				
						<section>
							<label class="label">E-mail</label>
							<label class="input"> <i class="icon-append fa fa-user"></i>
								<?php echo form_input($login); ?>
								<?php echo form_error($login['name']); ?><?php echo isset($errors[$login['name']])?$errors[$login['name']]:''; ?>
								<b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Please enter email address/username</b></label>
						</section>

						<section>
							<label class="label">Password</label>
							<label class="input"> <i class="icon-append fa fa-lock"></i>
								<?php echo form_password($password); ?>
								<?php echo form_error($password['name']); ?><?php echo isset($errors[$password['name']])?$errors[$password['name']]:''; ?>
								<b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Enter your password</b> </label>
							<div class="note">
								<a href="<?php echo site_url('auth/forgot_password');?>">Forgot password?</a>
							</div>
						</section>

						<section>
							<label class="checkbox">
								<input type="checkbox" name="remember" id="remember" value="1" checked="" checked="<?php echo set_value('remember');?>">
								<i></i>Stay signed in</label>
						</section>
					</fieldset>
					<footer>
						<button type="submit" class="btn btn-rs">
							Sign in
						</button>
					</footer>
				</form>

			</div>
			<!-- <h5 class="text-center"> - Or sign in using -</h5>
															
			<ul class="list-inline text-center">
				<li>
					<a href="javascript:void(0);" class="btn btn-primary btn-circle"><i class="fa fa-facebook"></i></a>
				</li>
				<li>
					<a href="javascript:void(0);" class="btn btn-info btn-circle"><i class="fa fa-twitter"></i></a>
				</li>
				<li>
					<a href="javascript:void(0);" class="btn btn-warning btn-circle"><i class="fa fa-linkedin"></i></a>
				</li>
			</ul> -->
		</div>
	</div>
</div>



<script type="text/javascript">
	runAllForms();

	$(function() {
		// Validation
		$("#login-form").validate({
			// Rules for form validation
			rules : {
				email : {
					required : true,
					email : true
				},
				password : {
					required : true,
					minlength : 3,
					maxlength : 20
				}
			},

			// Messages for form validation
			messages : {
				email : {
					required : 'Please enter your email address',
					email : 'Please enter a VALID email address'
				},
				password : {
					required : 'Please enter your password'
				}
			},

			// Do not change code below
			errorPlacement : function(error, element) {
				error.insertAfter(element.parent());
			}
		});
	});
</script>

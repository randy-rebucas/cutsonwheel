<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>{title}</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">

    <!-- Favicons -->
    <link href="<?php echo base_url();?>assets/img/favicon.png" rel="icon">
    <link href="<?php echo base_url();?>assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet">

    <!-- Bootstrap CSS File -->
    <link href="<?php echo base_url();?>assets/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Libraries CSS Files -->
    <link href="<?php echo base_url();?>assets/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?php echo base_url();?>assets/lib/animate/animate.min.css" rel="stylesheet">
    <link href="<?php echo base_url();?>assets/lib/venobox/venobox.css" rel="stylesheet">
    <link href="<?php echo base_url();?>assets/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

    <!-- Main Stylesheet File -->
    <link href="<?php echo base_url();?>assets/css/style.css" rel="stylesheet">

    <!-- =======================================================
    Theme Name: TheEvent
    Theme URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
    Author: BootstrapMade.com
    License: https://bootstrapmade.com/license/
  ======================================================= -->
    <style>
        #intro {
            width: 100%;
            height: 100vh;
            background: url(/assets/img/intro.jpg) top center;
            background-size: cover;
            overflow: hidden;
            position: relative;
        }
        #intro p span {
            text-transform: uppercase;
            color: #f82249 !important;
        }
        section#requirements {
		    padding: 60px 0;
		}
		section#judges {
		    padding: 60px 0;
		}
        section#judging {
            padding: 60px 0;
        }
		.hidden {
		    display: none;
		}
    </style>
</head>

<body>

    <!--==========================
    Header
  ============================-->
    <header id="header">
        <div class="container">

            <div id="logo" class="pull-left">
                <!-- Uncomment below if you prefer to use a text logo -->
                <!-- <h1><a href="#main">C<span>o</span>nf</a></h1>-->
                <a href="#intro" class="scrollto"><img src="<?php echo base_url();?>assets/img/logo-02.png" alt="" title=""></a>
            </div>

            <nav id="nav-menu-container">
                <ul class="nav-menu">
                    <li class="menu-active"><a href="#intro">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#judges">Judges</a></li>
                    <li><a href="#judging">Judging</a></li>
                    <li><a href="#requirements">Requirements</a></li>
                    <li><a href="#styles">Hairstyles</a></li>
                    <li><a href="#participants">Participants</a></li>
                    <li><a href="#supporters">Sponsors</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li class="submit-entries"><a href="javascript:;" data-toggle="modal" data-target="#submit-entries-modal">Submit Entries</a></li>
                </ul>
            </nav>
            <!-- #nav-menu-container -->
        </div>
    </header>
    <!-- #header -->

    <!--==========================
    Intro Section
  ============================-->
    

    {content}

    <!--==========================
    Footer
  ============================-->
    <footer id="footer">
        <div class="footer-top">
            <div class="container">
                <div class="row">

                    <div class="col-lg-3 col-md-6 footer-info">
                        <img src="<?php echo base_url();?>assets/img/logo-02.png" alt="TheEvenet">
                        <p>cutsonwheel is a latest trends of personal grooming services that globalized all professionals in different area of grooming industry and incorporate the latest technologies such web and mobile applications. </p>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Home</a></li>
                            <li><i class="fa fa-angle-right"></i> <a href="#">About us</a></li>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Services</a></li>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Terms of service</a></li>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Partners</a></li>
                            <li><i class="fa fa-angle-right"></i> <a href="#">Carriers</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 footer-contact">
                        <h4>Contact Us</h4>
                        <p>
                            058 Rocaville St, Camella Homes
                            <br> Noveleta Cavite, 4105
                            <br> Philippines
                            <br>
                            <strong>Phone:</strong> +63 9179157515
                            <br>
                            <strong>Email:</strong> cutsonwheel@gmail.com
                            <br>
                        </p>

                        <div class="social-links">
                            <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                            <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                            <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
                            <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
                            <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="copyright">
                &copy; Copyright <strong>cutsonwheel</strong>. All Rights Reserved
            </div>

        </div>
    </footer>
    <!-- #footer -->
    <!-- Modal Order Form -->
    <div id="submit-entries-modal" class="modal fade">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Submit your entry</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2>This section is close.Stay Tuned...</h2>
                    <p>Find your model now when its not to late!</p>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <a href="#" class="back-to-top"><i class="fa fa-angle-up"></i></a>

    <!-- JavaScript Libraries -->
    <script src="<?php echo base_url();?>assets/lib/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/jquery/jquery-migrate.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/easing/easing.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/superfish/hoverIntent.js"></script>
    <script src="<?php echo base_url();?>assets/lib/superfish/superfish.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/wow/wow.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/venobox/venobox.min.js"></script>
    <script src="<?php echo base_url();?>assets/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Contact Form JavaScript File -->
    <script src="<?php echo base_url();?>assets/js/contactform.js"></script>

    <!-- Template Main Javascript File -->
    <script src="<?php echo base_url();?>assets/js/main.js"></script>
</body>

</html>
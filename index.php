<!DOCTYPE html>
<html>
    <head>
        <link type='text/css' href='bootstrap/css/bootstrap.min.css' rel='stylesheet' media='all' >
        <style>
            body
            {
                margin: 0;
                padding: 0;
            }
            .allDivs
            {
                display: none;
            }
            #remoteVideos video {
                width: 100%;
                height: auto;
                background: #eee;
                border: 1px solid #ccc;
            }
            #video {
                width: 30%;
                height: auto;
                border: 5px solid #ccc;
                border-radius: 0;
                position: absolute;
                top: -1px;
                right: -1px;
                z-index: 2;
            }
            #videoBox
            {
                min-height: 400px;
                border: 1px solid #ccc;
                position: relative;
            }
            a
            {
                text-decoration: none;
            }
            .typeChat
            {
                font-size: 80px;
                text-decoration: none;
                border-radius: 0;
            }
            .table
            {
                font-size: 50px;
            }
            .endCall
            {
                font-size: 100px;
                width: 100%;
                height: 200px;
                border-radius: 0;
            }
        </style>
    </head>
    <body>
        <div class='allDivs'>
            <div class='row'>
                <div class='col-xs-6'>
                    <a href='' class='videoChat'><button class='btn btn-block btn-danger btn-lg typeChat'><i class='glyphicon glyphicon-facetime-video'></i> Video</button></a>
                </div>
                <div class='col-xs-6'>
                    <a href='' class='audioChat'><button class='btn btn-block btn-primary btn-lg typeChat'><i class='glyphicon glyphicon-earphone'></i> Audio</button></a>
                </div>
            </div>
            <div class='row'>
                <div class='col-lg-12'>
                    <br>
                    <table class='table'>
                        <tr>
                            <td width='20%'>Room:</td>
                            <td><span class='sessionId'></span></td>
                        </tr>
                        <tr>
                            <td width='40%'>Users status:</td>
                            <td>
                                <span id='userStatus'>
                                    <span class="label label-default">Offline<span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td width='20%'>My status:</td>
                            <td>
                                <span class='status'>
                                    <span class="label label-default">Offline</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td width='30%'>Chat type:</td>
                            <td>
                                <?php
                                if (isset($_GET['video']) && $_GET['video'] == true)
                                {
                                    echo "<span class='label label-danger'><i class='glyphicon glyphicon-facetime-video'></i> Video</span>";
                                }
                                else
                                {
                                    echo "<span class='label label-primary'><i class='glyphicon glyphicon-earphone'></i> Audio</span>";
                                }
                                ?>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='row'>
                <div class='col-lg-12'>
                    <?php
                    if (isset($_GET['video']) && $_GET['video'] == true){ ?>
                    <div id='videoBox'>
                        <div id="remoteVideos"></div>
                        <video id="video"></video>
                    </div>
                    <?php } ?>
                </div>
            </div>
            <div class='row'>
                <div class='col-lg-12 text-center'>
                    <button class='endCall btn btn-danger btn-block endCall'>End Call</button> 
                    <br><br><br>
                </div>
            </div>
        </div>
        
        <!-- scripts -->
        <script src="js/jquery-1.12.3.min.js"></script>
        <!-- <script src="https://simplewebrtc.com/latest-v2.js"></script> -->
        <script src="js/simplewebrtc-v2.js"></script>
        <script src="js/mycode.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
    </body>
</html>
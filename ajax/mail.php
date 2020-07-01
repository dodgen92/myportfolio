<?php
parse_str($_POST['form_data'], $form);

define('TO_EMAIL', '');
define('SUBJECT', 'ONUC User Query');
define('FROM_EMAIL', $form['con_email']);

$MESSAGE = 'Hi Admin, <br/><br/>';
$MESSAGE .= 'You got an user query from ONUC. User details and Message are noted bellow: <br/><br/>';
$MESSAGE .= 'Name : '.$form['con_name'].'<br/>';
$MESSAGE .= 'Email : '.$form['con_email'].'<br/>';
if(isset($form['con_company']) && $form['con_company'] != ''):
    $MESSAGE .= 'Subject : '.$form['con_company'].'<br/>';
endif;
if(isset($form['con_phone']) && $form['con_phone'] != ''):
    $MESSAGE .= 'Phone : '.$form['con_phone'].'<br/>';
endif;
$MESSAGE .= 'Message : <br/>'.$form['con_message'].'<br/><br/>';
$MESSAGE .= 'Regards';

$HEADERS = "MIME-Version: 1.0" . "\r\n";
$HEADERS .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$HEADERS .= 'From: <'.FROM_EMAIL.'>' . "\r\n";

mail(TO_EMAIL, SUBJECT, $MESSAGE, $HEADERS);
echo 1;
exit();
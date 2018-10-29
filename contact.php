<?php
//
// Declare variables
//
$from = 'JNCWebDev contact form <contactform@jncwebdev.co.uk>';

$sendTo = 'Jamie Clarke <jclarke.db@gmail.com>';

$subject = 'New message from JNCWebDev';

$fields = [
  'name' => 'Name', 
  'email' => 'Email', 
  'message' => 'Message'
];

$okMessage = 'Your message has been successfully submitted. I will get back to you soon!';

$errorMessage = 'There was an error sending your message. Please email me directly at jclarke.db@gmail.com';
//
// Send script
//
error_reporting(E_ALL & ~E_NOTICE); // if debugging and don't need error reporting, turn this off by error_reporting(0);

try {
  if (count($_POST) == 0) throw new \Exception('Form is empty');

  $emailText = "You have a new message from your contact form\n\n===================\n\n";

  foreach($_POST as $key => $value) {
    // If the field exists in the $fields array, include it in the email 
    if (isset($fields[$key])) {
      $emailText .= "$fields[$key]: $value\n";
    }
  }

  // All necessary email headers
  $headers = [
    'Content-Type: text/plain; charset="UTF-8";',
    'From: ' . $from,
    'Reply-To: ' . $from,
    'Return-Path: ' . $from
  ];

  // Send email
  mail($sendTo, $subject, $emailText, implode("\n", $headers));

  $responseArray = ['type' => 'success', 'message' => $okMessage];

} catch (\Exception $e) {

  $responseArray = ['type' => 'danger', 'message' => $errorMessage];

}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  $encoded = json_encode($responseArray);

  header('Content-Type: application/json');

  echo $encoded;
}
// else just display the message
else {
  echo $responseArray['message'];
}
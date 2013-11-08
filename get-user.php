<?php

require 'rdio.php';

$consumer_key = 'hveprm4bra5m4f36c7z5umkn';
$consumer_secret = '7ZPxkvfSNm';

$rdio = new Rdio(array($consumer_key, $consumer_secret));

if(isset($_POST['vars'])) {
  $vars = json_decode($_POST['vars'], TRUE);

  $data = $rdio->call('get', keys=$vars['user'], extras='lastSongPlayed');

  return $data;
}














?>

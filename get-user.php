<?php

require 'rdio.php';

$consumer_key = 'hveprm4bra5m4f36c7z5umkn';
$consumer_secret = '7ZPxkvfSNm';

$rdio = new Rdio(array($consumer_key, $consumer_secret));

if(isset($_POST['user'])) {
  $user = $_POST['user'];

  $params = array(
    'method' => 'get',
    'keys' => $user,
    'extras' => 'lastSongPlayed'
  );

  $data = $rdio->call('get', $params);

  return $data;
}














?>

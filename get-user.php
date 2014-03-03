<?php

require 'includes/rdio.php';
require_once 'includes/rdio-consumer-credentials.php';

date_default_timezone_set('UTC');

$rdio = new Rdio(array(RDIO_CONSUMER_KEY, RDIO_CONSUMER_SECRET));

if (!isset($_POST['user']) || !isset($_POST['type'])) {
  returnError('0', 'Incomplete Request', $_POST);
}

$method = $_POST['type'];
$user = $_POST['user'];

switch ($_POST['type']) {
  case 'findUser':
    $resultDepth = false;
    if (filter_var($user, FILTER_VALIDATE_EMAIL)) {
      $user_type = 'email';
    } else {
      $user_type = 'vanityName';
    }
    $params = array(
      $user_type => $user,
      'extras' => 'displayName,lastSongPlayed,lastSongPlayTime,bigIcon'
    );
    break;

  case 'get':
    $resultDepth = true;
    $params = array(
      'keys' => $user,
      'extras' => 'displayName,lastSongPlayed,lastSongPlayTime,bigIcon'
    );
    break;
  default:
    returnError('0', 'Invalid Request Type', $_POST);
    break;
}

$result = $rdio->call($method, $params);
$resultCheck = (array)$result->result;

if ($result->status !== 'ok') {
  returnError('0', 'Rdio rejected this request.', $result);
} elseif (empty($resultCheck)) {
  returnError('2', 'User not found. Make sure you are entering a valid Rdio user Email or Username.', $result);
} else {
  if ($resultDepth) {
    $data = $result->result->{$user};
  } else {
    $data = $result->result;
  }
}

$now = strtotime('now');

$nextChange = strtotime($data->lastSongPlayTime) + $data->lastSongPlayed->duration;

if ($nextChange > ($now)) {
  $nextCheck = $nextChange - $now + 5;
  $paused = 'false';
} else {
  $nextCheck = 30;
  $paused = 'true';
}

$response = array(
  'status' => '1',
  'message' => 'success',
  'userKey' => $data->key,
  'displayName' => $data->displayName,
  'trackName' => $data->lastSongPlayed->name,
  'albumName' => $data->lastSongPlayed->album,
  'artistName' => $data->lastSongPlayed->artist,
  'albumArt' => $data->lastSongPlayed->icon400,
  'nextCheck' => $nextCheck,
  'paused' => $paused
);

echo json_encode($response);

function returnError($status, $message, $data=NULL) {
  $response = array(
    'status' => $status,
    'message' => $message,
    'data' => $data
  );
  echo json_encode($response);
  exit;
}

?>

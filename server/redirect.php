<?php

$shorturl = $_GET['shorturl'];
$db = new Mysqli('localhost', 'urldb', 'mysql', 'mysql');

if(isset($_GET['shorturl'])) {
	$exsists = $db->query("SELECT url FROM links WHERE shorturl = '{$shorturl}'");
	$url = $exsists->fetch_object()->url;
	header('HTTP/1.1 200 OK');
	header('Location:'.$url);
	exit();
} else {
	header('Location: index.html');
}
?>

<?php
header("Access-Control-Allow-Origin: *");

$db = new Mysqli('localhost', 'mysql', 'mysql', 'urldb');
$symbols = "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm1234567890";
$rand = substr(str_shuffle($symbols), 0, 5);

$site = "http://shorturl/";

$_POST = json_decode(file_get_contents('php://input'), true);

$json = new stdClass();

if(!empty($_POST['url'])) {
	$url = $_POST['url'];

	if((strpos($url, 'https://') === 0)or(strpos($url, 'http://') === 0)) {
		if(isset($_POST['check']) and !empty($_POST['shorturl'])) {
			$rand = $_POST['shorturl'];
		}
      
		if(isset($_POST['check']) and empty($_POST['shorturl'])) {
			$json->error = 'Необходимо ввести краткую ссылку, если поставлена галочка';
		} else {
			$exsists = $db->query("SELECT url FROM links WHERE shorturl = '{$_POST['shorturl']}'");
			
			if(mysqli_num_rows($exsists) > 0) {
				$json->error = "Введенная краткая ссылка уже занята";
			} else {
				$exsists = $db->query("SELECT shorturl FROM links WHERE url = '{$url}'");
          
				if($exsists->num_rows and !isset($_POST['check'])) {
					$row = $exsists->fetch_object()->shorturl;
					$json->url = $site . $row;
				} else {
					$db->query("INSERT INTO links(url, shorturl) VALUES('{$url}', '{$rand}')");
					$json->url = $site . $rand;
				}
			}
		}
	} else {
		$json->error = "Ссылка должна начинаться с http://";
    }
} else {
	$json->error = "Пожалуйста, проверьте правильность ввода";
}

if(!isset($json->url) && !isset($json->error)) {
	$json->error = "На сервер пришел пустой запрос";
}

print_r(json_encode($json));

?>

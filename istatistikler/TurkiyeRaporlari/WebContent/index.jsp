<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/nufus.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Nufus Bilgileri</title>
</head>
<body onload="comboboxdoldur()">

<select id="sehir" onChange="bilgiGetir(this.selectedIndex)">
	<option>Seçiniz</option>
</select>
<br>
Şehir Adı = <label id="isim"></label><br>
Erkek Nufusu = <label id="erkek"></label><br>
Kadın Nufusu = <label id="kadın"></label><br>
Toplam Nufusu = <label id="toplam"></label>


</body>
</html>
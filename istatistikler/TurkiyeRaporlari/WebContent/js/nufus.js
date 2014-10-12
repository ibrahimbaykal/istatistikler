/**
 * Halil ibrahim Baykal
 */

function getnufus() {
	$.ajax({
		url : "nufus",
		type : "POST",
		dataType : "JSON",
		data : "",
		success : getnufusdone
	});
}

function getnufusdone(data) {
	$("#container").html(data);
}

function comboboxdoldur() {
	$.ajax({
		url : "Doldur",
		type : "POST",
		dataType : "JSON",
		data : "op=sehirdoldur",
		success : doldur
	});
}

function doldur(data) {
	var index = data.data.length
	console.log(index);
	var html="";
	for(var i = 0;i <index;i++){
		var sehir = data.data[i].isim;
		html += "<option>"+ sehir+"</option>";
	}
	$("#sehir").html(html);
}

function bilgiGetir(index){
	var sehir = $('#sehir').val();
	var data = "op=bilgigetir&sehir="+sehir;
	$.ajax({
		url : "Doldur",
		type : "POST",
		dataType : "JSON",
		data : data,
		success : bilgigetirdone
	});
}
function bilgigetirdone(data){
	console.log("çalıştım");
	var erkek = data.data[0].erkek;
	var kadın = data.data[0].kadın
	var toplam = data.data[0].toplam
	var ilAdi = data.data[0].ilAdi
	
	$("#erkek").html(erkek);
	$("#kadın").html(kadın);
	$("#toplam").html(toplam);
	$("#isim").html(ilAdi);
}
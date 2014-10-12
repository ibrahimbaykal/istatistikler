/*
  Raphaël 2.1.0 - JavaScript Vector Library                         
  Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)   
  Copyright © 2008-2012 Sencha Labs (http://sencha.com)             
  Licensed under the MIT (http://raphaeljs.com/license.html) license. 
  ***
  Document   : Interactive Turkey Map with RaphaelJS
  Edited by Selen GORA <http://selengora.com - me@selengora.com>

  ***
   
  @title: Added modalbox
  @description: change list;
				added simple modalbox written by me
				changed qtip position "mouse" to "leave" coz on "click" event doesnt work properly
				added new variable "content_dir" for $.get requests
				added ajax req. on obj.click function
  @author: Taner DOGAN <http://tanerdogan.com - hello@tanerdogan.com>
  @author: Taner DOGAN <http://tanerdogan.com - hello@tanerdogan.com>
*/

	var iscountyselected = false;
	var previouscountyselected = "blank";
	var start = true;
	var past = null;
	var content_dir = "details";
	
	//@author : Halil �brahim Baykal <http://ibrahimbaykal.com - halilibrahimbaykal@gmail.com>
	var sehir = null;
	
	
	
	/*
	function getcountryproperty(id){
		var _data = "country="+id;
		$.ajax({
			url:"getcountryproperty",
			type:"POST",
			dataType:"JSON",
			data:_data,
			success:getcountrypropertysuccess
		});
	}
	function getcountrypropertysuccess(data){
		sehir = data.country;
		var mma = data.mma;
		var msud = data.msud;
		var gha = data.gha;
		var gak = data.gak;
		var gsud = data.gsud;
		var mmbog = data.mmbog;
		var gbod = data.gbod;
		var dsg = data.dsg;
		var st = data.st;
		
//		var table = "<table><tr>" +
//					"<td>Şehir</td>" +
//					"<td>MAMUL MAL ALIMLARI (06.1)</td>" +
//					"<td>MENKUL SERMAYE ÜRETİM GİDERLERİ (06.2)</td>" +
//					"<td>GAYRIMADDİ HAK ALIMLARI (06.3)</td>" +
//					"<td>GAYRIMENKUL ALIMLARI VE KAMULAŞTIRMASI    (06.4)</td>" +
//					"<td>GAYRIMENKUL SERMAYE ÜRETİM GİDERLERİ (06.5)</td>" +
//					"<td>MENKUL MALLARIN BÜYÜK ONARIM GİDERLERİ   (06.6)</td>" +
//					"<td>GAYRIMENKUL BÜYÜK ONARIM GİDERLERİ    (06.7)</td>" +
//					"<td>DİĞER SERMAYE GİDERLERİ    (06.9)</td>" +
//					"<td>SERMAYE TRANSFERLERİ (07.1)</td>" +
//					"</tr>" +
//					"<tr>" +
//					"<td>"+sehir +"</td>" +	
//					"<td>"+mma +"</td>" +
//					"<td>"+msud +"</td>" +
//					"<td>"+gha+"</td>" +
//					"<td>"+ gak+"</td>" +
//					"<td>"+gsud +"</td>" +
//					"<td>"+ mmbog+"</td>" +
//					"<td>"+ gbod+"</td>" +
//					"<td>"+ dsg+"</td>" +
//					"<td>"+st +"</td>" +				
//					"</tr></table>";
		
		var htmlview = "<div id='column1'>Şehir: " +sehir+ "<br>";
		htmlview += "MAMUL MAL ALIMLARI (06.1): "+ mma+ "<br>";
		htmlview += "MENKUL SERMAYE ÜRETİM GİDERLERİ (06.2): " +msud+ "<br>";
		htmlview += "GAYRIMADDİ HAK ALIMLARI (06.3): "+ gha+ "<br>";
		htmlview += "GAYRIMENKUL ALIMLARI VE KAMULAŞTIRMASI    (06.4): "+gak+ "<br>";
		htmlview += "GAYRIMENKUL SERMAYE ÜRETİM GİDERLERİ (06.5): "+ gsud+ "<br></div>";
		
		
		htmlview += "<div id='column2'> MENKUL MALLARIN BÜYÜK ONARIM GİDERLERİ   (06.6): " +mmbog+ "<br>";
		htmlview += "GAYRIMENKUL BÜYÜK ONARIM GİDERLERİ    (06.7): " +gbod+ "<br>";
		htmlview += "DİĞER SERMAYE GİDERLERİ    (06.9): " +dsg+ "<br>";
		htmlview += "SERMAYE TRANSFERLERİ (07.1): " +st+ "<br></div>";

		htmlview += "<div id='close'><a href='#' class='kapat'>Kapat</a></div>";
		
			
		

		$("#countrydetails").html(htmlview);
		$("#countrydetails").slideDown(500);
	}
	
	*/
	function getnufus(id){
		var _data= "id="+id;
		$.ajax({
			url:"nufus",
			type:"POST",
			dataType:"JSON",
			data:_data,
			success:getnufusdone
		});
	}

	function getnufusdone (data){
		var htmlview = data.data[0].toplam;
		$("#countrydetails").html(htmlview);
		$("#countrydetails").slideDown(500);
	}
	
	$(function(){
	
	var r = Raphael('map'),
	attributes = {
            fill: '#e0e0e0',
            stroke: '#999',
            'stroke-width': 0,
            'class': "sehir",
            'stroke-linejoin': 'round',
        },
	arr = new Array();
	
	for (var county in paths) {
		
		var obj = r.path(paths[county].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = county;
			
//		if(arr[county] == 'blank')
//			obj.attr(attributes).attr( { fill: "#000" } ); /* set blank colour */

			
							
		if(arr[obj.id] != 'blank') /* prevent change of blank colour and mouse click */
		{				
			obj.data('selected', 'notSelected');
			
		
		
			/* add ID to paths */
			obj.node.id = arr[obj.id];
			
			/* add title (for qtip) to paths */
			obj.attr(attributes).attr( { title: paths[arr[obj.id]].name } );
			

			/* county - mouse in */
			obj
			.hover(function(){ 
				if(paths[arr[this.id]].value == 'notSelected')
					{
					/*this.animate({
						fill: '#32CD32'
					}, 300);*/
				}
				$('#coatOfArms').addClass(arr[this.id]+'large sprite-largecrests');
				
				$('#countyInfo').text(paths[arr[this.id]].name);
				
				$('#searchResults').stop(true,true);
				
							
			/* county - mouse out */	
			}, function(){ 
				if(paths[arr[this.id]].value == 'notSelected')
					{
					/*this.animate({
						fill: attributes.fill
					}, 300);*/
				}
				/*clearTimeout($(this).data('timeout'));*/
				
				
							
				$('#coatOfArms').removeClass();			
				/* if county event is not on a selected county fade out */
				if(paths[arr[this.id]].value == 'notSelected')
					{
					$('.'+paths[arr[this.id]].name)
							.slideUp('slow', function() { 
								$(this).remove(); 
							});
				}
			});
			/* add tool tip to map */ 	
			$("svg a").qtip({
			
					content: {
						//attr: 'title'
						attr: 'title'
					},
					show: 'mouseover',
					hide: 'mouseout',
					position: {
						target: 'leave'
					},
					style: {
						classes: 'ui-tooltip-tipsy ui-tooltip-shadow',
						tip: false
					}
			});/* end tool tip to map */
			
			/* add crests to bottom and set county selections */
			obj.click(function(){	
				
			/* @author: Taner DOGAN //START */			
			$("#detail").click();
			var id = arr[this.id];
			//getcountryproperty(id);
			getnufus(id);
			
			/* @author: Taner DOGAN //END */
			
				if(paths[arr[this.id]].value == 'notSelected')
				{
						this.animate({
						fill: '#999'
					}, 200);
			
					paths[previouscountyselected].value = "notSelected";
					paths[arr[this.id]].value = "isSelected";
					
					//$('#test').append(' and after it is '+paths[previouscountyselected].value);
					//alert(arr[this.id] + previouscountyselected);
					previouscountyselected = paths[arr[this.id]].name;
					//$('#test').append(' the current county is now '+previouscountyselected);
					
					/* handle small crest */
					$('<div/>', {
							title: arr[this.id],
							'class': arr[this.id]+'small sprite-smallcrests'
						}).appendTo('#selectedCounties').qtip(countyCrest);
						
					/* change select drop menu */							
					$("#countymenu").val(paths[arr[this.id]].county); 
					
					
						
					if (!start && past != this)
					{
						past.animate({ fill: '#e0e0e0'	}, 200);
					}
					past = this;
					start = false;					
				}
	
					
				else if(paths[arr[this.id]].value == 'isSelected')
					{
						this.animate({
							fill: '#999'
						}, 200);
						
						paths[arr[this.id]].value = "notSelected"; /* set path value */	
						
						/* remove small crest */
						$("." + previouscountyselected+'small').remove();
						
						
					}	
				
				});/* end mark selections */

			/* required for qtip crests at bottom */
			var countyCrest = 	{
					content: {
						attr: 'title'
					},
					position: {
						target: 'mouse'
					},
					style: {
						classes: 'ui-tooltip-tipsy ui-tooltip-shadow',
						tip: true
					}
			};/* end for qtip crests to bottom */
			
			

			
			/* county hover bump */
			function hoverin(e){
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#1669AD'}, 300);						
			}

			function hoverout(e){			
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#e0e0e0'}, 300);
			}

			obj.mouseout(hoverout);
				
			obj.mouseover(hoverin);
			/* end county hover bump */
			
			/* hide name div - !important do not delete - ajax uses contents for event search */
			$('#countyInfo').hide();
			
			$('#spinner').hide();
			/* @author: Taner DOGAN //START */	
			$(".kapat").live("click", function(){
				$("#countrydetails").css("display", "none").empty();					
			});
			/* @author: Taner DOGAN //END */	
		}/* end check on blank */
		
	} /* end raphael loop */				
});
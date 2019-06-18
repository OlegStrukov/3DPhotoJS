//выбор активного элемента
var clearIntervalNewLR = '';
var new_height_top = 0;
var new_height_all = 0;
function selectActive(wrapper_el,active_col,element_style,path_image,new_width,new_height,kolvo){
	//console.log(active_item);
	//wrapper_el.find('.table').children('div').removeClass('active').eq(active_item-1).addClass('active');

  	new_height_top = active_col * new_height;

  	new_height_all = kolvo*new_height;

	/*
  	$('.counts').children('span').text(new_height_top);
  	$('.width_this').children('span').text(new_width);
  	$('.height_this').children('span').text(new_height);
  	*/

	//element_style.attr('style','background-image:url('+path_image+'); background-repeat:no-repeat; background-position: 0 '+new_height_top+'px; width:'+new_width+'px; height:'+new_height+'px; background-size:'+new_width+'px '+new_height_all+'px; -webkit-background-size:'+new_width+'px '+new_height_all+'px; -moz-background-size:'+new_width+'px '+new_height_all+'px; -o-background-size:'+new_width+'px '+new_height_all+'px;');
	element_style.attr('style','width:'+new_width+'px; height:'+new_height+'px; overflow: hidden; position:relative;');
	element_style.find('span').attr('style','background-image:url('+path_image+'); width:'+new_width+'px; height:'+new_height_all+'px; position:absolute; top:'+-new_height_top+'px; left:0; display:block; background-repeat: no-repeat; background-size: 100% 100%;');
}

function mouseLR(wrapper_el,width_original,height_original,kolvo,path_image,speed) {


	var element_style = wrapper_el.find('.table');
	element_style.append('<span></span>')

	var new_width = parseFloat(element_style.width());
	var new_height = (parseFloat(element_style.width() / (width_original/height_original) ));

	new_height_all = kolvo*new_height;


	element_style.attr('style','width:'+new_width+'px; height:'+new_height+'px; overflow: hidden; position:relative;');
	element_style.find('span').attr('style','background-image:url('+path_image+'); width:'+new_width+'px; height:'+new_height_all+'px; position:absolute; top:0; left:0; display:block; background-repeat: no-repeat; background-size: 100% 100%;');

	//выбор первого элемнта //строк //колонка //начение
	var first_col = 0;
	var first_item = 1;

	//координаты места откуда потянули (старые)
	var page_x = 0;
	var page_y = 0;

	//текущий сдвиг
	var this_page_x = 0;
	var this_page_y = 0;

	//Текущий выбранный элемент(его номер от 1 до общего количества)
	var active_item = first_item;
	//активная строка (выбор)
	var active_col = first_col;


	var clicking = false;
	wrapper_el.on("mousedown touchstart", function(event) {
		if (event.type == "mousedown") {
		 	clicking = true;
	    	page_x = event.pageX;
			page_y = event.pageY;
		} else if (event.type == "touchstart") {
			clicking = true;
	    	page_x = event.originalEvent.touches[0].pageX;
			page_y = event.originalEvent.touches[0].pageY;
		}
	});


	wrapper_el.on("mouseup touchend", function(event) {
	  clicking = false;
	});


	wrapper_el.on("mousemove touchmove", function(event) {
    	if(clicking === false) return;

    	if (event.type == "mousemove") {
	    	this_page_x = event.pageX;
			this_page_y = event.pageY;
		} else if (event.type == "touchmove") {
	    	this_page_x = event.originalEvent.touches[0].pageX;
			this_page_y = event.originalEvent.touches[0].pageY;
		}
		
    	if(page_x > this_page_x ) {// влево
			//console.log('лево');
			active_col = active_col-1;
			if(active_col < 0) {
				active_col = kolvo-1;
			}
			selectActive(wrapper_el,active_col,element_style,path_image,new_width,new_height,kolvo);
			change_info();
		} else if( page_x < this_page_x ) {// вправо
			//console.log('право');
			active_col = active_col+1;
			if(active_col > kolvo-1) {
				active_col = 0;
			}
			selectActive(wrapper_el,active_col,element_style,path_image,new_width,new_height,kolvo);
			change_info();
		}

		function change_info() {
			function func() {
				if (event.type == "mousemove") {
			    	page_x = event.pageX;
					page_y = event.pageY;
				} else if (event.type == "touchmove") {
			    	page_x = event.originalEvent.touches[0].pageX;
					page_y = event.originalEvent.touches[0].pageY;
				}
			}
			setTimeout(func, 30);
		}
	   
	});

}







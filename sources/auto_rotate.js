var init3d = function(wrapper_el_text,width_original,height_original,count_col,count_row,path_image,speed,loop,direction) {

	//определяем первый символ - из него ищем это класс или id
	var wrapper_el;
	if(wrapper_el_text.charAt(0) == '#') {
        wrapper_el = document.getElementById(wrapper_el_text.slice(1));
        console.log();
	} else if(wrapper_el_text.charAt(0) == '.') {
        var arr_wrapper_els = document.getElementsByClassName(wrapper_el_text.slice(1));
        wrapper_el = arr_wrapper_els[0];
	} else {
		console.log('Selector not found!');
		return false;
	}

	//var clearIntervalNew = 0;
	var stopRotate = false;

    var widthSprite = width_original*count_col;//ширина спрайта по умолчанию
    var heightSprite = height_original*count_row;//высота спрайта по умолчанию

    //добавляем спан
    var spanRotate = document.createElement('span');
    var element_style = document.createElement('div');
    element_style.className = "rotator";
    element_style.appendChild(spanRotate);
    wrapper_el.appendChild(element_style);

	//высота картинки должна отталкиваться от ширины родителя.
	//т.е. устанавливаем новую ширину и высоту видимой области
    var widthShowWindow = wrapper_el.clientWidth || wrapper_el.offsetWidth;
    var heightShowWindow = (widthShowWindow/width_original)*height_original;

	//устанавливаем новую ширину и высоту СПРАЙТА
    var usedWidthSprite = widthShowWindow*count_col;
    var usedHeightSprite = heightShowWindow*count_row;

	//задаем стили видимой области
    element_style.style.cssText='' +
		'width:'+widthShowWindow+'px; \
		height:'+heightShowWindow+'px; \
		overflow: hidden; \
		position:relative; \
	  ';

    //задаем первоначальные стили спану
    spanRotate.style.cssText='' +
        'background-image:url('+path_image+'); \
		width:'+usedWidthSprite+'px; \
		height:'+usedHeightSprite+'px; \
		top:0; \
		left:0; \
		display:block; \
		position:absolute; \
		background-repeat: no-repeat; \
		background-size: 100% 100%; \
	  ';


    //общее количество изображений (для того чтобы отловить финал)
    var countImages = count_col*count_row;

	var i = 0;
	var positionLeft;
	var positionTop;
	//шаг лево/вниз
	var stepLeft;
	var stepTop;
	//проверяем в какую сторону пойдет скрипт
	if(direction == 'up') {
    	positionLeft = 0;
    	positionTop = 0;
    	stepLeft = 0;
    	stepTop = 0;
    } else if(direction == 'down') {
    	stepLeft = count_col-1;
    	stepTop = count_row-1;
    	positionLeft = widthShowWindow*(count_col-1);
		positionTop = heightShowWindow*(count_row-1);
    }

    var timerId = setTimeout(rotateTimeout, speed);

	//переменные для сравнения ширины
    var width_wrapper_el = 0;
    var width_rotator = 0;

	function rotateTimeout() {

		//определение направления
		if(direction == 'up') {//вперед//////////////////////////////////////////////////////////
	        i++;

	        if(stepLeft < count_col-1) {
	            positionLeft = positionLeft + widthShowWindow;
	            stepLeft++;
	        } else {
	            stepLeft = 0;
	            stepTop++;
	            positionLeft = 0;
	            positionTop = positionTop + heightShowWindow;
	        }

	        if(stepTop == count_row-1 && stepLeft == count_col-1) {
	            stepLeft = 0;
	            stepTop = 0;
	            positionLeft = 0;
	            positionTop = 0;
	            i = 0;
	        }
	    } else if(direction == 'down') {//назад//////////////////////////////////////////////////////////
	    	i++;

	        if(stepLeft > 0) {
	            positionLeft = positionLeft - widthShowWindow;
	            stepLeft--;
	        } else {
	            stepLeft = count_col-1;
	            stepTop--;
	            positionLeft = widthShowWindow*(count_col-1);
	            positionTop = positionTop - heightShowWindow;
	        }

	        if(stepTop == 0 && stepLeft == 0) {
	            stepLeft = count_col-1;
		    	stepTop = count_row-1;
		    	positionLeft = widthShowWindow*(count_col-1);
				positionTop = heightShowWindow*(count_row-1);
	            i = 0;
	        }
	    }

        spanRotate.style.cssText='' +
            'background-image:url('+path_image+'); \
			width:'+usedWidthSprite+'px; \
			height:'+usedHeightSprite+'px; \
			top:-'+positionTop+'px; \
			left:-'+positionLeft+'px; \
			display:block; \
			position:absolute; \
			background-repeat: no-repeat; \
			background-size: 100% 100%; \
		  ';

		if(stopRotate == false) {

            var width_wrapper_el = wrapper_el.clientWidth || wrapper_el.offsetWidth
            var width_rotator = element_style.clientWidth || element_style.offsetWidth

	        if(width_wrapper_el != width_rotator) {//если ширина поменялась - меняем данные

	            widthShowWindow = wrapper_el.clientWidth || wrapper_el.offsetWidth;
	            heightShowWindow = (widthShowWindow/width_original)*height_original;

                element_style.style.cssText='' +
                    'width:'+widthShowWindow+'px; \
					height:'+heightShowWindow+'px; \
					overflow: hidden; \
					position:relative; \
				  ';

	            usedWidthSprite = widthShowWindow*count_col;
	            usedHeightSprite = heightShowWindow*count_row;

	            positionLeft = stepLeft*widthShowWindow;
	            positionTop = stepTop*heightShowWindow;


	            timerId = setTimeout(rotateTimeout, speed);

			} else {//иначе просто идем дальше
	            timerId = setTimeout(rotateTimeout, speed);
			}
		}

		//стопаем если указано что один оборот
        if(loop == false && i == countImages-3) {
            stopRotate = true;
        }

	}

	return {
	    stop3d: function() {
	      	stopRotate = true;
	    },
	    
	    play3d: function() {
	    	if(stopRotate == true) {
	    		stopRotate = false;
	    		timerId = setTimeout(rotateTimeout, speed);
	    	}
	    },
  	}

}
$(function(){
	
	function doSvg(){
		var $that = $("#nine"),
			that = $that[0],
			number = 9,
			canLine = false,
			thisL = '',
			thisPass = [],
			canDoLine = false,
			passWord = 123698;

		for(var i = 0; i < 3; i++ ){
			for(var j = 0; j < 3; j++){
				var node = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
					'cx': 110*j + 90,
					'cy': 110*i + 90,
					'r': 40,
					'stroke': 'rgba(255, 255, 255, 0.5)',
					'stroke-width': 2,
					'fill': 'transparent',
					'class': 'roundA',
					'canDo': true
				});
				$that.append(node);
			}
		}

		var DoLine = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
			'stroke': '#fff',
			'stroke-width': 2,
			'fill': 'transparent',
			'd': ' '
		});

		$that.append(DoLine);

		var circle = $that.find('circle');

		circle.mousedown(function(){
			canLine = true;
			var Mx = $(this).attr('cx'),
				My = $(this).attr('cy');

			thisL = 'M' + Mx + ' ' + My;
		});

		$that.mousemove(function(e){
			if(canLine){
				var NowLine = DoLine.attr('d');
				DoLine.attr({
					'd': thisL + 'L' + e.offsetX + ' ' + e.offsetY
				});
			}
		});

		circle.mousemove(function(){
			//	如果鼠标按下且进入到圆圈里
			if(canLine && $(this).attr('canDo') == 'true'){
				var X = $(this).attr("cx"),
					Y = $(this).attr("cy");
					thisL = thisL + ' ' + 'L' + X + ' ' + Y;

				markRound($(this));

				DoLine.attr({
					'd': thisL
				});

				thisPass.push($(this).index()+1);

				$(this).attr('canDo', false);

				canDoLine = true;
			}
		});

		circle.mouseout(function(){
			canDoLine = false;
		});

		//绘图完毕，鼠标抬起
		$that.mouseup(function(){
			//创建一个字符串
			var nowPassword = removeSameArr(thisPass).join('');

			thisPass = [];

			console.log(nowPassword);
			if(!canDoLine){
				DoLine.attr({
					'd': thisL
				});
			}

			if(passWord == nowPassword){
				alert('密码正确');
			}else{
				alert('密码错误');
			}

			canLine = false;

			//鼠标抬起，删除画出的线
			$(that).find('.roundB').remove();
			$(that).find('.roundA').attr({
				'fill': 'transparent',
				'canDo': true,
				'stroke': 'rgba(255,255,255,0.5)'
			});

			DoLine.attr('d', '');
		});

		function removeSameArr(arr){
			var thisArr = [];

			for(var i = 0;i < arr.length; i++){
				if(thisArr.indexOf(arr[i]) == -1)
				thisArr.push(arr[i]);
			}
			return thisArr;
		}

		function markRound(obj){
			var nowRound = obj,
				round = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
					'cx': nowRound.attr('cx'),
					'cy': nowRound.attr('cy'),
					'r': 20,
					'fill': '#fff',
					'class': 'roundB'
				});
			$that.append(round);

			nowRound.attr({
				'stroke': '#fff',
				'fill': 'rgba(0,0,0,0.3)'
			});
		}
	}

	doSvg();
})
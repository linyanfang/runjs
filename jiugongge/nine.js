$(function(){
	
	function doSvg(){
		var $that = $("#nine"),
			that = $that[0],
			number = 9,
			canLine = false,
			thisL = "",
			thisPass = [],//画出的密码
			canDoline = false, //是否在元素上
			passWord = 123698,
			a;

			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					var node = $(document.createElementNS("http://www.w3.org/2000/svg", "circle")).attr({
						//圆心
						'cx': 110*j + 90,
						'cy': 110*i + 90,
						//半径
						'r': 40,
						//线条颜色
						'stroke': 'rgba(255, 255, 255, 0.5)',
						//线条宽度
						'stroke-width': 2,
						//填充的颜色
						'fill': 'transparent',
						'class': 'roundA',
						//可以画圆
						'canDo': true
					});

					$that.append(node);
				}
			}

			//画出线段
			var DoLine = $(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
				'stroke': '#fff',
				'stroke-width': 2,
				'fill': 'transparent',
				//svg路径指令
				'd': ''
			});

			$that.append(DoLine);
			//获取九宫格
			var circle = $that.find('circle');

			//在格子上按下
			circle.mousedown(function(){
			//可以画线
				canLine = true;
				var Mx = $(this).attr("cx"),
					My = $(this).attr("cy");

				//初始化要画路径的原点
				//加空格是因为指令是Mx y
				thisL = 'M' + Mx + ' ' + My;
			});

			//在对象上移动
			$that.mousemove = (function(e){
			//如果鼠标按下
				if(canLine){
					var NowLin = DoLine.attr('d');
					DoLine.attr({
					//获取鼠标按下的点，即路径原点
						'd': thisL + 'L' + e.offsetX + '' + e.offsetY  //鼠标相对于事件源元素
					});
				}
			});

			//如果移动的时候进入了圆格子
			circle.mousemove(function(){
				if(canLine && $(this).attr('canDo') == 'true'){
					var X = $(this).attr("cx"),
					    Y = $(this).attr("cy");
					    thisL = thisL + 'L' + X + '' + Y;
					//加标记
					markRound($(this));
					//改变轨迹
					DoLine.attr({
						'd': thisL
					});
					//记录密码
					thisPass.push($(this).index() + 1);
					//标记不可选
					$(this).attr('canDo', false);

					//标记鼠标在元素上
					//可以画线
					canDoline = true;

				}
			});

			//鼠标已经离开了元素的时候做标记
			circle.mouseout(function() {
				//不可以画线
				canDoline = false;
			});

			//鼠标抬起
			$that.mouseup(function(){
				var nowPassword = removeSameArr(thisPass).join('');//密码

				//清空密码数组
				thisPass = [];

				console.log(nowPassword);
				if(!canDoline){
					DoLine.attr({
						'd': thisL
					});
				}

				//判断密码是否正确
				if(passWord == nowPassword){
					alert('密码正确');
				}else{
					alert('密码错误');
				}

				//标记不可划线
				canLine = false;

				//清除样式
				$(that).find('.roundB').remove();
				$(that).find('.roundA').attr({
					'fill': 'transparent',
					'canDo': true,
					'stroke': 'rgba(255, 255, 255, 0.5)'
				});
				DoLine.attr('d', '');
			});

			//去除相同的元素
			function removeSameArr(arr){
				var thisArr = [];
				for(var i = 0; i < arr.length; i++){
					if(thisArr.indexOf(arr[i]) == -1)
					thisArr.push(arr[i]);
				}
				return thisArr;
			}

			//标记选中的方法
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
					'fill': 'rgba(0, 0, 0, 0.3)'
				});

			}


	}

	doSvg();
})
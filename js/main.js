/*思路，求的移动是每次，清除画布后，赋予球移动后的坐标，然后绘制，就像点阵的动态扫描，只要设置20ms重绘一次，就可以看见球连续移动的效果*/
var ballDemo=function(){
	var colorSelect=["#F04939","#030549","#3599DB","#F66DA5","#F10100","#03B793","#2F2F2F","#FFA600","#1DA9FF","#FB7369",
	"#60E26C","#c40000","#2F2F2F","#FFE874","#2A0735"]
	var balls=[];
	var canvas=document.getElementById("canvas");
	canvas.style.width="100%";
	var height=canvas.height;
	var width=canvas.width;
	var context=canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.fillStyle="#e5e5e5";
	context.fillRect(0,0,1366,480);
	
	
	function Ball(x,y,radius,color,dx,dy){
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.color=color;
		this.dx=dx;
		this.dy=dy
	}


	function drawBall(){

		context.clearRect(0, 0, canvas.width, canvas.height);//清除画布
		context.beginPath();
		context.fillStyle="#fff";
		context.fillRect(0,0,1366,480);
		for(var i=0;i<balls.length;i++){
			var radius=balls[i].radius;
			balls[i].x+=balls[i].dx
			balls[i].y+=balls[i].dy	
					
			if ((balls[i].y) < height) balls[i].dy += 0.22;
			balls[i].dx=balls[i].dx*0.998		
			if(balls[i].y+balls[i].radius>height||balls[i].y-balls[i].radius<0){
				balls[i].dy = -balls[i].dy*0.96;
				//这里决定了反弹到顶部还是每次反弹后的最高高度都比上一次都矮一点
			}
			if(balls[i].x+balls[i].radius>width||balls[i].x-balls[i].radius<0){
				balls[i].dx=-balls[i].dx
			}
			context.beginPath();		
			context.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
			context.fillStyle=balls[i].color;
			context.fill();
			context.closePath();
			context.beginPath();
			context.moveTo(balls[i].x,balls[i].y);
			/*---------两球之间的连线*/
			try{
				context.moveTo(balls[i-1].x,balls[i-1].y)
			}catch(e){				
				context.moveTo(balls[i].x,balls[i].y)
			}
			context.lineTo(balls[i].x,balls[i].y)
			context.lineWidth = 2;
			context.strokeStyle=randomColor();
			context.stroke();//把线喷到画板中*/	
		}
		setTimeout(drawBall,20)
	}

	drawBall();

	return {
		addBall:function(){	
			var radius=rangeRandom(10,50);
			var x=rangeRandom(radius,1366-radius);
			var y=rangeRandom(radius,480-radius);			
			var color=colorSelect[rangeRandom(0,colorSelect.length-1)];
			var ball=new Ball(x,y,radius,color,1,1);
			balls.push(ball);						
		}
	}
}();


/*0-num的随机数*/
	function random(num){
		return Math.floor(Math.random()*(num+1));
	};

	/*start -end的范围随机数 5-11 */
	function rangeRandom(start,end){
		return Math.floor(Math.random()*(end-start+1))+start;
	};

	
	//rgb随机颜色
	function randomRGBColor(){
		var r =rangeRandom(0,255);
		var g =rangeRandom(0,255);
		var b =rangeRandom(0,255);
		return "rgb("+r+","+g+","+b+")";
	}

	// rgb颜色转换为16进制颜色
	function randomColor(){
		//0-255	
		var r = random(255).toString(16);
		var g = random(255).toString(16);
		var b = random(255).toString(16);
		//255的数字转换成十六进制
		if(r.length<2)r = "0"+r;
		if(g.length<2)g = "0"+g;
		if(b.length<2)b = "0"+b;
		return "#"+r+g+b;
	}
	

$(document).ready(function(){
	$("#logo").css({
		bottom: function(){
			return window.innerHeight-200-(window.innerHeight-500)/2;
		},
		right: function(){
			return (window.innerWidth/2-500)/2;
		},
		width: function(){
			return window.innerWidth/2-(window.innerWidth/2-500)/2;
		}
	});
	$("#record").css({
		bottom: function(){
			return (window.innerHeight-500)/2;
		},
		right: function(){
			return (window.innerWidth/2-400)/2;
		}
	});
	numbers();
	$("#mainbox").css({
		top: function(){
			return (window.innerHeight-500)/2;
		},
		left: function(){
			return (window.innerWidth-1000)/2;
		}
	});
	$("#attack").css({
		top: function(){
			return (window.innerHeight-200)/2;
		},
		left: function(){
			return (window.innerWidth-900)/2;
		}
	});
	$("#cover").click(function(){
		$("#colorselect").css("display", "none");
		$("#cover").css("display", "none");
		$("#attack").css("display", "none");
	})
	$(".box").click(function(){
		if ((($(this).attr("class")=='box')&&(flag!=1))||(($(this).attr("class")!='box')&&(flag==1))) {
			boxid=$(this).attr("id").substring(3);
			$("#cover").css("display", "block"); 
			$("#colorselect").css({
				display: 'block',
				left: function(){
					return (window.innerWidth-700)/2;
				},
				bottom: function(){
					return (window.innerHeight-50)/2;
				}
			});	
		} else {
			return false;		
		}
	});
	$(".colorselect").click(function(){
		$("#box"+boxid).attr("class", "box");
		$("#box"+boxid).addClass($(this).attr("id"));
		$("#colorselect").css("display", "none");
		$("#cover").css("display", "none");
		$("#attack").css("display", "none");
		check(boxid);
		storedata();
		numbers();
		if (count==21) {
			flag=1-flag;
			if (flag==1) {
				$("#attack").css("display","block");
				$("#attack").click(function(){
					$("#attack").css("display","none");
				})
			}
		}
		if (count>=25) {
			alert('game over');
		}
	});
	$("#logo").click(function(){
		store.pop();
		presstatus=store[store.length-1];
		for (i=5; i>0; i--) {
			for (j=5; j>=1; j--) {
				classvalue='box';
				if (presstatus[(i-1)*5+j-1]=='r') {
					classvalue+=' red';
				} else if (presstatus[(i-1)*5+j-1]=='b') {
					classvalue+=' blue';
				} else if (presstatus[(i-1)*5+j-1]=='y') {
					classvalue+=' yellow';
				} else if (presstatus[(i-1)*5+j-1]=='g') {
					classvalue+=' green';
				} else if (presstatus[(i-1)*5+j-1]=='p') {
					classvalue+=' purple';
				}
				$("#box"+((i-1)*5+j)).attr("class", classvalue);	
			}
		}
		numbers();
		if (count==21) {
			flag=1;
		}
	});
});
function numbers(){
	var num={"red": 0,"yellow": 0,"blue": 0,"green": 0,"purple": 0,"none": 0,};
	for (i=1; i<=25; i++) {
		if ($("#box"+i).attr("class")=="box") {
			num['none']++;
		} else {
			num[$("#box"+i).attr("class").substring(4)]++;
		}
	}
	count=25-num['none'];
	$("#color-none").html(num['none']);
	$("#color-red").html(num['red']);
	$("#color-yellow").html(num['yellow']);
	$("#color-blue").html(num['blue']);
	$("#color-green").html(num['green']);
	$("#color-purple").html(num['purple']);
}
function storedata(){
	txt='';
	for (i=1; i<=25; i++) {
		tmp=$("#box"+i).attr("class");
		if (tmp=='box') {
			txt+='0';
		} else {
			txt+=tmp.substring(4, 5);
		}
	}
	store.push(txt);
}
function check(pos) {
	currentcolor=$("#box"+pos).attr("class").substring(4);
	currentpos=pos;
	re='';
	re+=check_up(currentpos, currentcolor);
	re+=check_down(currentpos, currentcolor);
	re+=check_left(currentpos, currentcolor);
	re+=check_right(currentpos, currentcolor);
	re+=check_leftup(currentpos, currentcolor);
	re+=check_leftdown(currentpos, currentcolor);
	re+=check_rigthup(currentpos, currentcolor);
	re+=check_rightdown(currentpos, currentcolor);
}
function check_up(pos, color){
	if (((pos>=1)&&(pos<=5))||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-5;
	limit=(pos-1)%5-(-1);
	while ((find>=limit)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=5;
	}
	if ((find>=limit)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=5)) {
		for (i=pos-5; i>find; i-=5) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_down(pos, color){
	if (((pos>=21)&&(pos<=25))||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-(-5);
	limit=(pos-1)%5-(-1)-(-20);
	while ((find<=limit)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=(-5);
	}
	if ((find<=limit)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=-5)) {
		for (i=pos-(-5); i<find; i-=(-5)) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_left(pos, color){
	if ((pos%5==1)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-1;
	limit=pos-(pos-1)%5;
	while ((find>=limit)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=1;
	}
	if ((find>=limit)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=1)) {
		for (i=pos-1; i>find; i--) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_right(pos, color){
	if ((pos%5==0)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-(-1);
	limit=pos-(pos-1)%5+4;
	while ((find<=limit)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=(-1);
	}
	if ((find<=limit)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=(-1))) {
		for (i=pos-(-1); i<find; i++) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_leftup(pos, color){
	if ((pos%5==1)||(pos<=5)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-6;
	while ((find>5)&&(find%5!=1)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=6;
	}
	if ((find>0)&&(find<=25)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=6)) {
		for (i=pos-6; i>find; i-=6) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_leftdown(pos, color){
	if ((pos>=21)||(pos%5==1)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-(-4);
	while ((find<21)&&(find%5!=1)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=(-4);
	}
	if ((find>0)&&(find<=25)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=-4)) {
		for (i=pos-(-4); i<find; i-=(-4)) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_rigthup(pos, color){
	if ((pos%5==0)||(pos<=5)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-4;
	while ((find>5)&&(find%5!=0)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=4;
	}
	if ((find>0)&&(find<=25)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=4)) {
		for (i=pos-4; i>find; i-=4) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
function check_rightdown(pos, color){
	if ((pos%5==0)||(pos>=21)||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-(-6);
	while ((find<21)&&(find%5!=0)&&($("#box"+find).attr("class")!='box')&&($("#box"+find).attr("class").substring(4)!=color)) {
		find-=(-6);
	}
	if ((find>0)&&(find<=25)&&($("#box"+find).attr("class").substring(4)==color)&&(pos-find!=(-6))) {
		for (i=pos-(-6); i<find; i-=(-6)) {
			$("#box"+i).attr("class", "box");
			$("#box"+i).addClass(color);
		}
		return 1;
	} else {
		return 0;
	}
}
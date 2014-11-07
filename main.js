$(document).ready(function(){
	$("#cover").click(function(){
		$("#colorselect").css("display", "none");
		$("#cover").css("display", "none");
	})
	$(".box").click(function(){
		if (($(this).attr("class")!='box')&&(count<20)) {
			return false;
		} else {
			boxid=$(this).attr("id").substring(3);
			$("#cover").css("display", "block")
			$("#colorselect").css({
				display: 'block',
				left: $(this).offset().left-200,
				top: $(this).offset().top
			});
		}
	})
	$(".colorselect").click(function(){
		$("#box"+boxid).attr("class", "box");
		$("#box"+boxid).addClass($(this).attr("id"));
		$("#colorselect").css("display", "none");
		$("#cover").css("display", "none");
		check(boxid);
		storedata();
		count++;
		if (count>=25) {
			alert('game over');
		}
	});
	$("#back").click(function(){
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
		count--;
	});
});
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
	re=''
	re+=check_up(currentpos, currentcolor);
	re+=check_down(currentpos, currentcolor);
	re+=check_left(currentpos, currentcolor);
	re+=check_right(currentpos, currentcolor);
	re+=check_leftup(currentpos, currentcolor);
	re+=check_leftdown(currentpos, currentcolor);
	re+=check_rigthup(currentpos, currentcolor);
	re+=check_rightdown(currentpos, currentcolor);
	alert(re);
}
function check_up(pos, color){
	if (((pos>=1)&&(pos<=5))||$("#box"+pos).attr("class").substring(4)!=color) {
		return 0;
	}
	find=pos-5;
	limit=pos%5;
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
	limit=pos%5-(-20);
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
var fs=require("fs");
//var lstfile=process.argv[2]||"jiangkangyur.lst"
var glob=require("glob");
var bom=String.fromCharCode(0xfeff);
//var lst=fs.readFileSync(lstfile,"utf8").replace(bom,'').split(/\r?\n/);
var lastdepth=0;
var lines;
var sutraId=/<sutra id="(J\d+[a-z]?)".>/g;
var pat2=/<head.*?\/>/g;
var sutra_arr=[];
var head_arr=[];

var _fn="";
var doHead=function(m){
//	console.log(m);
	var stitle="no st", zh="no zh";
	var depth=parseInt( m.match(/n="(\d+)"/)[1] );
	var title=m.match(/[^s]t="(.*?)"/)[1];
	if (depth-lastdepth>1) console.log("error depth, file",_fn,":");// was "error depth, file",_fn,":",i+1
	lastdepth=depth;
	//while (--depth) space+="  ";
	if ( m.match(/st=/) ) stitle=m.match(/st="(.*?)"/)[1];
	if ( m.match(/zh=/) ) zh=m.match(/zh[_pb]*="(\d+\.\d+)"/)[1];
	head_arr.push(/*m+"\n"+*/"head:"+depth+" t: "+title+" st: "+stitle+" zh: "+zh+" "+_fn+" ("+(lines+1)+")"); 
//	console.log("head:"+depth, "t:", title, "st:", stitle, "zh:", zh, _fn, "(",lines+1,")"); 
}

var doSutraId=function(m,m1){
	sutra_arr.push("sutra id: "+m1);
//	console.log("sutra id:",m1);
}

var doConsole=function(){
	var k=0;
	var sutra_con,head_con;
	if(sutra_arr.length>head_arr.length){
		k=sutra_arr.length;
	}else{
		k=head_arr.length;
	}
	for(var j=0;j<k;j++){
		sutra_con=sutra_arr[j]||"";
		head_con=head_arr[j]||"";
		if(sutra_con!="") console.log(sutra_con);
		if(head_con!="") console.log(head_con);
	}
	sutra_arr=[];
	head_arr=[];
}

var parseFile=function(fn) {
	_fn=fn;
	var arr=fs.readFileSync(fn,"utf8").split(/\r?\n/);		
	for (var i=0;i<arr.length;i++) {
		//if (arr[i].indexOf("<head")==-1) continue;
		//console.log(arr[i]);
		lines=i;
		arr[i].replace(sutraId,doSutraId);
		arr[i].replace(pat2,doHead);
		doConsole();

	}
}
//lst.map(parseFile);
glob("./**/*.xml",function(err,files){
	files.map(parseFile);
});
var fs=require("fs");
//var lstfile=process.argv[2]||"jiangkangyur.lst"
var glob=require("glob");
var bom=String.fromCharCode(0xfeff);
//var lst=fs.readFileSync(lstfile,"utf8").replace(bom,'').split(/\r?\n/);
var lastdepth=0;
var lines;
var sutraId=/<sutra id="(J\d+[ab]?)".>/g;
var pat2=/<head.*?\/>/g;

var _fn="";
var doHead=function(m){
//	console.log(_fn,lines+1,m);
	var stitle="no st", zh="no zh";
//	var depth=parseInt( m.match(/n="(\d+)"/)[1] );
//	console.log(m.match(/n="(\d+)"/)[1],m);
	if(m.match(/zh[_pb]*=/) && m.match(/zh[_pb]*="(\d+\.\d+)"/)==null) console.log(_fn,lines+1,m,"zh err");
	if(m.match(/n=/) && m.match(/n="(\d+)"/)==null) console.log(_fn,lines+1,m,"n err");
//	var title=m.match(/[^s]t="(.*?)"/)[1];
	if(m.match(/[^s]t=/) && m.match(/[^s]t="(.*?)"/)==null) console.log(_fn,lines+1,m,"t err");
/*	if (depth-lastdepth>1) console.log("error depth, file",_fn,":");// was "error depth, file",_fn,":",i+1
	lastdepth=depth;
	//while (--depth) space+="  ";
	if ( m.match(/st=/) ) stitle=m.match(/st="(.*?)"/)[1];
	if ( m.match(/zh=/) ) zh=m.match(/zh[_pb]*="(\d+\.\d+)"/)[1];

	console.log("head:"+depth, "t:", title, "st:", stitle, "zh:", zh, _fn, "("+lines+")");  */
}

var doSutraId=function(m,m1){
//	console.log("sutra id:",m1);
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

	}
}
//lst.map(parseFile);
glob("./**/*.xml",function(err,files){
	files.map(parseFile);
});
var fs=require("fs");
var list=fs.readFileSync("jiangkangyur_list.txt","utf8").split(/\r?\n/);
var line;
var filename;
//var mulu=require("./mulu.json");
//console.log(mulu);

var checksutraid=function(m){
	if(m.match(/sutra id=/) && m.match(/<sutra id="J\d+[a-z]*"/)==null) console.log(filename,line+1,m);
}

var readfile=function(fn){
	if(fn=="") return;
	var arr=fs.readFileSync("./"+fn,"utf8").split(/\r?\n/);
	for(var i=0;i<arr.length;i++){
		filename=fn;
		line=i;
		checksutraid(arr[i]);
	}
}

list.map(readfile);
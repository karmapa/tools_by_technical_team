/*
  syntax

  node checkpb   [lst]
  if lst is not specified , jiangkangyur.lst is used
*/
var regex=/<pb id="(.*?)"/g;

var lst=process.argv[2]||'jiangkangyur.lst';
var fs=require('fs');

var nextpage=function(pb) {
	var volpb=pb.split("."), pg="",vol="";
	if (volpb.length>1)	{
		vol=volpb[0]+".";
		pg=volpb[1];
	}
	else pg=volpb[0];

	if (pg.substring(pg.length-1)=="a") pg=pg.substring(0,pg.length-1)+"b";
	else pg=(parseInt(pg)+1)+"a";
	return vol+pg;
}

processfile=function(fn) {
	var arr=fs.readFileSync(fn.trim(),'utf8').replace(/\r\n/g,'\n').split("\n");
	var lastid="";
	for (var i=0;i<arr.length;i++) {
		arr[i].replace( regex,function(m,m1){
			if (!lastid) {
				lastid=m1;
				return;
			}
			if (nextpage(lastid)!=m1) console.log('error',m1,fn,"line",i+1);
			lastid=m1;
		})

	}
	
}
var list=fs.readFileSync(lst,'utf8').replace(/\r\n/g,'\n').split('\n');
for (var i in list) {
	processfile(list[i]);
}

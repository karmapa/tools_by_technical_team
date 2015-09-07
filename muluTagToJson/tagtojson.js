var fs=require("fs");
var muluArray=fs.readFileSync("./mulu.html","utf8").replace(/<sutraid/g,"~<sutraid").split("~");
var out=[];

var sutraIdKey=function(arr){
	for(i=1;i<arr.length;i++){
		var objL={};
		var objS={};
		var id=arr[i].match(/"(J\d+.*?)"/)[1];
		var tValue="";
		var sValue="";
		if(arr[i].match(/<tname>[\t\s]*([\u0f00-\u0fff\(\) ]+( །)*)[\t\s]*<\/tname>/)) tValue=arr[i].match(/<tname>[\t\s]*([\u0f00-\u0fff\(\) ]+( །)*)[\t\s]*<\/tname>/)[1];
		if(arr[i].match(/<sname>[\t\s]*([\u0f00-\u0fff\(\) ]+( །)*)[\t\s]*<\/sname>/)) sValue=arr[i].match(/<sname>[\t\s]*([\u0f00-\u0fff\(\) ]+( །)*)[\t\s]*<\/sname>/)[1];
		objS["tname"]=tValue;
		objS["sname"]=sValue;
		objL[id]=objS;
		out.push(objL);
	}
}

sutraIdKey(muluArray);
fs.writeFileSync("./mulu.json",JSON.stringify(out,""," "),"utf8");
//[{id:{tValue:"",sValue:""}},{id:{tValue:"",sValue:""}}]
//""
//J485
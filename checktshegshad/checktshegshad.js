var fs=require("fs");
var mkdirp=require("mkdirp");
var getDirName=require("path").dirname;
var folderLst=fs.readdirSync("./data");

var toLines=function(text){
	var pages=text.replace(/<pb id="(\d+\.\d+[a-z])"\/>/g,"~~$1").split("~~");
	return pages.map(function(page){
		return page.split(/\r?\n/);
	});
}

var writeFile=function(path, contents, cb) {
    mkdirp(getDirName(path), function (err) {
  	    if (err) return cb(err);
        fs.writeFileSync(path,contents,"utf8");
    });
} 

//var out=[];
var outshad=[];	
var readFiles=function(folder){	
	var fileLst=fs.readdirSync("./data/"+folder);
	var out=[];
	for(var j=0;j<fileLst.length;j++){
		out.push(fileLst[j]);
		outshad.push(fileLst[j]);
		//var out=[];					
		var text=fs.readFileSync("./data/"+folder+"/"+fileLst[j],"utf8");//string
		var linesArrs=toLines(text);//[[page1 line1,page1 line2],[page2 line1,page2 line2]]
		linesArrs.map(function(page){			
			for(var i=1;i<page.length;i++){//skip <pb id=....>
				if(page[i].match(/[\u0f0b\u0f0c] +$/)) out.push([page[0],i,"line end tsheg space"]);//
				if(page[i].match(/.\S།$/)) outshad.push([page[0],i,"line end shad without space"]);//
				if(page[i].match(/། +། +$/)) out.push([page[0],i,"shad space shad space"]);//
				if(page[i].match(/^[\u0f0b\u0f0c།]/)) out.push([page[0],i,"thseg or shad at beginning"]);//			
				if(page[i-1].match(/། *།$/)&&page[i].match(/^[༄༅]/)) out.push([page[0],i-1,"line end ། །(or།།) and ༄༅ at next line"]);//
				if(page[i].match(/[\u0f00-\u0fff]།།[\u0f00-\u0fff]/g)) out.push([page[0],i,"sentence།།sentence or །།།"]);//
				if(page[i].match(/[\u0f00-\u0f0c\u0f0e-\u0fff]།[\u0f00-\u0f0c\u0f0e-\u0fff]/g)) out.push([page[0],i,"sentence།sentence"]);//
				page[i]=page[i].replace(/ +$/g,"");
				if(page[i].match(/^.(?!.*[\u0f0b\u0f0c།\u4e00-\u9fff\u3400-\u4dff\uf900-\ufaff>]$)/)) out.push([page[0],i,"line end no tsheg or shad"]);//
				if(page[i].match(/ང།$/)) out.push([page[0],i,"ང།"]);//
				if(page[i].match(/ང\u0f0c$/)) out.push([page[0],i,"line end ང༌(u0f0c)"]);//
				if(page[i].match(/ངོ།$/)) out.push([page[0],i,"ངོ།"]);//
				if(page[i].match(/ངོ\u0f0c$/)) out.push([page[0],i,"line end ངོ༌(u0f0c)"]);
				if(page[i].match(/དང\u0f0b$/)) out.push([page[0],i,"line end དང་(u0f0b)"]);//
				if(page[i].match(/།[\u0f0b\u0f0c]$/)) out.push([page[0],i,"line end །་"]);//
				if(page[i].match(/[^ང][\u0f0b\u0f0c]།$/)&&page[i].match(/[^ངོ][\u0f0b\u0f0c]།$/)) out.push([page[0],i,"line end ex. ཀ་།"]);//
			}	
		});
	//writeFile("./result/"+folder+"/check_"+fileLst[j],out.join("\n"));		
	}
	fs.writeFileSync("./result/"+folder+".xml",out.join("\n"));	
}
var start=new Date();
folderLst.map(readFiles);
//fs.writeFileSync("./totalresults.xml",out.join("\n"),"utf8");
fs.writeFileSync("./endshadnospace.xml",outshad.join("\n"));	
console.log(new Date()-start);
//&arrline[i].match(/^.(?!.+[་།]<.+?>$)/)
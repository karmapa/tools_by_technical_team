var input = "./input/*/*.xml";   //輸入的檔案位置

//--------------分隔線------------------
var fs = require("fs");
var glob = require("glob");
var _fn, line, preHeadNum = 0, preSutraId = "0", prefn, preline;
var sutraId = /<sutra id="J(\d+[a-z]?)"\/>/g; 
var headN = /<head n="(\d+)"/g;  
var sutraTag = /<sutra id=.*?\/>/;
var headTag = /<head.*?\/>/; 

var docheck = function(arr) {
	arr.replace(sutraTag, function(m) {    //check sutra with wrong tag
		if(m.match(sutraId) == null) console.log("sutra tag wrong:", _fn+"("+line+")");
	});

	arr.replace(sutraId, function(m, m1) {   //check sutra id sorting
		var multipleOfTen = false;
		m1 = m1.toString();
		if(m1 / 1 > preSutraId / 1) {
			multipleOfTen = true;
		}else if(m1 < preSutraId && multipleOfTen == false) {
			console.log("sutra sort wrong:", _fn+"("+line+")", "J"+m1+" is worng with "+prefn+"("+preline+")", "J"+preSutraId);
		}
		preSutraId = m1;
		prefn = _fn;
		preline = line;
		multipleOfTen = false;
	});

//	arr.replace(headTag, function(m) {   //check if head with wrong tag
//		if(m.match(headN) == null) console.log("head:", _fn, line);
//	});

	arr.replace(headN, function(m, m1) {   //check head toc
		if(m1 - preHeadNum > 1){
			console.log("head n wrong:", _fn+"("+line+")", m1);
		}
		preHeadNum = m1;
//		console.log("head:", _fn, line, m1);
	});
}

var parseFile = function(fn) {
	_fn = fn;
	var arr = fs.readFileSync(fn, "utf8").split(/\r?\n/);
	for(var i = 0; i < arr.length; i++) {
		line = i+1;
		docheck(arr[i]);
	}
}

glob(input, function(err, files) {
	files.map(parseFile);
});

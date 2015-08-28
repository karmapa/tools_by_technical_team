# checktshegshad檢查原文

步驟:

1.將資料夾放進/checktshegshad/data的路徑目錄中。

2.開啟Command Prompt於/checktshegshad路徑中執行node checktshegshad.js。

3.返回"checktshegshad"資料夾即可看到"result"資料夾，打開後就可看見所有錯誤的頁數、行數和錯誤原因。

4.以"example.xml"檔案為例，一開始我們在"data"資料夾中放入"example"資料夾，裡面有"example.xml"檔案。

  於命令列/checktshegshad路徑中執行node checktshegshad.js後，
  
  會產生"result"資料夾，進入裡面的"example資料夾後，會看見"ckeck_example.xml"檔案，
  
  輸出的檔案格式依序為<pb id>，第幾行，疑似錯誤的描述：
  

說明:

1.21b,2,line end shad without space 

表示在 "example.xml" 檔案 <pb id=1.21b/>，第2行 的結尾是 "shad 後面沒有空白鍵"
  
1.152a,5,line end no tsheg or shad 

表示在 "example.xml" 檔案 <pb id=1.152a/>，第5行 的結尾是 "沒有 tsheg 也沒有 shad"
  
疑似錯誤的描述種類有：

"line end tsheg space" // 該行最後的 tsheg 後面有空白鍵

"line end shad without space" // 該行最後的 shad 後面沒有空白鍵

"tsheg or shad at beginning" // 該行最前面有 tsheg 或 shad

"line end ། །(or།།) and ༄༅ at next line" // 該行最後有 ། ། 或 །།，下一行前面有雲頭符

"sentence།།sentence or །།།" // 句子裡面出現沒有空格的 །། 或出現 །།།

"sentence།sentence" // 句子裡面出現沒有空格的 །

"line end no tsheg or shad" // 該行最後沒有 tsheg 或 shad

"ང།" // 該行最後的 ང 直接接 shad

"line end ང༌(u0f0c)" // 該行最後的 ང 只有加 tsheg，沒有 shad

"ངོ།" // 該行最後的 ངོ 直接接 shad

"line end ངོ༌(u0f0c)" // 該行最後的 ངོ 只有加 tsheg，沒有 shad

"line end དང་(u0f0b)" // 該行最後的 དང 只有加 tsheg，沒有 shad

"line end །་" // 該行最後是 །་ shad 在 tsheg 前面

"line end ex. ཀ་།" // 不是 ང 或 ངོ 的字，後面接 ་། tsheg 和 shad

如果結果出現以下情形，表示原檔案9.254b的pb id的tag後面沒有換行，
需要在原檔案的9.254b的pb id的tag後面加上換行，再執行一次程式

9.254b   གཞན་ནི་སྔ་མ་བཞིན་ནོ། །ལྟུང་བྱེད་བདུན་པའི་དྲུག་པ་རྫོགས་
སྷོ།།                <head n="3" t="ལྟུང་བྱེད་བདུན་པའི་བདུན་པ་འཆད་པ།" type="ltungbyed" lv="5.4.74
" zh_pb="9.625"/>གླེང་གཞི་ནི་མཉན་ཡོད་ནའོ། །དེའི་ཚེ་དགེ་སློང་མ་རྣམས་ལ་འདི་ལྟ་བུའི་གདིང་བ་མང་པོ་བྱུང་སྟེ།
གདིང་བ་འདི་ནི་ཧ་ཅང་རིང་ཆེས་སོ་ཞེས་དེ་བོར་ནས་གཞན་བྱེད་དུ་


# check_sutra-head

### 執行程式
開啟程式所在的命令列

1. 輸入 npm i glob

2. node check_sutra-head.js (若需輸出成檔案，後面多加 >"檔案名稱" )

### 變更檔案位置
打開check_sutra-head.js

變更第一行:
```javascript
var input = "./input/*/*.xml";   //輸入的檔案位置
```

### 各種狀況

##### 1. sutra tag wrong: ./input/005/lj0002_001.xml(6) 

在input/005/lj0002_001.xml檔案中的第6行sutra tag有誤

##### 2. sutra sort wrong : ./input/005/lj0003_001.xml(5) J3 is worng with ./input/005/lj0002_001.xml(6) J99999 

input/005/lj0003_001.xml第5行 id = J3 和前一個/input/005/lj0002_001.xml第6行 id = J99999不連續

##### 3. head n wrong : ./input/001/lj0001_012.xml(7) 5

input/001/lj0001_012.xml第7行 head n="5" 和前一個head n有邏輯上的錯誤

**接口文档**

**HTTP**

**返回数据统一格式（JSON）**

{
"msg": "",//返回消息
"result": {//主体数据
"xxx": {
"xxx": "0x4b3892...",
"xxx": "0x6e63e",
...
}
},
"ret": 0//返回码
}

备注：ret为0表示成功，其他失败
各个具体数据放在result里

**WEBSOCKET**

连接：ws://45.78.32.186:8081/ws?token=Yigo0LD9I7

**返回数据统一格式（JSON）**

{
"retType": "",//返回消息类型
"result": { //主体数据
"xxx": {
"xxx": "0x4b3892...",
"xxx": "0x6e63e",
...
}
}
}

各个具体数据放在result里，每种数据指定一种retType


**根据hash或number获取block**

/api/vns/block/info?hash=XXXXX GET

/api/vns/block/info?number=XXXXX GET

返回

"block": {
"number": "...",
"timestamp": "...",
"txnCount": "...",
"ctxnCount": "...",
"miner": "...",
"blockReward":"...",
"unclesReward":"...",
"difficulty": "...",
"totalDifficulty": "...",
"size": "...",
"gasUsed": "...",
"gasLimit": "...",
"extraData": "...",
"hash": "...",
"parentHash": "...",
"sha3Uncles": "...",
"nonce": "..."
}

**分页获取block**

/api/vns/block/list POST

请求：

{
"page": "...",
"limit": "...",
}

返回

"blocks":[{
"number": "...",
"timestamp": "...",
"txn": "...",//transaction数量
"uncles": "...",//uncles数量
"miner": "...",
"gasUsed": "...",
"gasLimit": "...",
"avgGasPrice": "...",
"reward": "..."
}],
"total":”453”,
"size":"10"

**根据hash获取transaction**

/api/vns/txn/info?hash=xxxxxx GET

返回

"txn": {
"hash": "0x4b38903066ec24322e422...",
"status": "...",
"blockNumber": "...",
"timestamp": "...",
"from": "...",
"to": "...",
"value": "...",
"txnFee": "...",
"gasLimit": "...",
"gasUsed": "...",
"gasPrice": "...",
"nonce": "...",
"position":"...",
"inputData":"...",
"logs": [{
<del>"blockHash":"...",</del>
"address":"...",
"logIndex":"...",
"data":"...",
"removed":false,
"confirms":"...",
"topics":["...","...","..."],
<del>"blockNumber":"...",</del>
<del>"tnxIndex":"...",</del>
<del>"tnxHash":"..."</del>
}]
}

**分页获取transaction**

/api/vns/txn/list POST

请求

{
"page": "...",
"limit": "...",
"bh": "...",
"address": "...",
"status": "...",
"io": "...",
}

可选参数：bh:block hash，address=xxx，status:状态（comp，pend，fail），direction：方向（out，in）

返回

"txns":[{
"hash": "0x4b38903066ec24322e422...",
"blockNumber": "...",
"timestamp": "...",
"from": "...",
"to": "...",
"value": "...",
"txnFee": "...",
"status": "..."
}],
"total": "453",
"size":"10"

**根据地址获取信息**

/api/vns/account/info?address=xxxxxx GET

返回

"address": {
"balance": "2345432",
"txnCount": "...",
"minedBlocks":"...",
"minedUncles":"..."
}

**搜索联想词**

/api/vns/search POST

返回

"related":[{
"type":"block",
"value":"..."
},{
"type":"txn",
"value":"..."
}]

**首页概要信息**

/api/vns/stat/summary GET

返回

"price":"xxx",
"exchangeRate":"xxx",
"upDown":"xxx",
"latestBlock":"xxx",
"avgBlockTime":"xxx",
"ttc":"xxx", // total transaction counter
"tps":"xxx", //transaction per second
"marketCap":"xxx",
"difficulty":"xxx",
"avgHashRate":"xxx"



**查询最近14天transaction数量**

/api/vns/stat/txnDailyRecent GET

返回

"txnDaily":[{
"day":"YYYY-MM-DD",
"amount":"xxx",
"price":"xxx"
},{"day":"YYYY-MM-DD",
"amount":"xxx",
"price":"xxx"
}]

**最新block数据**

/api/vns/block/rt GET

"blocks": [
  {
"miner": "1",
"number": "322",
"reward": "1",
"t": "2",
"txnCount": "4",
"interval":"..."
}
],


**最新transaction数据**

/api/vns/txn/rt GET

"txns": [
  {
"blockNumber": "1",
"from": "1",
"hash": "1",
"t": "1",
"to": "1",
"value": "1"
}],

**实时block数据**

Websocket:

retType:LATEST_BLOCK

返回

"block":{
"number":"...",
"miner":"...",
"txns":[{
"hash":"...",
"from":"...",
"to":"...",
"value":"..."
}],
"reward":"...",
"t":"...",
"interval":"",
}

**实时transaction计数**

Websocket:

retType:TOTAL_TXN_COUNTER

返回

"ttc":"45342"

合约列表
api/vns/contract/list

请求
{
"page":1,
"limit":10
}
返回
{
	"msg":"",
	"result":{
		"total":"343",
		"size":"35",
		"contracts":[
			{
				"contract":"0xda632816bb94ef490cf9cd4f4774110f6b369fb8",
				"holders":"4",
				"name":"Wing Chun Coin",
				"symbol":"WCC"
			},
			{
				"contract":"0x4b28ceec563f71a8f0e2d6098e53a1dbc29725da",
				"holders":"3",
				"name":"KangPai Coin",
				"symbol":"KPC"
			},
			{
				"contract":"0xe19d50cca872eb787221d9e2410876455a4a6782",
				"holders":"85",
				"name":"Pic Coin",
				"symbol":"PIC"
			},
			{
				"contract":"0xd17a34fe54ba8e1f37b618816f8a59ab14698c0e",
				"holders":"13",
				"name":"Internet of Things",
				"symbol":"IOE"
			},
			{
				"contract":"0xa31749503347470070f33d7260b119bba528258e",
				"holders":"24",
				"name":"Leek Coin",
				"symbol":"LEEC"
			},
			{
				"contract":"0x4b5427d29c739b5c16a7ffd2593e3eaad0d98134",
				"holders":"3",
				"name":"Simin Coin",
				"symbol":"SMC"
			},
			{
				"contract":"0x64867a4baa5f05c6018bbad4ef36b6a7be6ad301",
				"holders":"132",
				"name":"MaoYu Token",
				"symbol":"MAO"
			},
			{
				"contract":"0xeb71ea57868882bbf354631ea6cb254906ecb936",
				"holders":"3",
				"name":"Bithx",
				"symbol":"BHX"
			},
			{
				"contract":"0xf5b74923257bb6d81f98c3f79b57a908ee5e83bd",
				"holders":"9",
				"name":"Money Token",
				"symbol":"MYT"
			},
			{
				"contract":"0x53b01a340e92f980c19549796ba6f3cc4e6452f0",
				"holders":"60",
				"name":"LittlePigLittleSheep",
				"symbol":"LPLSH"
			}
		]
	},
	"ret":0
}

合约交易列表
api/vns/contract/transfersList/
请求
{
"page":1,
"limit":10,
"contract":"0xfec5bdda5080ff0de1e0f8c36788494e318b6fac"
}

返回
{
	"msg":"",
	"result":{
		"total":"13",
		"size":"2",
		"transfers":[
			{
				"from":"0xa6e8797988ae2b5b75f1f6a131ec9d32c7287213",
				"hash":"0x7f6c03c90933aefa9671dd529d2cca21a457687660801ec7497086aa119c0f20",
				"quantity":"256",
				"t":"1528675200",
				"to":"0x600103c434862f253396e5c53aefea968907fe26"
			},
			{
				"from":"0xa6e8797988ae2b5b75f1f6a131ec9d32c7287213",
				"hash":"0x917f6a18c244f69e0c0705fd5ac9f5adffaa4843519653a00e0e5efb9ce3935d",
				"quantity":"256",
				"t":"1528675200",
				"to":"0x600103c434862f253396e5c53aefea968907fe26"
			},
			{
				"from":"0xa6e8797988ae2b5b75f1f6a131ec9d32c7287213",
				"hash":"0x5a0259742ed1c0153da800528ad7df68df8e90d18dba83872bc0df0a2e99a67e",
				"quantity":"256",
				"t":"1528675200",
				"to":"0x7e44767c7918890abaf407798af7386307e2f142"
			}
		]
	},
	"ret":0
}

合约详情
/api/vns/contract/info

请求 （header:Content-Type:application/x-www-form-urlencoded）

contract=0xfec5bdda5080ff0de1e0f8c36788494e318b6fac

返回
{
	"msg":"",
	"result":{
		"info":{
			"contract":"0xfec5bdda5080ff0de1e0f8c36788494e318b6fac",
			"decimal":"160",
			"holders":"2",
			"total":"25102610202312622605588995322746410914558057500680894594430859919177388195881",
			"transfers":"1"
		}
	},
	"ret":0
}

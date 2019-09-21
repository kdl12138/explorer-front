# 浏览器部署日志

## 部署流程

1. 使用docker部署block_scan (注： dockerfile里面缺失glog依赖，需要添加)
1. `mvn compile && mvn install ` 构建explore-server
2. `npm run build` 构建explore-front 并使用nginx作为服务器
3. 安装以下工具链
| 名称 | 版本 | 注意事项 | 命令行|
|-----|------|---------|------|
| kafka | 2.11-2.2.0 | 需在hbase启动之后启动 | `$KAFKA_PATH/bin/kafka-server-start.sh  $KAFKA_PATH/config/server.properties`(持续输出) |
| hbase | 1.2.0 | 无依赖，直接启动 | `$HBASE_PATH/bin/start-hbase.sh` (调用启动脚本后即退出) |
| phoenix| 4.14.1-HBase-1.2-bin | 依赖hbase，但不影响正常启动 |  `python2 $PHOENIX_PATH/bin/queryserver.py` (持续输出) |
| spark | 2.0.0-bin-hadoop2.7 | spark执行的任务依赖于以上所有组建， 建议最后运行 | 具体见spark任务一节|
4. 启动流程 `gvns ==> hbase ==> phoenix ==> kafka ==> block_scan ==> spark` 和 `gvns==> browser-app`  ， 两个流程相互独立。

### gvns 与 browser-app

- gvns: `/path/to/gvns --rpc --rpcaddress 0.0.0.0`
- browser-app: `java -jar $EXPLORE_SERVER_PATH/browser-app/target/$BROWSER_APP_JAR`

###spark任务

<b>注意所有任务都必须要在前面所有服务都启动后执行，如果需要修改之前的任何服务，需要关闭spark任务和block_scan服务，避免丢失记录</b>

| 类名 | 对应任务 |
|-----| -------|
| `com.xyz.browser.dm.jobs.RawStreaming` | 消费block_scan生产的块信息和交易信息，并通过websocket传递到browser-app的websocket接口并插入到数据库中 |
|`com.xyz.browser.dm.jobs.Ranking` | 对用户进行排名， 考虑效率原因，每一个小时通过crontab进行一次排名 |
|`com.xyz.browser.dm.jobs.AddressTranctionV` | 获取address对应的volume信息 |
| 其他任务 | 暂时没有使用，有待补充 |

命令格式
```
$SPARK_PATH/bin/spark-submit --class $JOB_CLASSPATH \
			   --master local[4] \
			   --executor-memory 4G \
               --conf spark.sql.warehouse.dir=/tmp/ \
              /path/to/browser-dm.jar

```
`$JOBCLASSPATH` 对应的是上表中的类名

### 使用sytemd进行管理

通过systemd来管理各个服务之间的依赖关系，并避免产生大量日志。 同时实现开机自启（没有检验），简化服务重启的流程和复杂度


## 修复的问题

1. `AddressTransactionV`任务中的代码无法正常运行，由于readme中提供的表结构与实际操作的表结构的类型不符合，在本例中，通过使用`BigDecimal`类的toString方法转换成String类型并插入到表中
2. `/api/vns/account/info`接口无法正常获取用户信息，主要原因是调用的RtTxnServiceImpl的接口调用的获取接口端口与gvns的rpc默认端口不相符，代码中为`localhost:8555`实际应当为`localhost:8585`，且查询json的格式陈旧，与现有的gvns的接口格式不相符。获取到的数据需要除以`1e18`，为了避免数据过大或者过小导致使用科学技术法表示数字，使用DataFormat格式化数据为%10.6的格式

## 优化

1. 由于innoDb只能使用一个索引进行查询，导致使用`or`查询两个已索引的列时，会进行一次全表查询，导致查询速率过慢。优化方式，改为`(select count(1) from t_rt_txn where from = ?) union all (select count(1) from t_rt_txn where to = ?)`可以充分利用索引进行查询

## 遇到的问题

1. 对于有大量记录的用户查询依然很慢，需要进行进一步的优化
2. hash rate 的计算方式有一定的问题，需要修改。
3. 容器中运行mysql可能存在效率问题，需要获取本地数据库的操作权限

## 可能的解决方法
1. 针对性的优化查询语句，提高查询效率
2. 修改代码逻辑
3. 使用本地数据库代替容器中的数据库
4. ~~增配(误）~~

## 需要的支持
1. 提供本地数据库密码
2. 给予提交代码的权限

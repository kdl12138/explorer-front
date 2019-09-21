<template>
    <section id="uncles" class="w1200">
        <h3>{{$t('global.uncles')}}</h3>
        <div class="box">
            <div class="table_desc">
                <p>{{$t('global.uncles')}} #{{blocks[blocks.length - 1] && blocks[blocks.length - 1].number}} {{$t("global.to")}} #{{blocks[0] && blocks[0].number}} ({{$t('desc.totalBlock', {total: total})}})</p>
                <page :total='size' :index='curIndex' url='/blocks' class="mobile"></page>
            </div>
            <div class="wrap">
                <div class="loading" v-if="blocks.length===0 && !noRecord">
                    <img src="~@/assets/img/loading.gif">
                </div>
                <div class="noRecord" v-else-if="noRecord">
                    <p>{{$t('global.noData')}}</p>
                </div>
                <table cellpadding="0" v-else>
                    <thead>
                    <tr>
                        <th>{{$t("table.height")}}</th>
                        <th>{{$t("table.number")}}</th>
                        <th>{{$t("table.age")}}</th>
                        <th>{{$t("table.miner")}}</th>
                        <th>{{$t("table.reward")}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in blocks" :key='index'>
                        <td>
                            <router-link :to="`/block/${item.number}`">{{item.number}}</router-link>
                        </td>
                        <td>
                            <span>{{ item.timestamp | formatAgo}}{{$t("global.ago")}}</span>
                        </td>
                        <td>
                            <router-link class="hashLink" :to="`/txs/${item.hash}`">{{item.txn}}</router-link>
                        </td>
                        <td>
                            <span>{{item.uncles}}</span>
                        </td>
                        <td>
                            <router-link class="hashM" :to="`/address/${item.miner}`">{{item.miner}}</router-link>
                        </td>

                        <td>
                            <p class="dbLine">{{ item.gasUsed }} ({{ item.gasUsed * 100/item.gasLimit | fixNum(2) }}%)</p>
                            <div class="perBg">
                                <div class="per" :style="{width: item.gasUsed * 100/item.gasLimit +'%'}"></div>
                            </div>
                        </td>
                        <td>
                            <span>{{ item.gasLimit }}</span>
                        </td>
                        <td>
                            <span>{{item.avgGasPrice | diliver(18)}}</span>
                        </td>
                        <td>
                            <span>{{item.reward}} Vns</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'uncles',
        data () {
            return {
                blocks: [],
                total: 0,
                size: 0,
                curIndex: 1,
                noRecord: false
            }
        },
        created () {
            this.getData()
        },
        methods: {
            getData () {
                this.$http({
                    method: 'post',
                    url: '/api/vns/block/list',// 待修改url
                    dataType: 'json',
                    data: {
                        'page': this.curIndex,
                        'limit': '50'
                    }
                }).then(res => {// 此处数据导入
                    this.total = res.data.result.total
                    this.size = res.data.result.size
                    this.blocks = res.data.result.blocks
                    if (this.blocks.length === 0) {
                        this.noRecord1 = true
                    }
                })
            }
        },
        watch: {
            '$route' (val) {
                // console.log(val)
                if (val.query.page !== this.curIndex) {
                    this.curIndex = val.query.page
                    this.getData()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    h3 {
        height: 52px;
        line-height: 52px;
        font-size: 20px;
        margin-top: 4px;
        span {
            color: #77838f;
            font-size: 14px;
        }
    }
    .box {
        padding: 10px;
    }
    .table_desc {
        display: flex;
        margin-bottom: 15px;
        p {
            flex: 1;
            font-size: 13px;
        }
    }
    table {
        width: 100%;
        th {
            color: #6c757e;
            background-color: #f8fafd;
            border-bottom: 2px solid #e7eaf3;
            border-top: 1px solid #e7eaf3;
        }
        td {
            border-bottom: 1px solid #e7eaf3;
            padding: 0 10px;
            span, a {
                display: inline-block;
                height: 42px;
                line-height: 42px;
            }
        }
    }
    .perBg {
        width: 100%;
        height: 2px;
        background-color: #e7eaf3;
        margin-top: 4%;
        .per {
            height: 2px;
            background: #3498db;
        }
    }
    .dbLine {
        height: 13px;
        font-size: 13px;
    }
    .wrap {
        min-height: 200px;
        position: relative;
    }
    @media (max-width: 1200px) {
        .wrap {
            // min-width: 800px;
            width: 100%;
            overflow-x: scroll;
        }
        table {
            .hashM {
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
    @media (max-width: 992px) {
        table {
            min-width: 860px;
        }
    }
    @media (max-width: 600px) {
        .table_desc {
            display: block;
            p {
                display: block;
                width: 100%;
                margin-bottom: 10px;
            }
            .mobile {
                float: right;
                margin-bottom: 15px;
            }
        }
    }
</style>

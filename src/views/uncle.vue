<template>
    <section id='uncle' class="w1200">
        <h3>{{$t('global.uncle')}} <span>#{{uncle.number}}</span></h3>
        <div class="box">
            <p class="title">{{$t('global.overview')}}</p>
            <div class="infos" v-if="!uncle.number">
                <div class="loading">
                    <img src="~@/assets/img/loading.gif">
                </div>
            </div>
            <!-- <div class="noRecord" v-else-if="noRecord">
              <p>{{$t('global.noData')}}</p>
            </div> -->
            <div class="infos" v-else>
                <div class="detailBox">
                    <p class="name">{{$t('block.height')}}:</p>
                    <div class="detail">
                        <span>{{uncle.number}}</span>
                        <router-link :to="`/uncle/${uncle.number - 1}`" class="changeblock" :class="{'disable': disable}">
                            <i class="fa fa-angle-left"></i>
                        </router-link>
                        <router-link :to="`/uncle/${+uncle.number + 1}`" class="changeblock">
                            <i class="fa fa-angle-right"></i>
                        </router-link>
                    </div>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.timestamp')}}:</p>
                    <p class="detail">
                        <i></i>
                        <span> {{ uncle.timestamp | formatAgo }} {{$t('global.ago')}} ({{new Date(uncle.timestamp*1000).toLocaleString()}})</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.transactions')}}:</p>
                    <p class="detail">
                        <router-link :to="`/txs/${uncle.hash}`">{{ uncle.txnCount }}{{$t('desc.transactions')}}</router-link>{{$t('global.and')}}
                        <router-link to="">{{ uncle.ctxnCount }}{{$t('desc.contractInternal')}}</router-link>
                        <span>{{$t('desc.inBlock')}}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('uncle.minedBy')}}:</p>
                    <p class="detail">
                        <router-link :to="`/address/${uncle.miner}`">{{ block.miner }}</router-link>
                        <span>(Vns){{$t("desc.interval",{interval: block.interval})}}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.reward')}}:</p>
                    <p class="detail">
                        <span>{{block.blockReward}} Vns</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.uncleReward')}}:</p>
                    <p class="detail">
                        <span>{{ block.unclesReward }} Vns</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.difficulty')}}:</p>
                    <p class="detail">
                        <span>{{ block.difficulty | formatNumber }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.totaldiff')}}:</p>
                    <p class="detail">
                        <span>{{ block.totalDifficulty | formatNumber }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.size')}}:</p>
                    <p class="detail">
                        <span>{{ block.size }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.gasUsed')}}:</p>
                    <p class="detail">
                        <span>{{ block.gasUsed | formatNumber}}({{ block.gasUsed*100/block.gasLimit | fixNum(2)}}%)</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.gasLimit')}}:</p>
                    <p class="detail">
                        <span>{{ block.gasLimit | formatNumber}}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.extraData')}}:</p>
                    <p class="detail">
                        <span>{{ block.extraData }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.hash')}}:</p>
                    <p class="detail">
                        <span>{{ block.hash }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.pHash')}}:</p>
                    <p class="detail">
                        <router-link class="" :to="`/block/${block.parentHash}`">{{ block.parentHash }}</router-link>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('block.sha3Un')}}:</p>
                    <p class="detail">
                        <span>{{ block.sha3Uncles }}</span>
                    </p>
                </div>
                <div class="detailBox">
                    <p class="name">{{$t('global.nonce')}}:</p>
                    <p class="detail">
                        <span>{{block.nonce}}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'uncle',
        data () {
            return {
                id: '',
                block: {},
                disable: true
            }
        },
        created () {
            this.id = this.$route.params.id
            this.getUncle()
        },
        methods: {
            getUncle () {
                let url = (/^0x/).test(this.id) ? 'hash' : 'number'//待修改url
                this.$http({
                    method: 'get',
                    url: `/api/vns/block/info?${url}=${this.id}`,
                    dataType: 'json',
                }).then((res) => { // 此处数据导入
                    // console.log(res, 'txn')
                    this.block = res.data.result.block
                    if (!this.block) {
                        this.$router.push('/404')
                    }
                })
            }
        },
        watch: {
            '$route' (val) {
                if (val.params.id !== this.id) {
                    this.id = val.params.id
                    this.getUncle()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #block {
        .disable {
            cursor: not-allowed;
        }
        h3 {
            height: 52px;
            line-height: 52px;
            font-size: 20px;
            margin-top: 4px;
            span {
                color: #77838f;
                font-size: 16px;
            }
        }
        .title {
            line-height: 44px;
            padding: 0 10px;
            border-bottom: 1px solid #e7eaf3;
            font-size: 14px;
            color: #4a4f55;
            font-weight: bold;
        }
        .infos {
            padding: 0 10px;
            min-height: 500px;
            position: relative;
        }
        .detailBox {
            height: 48px;
            line-height: 48px;
            border-bottom: 1px solid #e7eaf3;
            display: flex;
            .changeblock {
                display: inline-block;
                width: 22px;
                height: 21px;
                text-align: center;
                line-height: 20px;
                color: #3498db;
                background: rgba(52,152,219,.1);
                margin-left: 5px;
                border-radius: 3px;
                &:hover {
                    color: #fff;
                    background: #3498db;
                    box-shadow: 0 4px 11px rgba(52,152,219,.35);
                }
                i {
                    vertical-align: -2px;
                    font-size: 20px;
                }
            }
            p {
                font-size: 13px;
            }
            .name {
                flex: 1;
            }
            .detail {
                flex: 2;
                text-align: left;
            }
        }
    }

    @media (max-width: 768px) {
        #uncle {
            .detailBox {
                align-items: center;
                p {
                    font-size: 12px;
                }
                .detail {
                    flex: 3;
                    word-break: break-all;
                    line-height: 20px;
                }
            }
        }
    }
</style>
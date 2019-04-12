<template>
  <div id="home" class="w1200">
    <section id="search">
      <p class="fwb searchTitle">
        VNS{{$t('index.explorer')}}
        <span class="fr">{{$t('index.quickLink')}}: <router-link to='/token'>VRC-20 Tokens</router-link></span>
      </p>
      <div class="form" @mouseleave='showRes=false' @keydown.enter="getSearch">
        <div class="inputBox">
          <input type="text" v-model="search"  placeholder="Search by Address / Txhash / Block / Token">
          <!-- <div class="results" v-if="showRes">
            <ul class="searchList">
              <li v-for="(item, index) in searchRes" :key="index">
                <router-link :to="`/${item.type}/${item.value}`" class="searchItem">
                  <p>{{item.type}}</p>
                  <p>{{item.value}}</p>
                </router-link>
              </li>
            </ul>
          </div> -->
        </div>
        <span class="btn" @click="getSearch">{{$t('global.search')}}</span>
      </div>
    </section>
    <section id="last" class="box">
      <div>
        <div class="blocks">
          <figure><img src="~@/assets/logo1.svg" /></figure>
          <div class="detail">
            <p class="home_title">VNS{{$t('global.price') | upper}}</p>
            <router-link to='' class="con">
              <span class="worth">${{ currency.price_usd }}</span> @ 
              <span class='btcWorh'>{{ currency.price_btc }}</span> 
              <span class="unit"> BTC</span>
              <span class="change" :class="{ 'green' : currency.rate_24h > 0, 'red': currency.rate_24h < 0 }"> ({{ currency.rate_24h }}%)</span>
            </router-link>
          </div>
        </div>
        <hr />
        <div class="block">
          <figure><img src="https://etherscan.io/images/svg/icons/icon-8.svg" /></figure>
          <div class="detail">
            <p class="home_title"><span class="fr">{{$t('global.supply') | upper}}</span>{{$t('index.marketCap') | upper}}</p>
            <div class="con">
              <p><router-link to="" class="fr"><span class="lastBlock">{{ currency.current_supply }} Vns</span></router-link></p>
              <p><router-link to="" class="lastBlock">${{ currency.market_cap_usd | diliver(6) | fixNum(4)}} Million</router-link></p>
            </div>
          </div>
        </div>
        <hr class="mobile" />
      </div>
      <div>
        <div class="block">
          <figure><img src="https://etherscan.io/images/svg/icons/icon-2-1.svg?v=1.3" /></figure>
          <div class="detail">
            <p class="home_title"><span class="fr">{{$t('global.transactions') | upper}}</span><span>{{$t('index.lastBlock') | upper}}</span></p>
            <div class="con">
              <p class="fr">
                <router-link to="" class="lastBlock">{{ lastData.ttc }}</router-link>
                <span class='time'>({{ lastData.tps }}TPS)</span>
              </p>
              <p>
                <router-link to="" class="lastBlock">{{ lastData.latestBlock }}</router-link>
                <router-link to="" class='time'> ({{ lastData.avgBlockTime }}s)</router-link>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="block">
          <figure><img src="https://etherscan.io/images/svg/icons/icon-51.svg?v=1.5" /></figure>
          <div class="detail">
            <p class="home_title"><span class="fr">{{$t('index.rate') | upper}}</span><span>{{$t('global.difficulty') | upper}}</span></p>
            <div class="con">
              <p><router-link to="" class="fr"><span class="lastBlock">{{ lastData.avgHashRate }} GH/s</span></router-link></p>
              <p><router-link to="" class="lastBlock">{{ lastData.difficulty }}</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="lists" class="clearfix">
      <div class="blockList box fl">
        <h3>{{$t('index.lastBlocks')}}</h3>
        <div class="scrollBox">
          <div class="loading" v-if="blocks.length===0 && !noRecord1">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-else-if="noRecord1">
            <p>{{$t('global.noData')}}</p>
          </div>
          <virtualList :size="64" :remain="6" v-else>
            <ul class="lists">
              <li v-for="item in blocks" :key='item.number'>
                <div class="flex1">
                  <div class="bk">Bk</div>
                  <div class="bkNo">
                    <router-link :to="`/block/${item.number}`">{{ item.number }}</router-link>
                    <p>{{ item.t | formatAgo}} ago</p>
                  </div>
                </div>
                <div class="flex2">
                  <div class="fee">209 Vns</div>
                  <p class="miner">{{$t("index.miner")}} <router-link class="hashLink" :to="`/address/${item.miner}`">{{ item.miner }}</router-link></p>
                  <p><router-link :to="`/txs/${item.hash}`">{{ item.txnCount }} Txns</router-link> in {{item.interval}} secs</p>
                </div>
              </li>
            </ul>
          </virtualList>
        </div>
        <div class="all">
          <router-link to='/blocks'>{{$t('index.allblock')}}</router-link>
        </div>
      </div>
      <div class="transactionlist box fr">
        <h3>{{$t('global.transactions')}}</h3>
        <div class="scrollBox">
          <div class="loading" v-if="txns.length===0 && !noRecord2">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-else-if="noRecord2">
            <p>{{$t('global.noData')}}</p>
          </div>
          <virtualList :size="64" :remain="6" v-else>
            <ul class="lists">
              <li v-for="item in txns" :key='item.number'>
                <div class="flex1">
                  <div class="Tx">Tx</div>
                  <div class="bkNo">
                    <router-link class="hashLink" :to="`/txn/${item.hash}`">{{item.hash}}</router-link>
                    <p>{{ item.t | formatAgo}} ago</p>
                  </div>
                </div>
                <div class="flex2">
                  <div class="fee">{{ +item.value | fixNum(4)}} Vns</div>
                  <p>From <router-link class="hashLink" :to="`/address/${item.from}`">{{ item.from }}</router-link></p>
                  <p>To <router-link class="hashLink" :to="`/address/${item.to}`">{{ item.to }}</router-link></p>
                </div>
              </li>
            </ul>
          </virtualList>
        </div>
        <div class="all">
          <router-link to='/txs'>{{$t('index.alltxn')}}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'

export default {
  name: 'home',
  data () {
    return {
      search: '',
      lastData: {},
      blocks: [],
      txns: [],
      ws: null,
      searchRes: [],
      currency: {},
      showRes: false,
      noRecord1: false,
      noRecord2: false
    }
  },
  components: {
    virtualList
  },
  created () {
    this.init()
    this.wslink()
    this.wsListener()
    setInterval(() => {
      this.blocks.splice()
      this.txns.splice()
    }, 1000);
  },
  // mounted () {
  //   bus.$on('refresh', () => this.init())
  // },
  methods: {
    init () {
      // console.log(1)
      this.getLastestData()
      this.getBlocks()
      this.getTxn()
      this.getCurrency()
    },
    getLastestData () {
      this.$http({
        method: 'get',
        url: '/api/vns/stat/summary',
        dataType: 'json',
      })
      .then((res) => {
        this.lastData = res.data.result
      })
    },
    getBlocks () {
      this.$http({
        method: 'get',
        url: '/api/vns/block/rt',
        dataType: 'json',
      }).then((res) => {
        this.blocks = res.data.result.blocks
        if (this.blocks.length === 0) {
          this.noRecord1 = true
        }
      })
    },
    getTxn () {
      this.$http({
        method: 'get',
        url: '/api/vns/txn/rt',
        dataType: 'json',
      }).then((res) => {
        this.txns = res.data.result.txns
        if (this.txns.length === 0) {
          this.noRecord2 = true
        }
      })
    },
    wslink () {
      this.ws = new WebSocket('ws://120.27.232.146:8081/ws?token=Yigo0LD9I7') 
    },
    getCurrency () {
      this.$http({
        method: 'post',
        url: 'http://47.244.61.227:3003/home/currencies',
        dataType: 'json',
        data: {
          currency: 'vns'
        }
      }).then((res) => {
        this.currency = res.data.details
      })
    },
    wsListener () {
      this.ws.onopen = () => {
        // eslint-disable-next-line
        console.log('Connection open ...');
        // this.ws.send('');
      }
      this.ws.onmessage = (evt) => {
        var res = (JSON.parse(evt.data)).result
        if (res.block.txns.length) {
          this.txns = res.block.txns.concat(this.txns)
          if (this.txns.length > 30) {
            this.txns.splice(30, this.txns.length - 30)
          }
        }
        var block = res.block
        this.lastData.latestBlock = block.number
        delete block.txns
        this.blocks.unshift(block)
        if (this.blocks.length > 30) {
          this.blocks.splice(30, this.blocks.length - 30)
        }
      }
      this.ws.onclose = function() {
        // eslint-disable-next-line
        console.log('Connection closed.');
      }
    },
    getSearch () {
      if (!this.search) return
      this.$http({
        method: 'post',
        url: '/api/vns/search',
        headers: {'Content-Type': 'text/plain'},
        data: this.search
      }).then((res) => {
        this.searchRes = res.data.result.related[0]
        if (!this.searchRes) {
          this.$router.push('/404')
        } else {
          this.$router.push(`/${this.searchRes.type}/${this.searchRes.value}`)
        }
      })
    }
  },
  watch: {
    // search (val, oldVal) {
    //   if (!val || val === oldVal) return
    //   this.getSearch(val)
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import './home.scss';
</style>

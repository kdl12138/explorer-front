<template>
  <section id='address' class="w1200">
    <h3>Address 
      <p>#<span id="id">{{id}}</span></p>
      <div class="iconBg">
        <tips :text="tipText" :show="showTip"></tips>
        <i class="fa fa-copy id" @mouseenter="showTip=true" @mouseleave="resetTip" data-clipboard-target='#id'></i>
      </div>
      <div class="iconBg">
        <tips :text="tipQrText" :show="showQrTip"></tips>
        <qrcode :show='showQr' :address='id'></qrcode>
        <i class="fa fa-qrcode" @click="showQr=true" @mouseenter="showQrTip=true" @mouseleave="showQrTip=false"></i>
      </div>
    </h3>
    <div class="overview">
      <div class="box">
        <p class="title">{{$t('global.overview')}}</p>
        <ul class="flexBox">
          <li>
            <p>{{$t('global.balance')}}:</p>
            <div>{{balance | fixNum(6)}} Vns</div>
          </li>
          <li>
            <p>{{$t('table.vnsVal')}}:</p>
            <div>${{currency.price_usd * balance | fixNum(6)}}</div>
          </li>
          <li>
            <p>{{$t('global.token')}}:</p>
            <div></div>
          </li>
        </ul>
      </div>
      <div class="box">
        <p class="title">{{$t('table.moreInfo')}}</p>
        <ul class="flexBox">
          <li>
            <p>{{$t("global.transactions")}}:</p>
            <div>{{txnCount}} {{txnCount > 1 ? 'Txns' : 'Txn'}}</div>
          </li>
          <li>
            <p>{{$t('table.mined')}}:</p>
            <div v-if="minedBlocks || minedUncles">
              <span v-if="minedBlocks">{{minedBlocks}}{{$t("block.blocks")}}</span>
              <span v-if="minedBlocks && minedUncles">{{$t("global.and")}}</span>
              <span v-if="minedUncles">{{minedUncles}}{{$t('table.uncles')}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab box">
      <ul class="hd clearfix">
        <li v-for="(item, index) in heads" :key="item" @click="headIndex=index" :class="{'cur': headIndex === index}">{{item}}</li>
      </ul>
      <div class="bd" v-if="headIndex === 0">
        <div class="table_desc">
          <p>{{$t('desc.listTxn', {length: txs.length, total: total})}}</p>
          <page :total='size' :index='index' :url='`/address/${id}`' class="mobile"></page>        
        </div>
        <div class="wrap">
          <div class="loading" v-if="txs.length===0 && !noRecord">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-else-if="noRecord">
            <p>{{$t('global.noData')}}</p>
          </div>
          <table cellpadding="0" v-else>
            <thead>
              <tr>
                <th>{{$t("table.txHash")}}</th>
                <th>{{$t("global.block")}}</th>
                <th>{{$t("table.age")}}</th>
                <th>{{$t("global.from")}}</th>
                <th>{{$t("global.to")}}</th>
                <th>{{$t("global.value")}}</th>
                <th>[{{$t("table.txfee")}}]</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in txs" :key='item.address'>
                <td>
                  <i class="fa fa-exclamation-circle warn" v-if="item.status==='0'"></i>
                  <router-link :to="`/txn/${item.hash}`" class="hashLink">{{item.hash}}</router-link>
                </td>
                <td>
                  <router-link :to="`/block/${item.blockNumber}`">{{item.blockNumber}}</router-link>
                </td>
                <td>
                  <span class="time">{{item.timestamp | formatAgo}}{{$t("global.ago")}}</span>
                </td>
                <td>
                  <span class="hashLink from" v-if="item.io === 'out'">{{item.from}}</span>
                  <router-link v-else :to="`/address/${item.from}`" class="hashLink to">{{item.from}}</router-link>
                  <div class="dir fr" :class="{'out': item.io === 'out', 'in': item.io === 'in'}">{{item.io | upper}}</div>
                </td>
                <td>
                  <span class="hashLink from" v-if="item.io === 'in'">{{item.to}}</span>
                  <router-link :to="`/address/${item.to}`" v-else class="hashLink to">{{item.to}}</router-link>
                </td>
                <td>
                  <span>{{item.value}} Vns</span>
                </td>
                <td>
                  <span>{{item.txnFee}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bd" v-else>
        <div class="table_desc">
          <p>Latest 25 ERC-20 Token Transfer Events [<router-link to="">Show More</router-link>]</p>
        </div>
        <table cellpadding="0">
          <thead>
            <tr>
              <th>TxHash</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody class="none">
            <tr v-for="item in tokens" :key='item.address'>
              <td>
                <router-link :to="`/txn/${item.txhash}`" class="hashLink">{{item.txhash}}</router-link>
              </td>
              <td>
                <span class="time">{{item.timestamp | formatAgo}} ago</span>
              </td>
              <td>
                <span class="hashLink from">{{item.from}}</span>
                <div class="dir fr" :class="{'out': item.io === 'out', 'in': item.io === 'in'}" v-if="item.io==='out'">{{item.io | upper}}</div>
              </td>
              <td>
                <router-link :to="`/address/${item.to}`" class="hashLink to">{{item.to}}</router-link>
              </td>
              <td>
                <span>10.000</span>
              </td>
              <td>
                <span>ERC-20(ILT)</span>
              </td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Clipboard from 'clipboard'
import tips from "@/components/tips.vue"
import qrcode from "@/components/qrcode.vue"
import bus from "@/assets/js/bus.js"

export default {
  name: 'myAddress',
  data () {
    return {
      headIndex: 0,
      heads: ['Transactions'],
      // heads: ['Transactions', 'Erc20 Token Txns'],
      id: '',
      txs: [],
      tokens: [{}],
      balance: 0,
      txnCount: 0,
      minedBlocks: '',
      minedUncles: '',
      index: 1,
      total: 1,
      size: 1,
      currency: '',
      tipText: this.$t('tips.copyAddress'),
      showTip: false,
      tipQrText: this.$t('tips.showQr'),
      showQr: false,
      showQrTip: false,
      noRecord: false
    }
  },
  components: {
    tips,
    qrcode
  },
  created () {
    this.id = this.$route.params.id
    this.getInfo()
    this.getTxns()
    this.getCurrency()
  },
  mounted () {
    var clip = new Clipboard('.id')
    clip.on('success', () => {
      this.tipText = this.$t('tips.copied')
    })
    bus.$on('hideQr', () => this.showQr = false)
  },
  methods: {
    resetTip () {
      this.showTip = false
      this.tipText = this.$t('tips.copyAddress')
    },
    getInfo () {
      this.$http({
        method: 'get',
        url: `/api/vns/account/info?address=${this.id}`,
        dataType: 'json',
      }).then((res) => {
        var address = res.data.result.address
        this.balance = address.balance
        this.txnCount = address.txnCount
        this.minedBlocks = address.minedBlocks
        this.minedUncles = address.minedUncles
      })
    },
    getTxns () {
      this.$http({
        method: 'post',
        url: `/api/vns/txn/list`,
        dataType: 'json',
        data: {
          page: this.index,
          limit: '50',
          address: this.id
        }
      }).then((res) => {
        var address = res.data.result
        this.txs = address.txns
        this.total = address.total
        this.size = address.size
        if (this.blocks.length === 0) {
          this.noRecord = true
        }
      })
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
        // console.log(res)
        this.currency = res.data.details
      })
    }
  },
  watch: {
    '$route' (val) {
      if (val.params.id !== this.id) {
        this.id = val.params.id
        this.index = 1
        this.getInfo()
        this.getTxns()
      } else if (val.query.page && val.query.page !== this.index) {
        this.index = val.query.page
        this.getTxns()
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
    p {
      display: inline-block;
      color: #77838f;
      font-size: 16px;
    }
    .iconBg {
      display: inline-block;
      cursor: pointer;
      color: #77838f;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 13px;
      background: rgba(119,131,143,.1);
      margin-left: 5px;
      position: relative;
      &:hover {
        color: #fff;
        background: #77838f;
        box-shadow: 0 4px 11px rgba(119,131,143,.35);
      }
    }
  }
  .overview {
    display: flex;
    margin-bottom: 20px;
    .box {
      flex: 1;
      &:first-child {
        margin-right: 20px;
      }
      ul {
        padding: 0 10px;
      }
      li {
        display: flex;
        height: 42px;
        line-height: 42px;
        border-bottom: 1px solid #e7eaf3;
        p {
          flex: 1;
        }
        div {
          flex: 2;
        }
      }
    }
  }
  .hd {
    border-bottom: 1px solid #e7eaf3;
    li {
      padding: 0 10px;
      height: 44px;
      line-height: 44px;
      float: left;
      margin-right: 8px;
      cursor: pointer;
      font-weight: bold;
      &.cur {
        border-bottom: 2px solid #3498db;
        color: #3498db;
        margin-bottom: -1px;
      }
      &:hover {
        color: #3498db;
      }
    }
  }
  .bd {
    padding: 10px 10px;   
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
      .warn {
        color: red;
        font-size: 16px;
        margin-right: 5px;
        vertical-align: -2px;
      }
    }
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
      .hashLink {
        max-width: 120px;
      }
    }
  }

  @media (max-width: 992px) {
    table {
      min-width: 860px;
      .hashLink {
        max-width: 90px;
      }
    }
  }

  @media (max-width: 768px) {
    .overview {
      .box {
        li {
          align-items: center;
          p {
            flex: 2;
          }
          div {
            flex: 3;
            line-height: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    h3 {
      p {
        font-size: 12px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .overview {
      display: block;
      .box {
        width: 100%;
        display: block;
        margin-bottom: 20px;
      }
    }
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

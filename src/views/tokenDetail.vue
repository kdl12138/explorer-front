<template>
  <section id='address' class="w1200">
    <h3>Token <span>{{info.name}}</span></h3>
    <div class="overview">
      <div class="box">
        <p class="title">{{$t('global.overview')}} <span>[VRC-20]</span></p>
        <ul class="flexBox">
          <!-- <li>
            <p>{{$t('global.balance')}}:</p>
            <div>{{balance | fixNum(6)}}</div>
          </li> -->
          <li>
            <p>{{$t('table.supply')}}:</p>
            <div class="fwb">
              <span class="hashLink">{{info.total}}</span>
              {{info.name}}
            </div>
          </li>
          <li>
            <p>{{$t('table.holder')}}:</p>
            <div>{{info.holders}}</div>
          </li>
          <li>
            <p>{{$t('table.transfer')}}:</p>
            <div>{{info.transfers}}</div>
          </li>
        </ul>
      </div>
      <div class="box">
        <p class="title">{{$t('table.moreInfo')}}</p>
        <ul class="flexBox">
          <li>
            <p>{{$t("global.contract")}}:</p>
            <div><router-link :to='`/address/${info.contract}`'>{{info.contract}}</router-link></div>
          </li>
          <li>
            <p>{{$t('table.decimals')}}:</p>
            <div>{{info.decimal}}</div>
          </li>
          <li>
            <p>{{$t('table.site')}}:</p>
            <div>{{info.site}}</div>
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
          <p>{{$t('desc.listTxn', {length: transfers.length, total: total})}}</p>
          <page :total='size' :index='index' :url='`/token/${id}`' class="mobile"></page>        
        </div>
        <div class="wrap">
          <div class="loading" v-if="transfers.length===0">
            <img src="~@/assets/img/loading.gif">
          </div>
          <table cellpadding="0" v-else>
            <thead>
              <tr>
                <th>{{$t("table.transfer")}}</th>
                <th>{{$t("table.age")}}</th>
                <th>{{$t("global.from")}}</th>
                <th>{{$t("global.to")}}</th>
                <th>{{$t("table.quantity")}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transfers" :key='item.hash'>
                <td>
                  <i class="fa fa-exclamation-circle warn" v-if="item.status==='0'"></i>
                  <router-link :to="`/tx/${item.hash}`" class="hashLink">{{item.hash}}</router-link>
                </td>
                <td>
                  <span class="time">{{item.t | formatAgo}}{{$t("global.ago")}}</span>
                </td>
                <td>
                  <router-link :to="`/tkAddress/${id}?a=${item.from}`" class="hashLink to">{{item.from}}</router-link>
                  <div class="goto fr"><i class="fa fa-arrow-right"></i></div>
                </td>
                <td>
                  <router-link :to="`/tkAddress/${id}?a=${item.to}`" class="hashLink to">{{item.to}}</router-link>
                </td>
                <td>
                  <span>{{item.quantity}}</span>
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
export default {
  name: 'myAddress',
  data () {
    return {
      headIndex: 0,
      heads: ['Transactions'],
      // heads: ['Transactions', 'Erc20 Token Txns'],
      id: '',
      transfers: [{}],
      info: {},
      balance: 0,
      index: 1,
      total: 1,
      size: 1,
      currency: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getInfo()
    this.getTokens()
    this.getCurrency()
  },
  methods: {
    getInfo () {
      this.$http({
        method: 'post',
        url: `/api/vns/contract/info`,
        dataType: 'json',
        data: {
          contract: this.id
        }
      }).then((res) => {
        var result = res.data.result
        this.info = result.info
      })
    },
    getTokens () {
      this.$http({
        method: 'post',
        url: `/api/vns/contract/transfersList`,
        dataType: 'json',
        data: {
          page: this.index,
          limit: 50,
          contract: this.id
        }
      }).then((res) => {
        var result = res.data.result
        this.transfers = result.transfers
        this.total = result.total
        this.size = result.size
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
        this.getTokens()
      } else if (val.query.page && val.query.page !== this.index) {
        this.index = val.query.page
        this.getTokens()
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
      display: inline-block;
      color: #77838f;
      font-size: 16px;
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
      .goto {
        width: 24px;
        height: 24px;
        margin-top: 9px;
        border-radius: 12px;
        color: #00c9a7;
        background: rgba(0,201,167,.1);
        text-align: center;
        line-height: 24px;
        i {
          display: inline-block;
        }
      }
    }
  }
  .wrap {
    min-height: 400px;
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
        max-width: 240px;
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

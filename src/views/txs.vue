<template>
  <section id='detail' class="w1200">
    <h3>{{$t('global.transactions')}} <span v-if="id">{{$t('desc.forBlock')}} {{ id }}</span></h3>
    <div class="box">
      <div class="table_desc">
        <p>{{$t('desc.totalTxn', {total: total})}}</p>
        <page class="mobile" :total='pages' :url="`${id ? `/txs/${id}` : '/txs'}`" :index='curIndex'></page>
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
            <tr v-for="item in txs" :key='item.id'>
              <td>
                <router-link :to="`/txn/${item.hash}`" class="hashLink">{{item.hash}}</router-link>
              </td>
              <td>
                <router-link :to="`/block/${item.blockNumber}`">{{item.blockNumber}}</router-link>
              </td>
              <td>
                <span class="time">{{ item.timestamp | formatAgo }}{{$t('global.ago')}}</span>
              </td>
              <td>
                <router-link :to="`/address/${item.from}`" class="hashLink from">{{item.from}}</router-link>
                <div class="goto fr"><i class="fa fa-arrow-right"></i></div>
              </td>
              <td>
                <router-link :to="`/address/${item.to}`" class="hashLink to">{{item.to}}</router-link>
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
  </section>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      id: 0,
      txs: [],
      pages: 1,
      total: 0,
      curIndex: 1,
      noRecord: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.getBlock()
      } else {
        this.getAll()
      }
    },
    getAll () {
      this.$http({
        method: 'post',
        url: '/api/vns/txn/list',
        dataType: 'json',
        data: {
          page: this.curIndex,
          limit: 50
        }
      }).then(this.handleBlock)
    },
    getBlock () {
      this.$http({
        method: 'post',
        url: '/api/vns/txn/list',
        dataType: 'json',
        data: {
          page: this.curIndex,
          limit: 50,
          bh: this.id
        }
      }).then(this.handleBlock)
    },
    handleBlock (res) {
      this.txs = res.data.result.txns
      this.total = res.data.result.total
      this.pages = res.data.result.size
      if (this.txs.length === 0) {
        this.noRecord = true
      }
    }
  },
  watch: {
    '$route' (val) {
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
    // height: 52px;
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
    h3 {
      line-height: 40px;
      span {
        font-size: 12px;
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>


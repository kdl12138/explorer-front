<template>
  <section id="token" class="w1200">
    <h3>{{$t('token.tracker')}}</h3>
    <div class="box">
      <p class="title">{{$t('token.cap')}}</p>
      <div class="bd">
        <div class="table_desc">
          <p>{{$t('token.totalToken', {total: total})}}</p>
          <page class="mobile" :total='pages' url="/token" :index='curIndex'></page>
        </div>
        <div class="wrap">
          <div class="loading" v-if="tokens.length===0 && !noRecord">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-else-if="noRecord">
            <p>{{$t('global.noData')}}</p>
          </div>
          <table cellpadding="0" v-else>
            <thead>
              <th>#</th>
              <th>{{$t('global.token')}}</th>
              <th><span>{{$t('global.price')}}</span></th>
              <th><span>{{$t('table.change')}}(%)</span></th>
              <th><span>{{$t('table.volume')}}(24H)</span></th>
              <th><span>{{$t('index.marketCap')}}</span></th>
              <th><span>{{$t('global.holder')}}</span></th>
            </thead>
            <tbody>
              <tr v-for="(token, index) in tokens" :key="index">
                <td>{{index+1}}</td>
                <td>
                  <div class="token">
                    <figure><img src="" alt=""></figure>
                    <div class="info">
                      <router-link :to="`/token/${token.contract}`" class="name">{{token.name}} ({{token.symbol}})</router-link>
                      <p class="desc">--</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="price">
                    <p class="p1">--</p>
                    <!-- <p class="p1">$16.6899</p>
                    <p class="p2">0.0041237740 BTC</p>
                    <p class="p2">0.120011 VNS</p> -->
                  </div>
                </td>
                <td>
                  <div class="change">
                    <p>--</p>
                  </div>
                </td>
                <td>
                  <div class="vol">
                    <p>--</p>
                  </div>
                </td>
                <td>
                  <div class="cap">
                    <p>--</p>
                  </div>
                </td>
                <td>
                  <div class="hold">
                    <p>{{token.holders}}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'token',
  data () {
    return {
      tokens: [],
      total: 1,
      size: 1,
      pages: 1,
      curIndex: 1,
      noRecord: false
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    getToken () {
      this.$http({
        method: 'post',
        url: '/api/vns/contract/list',
        dataType: 'json',
        data: {
          page: this.curIndex,
          limit: 10
        }
      }).then((res) => {
        var result = res.data.result
        this.tokens = result.contracts
        this.pages = result.size
        this.total = result.total
        if (this.tokens.length === 0) {
          this.noRecord = true
        }
      })
    }
  },
  watch: {
    '$route' (val) {
      if (val.query.page && val.query.page !== this.curIndex) {
        this.curIndex = val.query.page
        this.getToken()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bd {
  padding: 10px;
}
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
.table_desc {
  display: flex;
  height: 52px;
  p {
    flex: 1;
    font-size: 13px;
    line-height: 20px;
  }
}
table {
  width: 100%;
  th {
    color: #6c757e;
    background-color: #f8fafd;
    border-bottom: 2px solid #e7eaf3;
    border-top: 1px solid #e7eaf3;
    span {
      color: #3498db;
    }
  }
  td {
    border-bottom: 1px solid #e7eaf3;
    padding: 10px;
    span, a {
      display: inline-block;
      height: 42px;
      line-height: 42px;
    }
    &>div {
      vertical-align: top;
    }
    p {
      font-size: 12px;
      line-height: 20px;
    }
    .token {
      display: flex;
      figure {
        width: 26px;
      }
      div {
        flex: 1;
        max-width: 330px;
      }
      .name {
        font-size: 14px;
        color: #3498db;
        line-height: 22px;
        height: 22px;
      }
      .desc {
        font-size: 12px;
        line-height: 20px;
      }
    }
    .price {
      .p1 {
        font-size: 13px;
      }
    }
  }
}
@media (max-width: 1200px) {
  .wrap {
    width: 100%;
    overflow-x: scroll;
  }
}

@media (max-width: 992px) {
  table {
    min-width: 860px;
    .token {
      max-width: 300px;
    }
  }
}
</style>

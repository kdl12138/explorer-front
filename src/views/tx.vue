<template>
  <section id='tx' class="w1200">
    <h3>{{$t('txn.detail')}}</h3>
    <div class="box wrap">
      <ul class="hd clearfix">
        <li v-for="(item, index) in heads" :key="item" @click="curIndex=index">{{item}}</li>
      </ul>
      <div class="loading" v-if="!tx.hash && !noRecord">
        <img src="~@/assets/img/loading.gif">
      </div>
      <div class="noRecord" v-else-if="noRecord">
        <p>{{$t('global.noData')}}</p>
      </div>
      <div class="bd" v-else>
        <div class="detailBox">
          <p class="name">{{$t('txn.hash')}}:</p>
          <p class="detail">
            <span class="fwb">
              <span id="txHash">{{ tx.hash }}</span>
              <div class="tips rel">
                <tips :text="tipText" :show="showTip" :tipOffset="true"></tips>
                <i class="fa fa-copy ml5 txHash" @mouseenter="showTip=true" @mouseleave="resetTip" data-clipboard-target='#txHash'></i>
              </div>
            </span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('txn.status')}}:</p>
          <div class="detail">
            <div class="status">
              <div class="suc" v-if="tx.status === '1'">
                <i class="fa fa-check-circle"></i>
                {{$t('global.success')}}
              </div>
              <div class="fail" v-else-if="tx.status === '0'">
                <i class="fa fa-times-circle"></i>
                {{$t('global.fail')}}
              </div>
              <div v-else></div>
            </div>
          </div>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.block')}}:</p>
          <div class="detail">
            <router-link :to="`/block/${tx.blockNumber}`">{{tx.blockNumber}}</router-link>
            <div class="fee">{{ tx.confirms }}{{$t('txn.confirms')}}</div>
          </div>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.timestamp')}}:</p>
          <p class="detail">
            <i></i>
            <span>{{tx.timestamp | formatAgo}} {{$t('global.ago')}} ({{tx.timestamp | dateToString}})</span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.from')}}:</p>
          <div class="detail">
            <router-link id="from" :to="`/address/${tx.from}`">{{tx.from}}</router-link>
            <div class="tips rel">
              <tips :text="tipText" :show="showTip1" :tipOffset="true"></tips>
              <i class="fa fa-copy ml5 from" @mouseenter="showTip1=true" @mouseleave="resetTip" data-clipboard-target='#from'></i>
            </div>
          </div>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.to')}}:</p>
          <p class="detail">
            <span><pre v-if="tx.inputData !== '0x'">{{$t('global.contract')}} </pre><router-link id="to" :to="`/address/${tx.to}`">{{tx.to}}</router-link>
              <div class="tips rel" v-if="tx.to">
                <tips :text="tipText" :show="showTip2" :tipOffset="true"></tips>
                <i class="fa fa-copy ml5 to" @mouseenter="showTip2=true" @mouseleave="resetTip" data-clipboard-target='#to'></i>
              </div>
            </span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.value')}}:</p>
          <p class="detail">
            <span>{{tx.value}} Vns</span>
            <!-- <span>($0.00)</span> -->
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('txn.txnfee')}}:</p>
          <p class="detail">
            <span>{{tx.txnFee | diliver(18)}} Vns</span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.gasLimit')}}:</p>
          <p class="detail">
            <span>{{tx.gasLimit | formatNumber}}</span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.gasUsed')}}:</p>
          <p class="detail">
            <span>{{ tx.gasUsed | formatNumber}} ({{ tx.gasUsed*100/tx.gasLimit | fixNum(2)}}%)</span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name">{{$t('global.price')}}:</p>
          <p class="detail">
            <span>{{ tx.gasPrice | diliver(18)}} Vns ({{ tx.gasPrice | diliver(9) }} Gwei)</span>
          </p>
        </div>
        <div class="detailBox">
          <p class="name mobile">{{$t('global.nonce')}}<span class="position">{{$t('txn.position')}}</span></p>
          <p class="detail">
            <span>{{tx.nonce}}</span><span class="position">{{tx.position}}</span>
          </p>
        </div>
        <div class="detailBox detailArea">
          <p class="name">{{$t('txn.inputData')}}:</p>
          <div class="detail">
            <textarea readonly cols="30" rows="10" v-model="tx.inputData"></textarea>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Clipboard from 'clipboard'
import tips from "@/components/tips.vue"

export default {
  name: 'tx',
  data () {
    return {
      curIndex: 0,
      heads: ['Overview'],
      tx: {},
      id: '',
      tipText: this.$t('tips.copyAddress'),
      showTip: false,
      showTip1: false,
      showTip2: false,
      noRecord: false
    }
  },
  components: {
    tips
  },
  created () {
    this.id = this.$route.params.id
    this.getTx()
  },
  mounted () {
    var clip1 = new Clipboard('.txHash')
    var clip2 = new Clipboard('.from')
    var clip3 = new Clipboard('.to')
    clip1.on('success', () => {
      this.tipText = this.$t('tips.copied')
    })
    clip2.on('success', () => {
      this.tipText = this.$t('tips.copied')
    })
    clip3.on('success', () => {
      this.tipText = this.$t('tips.copied')
    })
  },
  methods: {
    resetTip () {
      this.showTip = false
      this.showTip1 = false
      this.showTip2 = false
      this.tipText = this.$t('tips.copyAddress')
    },
    getTx () {
      let url = (/^0x/).test(this.id) ? 'hash' : 'number'
      this.$http({
        method: 'get',
        url: `/api/vns/txn/info?${url}=${this.id}`,
        dataType: 'json'
      }).then(res => {
        this.tx = res.data.result.txn
        if (!this.tx.hash) {
          this.noRecord = true
        }
      })
    }
  },
  filters: {
    dateToString (time) {
      if (!time) return
      var str = new Date(+time * 1000)
      return ("" + str).split('(')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
  .fa-copy {
    cursor: pointer;
  }
  h3 {
    height: 52px;
    line-height: 52px;
    font-size: 20px;
    margin-top: 4px;
  }
  pre {
    display: inline-block;
  }
  .hd {
    border-bottom: 1px solid #e7eaf3;
    li {
      padding: 0 10px;
      height: 44px;
      line-height: 44px;
      float: left;
      margin-right: 8px;
      // cursor: pointer;
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
    padding: 0 10px 10px;
  }
  .detailBox {
    line-height: 48px;
    border-bottom: 1px solid #e7eaf3;
    display: flex;
    p {
      font-size: 13px;
    }
    .name {
      flex: 1;
    }
    &.detailArea {
      line-height: 0;
      p {
        line-height: 48px;
      }
    }
    .position {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      margin-left: 10px;
      padding-right: 5px;
      padding-left: 10px;
      letter-spacing: .8px;
      position: relative;
      color: #77838f;
      background-color: rgba(119,131,143,.1);
      font-size: 12px;
      &::after {
        position: absolute;
        left: 100%;
        top: 0;
        content: "";
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        border-left: 13px solid rgba(119,131,143,.1);
        border-radius: .1rem;
      }
    }
    .detail {
      flex: 2;
      text-align: left;
      .tips {
        display: inline-block;
        height: 13px;
      }
      textarea {
        width: 100%;
        height: 120px;
        box-sizing: border-box;
        margin: 10px 0;
        background: #f8f9fa;
        border-radius: 4px;
        padding: 12px;
        border: 1px solid #d5dae2;
        &:focus {
          box-shadow: 0 0 25px rgba(52,152,219,.1);
          border-color: rgba(52,152,219,.5);
          outline: 0;
        }
      }
      .suc {
        display: inline-block;
        color: #00c9a7;
        background: rgba(0,201,167,.1);
        height: 28px;
        padding: 0 10px;
        line-height: 28px;
        border-radius: 4px;
      }
      .fail {
        display: inline-block;
        color: #de4437;
        background-color: rgba(222,68,55,.1);
        height: 28px;
        padding: 0 10px;
        line-height: 28px;
        border-radius: 4px;
      }
      .fee {
        display: inline-block;
        margin-left: 10px;
        position: relative;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        color: #77838f;
        background-color: rgba(119,131,143,.1);
        height: 26px;
        line-height: 26px;
        font-size: 13px;
        padding: 0 10px 0 20px;
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          content: "";
          border-top: 13px solid transparent;
          border-bottom: 13px solid transparent;
          border-left: 13px solid #fff;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .detailBox {
      align-items: center;
      .detail {
        flex: 3;
        word-break: break-all;
        line-height: 20px;
      }
    }
  }
  @media (max-width: 480px) {
    .detailBox {
      .detail {
        flex: 7
      }
      .name {
        flex: 3;
      }
      .mobile {
        line-height: 26px;
        padding: 5px 0;
        .position {
          display: inline-block;
          margin-left: 0;
        }
      }
    }
  }
</style>

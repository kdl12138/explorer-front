<template>
  <div id="home" class="w1200">
    <h3>{{$t('nav.rank')}}</h3>
    <section id="lists" class="clearfix">
      <div class="blockList box fl">
        <h3>{{$t('rank.assets')}}</h3>
        <div class="scrollBox">
          <div class="loading" v-if="assets.length===0 && !noRecord1">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-if="noRecord1">
            <p>{{$t('global.noData')}}</p>
          </div>
          <ul class="lists" v-if="assets.length && !noRecord1">
            <li>
              <div class="rank">{{$t("global.rank")}}</div>
              <div class="address">{{$t("table.address")}}</div>
              <div class="assets">{{$t("table.asset")}}</div>
            </li>
            <li v-for="item in assets" :key='item.number'>
              <div class="rank" :class="{'rank1': item.rank === 1,'rank2': item.rank === 2,'rank3': item.rank === 3}">NO.{{item.rank}}</div>
              <div class="address">
                <router-link class="hashLink" :to="`/address/${item.address}`">{{ item.address }}</router-link>
              </div>
              <div class="assets">{{ item.asset | fixNum(4)}} <span>Vns</span></div>
            </li>
          </ul>
        </div>
        <div class="all">
          <router-link to='/rank/assets'>{{$t('global.more')}}</router-link>
        </div>
      </div>
      <div class="transactionlist box fr">
        <h3>{{$t('rank.miners')}}</h3>
        <div class="scrollBox">
          <div class="loading" v-if="miners.length===0 && !noRecord2">
            <img src="~@/assets/img/loading.gif">
          </div>
          <div class="noRecord" v-if="noRecord2">
            <p>{{$t('global.noData')}}</p>
          </div>
          <ul class="lists" v-if="miners.length && !noRecord2">
            <li>
              <div class="rank">{{$t("global.rank")}}</div>
              <div class="address">{{$t("table.address")}}</div>
              <div class="assets">{{$t("block.reward")}}</div>
              <div class="assets">{{$t("block.uncleReward")}}</div>
            </li>
            <li v-for="item in miners" :key='item.number'>
              <div class="rank" :class="{'rank1': item.rank === 1,'rank2': item.rank === 2,'rank3': item.rank === 3}">NO.{{item.rank}}</div>
              <div class="address">
                <router-link class="hashLink" :to="`/address/${item.address}`">{{ item.address }}</router-link>
              </div>
              <div class="assets">{{ item.blockReward }} <span>Vns</span></div>
              <div class="assets">{{ item.uncleReward }} <span>Vns</span></div>
            </li>
          </ul>
        </div>
        <div class="all">
          <router-link to='/rank/miners'>{{$t('global.more')}}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      assets: [],
      miners: [],
      noRecord1: false,
      noRecord2: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getAssets()
      this.getMiners()
    },
    getAssets () {
      this.$http({
        method: 'post',
        url: '/api/vns/stat/rankAsset',
        dataType: 'json',
        data: {
          'page': 1,
          'limit': 10
        }
      }).then(res => {
        this.assets = res.data.result.ranks
        if (this.assets.length === 0) {
          this.noRecord1 = true
        }
      })
    },
    getMiners () {
      this.$http({
        method: 'post',
        url: '/api/vns/stat/rankMiner',
        dataType: 'json',
        data: {
          'page': 1,
          'limit': 10
        }
      }).then(res => {
        this.miners = res.data.result.ranks
        if (this.miners.length === 0) {
          this.noRecord2 = true
        }
      })
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
}
#lists {
  font-size: 13px;
  &>div {
    margin-left: 20px;
    width: calc(50% - 10px);
    &:first-child {
      margin-left: 0;
    }
    h3 {
      line-height: 44px;
      padding: 0 10px;
      border-bottom: 1px solid #e7eaf3;
      font-size: 14px;
      color: #4a4f55;
      font-weight: bold;
    }
    .scrollBox {
      height: 440px;
      width: calc(100% - 20px);
      background: none;
      overflow: auto;
      margin-right: 0;
      padding-right: 0;
      margin: 0 10px;
      box-sizing: border-box;
      position: relative;
    }
    
  }
  .lists {
    width: 100%;
    height: 400px;
    .hashLink {
      max-width: 200px;
    }
    li {
      padding: 12px 0;
      height: 40px;
      border-bottom: 1px solid #e7eaf3;
      display: flex;
      div {
        flex: 2;
        &:first-child {
          flex: 1;
        }
        &.assets {
          text-align: right;
          color: #4e4e4e;
          span {
            color: #3498db;
          }
        }
      }
      .rank1 {
        color: #fecf01;
      }
      .rank2 {
        color: #c3d1e6;
      }
      .rank3 {
        color: #ecc7b1;
      }
    }
  }
  .all {
    height: 54px;
    padding: 12px 10px;
    a {
      display: block;
      height: 30px;
      line-height: 30px;
      width: 100%;
      text-align: center;
      color: #3498db;
      background: rgba(52,152,219,.1);
      font-size: 12px;
      &:hover {
        color: #fff;
        background: #3498db;
        box-shadow: 0 4px 11px rgba(52,152,219,.35);
      }
    }
  }
}
@media (max-width: 992px) {
  #lists {
    &>div {
      width: 100%;
      margin-left: 0;
      &:first-child {
        margin-bottom: 40px;
      }
      .lists {
        .hashLink {
          max-width: 300px;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  #lists {
    &>div {
      .lists {
        .hashLink {
          max-width: 220px;
        }
      }
    }
  }
}
@media (max-width: 480px) {
  #lists {
    &>div {
      .lists {
        .hashLink {
          max-width: 130px;
        }
      }
    }
  }
}
</style>

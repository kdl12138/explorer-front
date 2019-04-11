<template>
  <section id='footer'>
    <div class="wrap w1200">
      <div class="mobile">
        <h3>
          <img src="~@/assets/logo1.svg" alt="">
          <span>{{$t('footer.powerBy')}}</span>
        </h3>
        <p class="desc">{{$t('footer.desc')}}</p>
      </div>
      <div class='detail'>
        <h4>{{$t('footer.company')}}</h4>
        <router-link to="">{{$t('footer.about')}}</router-link>
        <router-link to="">{{$t('footer.ad')}}</router-link>
        <router-link to="">{{$t('footer.contact')}}</router-link>
        <router-link to="">{{$t('footer.service')}}</router-link>
      </div>
      <div class='detail'>
        <h4>{{$t('footer.community')}}</h4>
        <router-link to="">{{$t('footer.apis')}}</router-link>
        <router-link to="">{{$t('footer.reddit')}}</router-link>
        <router-link to="">{{$t('footer.knowledge')}}</router-link>
        <router-link to="">{{$t('footer.comments')}}</router-link>
      </div>
      <div class='detail'>
        <h4>{{$t('footer.social')}}</h4>
        <router-link to=""><i class="fa fa-twitter"></i>{{$t('footer.twitter')}}</router-link>
        <router-link to=""><i class="fa fa-facebook"></i>{{$t('footer.facebook')}}</router-link>
        <router-link to=""><i class="fa fa-medium"></i>{{$t('footer.medium')}}</router-link>
      </div>
    </div>
    <div class="donate w1200">
      <router-link to="">VNSBlock © 2019 (B)</router-link>
      <router-link to="/address/0x7a7aa1489a3d8dc6e4538bf8e79167acaefc90fd">{{$t('footer.donate')}} 
        <span id="id">0x7a7aa1489a3d8dc6e4538bf8e79167acaefc90fd</span>
        <div class="iconBg">
          <tips :text="tipText" :show="showTip"></tips>
          <i class="fa fa-copy id" @mouseenter="showTip=true" @mouseleave="resetTip" data-clipboard-target='#id'></i>
        </div>
        <div class="iconBg">
          <tips :text="tipQrText" :show="showQrTip"></tips>
          <qrcode :show='showQr' :address='`0x7a7aa1489a3d8dc6e4538bf8e79167acaefc90fd`'></qrcode>
          <i class="fa fa-qrcode" @click="showQr=true" @mouseenter="showQrTip=true" @mouseleave="showQrTip=false"></i>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import Clipboard from 'clipboard'
import tips from "@/components/tips.vue"
import qrcode from "@/components/qrcode.vue"
import bus from "@/assets/js/bus.js"

export default {
  name: 'foot',
  data () {
    return {
      tipText: this.$t('tips.copyAddress'),
      showTip: false,
      tipQrText: this.$t('tips.showQr'),
      showQr: false,
      showQrTip: false,
    }
  },
  components: {
    tips,
    qrcode
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
    }
  }
}
</script>

<style lang="scss" scoped>
  #footer {
    width: 100%;
    margin-top: -256px;
    background: linear-gradient(150deg,#19a0ff,#2d1582);
    background-attachment: fixed;
    color: #ffffff;
    .wrap {
      padding: 20px 0;
      display: flex;
      &>div {
        flex: 1;
        margin-left: 90px;
        &:first-child {
          margin-left: 0;
          flex: 1.5;
        }
      }
      h3 {
        img {
          width: 24px;
          vertical-align: -5px;
          margin-right: 15px;
        }
        font-size: 20px;
        margin-bottom: 20px;
      }
      p {
        line-height: 22px;
        max-width: 240px;
      }
      .detail {
        a {
          display: block;
          line-height: 28px;
          color: hsla(0,0%,100%,.7);
          &:hover {
            color: #ffffff;
          }
          i {
            width: 20px;
          }
        }
        h4 {
          font-size: 14px;
          line-height: 26px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(231,234,243,.2);
          max-width: 180px;
          padding-bottom: 6px;
          font-weight: bold;
        }
      }
    }
    .donate {
      margin-top: 10px;
      border-top: 1px solid #e7eaf3;
      line-height: 50px;
      padding-bottom: 0;
      display: flex;
      a {
        flex: 1;
        font-size: 13px;
        color: #ffffff;
        &:last-child {
          text-align: right;
        }
        span {
          color: hsla(0,0%,100%,.7);
        }
      }
      .iconBg {
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 13px;
        background: rgba(119,131,143,.1);
        margin-left: 5px;
        position: relative;
      }
    }
  }

  @media (max-width: 768px) {
    #footer {
      .wrap {
        display: block;
        .mobile {
          display: block;
          width: 100%;
          padding: 0 15px;
          margin-bottom: 20px;
          p {
            max-width: 100%;
          }
        }
        .detail {
          width: calc(50% - 15px);
          display: inline-block;
          margin-left: 15px;
          &:nth-child(n+4) {
            display: none;
          }
        }
      }
      .donate {
        display: block;
        width: calc(100% - 50px);
        padding: 10px 0;
        a {
          display: block;
          line-height: 26px;
          &:last-child {
            text-align: left;
          }
        }
      }
    }
  }
</style>

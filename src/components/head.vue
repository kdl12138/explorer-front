<template>
  <header>
    <div class="wrap w1200 clearfix" :class="{'isMobile': isMobile}">
      <span class="logo" @click="reload"><img src="~@/assets/logo.svg" alt="Logo"></span>
      <span class="menu fr" @click="showMenu=!showMenu">
        <i class="fa fa-bars"></i>
      </span>
      <div class="rightCon fr">
        <div class="form" @keydown.enter="getSearch">
          <div class="inputBox">
            <input type="text" v-model="search"  placeholder="Address / Txhash / Block / Token">
            <span class="btn" @click="getSearch">{{$t('global.search')}}</span>
          </div>
        </div>
        <nav>
          <ul v-if="showMenu" class="clearfix fr">
            <li><span @click="reload">{{$t('nav.home')}}</span></li>
            <li @mouseenter="handleMouse('showBlock',true)" @mouseleave="handleMouse('showBlock',false)">
              <span class="more" @click="showBlock=!showBlock">Blockchain<i class="fa fa-angle-down"></i></span>
              <div class="dropmenu box" v-if="showBlock">
                <p><router-link to="/blocks">{{$t('nav.allBlock')}}</router-link></p>
                <p><router-link to="/txs">{{$t('nav.allTxn')}}</router-link></p>
                <p><router-link to="/uncles">{{$t('nav.uncles')}}</router-link></p>
              </div>
            </li>
            <li>
              <router-link class="more" to="/rank">{{$t('nav.rank')}}</router-link>
            </li>
            <li @mouseenter="handleMouse('showLang',true)" @mouseleave="handleMouse('showLang',false)">
              <span class="more" @click="showLang=!showLang">{{language}}<i class="fa fa-angle-down"></i></span>
              <div class="dropmenu lang box" v-if="showLang">
                <p><span @click="changeLang('zh', '中文')">中文</span></p>
                <p><span @click="changeLang('en', 'English')">English</span></p>
              </div>
            </li>
            <li>
              <router-link to="/k">{{$t('nav.k')}}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'isHead',
  data () {
    return {
      showBlock: false,
      showLang: false,
      isMobile: false,
      showMenu: true,
      language: '',
      search: "",
      languages: {
        zh: '中文',
        en: 'English'
      }
    }
  },
  created () {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        if (this.isMobile) {
          this.showMenu = false
        }
      }
    })
    var lang = localStorage.getItem('language')
    this.language = this.languages[lang] || '中文'
    if (lang) {
      this.$i18n.locale = lang
    }
  },
  mounted () {
    var w = document.body.clientWidth
    this.isMobile = w <= 992
    if (this.isMobile) {
      this.showMenu = false
    } else {
      this.showMenu = true
    }
  },
  methods: {
    reload () {
      if (this.$route.name === 'home') {
        this.$router.go(0)
      } else {
        this.$router.push('/')
      }
    },
    resetNav () {
      this.showLang = false
      this.showBlock = false
    },
    handleMouse (target, bool) {
      if (this.isMobile) return
      this[target] = bool
    },
    changeLang (lang, text) {
      this.$i18n.locale = lang
      this.language = text
      this.showLang = false
      localStorage.setItem('language', lang)
      if (this.isMobile) {
        this.showMenu = false
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
    '$route' () {
      if (this.isMobile) {
        this.showMenu = false
        this.resetNav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    background-color: #fff;
    box-shadow: 0 1px 10px rgba(151,164,175,.1);
    min-height: 54px;
    width: 100%;
    box-sizing: border-box;
    .wrap {
      padding-bottom: 0;
      .logo {
        line-height: 54px;
        cursor: pointer;
        img {
          vertical-align: middle;
          height: 38px;
        }
      }
    }
    nav {
      height: 54px;
      line-height: 54px;
      li {
        float: left;
        position: relative;
        &:hover {
          a, span {
            color: #3498db;
          }
        }
        a, span {
          cursor: pointer;
          display: block;
          color: #6c757e;
          line-height: 54px;
          padding: 0 16px;
          font-size: 14px;
        }
        .more {
          position: relative;
          i {
            font-size: 16px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
      }
      .dropmenu {
        position: absolute;
        z-index: 30;
        width: auto;
        background-color: #fff;
        border-top: 2px solid #3498db;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: 0 8px 20px rgba(52,152,219,.075);
        padding: 15px 0;
        p {
          line-height: 32px;
          margin: 0;
          padding: 0 20px;
          a, span {
            line-height: 32px;
            padding: 0;
            color: #6c757e;
            white-space: nowrap;
            &:hover {
              color: #3498db;
            }
          }
        }
      }
      .lang {
        right: 0;
      }
    }
    .form {
      float: right;
      width: 420px;
      height: 36px;
      margin-top: 10px;
      .inputBox {
        display: flex;
        background: #ffffff;
        border-radius: 4px 0 0 4px;
        height: 36px;
        position: relative;
        z-index: 10;
        input {
          flex: 1;
          padding: 13px 8px 11px;
          box-sizing: border-box;
          line-height: 36px;
          height: 36px;
          width: 100%;
          border: 1px solid #d5dae2;
          border-radius: .25rem;
          transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .btn {
          width: 60px;
          background: #3498db;
          text-align: center;
          line-height: 36px;
          border-radius: 0 4px 4px 0;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .menu {
      display: none;
    }
  }
  @media (max-width: 992px) {
    .isMobile {
      position: relative;
      z-index: 20;
      width: 100%;
      padding-bottom: 0;
      // padding: 0 2%;
      .logo {
        margin-left: 2%;
      }
      .menu {
        display: block;
        cursor: pointer;
        margin-right: 2%;
        i {
          font-size: 24px;
          line-height: 54px;
        }
      }
      nav {
        width: 100%;
        height: auto;
        position: absolute;
        z-index: 20;
        background: #ffffff;
        box-shadow: 0 8px 20px rgba(52,152,219,.075);
        li {
          line-height: 40px;
        }
      }
      ul {
        width: 100%;
        padding-bottom: 15px;
        li {
          float: none;
          a, span {
            line-height: 40px;
            i {
              float: right;
              margin-top: 12px;
            }
          }
          .dropmenu {
            position: static;
            border: 0;
            width: 100%;
            padding: 0;
            box-shadow: none;
          }
        }
      }
    }
  }
</style>

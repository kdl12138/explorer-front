<template>
  <section id='pages'>
    <router-link :to="`${url}?page=1`" :class="{'clickAble': curIndex !== 1}">{{$t('page.first')}}</router-link>
    <router-link :to="`${url}?page=${prev}`" :class="{'clickAble': curIndex !== 1}"><i class="fa fa-angle-left"></i></router-link>
    <span>Page {{curIndex}} of {{total}}</span>
    <router-link :to="`${url}?page=${next}`" :class="{'clickAble': next !== +total}"><i class="fa fa-angle-right"></i></router-link>
    <router-link :to="`${url}?page=${total}`" :class="{'clickAble': curIndex !== +total}">{{$t('page.last')}}</router-link>
  </section>
</template>

<script>
export default {
  name: 'page',
  props: ['total', 'url', 'index'],
  computed: {
    prev () {
      return +this.index > 1 ? +this.index - 1 : 1
    },
    next () {
      return +this.index < +this.total ? +this.index + 1 : +this.total
    },
    curIndex () {
      return +this.index > 1 ? +this.index : 1
    }
  }
}
</script>

<style lang="scss" scoped>
  #pages {
    display: flex;
    a, span {
      margin-left: 3px;
      height: 28px;
      line-height: 28px;
      padding: 0 8px;
      background-color: rgba(52,152,219,.1);
      color: #8c98a4;
      border-radius: 3px;
      font-size: 13px;
      cursor: default;
    }
    a.clickAble {
      color: #3498db;
      cursor: pointer;
      &:hover {
        background-color: #3498db;
        color: #fff;
      }
    }
    a {
      i {
        font-size: 20px;
        vertical-align: -2px;
        font-weight: bold;
      }
    }
  }
</style>

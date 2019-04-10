<template>
  <div class="page_404">
    <img src="~assets/img/404.png" >
    <p>页面走丢了...<router-link to="/">返回首页</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'notFound'
}
</script>

<style lang='scss' scoped>
  .page_404 {
    position: fixed;
    width: 400px;
    height: 270px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -210px;
    img {
      display: block;
      // margin: auto;
      // margin-top: 20%;
    }
    p {
      text-align: center;
    }
  }
  @media (max-width: 430px) {
    img{
      width: 100%
    }
    .page_404{
      padding: 0 15px;
    }
  }
</style>

<template>
  <section class="qrcode" v-if="show">
    <div class="dialog">
      <div class="mask"></div>
      <div class="diaCon">
        <i class="fa fa-times close" @click="closeDia"></i>
        <p>{{address}}</p>
        <div>
          <qrcodes :value='address' :size='300'></qrcodes>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import qrcodes from "qrcode.vue"
import bus from "@/assets/js/bus.js"

export default {
  name: "qrcode",
  props: ['show', 'address'],
  components: {
    qrcodes
  },
  methods: {
    closeDia () {
      bus.$emit('hideQr')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    .diaCon {
      background: #ffffff;
      width: 400px;
      height: 400px;
      padding: 0 20px;
      margin-left: -200px;
      margin-top: -200px;
      border-radius: 6px;
      p {
        line-height: 40px;
        font-size: 14px;
        padding-top: 10px;
        padding-bottom: 10px;
        color: #000000;
      }
    }
  }
</style>


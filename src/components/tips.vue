<template>
  <section id="tips" v-if="show" :class="{'tip': tipOffset}">
    <p>{{text}}</p>
  </section>
</template>

<script>
export default {
  name: 'tips',
  props: ['text','show', 'tipOffset']
}
</script>

<style lang="scss" scoped>
  #tips {
    position: absolute;
    line-height: 32px;
    white-space: nowrap;
    color: #fff;
    background: #1e2022;
    font-size: 12px;
    border-radius: 4px;
    transform: translate(calc(-50% + 13px), -120%);
    &.tip {
      transform: translate(calc(-50% + 13px), -80%);
    }
    p {
      padding: 0 12px;
    }
    &::before {
      display: block;
      content: '';
      position: absolute;
      bottom: -7px;
      left: calc(50% - 7px);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 7px solid #1e2022;
    }
  }
</style>

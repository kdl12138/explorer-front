<template>
    <div :id="id"  :option="option"></div>
</template>

<script>
    import HighCharts from 'highcharts'
    export default {
        name: "charts",
        // 验证类型
        props: {
            id: {
                type: String
            },
            option: {
                type: Object
            }
        },
        watch: {
            option() {
                HighCharts.chart(this.id, this.option);
            }
        },
        mounted() {
            HighCharts.chart(this.id,this.option)
        }
    }
</script>

<style scoped>

</style>
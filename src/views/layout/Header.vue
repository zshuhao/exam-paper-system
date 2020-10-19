
<template>
    <div>

    </div>
</template>

<script>
const config = require(`../../../config/app.${process.env}.json`)

export default {
    name: 'Header',
    data () {
        return {
            activeIdx: '',
            kthost: config.ktApi
        }
    },
    computed: {
        userInfo () {
            return this.$store.getters.getUserInfo
        },
        menuList () {
            return this.$store.getters.getMenus
        }
    },
    methods: {
        loginOut () {
            this.$emit('loginOut')
        }
    }
}
</script>

<style lang="less" scoped>

</style>

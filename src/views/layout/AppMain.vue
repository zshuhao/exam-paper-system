<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <!-- <keep-alive :include="cachedViews"> -->
                <router-view :key="key" />
            <!-- </keep-alive> -->
        </transition>
    </section>
</template>
<script>
export default {
    name: 'AppMain',
    computed: {
        // cachedViews() {
        // return this.$store.state.tagsView.cachedViews
        // },
        key () {
            return this.$route.path
        }
    }
}
</script>
<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

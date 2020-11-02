<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>

export default {
    name: 'Breadcrumb',
    data () {
        return {
            levelList: null
        }
    },
    watch: {
        $route (route) {
            // if you go to the redirect page, do not update the breadcrumbs
            // if (route.path.startsWith('/redirect/')) {
            //     return
            // }
            this.getBreadcrumb()
        }
    },
    created () {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb () {
            // only show routes with meta.title
            console.log(this.$route)
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
            const first = matched[0]

            if (!this.isDashboard(first)) {
                matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
            }

            this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        },
        isDashboard (route) {
            const name = route && route.name
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
        },
        handleLink () {

        }
    }
}
</script>

<style lang="less" scoped>
.app-breadcrumb {
    margin-left: 5px;
    height: 50px;
    line-height: 50px;
    float: left;
}
.no-redirect {
    color: #97a8be;
    cursor: text;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

</style>

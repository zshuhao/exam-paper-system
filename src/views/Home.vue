<template>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
// import {} from ''
export default {
    name: 'Home',
    data () {
        return {
        }
    },
    methods: {
        handleClick () {
            const a = [1, 2, 3]
            const b = a.map(i => i + 1)
            const c = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('yes')
                }, 100)
            })
            c.then(res => {
                console.log(res)
            })
            console.log(b)
        }
    }
}
</script>

<style lang="less" scoped>

.el-container {
    height: 100%;
    .el-aside {
        background: #999;
    }
}
</style>

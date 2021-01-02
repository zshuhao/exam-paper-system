<template>
    <div>
        <el-button size="medium" type="primary">添加</el-button>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="roleId" label="编号"></el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column prop="num" label="人数"></el-table-column>
                <el-table-column prop="action" label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini">查看</el-button>
                        <el-button type="text" size="mini">编辑</el-button>
                        <el-button class="red" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class="fl-right"
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
// import {} from ''
export default {
    name: 'Roles',
    data () {
        return {
            tableData: []
        }
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
.table-contianer {
    margin: 20px 0;
}
</style>

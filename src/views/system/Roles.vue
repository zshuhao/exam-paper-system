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
            tableData: [
                {
                    id: 1,
                    roleId: '0001',
                    roleName: '超级管理员',
                    num: 2
                },
                {
                    id: 2,
                    roleId: '0002',
                    roleName: '管理员',
                    num: 6
                },
                {
                    id: 3,
                    roleId: '0003',
                    roleName: '普通员工',
                    num: 10
                },
                {
                    id: 4,
                    roleId: '0004',
                    roleName: '其他',
                    num: 30
                },
                {
                    id: 5,
                    roleId: '0005',
                    roleName: '保洁',
                    num: 50
                },
                {
                    id: 6,
                    roleId: '0006',
                    roleName: '保安',
                    num: 100
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.table-contianer {
    margin: 20px 0;
}
</style>

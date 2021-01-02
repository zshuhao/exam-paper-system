<template>
    <div>
        <el-button size="medium" type="primary" @click="dialogVisible = true; dialogtitle = '添加'; isAdd = true">添加</el-button>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="role_id" label="编号"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="num" label="人数"></el-table-column>
                <el-table-column prop="action" label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="onAction('edit', scope.row)">编辑</el-button>
                        <el-popconfirm
                            title="确定要删除吗？"
                            @onConfirm="onAction('delete', scope.row)"
                        >
                            <el-button class="red" slot="reference" type="text" size="mini">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="dialogtitle"
            :visible.sync="dialogVisible"
            width="700"
            :before-close="onAddCancel"
        >
            <el-form ref="addForm" :model="addForm" :rules="addFormRules" size="medium" label-width="120px">
                <el-form-item label="角色名称" prop="name">
                    <el-input class="wh-400" v-model="addForm.name" clearable placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <div class="tree-box">
                        <el-tree
                            ref="tree"
                            :data="permissions"
                            :props="defaultProps"
                            show-checkbox
                            node-key="id"
                        >
                        </el-tree>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAddUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { roleList, queryPermissions, addRole, editRole, deleteRole } from '../../api/system'
import { formatTree } from '../../utils/tool'
export default {
    name: 'Roles',
    data () {
        return {
            tableData: [],
            permissions: [],
            dialogVisible: false,
            dialogtitle: '添加',
            isAdd: true,
            addForm: {
                name: ''
            },
            addFormRules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'change' }]
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            row: {}
        }
    },
    mounted () {
        this.initData()
        this.getPermissions()
    },
    methods: {
        async initData () {
            const res = await roleList(this.searchForm)
            if (res.success) {
                this.tableData = res.data || []
            }
        },
        async getPermissions () {
            const res = await queryPermissions()
            if (res.success) {
                const data = res.data || []
                const tree = formatTree(data, null)
                this.permissions = tree
            }
        },
        onAddCancel (done) {
            this.$refs.addForm.resetFields()
            this.$refs.tree.setCheckedKeys([])
            done()
        },
        onAddUser () {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    if (this.isAdd) {
                        const params = {
                            ...this.addForm,
                            permission: this.$refs.tree.getCheckedKeys()
                        }
                        const res = await addRole(params)
                        if (res.success) {
                            this.$message.success('添加成功！')
                            this.initData()
                            this.dialogVisible = false
                        }
                    } else {
                        const params = {
                            ...this.addForm,
                            id: this.row.role_id,
                            permission: this.$refs.tree.getCheckedKeys()
                        }
                        const res = await editRole(params)
                        if (res.success) {
                            this.$message.success('修改成功！')
                            this.initData()
                            this.dialogVisible = false
                        }
                    }
                }
            })
        },
        async onAction (type, row) {
            console.log(type, row)
            if (type === 'edit') {
                this.dialogVisible = true
                this.dialogtitle = '编辑'
                this.$nextTick(() => {
                    this.$refs.tree.setCheckedKeys(row.permission.split(','))
                })
                this.addForm.name = row.role_name
                this.row = row
                this.isAdd = false
            } else {
                const res = await deleteRole({ id: row.role_id })
                if (res.success) {
                    this.$message.success('删除成功！')
                    this.initData()
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.table-contianer {
    margin: 20px 0;
}
.tree-box {
    height: 300px;
    overflow-y: auto;
}
</style>

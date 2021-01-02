<template>
    <div>
        <el-button size="medium" type="primary" @click="dialogVisible = true; dialogtitle = '添加'; isAdd = true">添加</el-button>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="d_id" label="编号"></el-table-column>
                <el-table-column prop="d_name" label="学院"></el-table-column>
                <el-table-column prop="action" label="操作" align="center">
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
            width="700px"
            :before-close="onAddCancel"
        >
            <el-form ref="addForm" :model="addForm" :rules="addFormRules" size="medium" label-width="120px">
                <el-form-item label="学院名称" prop="name">
                    <el-input class="wh-400" v-model="addForm.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { queryDepartmentList, addDepartment, editDepartment, deleteDepartmen } from '../api/department'
export default {
    name: 'Department',
    data () {
        return {
            tableData: [],
            dialogVisible: false,
            dialogtitle: '添加',
            isAdd: true,
            addForm: {
                name: ''
            },
            addFormRules: {
                name: [{ required: true, message: '请输入学院名称', trigger: 'change' }]
            },
            row: {}
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        async initData () {
            const res = await queryDepartmentList()
            if (res.success) {
                this.tableData = res.data || []
            }
        },
        onAddCancel (done) {
            this.$refs.addForm.resetFields()
            done()
        },
        onAdd () {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    if (this.isAdd) {
                        const params = {
                            ...this.addForm
                        }
                        const res = await addDepartment(params)
                        if (res.success) {
                            this.$message.success('添加成功！')
                            this.initData()
                            this.dialogVisible = false
                        }
                    } else {
                        const params = {
                            ...this.addForm,
                            id: this.row.d_id
                        }
                        const res = await editDepartment(params)
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
            if (type === 'edit') {
                this.dialogVisible = true
                this.dialogtitle = '编辑'
                this.addForm.name = row.d_name
                this.row = row
                this.isAdd = false
            } else {
                const res = await deleteDepartmen({ id: row.d_id })
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

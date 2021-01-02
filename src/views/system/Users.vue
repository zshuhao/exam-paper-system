<template>
    <div>
        <el-form inline size="medium">
            <el-form-item>
                <el-select class="wh-200" v-model="searchForm.role" clearable placeholder="请选择角色">
                    <el-option
                        v-for="item in roleData"
                        :key="item.role_id"
                        :value="item.role_id"
                        :label="item.role_name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input class="wh-200" v-model="searchForm.user" clearable placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >查询</el-button>
                <el-button type="primary" @click="dialogVisible = true">添加</el-button>
            </el-form-item>
        </el-form>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe>
                <el-table-column prop="user_id" label="用户编号"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column label="用户角色">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.role_name }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
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
        <div class="footer">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="searchForm.pageNo"
                @current-change="initData"
                :total="totle">
            </el-pagination>
        </div>
        <el-dialog
            :title="dialogtitle"
            :visible.sync="dialogVisible"
            width="700"
            :before-close="onAddUserCancel"
        >
            <el-form ref="addForm" :model="addUserForm" :rules="addFormRules" size="medium" label-width="120px">
                <el-form-item label="用户名" prop="name">
                    <el-input class="wh-400" v-model="addUserForm.name" clearable placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input class="wh-400" v-model="addUserForm.phone" clearable placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="role">
                    <el-select class="wh-400" v-model="addUserForm.role" clearable placeholder="请选择角色">
                        <el-option
                            v-for="item in roleData"
                            :key="item.role_id"
                            :value="item.role_id"
                            :label="item.role_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input class="wh-400" v-model="addUserForm.password" clearable placeholder="请输入密码"></el-input>
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
import { userList, roleList, addUser, editUser, deleteUser } from '../../api/user'
export default {
    name: 'Users',
    data () {
        return {
            tableData: [],
            roleData: [],
            searchForm: {
                role: '',
                user: '',
                pageNo: 1,
                pageSize: 10
            },
            totle: 0,
            dialogVisible: false,
            dialogtitle: '添加',
            isAdd: true,
            addUserForm: {
                name: '',
                phone: '',
                role: '',
                password: ''
            },
            row: {},
            addFormRules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
                role: [{ required: true, message: '请选择角色', trigger: 'change' }],
                password: [{ required: true, message: '请输入密码', trigger: 'change' }]
            }
        }
    },
    mounted () {
        this.initData()
        this.getRoleList()
    },
    methods: {
        async initData () {
            const res = await userList(this.searchForm)
            if (res.success) {
                this.tableData = res.data.data || []
                this.totle = res.data.count
            }
        },
        onAddUserCancel (done) {
            this.$refs.addForm.resetFields()
            done()
        },
        onAddUser () {
            this.$refs.addForm.validate(async (valid) => {
                if (valid) {
                    if (this.isAdd) {
                        const res = await addUser(this.addUserForm)
                        if (res.success) {
                            this.$message.success('添加成功！')
                            this.initData()
                            this.dialogVisible = false
                        }
                    } else {
                        const params = {
                            id: this.row.user_id,
                            ...this.addUserForm
                        }
                        const res = await editUser(params)
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
                this.addUserForm.name = row.user_name
                this.addUserForm.phone = row.phone
                this.addUserForm.role = row.role_id
                this.addUserForm.password = row.password
                this.row = row
                this.isAdd = false
            } else {
                const res = await deleteUser({ id: row.user_id })
                if (res.success) {
                    this.$message.success('删除成功！')
                    this.initData()
                }
            }
        },
        async getRoleList () {
            const res = await roleList()
            if (res.success) {
                this.roleData = res.data || []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.table-contianer {
    margin-bottom: 20px;
}
.footer {
    display:  flex;
    justify-content: flex-end;
    align-items: center;
}
</style>

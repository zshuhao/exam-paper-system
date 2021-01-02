<template>
    <div>
        <!-- <el-form inline size="medium">
            <el-form-item>
                <el-select class="wh-200" v-model="searchForm.role" clearable placeholder="请选择角色">
                    <el-option :value="1" label="超级管理员"></el-option>
                    <el-option :value="2" label="管理员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input class="wh-200" v-model="searchForm.user" clearable placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form> -->
        <el-button size="medium" type="primary" @click="dialogVisible = true; dialogtitle = '添加'; isAdd = true">添加</el-button>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="c_id" label="编号"></el-table-column>
                <el-table-column prop="c_name" label="科目"></el-table-column>
                <el-table-column label="所属专业">
                    <template slot-scope="scope">
                        {{ findProfession(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column label="所属学院">
                    <template slot-scope="scope">
                        {{ findDepartment(scope.row) }}
                    </template>
                </el-table-column>
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
            width="700px"
            :before-close="onAddCancel"
        >
            <el-form ref="addForm" :model="addForm" :rules="addFormRules" size="medium" label-width="120px">
                <el-form-item label="科目名称" prop="name">
                    <el-input class="wh-400" v-model="addForm.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属学院" prop="departmentId">
                    <el-select class="wh-400" v-model="addForm.departmentId" @change="onDepartmentChange" clearable placeholder="请选择">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.d_id"
                            :value="item.d_id"
                            :label="item.d_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属专业" prop="professionId">
                    <el-select class="wh-400" v-model="addForm.professionId" clearable placeholder="请选择" :no-data-text="addForm.departmentId ? '无数据' : '请先选择所属学院'">
                        <el-option
                            v-for="item in professionSelectOptions"
                            :key="item.p_id"
                            :value="item.p_id"
                            :label="item.p_name"
                        ></el-option>
                    </el-select>
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
import { queryDepartmentList, queryProfessionList, queryCourseList, addCourse, editCourse, deleteCourse } from '../api/department'
export default {
    name: 'Department',
    data () {
        return {
            tableData: [],
            departmentList: [],
            professionList: [],
            professionSelectOptions: [],
            dialogVisible: false,
            dialogtitle: '添加',
            isAdd: true,
            addForm: {
                name: '',
                departmentId: '',
                professionId: ''
            },
            addFormRules: {
                name: [{ required: true, message: '请输入科目名称', trigger: 'change' }],
                departmentId: [{ required: true, message: '请选择所属学院', trigger: 'change' }],
                professionId: [{ required: true, message: '请选择所属专业', trigger: 'change' }]
            },
            row: {}
        }
    },
    mounted () {
        this.initData()
        this.getDepartmentList()
        this.getProfessionList()
    },
    methods: {
        async initData () {
            const res = await queryCourseList()
            if (res.success) {
                this.tableData = res.data || []
            }
        },
        async getDepartmentList () {
            const res = await queryDepartmentList()
            if (res.success) {
                this.departmentList = res.data || []
            }
        },
        async getProfessionList () {
            const res = await queryProfessionList()
            if (res.success) {
                this.professionList = res.data || []
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
                        const res = await addCourse(params)
                        if (res.success) {
                            this.$message.success('添加成功！')
                            this.initData()
                            this.dialogVisible = false
                        }
                    } else {
                        const params = {
                            ...this.addForm,
                            id: this.row.c_id
                        }
                        const res = await editCourse(params)
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
                this.addForm.name = row.c_name
                this.addForm.departmentId = row.d_id
                this.addForm.professionId = row.p_id
                this.row = row
                this.isAdd = false
            } else {
                const res = await deleteCourse({ id: row.c_id })
                if (res.success) {
                    this.$message.success('删除成功！')
                    this.initData()
                }
            }
        },
        onDepartmentChange (e) {
            this.addForm.professionId = ''
            this.professionSelectOptions = this.professionList.filter(item => item.d_id === e)
        },
        findDepartment (row) {
            const data = this.departmentList.find(item => item.d_id === row.d_id)
            return data ? data.d_name : ''
        },
        findProfession (row) {
            const data = this.professionList.find(item => item.p_id === row.p_id)
            return data ? data.p_name : ''
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

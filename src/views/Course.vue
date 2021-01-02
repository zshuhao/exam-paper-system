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
                        <el-button type="text" size="mini" @click="onAction('set', scope.row)">设置知识点</el-button>
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
        <el-dialog
            title="知识点设置"
            :visible.sync="pointVisible"
            width="700px"
            :before-close="onPointCancel"
        >
            <div class="add">
                <el-input v-model="point" class="wh-200 input" size="mini"></el-input>
                <el-button type="text" size="mini" @click="onAddPoint">添加</el-button>
            </div>
            <div class="tree-box" v-loading="addPointLoading">
                <el-tree
                    ref="tree"
                    :data="points"
                    :props="defaultProps"
                    node-key="id"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-popover
                                placement="left"
                                width="160"
                                v-model="data.visible">
                                <el-input v-model="data.value" size="mini"></el-input>
                                <div style="text-align: right; margin-top: 10px">
                                    <el-button size="mini" type="text" @click="onAppendCancel(data)">取消</el-button>
                                    <el-button type="primary" size="mini" @click="append(data)">确定</el-button>
                                </div>
                                <el-button type="text" size="mini" @click="(e) => e.stopPropagation()" slot="reference">新增</el-button>
                            </el-popover>
                            <el-popconfirm
                                placement="left"
                                title="确定要删除吗？"
                                @onConfirm="remove(data)"
                            >
                                <el-button class="red" slot="reference" @click="(e) => e.stopPropagation()" type="text" size="mini">删除</el-button>
                            </el-popconfirm>
                        </span>
                    </span>
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pointVisible = false">取 消</el-button>
                <el-button type="primary" @click="pointVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    queryDepartmentList,
    queryProfessionList,
    queryCourseList,
    queryPoints,
    addCourse,
    editCourse,
    deleteCourse,
    addPoints,
    deletePoints
} from '../api/department'
import { formatTree } from '../utils/tool'
export default {
    name: 'Department',
    data () {
        return {
            addPointLoading: false,
            visible: false,
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
            row: {},
            pointVisible: false,
            points: [],
            point: '',
            defaultProps: {
                children: 'children',
                label: 'k_name'
            }
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
        async getPoints (cb) {
            this.addPointLoading = true
            const params = {
                id: this.row.c_id
            }
            const res = await queryPoints(params)
            if (res.success) {
                const data = res.data || []
                this.points = formatTree(data, null, 'k_id', 'k_pid')
                this.addPointLoading = false
                cb && cb()
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
            } else if (type === 'delete') {
                const res = await deleteCourse({ id: row.c_id })
                if (res.success) {
                    this.$message.success('删除成功！')
                    this.initData()
                }
            } else {
                this.row = row
                this.getPoints(() => { this.pointVisible = true })
            }
        },
        onPointCancel (done) {
            this.point = ''
            this.points = []
            done()
        },
        async onAddPoint () {
            if (this.point === '') {
                this.$message.warning('未填写内容！')
                return
            }
            const params = {
                name: this.point,
                cId: this.row.c_id
            }
            const res = await addPoints(params)
            if (res.success) {
                this.getPoints(() => {
                    this.point = ''
                })
            }
        },
        onAppendCancel (data) {
            data.value = ''
            data.visible = false
        },
        async append (data) {
            if (data.value === undefined || data.value === '') {
                this.$message.warning('未填写内容！')
                return
            }
            const params = {
                name: data.value,
                cId: this.row.c_id,
                kPid: data.k_id
            }
            const res = await addPoints(params)
            if (res.success) {
                data.visible = false
                this.getPoints()
            }
        },
        async remove (data) {
            const res = await deletePoints({ id: data.k_id })
            if (res.success) {
                this.getPoints()
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
.add {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .input {
        margin-right: 20px;
    }
}
.tree-box {
    height: 300px;
    width: 500px;
    margin: 0 auto;
    overflow-y: auto;
    .custom-tree-node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
}
</style>

<template>
    <div>
        <el-form inline size="medium">
            <el-form-item>
                <el-input class="wh-200" v-model="searchForm.examName" clearable placeholder="试卷名称"></el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-input class="wh-200" v-model="searchForm.user" clearable placeholder="创建人"></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="initData">查询</el-button>
                <el-button type="primary" @click="onAddExam">添加</el-button>
            </el-form-item>
        </el-form>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe>
                <el-table-column prop="e_id" label="ID"></el-table-column>
                <el-table-column prop="e_name" label="试卷名称"></el-table-column>
                <el-table-column prop="course" label="科目"></el-table-column>
                <el-table-column prop="user" label="创建人"></el-table-column>
                <el-table-column prop="time" label="创建时间"></el-table-column>
                <el-table-column prop="action" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="onDown(scope.row)">下载</el-button>
                        <el-button class="red" type="text" size="mini" @click="onDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { queryExamList, downExam, deleteExam } from '../api/question'
export default {
    name: 'Exam',
    data () {
        return {
            tableData: [],
            searchForm: {
                examName: '',
                user: ''
            },
            total: 0
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        onAddExam () {
            this.$router.push({
                path: '/questionBank',
                query: {
                    type: '1'
                }
            })
        },
        async initData () {
            const params = {
                pageSize: 10,
                pageNo: 1,
                ...this.searchForm
            }
            const res = await queryExamList(params)
            if (res.success) {
                this.tableData = res.data.data || []
                this.total = res.data.count
            }
        },
        async onDown (row) {
            const params = {
                id: row.e_id
            }
            const res = await downExam(params)
            console.log(res)
        },
        async onDelete (row) {
            const params = {
                id: row.e_id
            }
            const res = await deleteExam(params)
            if (res.success) {
                this.$message.success('删除成功！')
                this.initData()
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
    text-align: right;
}
</style>

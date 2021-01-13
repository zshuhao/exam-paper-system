<template>
    <div class="question-container">
        <div class="point">
            <h2 class="title">筛选项</h2>
            <div>
                <el-form class="search-form" size="medium" label-width="40px">
                    <el-form-item label="院系">
                        <el-select v-model="form.department" clearable @change="onDepChange" placeholder="请选择院系">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.d_id"
                                :value="item.d_id"
                                :label="item.d_name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="form.profession" clearable @change="onProChange" placeholder="请选择专业">
                            <el-option
                                v-for="item in professionList"
                                :key="item.p_id"
                                :value="item.p_id"
                                :label="item.p_name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科目">
                        <el-select v-model="form.course" clearable @change="onCourseChange" placeholder="请选择科目">
                            <el-option
                                v-for="item in courseList"
                                :key="item.c_id"
                                :value="item.c_id"
                                :label="item.c_name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <h2  class="title">知识点</h2>
            <div class="tree">
                <el-tree :expand-on-click-node="false" :data="pointList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
        <div class="list">
            <div class="filter">
                <div class="filter-item">
                    <span>题型：</span>
                    <span
                        v-for="(item, index) in questionType"
                        :key="item.key"
                        :class="{ active: index === form.questionType }"
                        @click="onFilter('question', item.key)"
                    >{{ item.name }}</span>
                </div>
                <div class="filter-item">
                    <span>难易：</span>
                    <span
                        v-for="(item, index) in difficulty"
                        :key="item.key"
                        :class="{ active: index === form.difficulty }"
                        @click="onFilter('difficulty', item.key)"
                    >{{ item.name }}</span>
                </div>
                <!-- <div class="filter-item">
                    <span>年份：</span>
                    <span class="active">全部</span>
                    <span>2020</span>
                    <span>2019</span>
                    <span>2018</span>
                    <span>2017</span>
                    <span>2016</span>
                    <span>2015</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                    <span>2014</span>
                </div> -->
            </div>
            <div class="action">
                <el-button type="primary" size="medium" @click="onAction('add')">添加</el-button>
                <el-pagination
                    background
                    :current-page.sync="form.pageNo"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>

            <div class="list-content" v-loading="loading">
                <template v-for="item in questionList">
                    <question-item :item="item" :key="item.q_id">
                        <el-button size="medium" type="primary" @click="onAction('edit', item)">编辑</el-button>
                    </question-item>
                </template>
                <div class="empty" v-if="questionList.length === 0">暂无数据</div>
            </div>

            <div class="pagination">
                <el-pagination
                    background
                    :current-page.sync="form.pageNo"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionItem from '../components/QuestionItem'
import { queryDepartmentList, queryProfessionList, queryCourseList, queryPoints } from '../api/department'
import { queryQuestionList } from '../api/question'
import { formatTree } from '../utils/tool'
export default {
    name: 'QUestionBank',
    components: { QuestionItem },
    data () {
        return {
            form: {
                questionType: 0,
                difficulty: 0,
                department: '',
                profession: '',
                course: '',
                point: '',
                pageNo: 1,
                pageSize: 10
            },
            total: 10,
            departmentList: [],
            professionList: [],
            courseList: [],
            pointList: [],
            questionList: [],
            defaultProps: {
                children: 'children',
                label: 'k_name'
            },
            questionType: [
                { key: 0, name: '全部' },
                { key: 1, name: '选择题' },
                { key: 2, name: '填空题' },
                { key: 3, name: '解答题' }
            ],
            difficulty: [
                { key: 0, name: '全部' },
                { key: 1, name: '较易' },
                { key: 2, name: '易' },
                { key: 3, name: '中' },
                { key: 4, name: '难' },
                { key: 5, name: '较难' },
                { key: 6, name: '超难' }
            ],
            loading: false
        }
    },
    mounted () {
        this.getDepartment()
        this.initData()
    },
    methods: {
        async initData () {
            this.loading = true
            const res = await queryQuestionList(this.form)
            if (res.success) {
                this.questionList = res.data.data || []
                this.total = res.data.count
            }
            this.loading = false
        },
        async getDepartment () {
            const res = await queryDepartmentList()
            if (res.success) {
                this.departmentList = res.data || []
            }
        },
        async getProfession (id) {
            const res = await queryProfessionList({ depId: id })
            if (res.success) {
                this.professionList = res.data || []
            }
        },
        async getCourse (id) {
            const res = await queryCourseList({ pId: id })
            if (res.success) {
                this.courseList = res.data || []
            }
        },
        async getPoint (e) {
            const res = await queryPoints({ id: e })
            if (res.success) {
                const data = res.data || []
                this.pointList = formatTree(data, null, 'k_id', 'k_pid')
            }
        },
        onDepChange (e) {
            this.form.profession = ''
            this.form.course = ''
            this.form.point = ''
            this.pointList = []
            this.getProfession(e)
            this.search()
        },
        onProChange (e) {
            this.form.course = ''
            this.form.point = ''
            this.pointList = []
            this.getCourse(e)
            this.search()
        },
        onCourseChange (e) {
            this.form.point = ''
            this.getPoint(e)
            this.search()
        },
        onAction (type, row) {
            if (type === 'add') {
                this.$router.push('/questionBank/add')
            } else {
                this.$router.push({
                    path: '/questionBank/edit',
                    query: {
                        id: row.q_id
                    }
                })
            }
        },
        onFilter (type, value) {
            if (type === 'question') {
                this.form.questionType = value
            }
            if (type === 'difficulty') {
                this.form.difficulty = value
            }
            this.search()
        },
        handleNodeClick (e) {
            this.form.point = e.k_id
            this.search()
        },
        search () {
            this.form.pageNo = 1
            this.initData()
        }
    }
}
</script>

<style lang="less" scoped>
.question-container {
    display: flex;
    align-items: flex-start;
    .point {
        border: 1px solid #eee
    }
    .point {
        width: 280px;
        margin-right: 10px;
        .title {
            height: 40px;
            line-height: 40px;
            background-color: #eee;
            padding-left: 10px;
            font-size: 14px;
            color: #666;
            margin: 0;
        }
        .search-form {
            margin: 15px;
        }
        .tree {
            min-height: 300px;
            padding: 15px 10px;
        }
    }
    .list {
        flex: 1;
        .filter {
            border: 1px solid #eee;
            .filter-item {
                font-size: 14px;
                line-height: 2;
                margin: 0 10px;
                padding: 10px 0 10px 65px;
                position: relative;
                &:not(:last-child) {
                    border-bottom: 1px dotted #ddd;
                }
                span {
                    display: inline-block;
                    &:first-child {
                        position: absolute;
                        left: 20px;
                    }
                }
                span:not(:first-child) {
                    padding: 0 10px;
                    border-radius: 6px;
                    cursor: pointer;
                    &:hover {
                        background-color: #409EFF;
                        color: #fff;
                    }
                }
                .active {
                    background-color: #409EFF;
                    color: #fff;
                }
            }
        }
        .action {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            align-items: center;
        }
        &-content {
            min-height: 300px;
            .empty {
                text-align: center;
                font-size: 20px;
                line-height: 3;
                color: #d9d9d9;
            }
        }
        .pagination {
            padding: 20px 0;
            text-align: right;
        }
    }
}
</style>

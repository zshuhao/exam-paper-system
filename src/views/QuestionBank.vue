<template>
    <div class="question-container">
        <div class="point">
            <h2 class="title">筛选项</h2>
            <div>
                <el-form class="search-form" size="medium" label-width="40px">
                    <el-form-item label="院系">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科目">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <h2  class="title">知识点</h2>
            <div class="tree">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
        <div class="list">
            <div class="filter">
                <div class="filter-item">
                    <span>题型：</span>
                    <span class="active">全部</span>
                    <span>选择题</span>
                    <span>填空题</span>
                    <span>解答题</span>
                </div>
                <div class="filter-item">
                    <span>难易：</span>
                    <span>全部</span>
                    <span>较易</span>
                    <span>易</span>
                    <span>中</span>
                    <span>难</span>
                    <span>较难</span>
                    <span class="active">超难</span>
                </div>
                <div class="filter-item">
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
                </div>
            </div>
            <div class="action">
                <el-button type="primary" size="medium" @click="onAction('add')">添加</el-button>
                <el-pagination
                    background
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
            <question-item>
                <el-button size="medium" type="primary" @click="onAction('edit')">编辑</el-button>
            </question-item>
            <question-item>
                <el-button size="medium" type="primary">编辑</el-button>
            </question-item>
            <question-item>
                <el-button size="medium" type="primary">编辑</el-button>
            </question-item>
            <div class="pagination">
                <el-pagination
                    background
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionItem from '../components/QuestionItem'
export default {
    name: 'QUestionBank',
    components: { QuestionItem },
    data () {
        return {
            radio: false,
            form: {
                region: ''
            },
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        onAction (type) {
            if (type === 'add') {
                this.$router.push('/questionBank/add')
            } else {
                this.$router.push('/questionBank/edit')
            }
        },
        onEditorChange (event) {
            console.log('onEditorChange')
        },
        test () {
            console.log(this.content)
        },
        handleNodeClick (e) {
            console.log(e)
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
        .pagination {
            padding: 20px 0;
            text-align: right;
        }
    }
}
</style>

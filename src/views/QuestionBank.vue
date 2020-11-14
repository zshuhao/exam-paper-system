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
            right
        </div>
        <!-- <quill-editor v-model="content"></quill-editor>
        <el-button @click="test">测试</el-button>
        <div v-html="content"></div> -->
    </div>
</template>

<script>
// import {} from ''
export default {
    name: 'QUestionBank',
    data () {
        return {
            form: {
                region: ''
            },
            content: '<p>example content</p>',
            editorOption: { /* quill options */ },
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
    mounted () {
        console.log('this is current quill instance object', this.myQuillEditor)
    },
    methods: {
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
    .point, .list {
        border: 1px solid #eee
    }
    .point {
        width: 280px;
        // flex: 1;
        margin-right: 10px;
        .title {
            height: 40px;
            line-height: 40px;
            background-color: #eee;
            padding-left: 10px;
            font-size: 14px;
        }
            // min-height: 100px;
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
    }
}
</style>

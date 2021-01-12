<template>
    <div>
        <el-form inline size="medium">
            <el-form-item>
                <el-select v-model="form.type" placeholder="题型">
                    <el-option
                        v-for="item in questionType"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.level" placeholder="难易程度">
                    <el-option
                        v-for="item in difficulty"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <h1 class="title first">题目：</h1>
        <quill-editor class="editor" v-model="form.question"></quill-editor>
        <h1 class="title">答案：</h1>
        <quill-editor class="editor" v-model="form.solution"></quill-editor>
        <h1 class="title">解析：</h1>
        <quill-editor class="editor" v-model="form.analysis"></quill-editor>

        <div class="btns">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button>取消</el-button>
        </div>

        <el-dialog
            title="题目信息"
            :visible.sync="dialogVisible"
            @open="onDialogOpen"
            width="500px">
            <el-form class="form" size="medium" label-width="70px">
                <el-form-item label="院系">
                    <el-select class="input" v-model="form.department" @change="onDepChange" placeholder="请选择所属院系">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.d_id"
                            :label="item.d_name"
                            :value="item.d_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select class="input" v-model="form.profession" @change="onProChange" placeholder="请选择所属专业">
                        <el-option
                            v-for="item in professionList"
                            :key="item.p_id"
                            :label="item.p_name"
                            :value="item.p_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目">
                    <el-select class="input" v-model="form.course" @change="getPoints" placeholder="请选择所属科目">
                        <el-option
                            v-for="item in courseList"
                            :key="item.c_id"
                            :label="item.c_name"
                            :value="item.c_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="知识点">
                    <div class="tree-box" v-loading="pointLoading">
                        <el-tree
                            ref="tree"
                            :data="points"
                            :props="defaultProps"
                            node-key="k_id"
                            show-checkbox
                            check-strictly
                            @check-change="check"
                        >
                        </el-tree>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    queryDepartmentList,
    queryProfessionList,
    queryCourseList,
    queryPoints
} from '../api/department'
import { addQuestion } from '../api/question'
import { formatTree } from '../utils/tool'

export default {
    name: 'QuestionAddEdit',
    data () {
        return {
            pointLoading: false,
            editorOption: { /* quill options */ },
            dialogVisible: false,
            form: {
                question: '',
                solution: '',
                analysis: '',
                type: '',
                level: '',
                point: '',
                course: '',
                profession: '',
                department: ''
            },
            questionType: [
                { key: 1, name: '选择题' },
                { key: 2, name: '填空题' },
                { key: 3, name: '解答题' }
            ],
            difficulty: [
                { key: 1, name: '较易' },
                { key: 2, name: '易' },
                { key: 3, name: '中' },
                { key: 4, name: '难' },
                { key: 5, name: '较难' },
                { key: 6, name: '超难' }
            ],
            departmentList: [],
            professionList: [],
            courseList: [],
            points: [],
            defaultProps: {
                children: 'children',
                label: 'k_name'
            }
        }
    },
    methods: {
        onSave () {
            this.dialogVisible = true
        },
        async onConfirm () {
            console.log(this.form)
            const res = await addQuestion(this.form)
            if (res.success) {
                this.$message.success('添加成功！')
                this.dialogVisible = false
                this.$router.back(-1)
            }
        },
        async onDialogOpen () {
            const res = await queryDepartmentList()
            if (res.success) {
                this.departmentList = res.data || []
            }
        },
        async onDepChange (e) {
            this.form.profession = ''
            this.form.course = ''
            this.form.point = ''
            this.points = []
            const res = await queryProfessionList({ depId: e })
            if (res.success) {
                this.professionList = res.data || []
            }
        },
        async onProChange (e) {
            this.form.course = ''
            this.form.point = ''
            this.points = []
            const res = await queryCourseList({ pId: e })
            if (res.success) {
                this.courseList = res.data || []
            }
        },
        async getPoints (e) {
            this.pointLoading = true
            const params = {
                id: e
            }
            const res = await queryPoints(params)
            if (res.success) {
                const data = res.data || []
                this.points = formatTree(data, null, 'k_id', 'k_pid')
                this.pointLoading = false
            }
        },
        check (data, checked, child) {
            if (checked === true) {
                this.form.point = data.k_id
                this.$refs.tree.setCheckedKeys([data.k_id])
            } else {
                if (this.form.point === data.k_id) {
                    this.$refs.tree.setCheckedKeys([data.k_id])
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    font-weight: 600;
    padding: 20px;
}
.first {
    padding-top: 0;
}
.editor /deep/ .ql-container {
    height: 220px;
}
.btns {
    margin-top: 20px;
    text-align: right;
}
.form {
    padding-right: 20px;
    .input {
        width: 100%;
    }
}
.tree-box {
    height: 200px;
    overflow-y: auto;
}
</style>

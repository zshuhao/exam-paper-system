<template>
    <div>
        <el-form inline size="medium">
            <el-form-item>
                <el-select v-model="form.region" placeholder="题型">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="form.region" placeholder="难易程度">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <h1 class="title first">题目：</h1>
        <quill-editor class="editor" v-model="question"></quill-editor>
        <h1 class="title">答案：</h1>
        <quill-editor class="editor" v-model="solution"></quill-editor>
        <h1 class="title">解析：</h1>
        <quill-editor class="editor" v-model="analysis"></quill-editor>

        <div class="btns">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button>取消</el-button>
        </div>
        <!-- <div class="ql-editor" v-html="question"></div> -->
        <el-dialog
            title="题目信息"
            :visible.sync="dialogVisible"
            width="500px">
            <el-form class="form" size="medium" label-width="70px">
                <el-form-item label="院系">
                    <el-select class="input" v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select class="input" v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目">
                    <el-select class="input" v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="知识点">
                    <el-select class="input" v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import {} from ''
export default {
    name: 'QuestionAddEdit',
    data () {
        return {
            question: '阿斯顿发生',
            solution: '阿斯顿发生',
            analysis: '阿斯顿发生',
            editorOption: { /* quill options */ },
            dialogVisible: false,
            form: {
                region: ''
            }
        }
    },
    methods: {
        onSave () {
            console.log(this.question)
            this.dialogVisible = true
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

</style>

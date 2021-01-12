<template>
    <div class="question">
        <div class="q-title">
            <span>题型：{{ item.q_type | type }}</span>
            <span>难易度：{{ item.q_level | difficulty}}</span>
        </div>
        <div class="q-container ql-editor" v-html="item.q_content"></div>
        <div class="q-answer" v-if="answerVisible">
            <div class="answer">
                <span>答案：</span>
                <div v-html="item.q_answer"></div>
            </div>
            <div class="analysis">
                <span>解析：</span>
                <div v-html="item.q_explain"></div>
            </div>
        </div>
        <div class="q-btns">
            <el-button type="text" icon="el-icon-notebook-1" @click="onAnswerToggle">查看解析</el-button>
            <div class="btn-slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
// import {} from ''
export default {
    name: 'QuestionItem',
    props: ['item'],
    data () {
        return {
            answerVisible: false,
            content: ''
        }
    },
    filters: {
        difficulty (e) {
            const MAP = {
                1: '较易',
                2: '易',
                3: '中',
                4: '难',
                5: '较难',
                6: '超难'
            }
            return MAP[e]
        },
        type (e) {
            const MAP = {
                1: '选择题',
                2: '填空题',
                3: '解答题'
            }
            return MAP[e]
        }
    },
    methods: {
        onAnswerToggle () {
            this.answerVisible = !this.answerVisible
        }
    }
}
</script>

<style lang="less" scoped>
.question {
    margin-bottom: 20px;
    border: 1px solid #eee;
    &:hover {
        border-color: #409EFF;
    }
    .q-title {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background-color: #eee;
        font-size: 14px;
        color: #666;
        span {
            margin-right: 40px;
        }
    }
    .q-container {
        min-height: 200px;
        padding: 15px;
    }
    .q-answer {
        padding: 0 20px;
        .answer, .analysis {
            padding: 10px;
            line-height: 1.8;
            span {
                font-weight: 600;
            }
        }
        .answer {
            border-top: 1px dotted #409EFF;
            border-bottom: 1px dotted #409EFF;
        }
    }
    .q-btns {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        border-top: 1px dotted #ddd;
        .btn-slot {
            float: right;
        }
    }
}

</style>

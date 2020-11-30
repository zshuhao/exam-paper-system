<template>
    <div class="question">
        <div class="q-title">
            <span>题型：选择题</span>
            <span>难易度：较难</span>
        </div>
        <div class="q-container">题目内容</div>
        <div class="q-answer" v-if="answerVisible">
            <div class="answer">
                <span>答案：</span>B、D
            </div>
            <div class="analysis">
                <span>解析：</span>
                <div>内容李娟、楚金玲等5人在这次全国选拔中脱颖而出，以主攻手人选的身份进入中国排协公布的新一届国家女排20人大名单。</div>
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
    data () {
        return {
            answerVisible: false
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

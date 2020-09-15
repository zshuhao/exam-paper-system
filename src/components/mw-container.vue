<template>
    <div class="container">
        <div class="title">
            <span>{{ title }}</span>
            <div>
                <slot name="title-handle"></slot>
            </div>
        </div>
        <div class="cont" ref="containerCont">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mw-container',
    props: {
        title: {
            type: String,
            default: '标题'
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    // min-height 200px
    border-radius: 5px;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 15px;
        background-color: #f3f3f3;
    }
    .cont {
        min-height: 50px;
        padding: 15px;
        overflow: auto;
    }
}
</style>

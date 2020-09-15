<template>
    <div>
        <el-table class="m-table"
            :header-cell-style="headerCellStyle"
            v-bind="$attrs"
            v-on="$listeners">
            <slot></slot>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'mw-table',
    props: {
        headerCellStyle: {
            type: Function,
            default: ({ row, rowIndex }) => {
                return { backgroundColor: '#eee' }
            }
        }
    }
}
</script>

<style scoped>
.m-table {
    width: 99.9%;
    margin-bottom: 10px;
}
</style>

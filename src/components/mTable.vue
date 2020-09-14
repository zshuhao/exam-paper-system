<template>
    <div>
        <el-table class="m-table"
            :size="size"
            :header-cell-style="headerCellStyle"
            v-bind="$attrs"
            v-on="$listeners">
            <slot></slot>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'mTable',
    props: {
        size: {
            type: String,
            default: 'mini'
        },
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

<template>
    <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size.sync="pageSize"
            :layout="layout"
            :total="total"
            v-bind="$attrs">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'mw-pagination',
    props: {
        total: {
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 10
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        pageSizes: {
            type: Array,
            default: () => {
                return [10, 20, 30, 40]
            }
        }
    },
    computed: {
        currentPage: {
            get () {
                return this.page
            },
            set (val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get () {
                return this.limit
            },
            set (val) {
                this.$emit('update:limit', val)
            }
        }
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('pagination', { page: this.currentPage, limit: val, total: this.total })
        },
        handleCurrentChange (val) {
            this.$emit('pagination', { page: val, limit: this.pageSize, total: this.total })
        }
    }
}
</script>

<style scoped>
.pagination {
    padding-top: 20px;
    text-align: right
}
</style>

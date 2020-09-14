<template>
    <div>
        <el-autocomplete
            size='mini'
            clearable
            v-model="value"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder"
            @select="handleSelect"
            @clear="clearInput"
        ></el-autocomplete>
    </div>
</template>

<script>
export default {
    name: 'mSearchEmployee',
    props: {
        placeholder: {
            type: String,
            default: '请输入内容'
        }
    },
    data () {
        return {
            value: ''
        }
    },
    methods: {
        handleSelect (val) {
            this.$emit('handleSearchSelect', val)
        },
        clearInput () {
            this.$emit('handleSearchSelect', { value: '', address: '' })
        },
        querySearch (query, callback) {
            this.$ajax({
                type: 'employeeSearch',
                data: {
                    fieldNames: 'id,name',
                    name: query
                },
                methods: 'POST'
            }).then(res => {
                let data = res.data.data.employeDtoList || []
                let result = []
                data.forEach(item => {
                    result.push({ value: item.name, address: item.id })
                })
                callback(result)
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>

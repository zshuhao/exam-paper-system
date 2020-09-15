<template>
    <div>
        <el-autocomplete
            class="input"
            size='mini'
            clearable
            v-model="value"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder"
            @select="handleSelect"
            @clear="clearInput"
            @focus="clearInput">
        </el-autocomplete>
    </div>
</template>

<script>
export default {
    name: 'mw-search-employee',
    props: {
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        type: { // 可根据角色查询员工
            validator: (val) => {
                return ['default', 'byRole'].indexOf(val) !== -1
            },
            default: 'default'
        },
        roleCodes: { // 角色 CODE
            type: Array,
            default: () => ([])
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
            if (this.type === 'default') {
                this.$ajax({
                    type: 'employeeSearch',
                    data: {
                        status: 0,
                        fieldNames: 'id,name',
                        name: query
                    },
                    methods: 'POST'
                }).then(res => {
                    let data = res.data.data.employeDtoList || []
                    let result = data.map(item => {
                        return { value: `${item.name}(${item.employeNo})`, address: item.id }
                    })
                    callback(result)
                })
            } else {
                this.$ajax({
                    type: 'getUserByRole',
                    data: {
                        name: query,
                        roleCodes: [...this.roleCodes],
                        roleIds: []
                    }
                }).then(res => {
                    let data = res.data.data.users || []
                    let result = data.map(item => {
                        return { value: `${item.name}(${item.employeNo})`, address: item.id }
                    })
                    callback(result)
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .input {
        width: 100%;
    }
</style>

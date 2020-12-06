<template>
    <div>
        <el-form inline size="medium">
            <el-form-item>
                <el-select class="wh-200" v-model="searchForm.role" clearable placeholder="请选择角色">
                    <el-option :value="1" label="超级管理员"></el-option>
                    <el-option :value="2" label="管理员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input class="wh-200" v-model="searchForm.user" clearable placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="primary">添加</el-button>
            </el-form-item>
        </el-form>
        <div class="table-contianer">
            <el-table :data="tableData" border stripe>
                <el-table-column prop="userId" label="用户编号"></el-table-column>
                <el-table-column prop="userName" label="用户名"></el-table-column>
                <el-table-column prop="role" label="用户角色">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.role }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"></el-table-column>
                <el-table-column prop="action" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini">查看</el-button>
                        <el-button type="text" size="mini">编辑</el-button>
                        <el-button class="red" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Profession',
    data () {
        return {
            tableData: [
                {
                    id: 1,
                    userId: '0001',
                    userName: '张书豪',
                    mobile: '177239884839',
                    role: '超级管理员'
                },
                {
                    id: 2,
                    userId: '0002',
                    userName: '张三',
                    mobile: '17723456839',
                    role: '管理员'
                },
                {
                    id: 3,
                    userId: '0003',
                    userName: '李四',
                    mobile: '177245643457',
                    role: '秘书'
                },
                {
                    id: 4,
                    userId: '0004',
                    userName: '王伟',
                    mobile: '133239345645',
                    role: '大老板'
                },
                {
                    id: 5,
                    userId: '0005',
                    userName: '李华',
                    mobile: '183239454866',
                    role: '保洁阿姨'
                },
                {
                    id: 6,
                    userId: '0006',
                    userName: '尼采',
                    mobile: '177239822342',
                    role: '保安大人'
                }
            ],
            searchForm: {
                role: '',
                user: ''
            }
        }
    }
}
</script>

<style lang="less" scoped>
.table-contianer {
    margin-bottom: 20px;
}
.footer {
    text-align: right;
}
</style>

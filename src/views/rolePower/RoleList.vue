<template>
  <div class="list page-main">
    <div class="page-title">角色权限管理</div>
    <div class="page-container order">

      <el-form class="search" :inline="true" size="small" :model="params">
        <el-form-item>
          <el-input v-model="params.name" clearable placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select  class="search-input" v-model="params.roleGroupId" clearable placeholder="角色分组">
            <el-option label="默认分组" value="0"></el-option>
            <el-option v-for="item of groupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button type="primary" @click="getRoleList">搜索</el-button>
            <el-button type="primary" @click="groupVisible = true">分组管理</el-button>
            <el-button class="add-btn" type="primary" @click="roleAddVisible = true">新增角色</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>

      <mw-table class="table" :data="tableList" v-loading="loading">
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleGroupName" label="角色组" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
      </mw-table>

        <el-dialog title="角色管理" :visible.sync="roleAddVisible" width="500px">
          <div>
            <el-form :inline="true" ref="form" :model="addRole" size="mini">
              <el-form-item prop="name">
                <el-input v-model="addRole.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addGroup">添加</el-button>
              </el-form-item>
            </el-form>
            <ul class="group-list">
              <li class="item">
                <i class="icon el-icon-folder"></i>
                <span class="item-name">默认分组</span>
              </li>
              <template v-for="item in groupOptions">
                <li class="item" :key="item.id">
                  <i class="icon el-icon-folder"></i>
                  <span class="item-name">{{item.name}}</span>
                  <el-button class="dele-btn" type="text" @click="deleGroup(item.id)">删除</el-button>
                </li>
              </template>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="groupVisible = false">关闭</el-button>
                </span>
        </el-dialog>

        <el-dialog title="分组管理" :visible.sync="groupVisible" width="500px">
          <div>
            <el-form :inline="true" ref="form" :model="addGroupRole" :rules="formRules" size="mini">
              <el-form-item prop="name">
                <el-input v-model="addGroupRole.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addGroup">添加</el-button>
              </el-form-item>
            </el-form>
            <ul class="group-list">
              <li class="item">
                <i class="icon el-icon-folder"></i>
                <span class="item-name">默认分组</span>
              </li>
              <template v-for="item in groupOptions">
                <li class="item" :key="item.id">
                  <i class="icon el-icon-folder"></i>
                  <span class="item-name">{{item.name}}</span>
                  <el-button class="dele-btn" type="text" @click="deleGroup(item.id)">删除</el-button>
                </li>
              </template>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="groupVisible = false">关闭</el-button>
                </span>
        </el-dialog>

      <mw-pagination :page.sync="params.pageIndex"
                     :limit.sync="params.pageSize"
                     :total="total"
                     @pagination="getRoleList">
      </mw-pagination>
    </div>
  </div>
</template>

<script>

export default {
    name: 'RoleList',
    data () {
        return {
            tableList: [],
            params: {
                roleGroupId: '',
                name: '',
                id: '',
                description: '',
                pageIndex: 1,
                pageSize: 10
            },
            total: 0,
            loading: true,
            groupVisible: false,
            roleAddVisible: false,
            addGroupRole: { name: '' },
            addRole: { name: '', description: '' },
            formRules: {
                name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }]
            },
            groupOptions: []
        }
    },
    mounted () {
        this.getRoleList()
        this.fetchGroupList()
    },
    methods: {
        getRoleList () {
            this.loading = true
            this.$ajax({
                type: 'getRoleList',
                method: 'POST',
                data: this.params
            }).then(res => {
                if (res.data.success) {
                    const { dynamicFormList, recordCount } = res.data.data
                    this.total = recordCount
                    this.tableList = (dynamicFormList || []).map(item => {
                        return item.formGroupId === 0 ? { ...item, formGroupName: '默认分组' } : item
                    })
                }
                this.loading = false
            })
        },
        fetchGroupList () {
            this.$ajax({
                type: 'fetchGroupList',
                method: 'POST'
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    this.groupOptions = res.data.data || []
                }
            })
        },
        addGroup () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$ajax({
                        type: 'addGroup',
                        data: {
                            name: this.addGroupRole.name
                        }
                    }).then(res => {
                        if (res.data.success) {
                            this.$message.success('添加分组成功！')
                            this.fetchGroupList()
                        }
                    })
                }
            })
        },
        deleGroup (id) {
            this.$confirm('此操作将删除该分组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const roleGroupId = id
                this.$ajax({
                    type: 'deleteGroup',
                    method: 'POST',
                    data: { roleGroupId }
                }).then(res => {
                    if (res.data.success) {
                        this.$message.success('删除分组成功！')
                        this.fetchGroupList()
                    }
                })
            }).catch(() => {})
        },
        handleDelete (row) {
            this.$ajax({
                type: 'deleteRole',
                data: {
                    roleId: row.id
                }
            }).then(res => {
                if (res.data.success) {
                    this.$message.success('删除成功！')
                    this.fetchGroupList()
                }
            })
        },
        handleEdit (row) {

        }
    }
}
</script>

<style lang="less" scoped>
.search {
  .el-button-group {
    vertical-align: top;
  }
  .date-picker {
    width: 250px;
  }
}
.search-input {
  margin-right: 10px;
  width: 160px;
  vertical-align: middle;
}
.add-btn {
  float: right;
}
.group-list {
  .item-name {
    font-size: 13px;
    margin: 0 8px;
  }
  .item {
    width: 220px;
    line-height: 32px;
    &::after {
      clear: both;
      content: '';
      display: block;
    }
  }
  .dele-btn {
    float: right;
    color: #f56c6c;
  }
}
</style>

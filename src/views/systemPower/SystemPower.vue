<template>
    <div class="page-main">
        <div class="page-title">系统权限管理</div>
        <div class="page-container">
            <el-form class="search" :inline="true" :model="params">
                <el-form-item>
                    <el-select class="form-item-width" v-model="params.app" clearable placeholder="应用">
                        <el-option label="默认分组" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select class="form-item-width" v-model="params.qudao" clearable placeholder="渠道">
                        <el-option label="默认分组" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select class="form-item-width" v-model="params.type" clearable placeholder="权限类型">
                        <el-option label="默认分组" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input class="form-item-width" v-model="params.name" placeholder="权限名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group :style="{display: 'block'}">
                        <el-button type="primary">搜索</el-button>
                        <el-button type="primary" @click="addSysPowerVisible = true">新增</el-button>
                    </el-button-group>
                </el-form-item>
            </el-form>

            <mw-table
                :data="tableData"
                row-key="id"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                <el-table-column prop="date" label="权限名称" width="200"></el-table-column>
                <el-table-column prop="name" label="应用" align="center"></el-table-column>
                <el-table-column prop="name" label="渠道" align="center"></el-table-column>
                <el-table-column prop="name" label="编码" align="center"></el-table-column>
                <el-table-column prop="address" label="权限路径" align="center"></el-table-column>
                <el-table-column prop="name" label="序号" align="center"></el-table-column>
                <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="address" label="操作" align="center"></el-table-column>
            </mw-table>

            <el-dialog title="新建权限" :visible.sync="addSysPowerVisible" width="600px">
                <el-form :model="form" label-width="100px" :style="{ 'margin-right': '20px' }">
                    <el-form-item label="应用">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属上级">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限名称">
                        <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="路径">
                        <el-input v-model="form.name" placeholder="请输入权限路径，如：/system/permission"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addSysPowerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSysPowerVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
    name: 'SystemPower',
    data () {
        return {
            addSysPowerVisible: false,
            form: {},
            params: {
                app: '',
                qudao: '',
                type: '',
                name: ''
            },
            tableData: [{
                id: 1,
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                id: 2,
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                id: 3,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                children: [{
                    id: 31,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    children: [{
                        id: 311,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        id: 312,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }]
                }, {
                    id: 32,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }]
            }, {
                id: 4,
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted () {
        // this.initDrag()
    },
    methods: {
        initDrag () {
            const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            console.log(el)
            Sortable.create(el, {
                // disabled: true,
                // ghostClass: 'sortable-ghost',
                // setData: function (dataTransfer) {
                //     dataTransfer.setData('Text', '')
                // },
                onEnd: (evt) => {
                    console.log(evt)
                }
            })
        }
    }
}
</script>

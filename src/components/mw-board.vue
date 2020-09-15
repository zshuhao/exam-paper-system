<template>
    <div>
        <div v-if="type === 'default'">
            <el-row v-for="(item, index) in formatData" :key="index">
                <el-col v-for="(cEl, ci) in item" :key="ci" :span="24 / column">
                    <label class="td label" :style="labelStyle">{{ cEl.label }}</label>
                    <div class="td value" :style="valueStyle">
                        <template v-if="'slot' in cEl">
                            <slot :name="cEl.slot"></slot>
                        </template>
                        <template v-else>
                            {{ cEl.value === null ? '--' : cEl.value }}
                        </template>
                    </div>
                </el-col>
            </el-row>
        </div>
        <table v-else class="table" style="width: 100%;">
            <tr v-for="(item, index) in formatData" :key="index">
                <template v-for="(cEl, ci) in item">
                    <template v-for="(el, i) in cEl">
                        <td v-if="i === 'label'" class="td label" :style="labelStyle" :key="ci + i">{{el}}</td>
                        <td v-else-if="i === 'slot'" class="td value" :style="valueStyle" :key="ci + i">
                            <slot :name="el"></slot>
                        </td>
                        <td v-else-if="!('slot' in cEl) && i === 'value'" class="td value" :style="valueStyle" :key="ci + i">{{ el === null ? '--' : el}}</td>
                    </template>
                </template>
            </tr>
        </table>
    </div>
</template>

<script>

export default {
    name: 'mw-board',
    props: {
        label: {
            type: Array,
            default: () => ({})
        },
        data: {
            type: Object,
            default: () => ({})
        },
        type: {
            validator (value) {
                if (['table', 'default'].indexOf(value) === -1) {
                    console.warn(`'type' value must be one of ['table', 'default']`)
                    return false
                } else {
                    return true
                }
            },
            default: 'default' // table, default
        },
        labelWidth: {
            type: String,
            default: 'auto'
        },
        column: {
            type: Number,
            default: 1
        },
        labelAlign: {
            type: String,
            default: 'right'
        },
        valueAlign: {
            type: String,
            default: 'left'
        }
    },
    computed: {
        labelStyle () {
            return {
                'min-width': this.labelWidth,
                'width': this.type === 'table' && (this.labelWidth === 'auto' || this.labelWidth === '') ? `${100 / (this.column * 2)}%` : this.labelWidth,
                'text-align': this.labelAlign
            }
        },
        valueStyle () {
            return {
                'padding-left': this.type === 'default' ? (this.labelWidth === '' || this.labelWidth === 'auto' ? '' : this.labelWidth) : '',
                'text-align': this.valueAlign
            }
        },
        formatData () {
            const { column, data } = this
            const dealData = this.label.map(item => ({ ...item, label: item.label, value: data[item.key] }))
            const result = []

            for (let i = 0; i < Math.ceil(dealData.length / column); i++) {
                result.push(dealData.slice(i * column, i * column + column))
            }

            return result
        }
    }
}
</script>

<style lang="less" scoped>
.table {
    width: 100%;
    .td {
        border: 1px solid #E6EAEE;
    }
    .label {
        float: none;
        background-color: #f7f7f7;
    }
}

.td {
    font-size: 14px;
    line-height: 40px;
}
.label {
    padding-right: 12px;
    float: left;
    color: #606266;
    text-align: right;
    box-sizing: border-box;
}
.value {
    text-align: left;
    color: #71787E;
}
</style>

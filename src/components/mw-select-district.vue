<template>
    <div>
        <el-cascader
            v-model="district"
            :options="options"
            v-bind="$attrs"
            v-on="$listeners">
        </el-cascader>
    </div>
</template>

<script>

export default {
    name: 'mw-select-district',
    data () {
        return {
            district: '',
            options: []
        }
    },
    mounted () {
        this.getCityTree()
    },
    methods: {
        getCityTree () {
            this.$ajax({
                method: 'POST',
                type: 'getCityTree'
            }).then(res => {
                if (typeof res !== 'undefined' && res.data.data) {
                    this.dealCityTree(res.data.data.citytree.province || [])
                }
            })
        },
        dealCityTree (cityArr) {
            const id = []
            const result = []
            // 去除重复的省份
            cityArr.forEach(item => {
                if (!id.includes(item.id)) {
                    id.push(item.id)
                    result.push(item)
                }
            })
            // 将数据处理为el-cascader可用的数组数据
            const options = result.map(item => {
                if (item.city.length === 0) {
                    return { value: `${item.id}-${item.name}`, label: item.name }
                } else {
                    let city = item.city.map(i => {
                        if (i.area.lenght === 0) {
                            return { value: `${i.id}-${i.name}`, label: i.name }
                        } else {
                            let area = i.area.map(j => {
                                return { value: `${j.id}-${j.name}`, label: j.name }
                            })
                            return { value: `${i.id}-${i.name}`, label: i.name, children: area }
                        }
                    })
                    return { value: `${item.id}-${item.name}`, label: item.name, children: city }
                }
            })
            this.options = options
        }
    }
}
</script>

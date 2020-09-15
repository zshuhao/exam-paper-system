公用组件使用说明

- mw-select-district
- mw-table

以上组件使用和element基本相同，只是提供了默认设置

## mw-board

容器组件

```
<mw-board :label="labelData" :data="valueData" :column="2" label-width="100px">
    <template #name>
        {{ valueData[name] }}
    </template>
</mw-board>

...

data: () {
    return {
        labelData: [
            { label: '姓名', slot: 'name' },
            { label: '年龄', key: 'age' },
        ],
        valueData: {
            name: 'zhangshuhao',
            age: 12
        }
    }
}
```

参数 | 说明 | 类型 | 可选值 | 默认
--- | --- | --- | --- | ---
label | `{ label: '姓名', key: 'name', slot: 'name' }` slot可选，使用slot时key失效 | Array | -- | --
data | 数据 | Object | -- | --
type | 列表格式 | String | ['table', 'default'] | default
label-width | label宽度 | String | px，百分比 | auto
column | 有几列  | Number | -- | 1
label-align | label文本对齐方式 | String | right，left，center | right
value-align | value文本对齐方式 | String | right，left，center | left

## mw-container

容器组件

```
<mw-container title="头部信息">
    <template #title-handle>
        这里的内容在容器header 右侧出现
    </template>
    内容
</mw-container>
```

参数 | 说明 | 类型 | 可选值 | 默认
--- | --- | --- | --- | ---
title | 头部信息 | String | -- | 标题

## mw-search-employee

选择员工

```
<mw-search-employee
    type="byRole"
    :role-codes="['TC002']"
    @handleSearchSelect="handleSelect1"
></mw-search-employee>
```

参数 | 说明 | 类型 | 可选值 | 默认
--- | --- | --- | --- | ---
type | 是否根据角色查询员工 | String | ['default', 'byRole'] | default
role-codes | 角色 CODE | Array | -- | []

方法名 ｜ 说明 ｜ 参数
-- | -- | --
handleSearchSelect | 选择员工信息触发 ｜ 选中的员工信息

<template>
    <div><slot></slot></div>
</template>
<script>
export default {
    name: 'sapi-table-column',
    props: {
        prop: {
            type: String
        },
        label: {
            type: String
        },
        width: {
            type: String
        },
        minWidth: {
            type: String
        },
        fixed: {
            type: Boolean
        },
        align: {
            type: String
        },
        headerAlign: {
            type: String
        },
        sortable: {
            type: Boolean,
            default: false
        },
        createTime: {
            type: String,
            default: ''
        }
    }
}
</script>
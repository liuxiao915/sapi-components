<template>
  <div class="sapi-table">
    <sapi-table rowKey="1111" :data="state.tableData" height="300px" @cell-Click="cellClick" @row-Click="rowClick" header-row-class-name="project-table-header" :header-row-style="{background: '#2F88F6', color: '#ffffff'}">
      <sapi-table-column header-align="center" align="center" width="110px" label="区域" prop="name" fixed></sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="开发成本" prop="exploitCost">
        <template #header>插槽表头</template>
        <template #default="scope">
          <span>{{ scope.row.contractAmount }}插槽</span>
        </template>
      </sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="管理费用" prop="managementCost"></sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="营销费用" prop="marketingCost"></sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="税金" prop="taxes"></sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="签约金额" prop="contractAmount"></sapi-table-column>
    </sapi-table>
  </div>
</template>
<script>
import { reactive, getCurrentInstance } from 'vue'
import  sapiTable from '../../packages/table/table.vue'
import  sapiTableColumn from '../../packages/table/table-column.js'
export default {
  components: { sapiTable, sapiTableColumn },
  setup() {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      tableData: [
        {name: '区域', exploitCost: '1-1', managementCost: '1-2', marketingCost: '1-3', taxes: '1-4', contractAmount: '1-5'},
        {name: '区域', exploitCost: '2-1', managementCost: '2-2', marketingCost: '2-3', taxes: '2-4', contractAmount: '2-5'},
        {name: '区域', exploitCost: '3-1', managementCost: '3-2', marketingCost: '3-3', taxes: '3-4', contractAmount: '3-5',children: [
          {name: '区域', exploitCost: '3-1-1', managementCost: '3-2-1', marketingCost: '33', taxes: '44', contractAmount: '55'},
          {name: '区域', exploitCost: '3-1-2', managementCost: '3-2-2', marketingCost: '33', taxes: '44', contractAmount: '55'}
        ]},
        {name: '区域', exploitCost: '4-1', managementCost: '4-2', marketingCost: '4-3', taxes: '4-4', contractAmount: '4-5'},
        {name: '区域', exploitCost: '5-1', managementCost: '5-2', marketingCost: '5-3', taxes: '5-4', contractAmount: '5-5'},
        {name: '区域', exploitCost: '6-1', managementCost: '6-2', marketingCost: '6-3', taxes: '6-4', contractAmount: '6-5'},
        {name: '区域', exploitCost: '7-1', managementCost: '7-2', marketingCost: '3333', taxes: '4444', contractAmount: '55'},
        {name: '区域', exploitCost: '8-1', managementCost: '8-2', marketingCost: '3333', taxes: '4444', contractAmount: '55'},
        {name: '区域', exploitCost: '9-1', managementCost: '9-2', marketingCost: '3333', taxes: '4444', contractAmount: '55'},
        {name: '区域', exploitCost: '10-1', managementCost: '10-2', marketingCost: '3333', taxes: '4444', contractAmount: '55'},
      ]
    })
    const formatter = (row,rowIndex,column,columnIndex) => {
      const toThousandsProps = ['exploitCost', 'managementCost', 'marketingCost', 'taxes','contractAmount'];
      if (toThousandsProps.includes(column.prop)) {
        const place = row[column.prop].toString().includes('.') ? 2 : 0
        return row[column.prop] === undefined || row[column.prop] === null ? '' : proxy.$utils.toThousands(row[column.prop], place);
      }
      return row[column.prop];
    }
    const cellClick = (data) => {
      console.log('cellClick:::', data)
    }
    const rowClick = (data) => {
      console.log('rowClick:::', data)
    }
    return {
      state,
      formatter,
      cellClick,
      rowClick
    }
  }
}
</script>
<style lang="less" scoped>
.sapi-table {
  height: 100%;
  :deep(.project-table-header) {
    color: #ffffff;
    background-color: #4B9BFF;
  }
  .table-cell.padding-left__10px {
    padding-left: 10px;
    box-sizing: border-box;
  }
  .table-cell.padding-right__10px {
    padding-right: 10px;
    box-sizing: border-box;
  }
}
</style>

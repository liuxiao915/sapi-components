<template>
  <div class="sapi-table">
    <sapi-table :data="state.tableData" header-row-class-name="project-table-header" :header-row-style="{background: '#2F88F6', color: '#ffffff'}">
      <sapi-table-column header-align="center" align="center" width="110px" label="区域" prop="name" fixed></sapi-table-column>
      <sapi-table-column header-align="center" align="center" width="60px" label="开发成本" prop="exploitCost">
        <template #default="scope">
                <span>{{ scope.row.exploitCost | $utils.toThousands(2) }}</span>
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
import  sapiTable from '@/components/sapi-table/index.js'
export default {
  components: {sapiTable},
  setup() {
    const { proxy } = getCurrentInstance()
    const state = reactive({
      tableData: [
        {name: '区域', exploitCost: '开发成本', managementCost: '管理费用', marketingCost: '营销费用', taxes: '税金', contractAmount: '签约金额'}
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
    return {
      state,
      formatter
    }
  }
}
</script>
<style lang="less" scoped>
.sapi-table {
  height: 100%;
}
  .project-table-header {
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
</style>

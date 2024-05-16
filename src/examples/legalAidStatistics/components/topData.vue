<template>
  <div class="top-data">
    <div v-for="item in list" :key="item.title" class="card">
      <div class="title">{{ item.title }}</div>
      <div class="data">
        <div v-for="val in item.data" :key="val.label" class="data-info">
          <div class="label">{{ val.label }}</div>
          <div class="value">{{ val.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    countData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [
        {
          title: '工单数量', data: [
            { label: '总数（宗）', value: '' },
            { label: '受理数（宗）', value: '' },
            { label: '办结数（宗）', value: '' }
          ]
        },
        {
          title: '服务情况', data: [
            { label: '服务人次（次）', value: '' },
            { label: '涉案标的额（万元）', value: '' },
            { label: '结案支持金额（万元）', value: '' },
            { label: '满意度（%）', value: '' }
          ]
        },
        {
          title: '法律服务团队', data: [
            { label: '律所（家）', value: '' },
            { label: '律师（人）', value: '' }
          ]
        }
      ]
    }
  },
  watch: {
    countData: {
      handler(val) {
        this.list = [
          {
            title: '工单数量', data: [
              { label: '总数（宗）', value: val.allWorkCount === null ? '-' : val.allWorkCount },
              { label: '受理数（宗）', value: val.acceptWorkCount === null ? '-' : val.acceptWorkCount },
              { label: '办结数（宗）', value: val.completionWorkCount === null ? '-' : val.completionWorkCount }
            ]
          },
          {
            title: '服务情况', data: [
              { label: '服务人次（次）', value: val.personCount === null ? '-' : val.personCount },
              { label: '涉案标的额（万元）', value: val.amountInvolved === null ? '-' : val.amountInvolved },
              { label: '结案支持金额（万元）', value: val.settlementAmount === null ? '-' : val.settlementAmount },
              { label: '满意度（%）', value: val.evaluationLevel === null ? '-' : val.evaluationLevel }
            ]
          },
          {
            title: '法律服务团队', data: [
              { label: '律所（家）', value: val.lawFirmCount === null ? '-' : val.lawFirmCount },
              { label: '律师（人）', value: val.lawyerCount === null ? '-' : val.lawyerCount }
            ]
          }
        ]
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.top-data {
  height: 176px;
  display: grid;
  gap: 26px;
  grid-template-columns: 6fr 9fr 4fr;
  border: 1px solid #eee;
  padding: 18px 20px 20px;
  .title {
    font-family: AlibabaPuHuiTiM;
    font-size: 18px;
    color: #000000cc;
    letter-spacing: 0;
    margin-bottom: 15px;
  }

  .data {
    height: 98px;
    background: #F7F8FA;
    display: flex;
    .data-info {
      flex: 1;
      position: relative;
      text-align: left;
      padding: 16px 0 16px 12px;
      &:not(:nth-of-type(1))::after {
        content: ' ';
        position: absolute;
        height: 74px;
        width: 1.4px;
        left: 0;
        top: 12px;
        background-color: #E5E6EB;
      }
      .label {
        height: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #4E5969;
        margin-bottom: 16px;
      }
      .value {
        height: 40px;
        font-family: PingFangSC-SNaNpxibold;
        font-weight: 600;
        font-size: 22px;
        color: #000000cc;
      }
    }

  }
}
</style>

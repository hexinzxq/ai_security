<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      align="center"
      prop="name"
      label="名称"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="time"
      label="评估时间"
      width="150">
    </el-table-column>
    <el-table-column
      align="center"
      prop="people"
      label="评估人员"
      width="150">
    </el-table-column>
    <el-table-column label="企业安全生产预警指数(SPI)" align="center">
      <el-table-column
        align="center"
        prop="user"
        label="人员管理"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="equipmentRisk"
        label="设备风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceRisk"
        label="装置风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="riskRisk"
        label="危险品风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="workRisk"
        label="作业风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="manageRisk"
        label="管理风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="envRisk"
        label="环境风险"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="all"
        label="总"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="warnLevel"
        label="预警分级"
      >
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'DashboardTable',
  data() {
    return {
      tableData: [
        {
          time: '2022/7/30',
          name: '数字矿山',
          people: '安保部负责人',
          user: '0.65',
          equipmentRisk: '3.65',
          deviceRisk: '3.58',
          riskRisk: '3.36',
          workRisk: '0.65',
          manageRisk: '0.58',
          envRisk: '0.36',
          all: '12.83',
          warnLevel: '低风险'
        },
        {
          time: '2022/7/31',
          name: '数字矿山',
          people: '安保部负责人',
          user: '1.65',
          equipmentRisk: '1.58',
          deviceRisk: '1.36',
          riskRisk: '6.68',
          workRisk: '1.65',
          manageRisk: '1.58',
          envRisk: '1.36',
          all: '15.86',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/1',
          name: '数字矿山',
          people: '安保部负责人',
          user: '2.65',
          equipmentRisk: '2.58',
          deviceRisk: '2.36',
          riskRisk: '7.68',
          workRisk: '2.65',
          manageRisk: '0.65',
          envRisk: '0.58',
          all: '19.15',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/2',
          name: '数字矿山',
          people: '安保部负责人',
          user: '3.65',
          equipmentRisk: '3.58',
          deviceRisk: '3.36',
          riskRisk: '8.68',
          workRisk: '3.65',
          manageRisk: '1.65',
          envRisk: '1.58',
          all: '26.15',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/3',
          name: '数字矿山',
          people: '安保部负责人',
          user: '9.65',
          equipmentRisk: '5.58',
          deviceRisk: '7.36',
          riskRisk: '0.68',
          workRisk: '8.68',
          manageRisk: '2.45',
          envRisk: '2.08',
          all: '36.48',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/4',
          name: '数字矿山',
          people: '安保部负责人',
          user: '0.65',
          equipmentRisk: '0.58',
          deviceRisk: '0.36',
          riskRisk: '0.68',
          workRisk: '2.25',
          manageRisk: '1.45',
          envRisk: '6.78',
          all: '12.75',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/5',
          name: '数字矿山',
          people: '安保部负责人',
          user: '1.65',
          equipmentRisk: '1.58',
          deviceRisk: '1.36',
          riskRisk: '0.65',
          workRisk: '0.58',
          manageRisk: '0.36',
          envRisk: '7.78',
          all: '13.96',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/6',
          name: '数字矿山',
          people: '安保部负责人',
          user: '2.65',
          equipmentRisk: '0.65',
          deviceRisk: '0.58',
          riskRisk: '1.65',
          workRisk: '1.58',
          manageRisk: '1.36',
          envRisk: '10.54',
          all: '19.01',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/7',
          name: '数字矿山',
          people: '安保部负责人',
          user: '3.65',
          equipmentRisk: '1.65',
          deviceRisk: '1.58',
          riskRisk: '2.65',
          workRisk: '0.65',
          manageRisk: '0.58',
          envRisk: '9.78',
          all: '20.54',
          warnLevel: '低风险'
        },
        {
          time: '2022/8/8',
          name: '数字矿山',
          people: '安保部负责人',
          user: '4.65',
          equipmentRisk: '2.65',
          deviceRisk: '2.58',
          riskRisk: '3.65',
          workRisk: '1.65',
          manageRisk: '1.58',
          envRisk: '10.78',
          all: '27.54',
          warnLevel: '低风险'
        },
      ]
    }
  }
}
</script>

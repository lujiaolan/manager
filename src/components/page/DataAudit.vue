<template>
    <el-tabs v-model="activeName" @tab-click="testTab">
        <el-tab-pane label="注册列表" name="first">
            <RegisterList></RegisterList>
        </el-tab-pane>
        <el-tab-pane label="CRM用户审核" name="second">
            <CrmAudit></CrmAudit>
        </el-tab-pane>
        <el-tab-pane label="CRM用户银行卡审核" name="three">
            <BankCardAudit></BankCardAudit>
        </el-tab-pane>
        <el-tab-pane label="杠杆调整审核" name="four">
            <LeverageAudit></LeverageAudit>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    module.exports = require('../pageJS/DataAudit')
</script>
<style lang="less" scoped="">
</style>

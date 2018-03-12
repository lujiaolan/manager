<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="入金审核" name="first">
            <InMoneyCrmAudit></InMoneyCrmAudit>
        </el-tab-pane>
        <el-tab-pane label="出金审核" name="second">
            <OutMoneyAudit></OutMoneyAudit>
        </el-tab-pane>
        <el-tab-pane label="转出账户审核" name="three">
            <OutToCrmAudit></OutToCrmAudit>
        </el-tab-pane>
        <el-tab-pane label="佣金审核" name="four">
            <CommissionAudit></CommissionAudit>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    module.exports = require('../pageJS/CapitalAudit.vue')
</script>
<style lang="less" scoped="">
    .crmAgent {
        .textarea110{
            width: 110%;
        }
    }
</style>

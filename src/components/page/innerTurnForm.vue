<template>
    <el-form ref="innerTurnBox" :model="innerTurnForm"  label-width="140px">
        <el-form-item label="允许转出账户：" prop="innerTransfer">
            <el-radio-group v-model="innerTurnForm.innerTransfer">
                <el-radio :label="1">允许</el-radio>
                <el-radio :label="0">不允许</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="转出账户审核：" prop="anyAccount">
            <el-radio-group v-model="innerTurnForm.anyAccount">
                <el-radio :label="1">审核</el-radio>
                <el-radio :label="0">不审核</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="佣金审核：" prop="commissionVerify">
            <el-radio-group v-model="innerTurnForm.commissionVerify">
                <el-radio :label="1">审核</el-radio>
                <el-radio :label="0">不审核</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveInnerTurnSet()">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    module.exports = require('../pageJS/innerTurnForm')
</script>

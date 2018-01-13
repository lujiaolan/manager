<template>
    <el-form ref="outMoneyForm" :model="outMoneyForm" :rules="outMoneyForm_rules">
       <el-row>
           <el-form-item label="出金汇率设置:" label-width="140px">
               <el-select v-model="outMoneyForm.type">
                   <el-option :value="item.value" :label="item.label" :key="item.value" v-for="item in typeOutList"></el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="出金实时汇率：" prop="outMoneyOntimeExRate" label-width="140px" v-bind:style="typeOutSelect.resetNumColor">
               <el-input v-model.number="outMoneyForm.withdrawRealTimeRate" placeholder="实时汇率"
                         @key.native.enter="saveOutMoneySet('outMoneyForm')" disabled=""></el-input>
           </el-form-item>
           <el-row :gutter="10" v-bind:style="typeOutSelect.resetNumColor">
               <el-col :span="8">
                   <el-form-item label-width="140px">
                       <el-select v-model="outMoneyForm.outMoneyExRateReset.resetType" placeholder="请选择" >
                           <el-option
                               v-for="item in optionsAR"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                           </el-option>
                       </el-select>
                   </el-form-item>
               </el-col>
               <el-col :span="6">
                   <el-form-item prop="outMoneyExRateReset.resetNum">
                       <el-input v-model.number="outMoneyForm.outMoneyExRateReset.resetNum"
                                 @key.native.enter="saveOutMoneySet('outMoneyForm')"
                                 placeholder="金额" :disabled="realStatusDisabled"></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="6">
                   <el-form-item  prop="withdrawReplaceRate" label="失败时:" label-width="60px">

                       <el-input v-model.number="outMoneyForm.withdrawReplaceRate" placeholder="汇率"></el-input>
                   </el-form-item>
               </el-col>
               <el-col>
                   <el-form-item label-width="140px">
                       显示汇率=实时汇率+/-调整金额
                   </el-form-item>
               </el-col>
           </el-row>
           <el-form-item  prop="withdrawFixedRate" label-width="140px" v-bind:style="typeOutSelect.resetMoneyColor">
               <el-input v-model.number="outMoneyForm.withdrawFixedRate" placeholder="输入固定汇率"></el-input>
           </el-form-item>
           <el-form-item label="出金单笔最高：" prop="withdrawMax" label-width="140px">
               <el-input v-model.number="outMoneyForm.withdrawMax" placeholder="出金单笔最高"></el-input>
           </el-form-item>
           <el-form-item label="出金单笔最低：" prop="withdrawMin" label-width="140px">
               <el-input v-model.number="outMoneyForm.withdrawMin" placeholder="出金单笔最低"></el-input>
           </el-form-item>
           <el-form-item label="出金审核：" prop="withdrawVerifyStatus" label-width="140px">
               <el-radio-group v-model="outMoneyForm.withdrawVerifyStatus">
                   <el-radio :label="1">是</el-radio>
                   <el-radio :label="0">否</el-radio>
               </el-radio-group>
               <el-col>是：审核&nbsp;&nbsp;&nbsp;&nbsp;否：不审核</el-col>
           </el-form-item>
           <el-form-item label="出金扣款：" prop="withdrawDebitStatus" label-width="140px">
               <el-radio-group v-model="outMoneyForm.withdrawDebitStatus">
                   <el-radio :label="1">是</el-radio>
                   <el-radio :label="0">否</el-radio>
               </el-radio-group>
               <el-col>是：未审核之前扣除钱包余额&nbsp;&nbsp;&nbsp;&nbsp;否：审核成功之后扣除</el-col>
           </el-form-item>
           <el-form-item label="入金提醒：" prop="outMoneyRemind.remindType" label-width="140px">
               <el-row :gutter="20">
                   <el-col :span='7'>
                       <el-select v-model="outMoneyForm.outMoneyRemind.remindType" placeholder="请选择" >
                           <el-option
                               v-for="item in optionsTE"
                               :key="item.label"
                               :label="item.label"
                               :value="item.value">
                           </el-option>
                       </el-select>
                   </el-col>
                   <el-col :span='12'>
                       <el-form-item prop="outMoneyRemind.remindWay">
                           <el-input v-model="outMoneyForm.outMoneyRemind.remindWay"
                                     @key.native.enter="saveOutMoneySet('outMoneyForm')" placeholder="请输入邮箱或手机号"></el-input>
                       </el-form-item>
                   </el-col>
               </el-row>
           </el-form-item >
           <el-form-item label-width="160px">
               <el-button type="primary" @click="saveOutMoneySet('outMoneyForm')">{{withdrawEditOrAdd?'修改':'保存'}}</el-button>
           </el-form-item>
       </el-row>
    </el-form>
</template>
<script>
    module.exports  = require('../pageJS/outMoneyForm')
</script>

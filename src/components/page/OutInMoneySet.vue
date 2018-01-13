<template>
    <div>
    	<div class="handle-box">
            <el-row>
    		<el-tabs v-model="activeNameSet" @tab-click="activeClickSet">
                <el-tab-pane label="入金设置" name="first">
                  <el-col :span="10">
                      <el-form ref="inMoneyForm" :model="inMoneyForm" :rules="inMoneyForm_rules" >
                          <el-form-item label="入金汇率设置:" label-width="140px">
                              <el-select value="" v-model="inMoneyForm.type">
                                  <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in typeList"></el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="入金实时汇率：" prop="inMoneyOntimeExRate" label-width="140px"
                                        v-bind:style="typeSelect.resetMoneyColor">
                              <el-input v-model="inMoneyForm.depositRealTimeRate" placeholder="实时汇率" disabled=""></el-input>
                          </el-form-item>
                          <el-row :gutter="10" v-bind:style="typeSelect.resetMoneyColor">
                                  <el-col :span="8">
                                      <el-form-item label-width="140px">
                                          <el-select v-model="inMoneyForm.inMoneyExRateReset.resetType" placeholder="请选择" >
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
                                      <el-form-item prop="inMoneyExRateReset.resetNum">
                                          <el-input v-model.number="inMoneyForm.inMoneyExRateReset.resetNum"
                                                    placeholder="金额" :disabled="realTimeRateStatusDisabled">
                                          </el-input>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-form-item  label="失败时:" label-width="60px" prop="depositReplaceRate">
                                          <el-input v-model.number="inMoneyForm.depositReplaceRate"
                                                    placeholder="汇率" ></el-input>
                                      </el-form-item>
                                  </el-col>
                              <el-col>
                                 <el-form-item label-width="140px">
                                     显示汇率=实时汇率+/-调整金额
                                 </el-form-item>
                              </el-col>
                          </el-row>
                          <el-form-item  prop="depositFixedRate" label-width="140px" v-bind:style="typeSelect.resetNumColor">
                              <el-input v-model.number="inMoneyForm.depositFixedRate"
                                        @key.native.enter="saveInMoneySet('inMoneyForm')" placeholder="输入固定汇率"></el-input>
                          </el-form-item>

                          <el-form-item label="入金单笔最高：" prop="depositMax" label-width="140px">
                              <el-input v-model.number="inMoneyForm.depositMax"
                                        @key.native.enter="saveInMoneySet('inMoneyForm')" placeholder="入金单笔最高"></el-input>
                          </el-form-item>
                          <el-form-item label="入金单笔最低：" prop="depositMin" label-width="140px">
                              <el-input v-model.number="inMoneyForm.depositMin"
                                        @key.native.enter="saveInMoneySet('inMoneyForm')" placeholder="入金单笔最低"></el-input>
                          </el-form-item>
                         <el-row :gutter="10">
                            <el-col :span="10">
                                <el-form-item label="入金提醒：" prop="depositNotice.remindType" label-width="140px">
                                    <el-select v-model="inMoneyForm.depositNotice.remindType" placeholder="请选择" >
                                        <el-option
                                            v-for="item in optionsDraw"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                             <el-col :span="14">
                                 <el-form-item prop="depositNotice.remindWay" >
                                     <el-input v-model="inMoneyForm.depositNotice.remindWay"
                                               @key.native.enter="saveInMoneySet('inMoneyForm')" placeholder="请输入邮箱或手机号"></el-input>
                                 </el-form-item>
                             </el-col>
                         </el-row>
                          <el-form-item label-width="200px">
                              <el-button type="primary" @click="saveInMoneySet('inMoneyForm')">{{depositeditOrAdd?'修改':'保存'}}</el-button>
                          </el-form-item>
                      </el-form>
                  </el-col>
                </el-tab-pane>
                <el-tab-pane label="出金设置" name="second">
                    <el-col :span="10">
                    <out-moneyForm ref="withdrawSet"></out-moneyForm>
                    </el-col>
                </el-tab-pane>
                <el-tab-pane label="内转设置" name="third">
                   <el-col :span="10">
                       <inner-turnForm ref="innerTransSet"></inner-turnForm>
                   </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        </div>
    </div>
</template>

<script>
module.exports = require('../pageJS/OutInMoneySet')
</script>
<style scoped>
	.el-form-item{margin-bottom: 15px;}
</style>

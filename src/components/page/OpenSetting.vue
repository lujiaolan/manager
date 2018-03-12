<template>
    <div>
    	<div class="openAcountBox">
	        <el-form ref="openAcountForm" :model="openAcountForm" :rules="openAcountForm_rules" label-width="210px">
			    <el-form-item label="允许开设账户类型：" prop="openAccountType">
                    <el-checkbox-group v-model="openAcountForm.openAccountType">
                        <el-checkbox :label="1">个人账户</el-checkbox>
                        <el-checkbox :label="0">代理</el-checkbox>
                    </el-checkbox-group>
			    </el-form-item>
			    <el-form-item label="模拟MT4账户注册：" prop="demoMt4Status">
			   		<el-radio-group v-model="openAcountForm.demoMt4Status">
                        <el-radio :label="1" >开放注册</el-radio>
                        <el-radio :label="0" >不开放</el-radio>
                    </el-radio-group>
			    </el-form-item>
                <el-form-item label="杠杆设置：" prop="leverConfig" >
                    <el-input v-model="openAcountForm.leverConfig"></el-input>
                </el-form-item>
                <span class="pdfClass">
                        支持的杠杆比例,英文,号分割
                   </span>
                <el-form-item label="MT4账户交易控制：" prop="mt4DepositAmount" style="margin-top: 10px">
                    <el-input v-model.number="openAcountForm.mt4DepositAmount"></el-input>
                </el-form-item>
			    <el-form-item label="开户协议：" prop="openProtocolContent">
                    <el-input v-model="openAcountForm.openProtocol" style="display: none"></el-input>
                    <el-input v-model="openAcountForm.openProtocolContent" style="display: none"></el-input>
                    <input type="hidden" name="rev" class="hide_rev" />
                    <input type="file" value="上传文档"  @change="onUploadAgreement"
                           v-bind:style="styleObject.openProtocolColor" accept=".pdf,.docx"/>
			   		<!--<el-radio-group v-model="openAcountForm.openProtocol" style="">-->
                        <!--<el-radio :label="1">显示</el-radio>-->
                        <!--<el-radio :label="0">不显示</el-radio>-->
                    <!--</el-radio-group>-->

			    </el-form-item>
                <span class="pdfClass">
                        仅支持PDF格式文件
                   </span>
			    <el-form-item label="风险披露：" prop="riskDisclosureContent">
                    <el-input v-model="openAcountForm.riskDisclosure" style="display: none"></el-input>
                    <el-input v-model="openAcountForm.riskDisclosureContent" style="display: none"></el-input>
                    <input type="file"   @change="riskDisclosureOnUpload"
                           v-bind:style="styleObject.riskDisclosureColor" accept=".pdf,.docx"/>
			   		<!--<el-radio-group v-model="openAcountForm.riskDisclosure">-->
                        <!--<el-radio :label="1">显示</el-radio>-->
                        <!--<el-radio :label="0">不显示</el-radio>-->
                    <!--</el-radio-group>-->
			    </el-form-item>
                <span  class="pdfClass">
                        仅支持PDF格式文件
                   </span>
			    <el-form-item label="免责声明：" prop="disclaimerContent">
                    <el-input v-model="openAcountForm.disclaimer" style="display: none"></el-input>
                    <el-input v-model="openAcountForm.disclaimerContent" style="display: none"></el-input>
                    <input type="file" value="上传文档"  @change="disclaimerOnUpload"
                           v-bind:style="styleObject.disclaimerColor" accept=".pdf,.docx"/>
			   		<!--<el-radio-group v-model="openAcountForm.disclaimer">-->
                        <!--<el-radio :label="1">显示</el-radio>-->
                        <!--<el-radio :label="0">不显示</el-radio>-->
                    <!--</el-radio-group>-->
                </el-form-item>
                <span class="pdfClass">
                        仅支持PDF格式文件
                   </span>
			    <el-form-item style="margin-top: 20px">
			    	<el-button type="primary" @click="saveOpenAcountBox('openAcountForm')">{{OpenEditOrSave?'修改':'保存'}}</el-button>
			    </el-form-item>
			</el-form>
    	</div>
    </div>
</template>

<script>
module.exports = require('../pageJS/OpenSetting')
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
        color:transparent;
    }
    .pdfClass{
        color: red;
        display: block;
        font-size: 12px;
        margin-left: 50%;
        margin-top: -21px;
    }
    .openAcountBox{
        width: 430px;
    }
    /*#uploadImg{ font-size:12px; overflow:hidden; position:absolute}*/
    /*#file{ position:absolute; z-index:100; margin-left:-180px; font-size:60px;opacity:0;filter:alpha(opacity=0); margin-top:-5px;}*/
</style>

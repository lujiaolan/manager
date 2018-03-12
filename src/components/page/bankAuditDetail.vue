<template>
    <div class="bankCardDetail">
        <div class="redirectHistory"><span @click="bankRedirectHistory" type="info"><i class="fa fa-fw fa-mail-reply-all"></i>返回上级列表</span></div>
        <el-form :model="bankDetailData" ref="bankDetailData" :rules="bankDetail_rules" label-width="120px">
           <el-row>
               <el-col :span="9">
                   <el-col :span="24">
                       <el-form-item prop="bankCardHeadPic">
                           <label class="centerDetail">银行卡正面</label>
                           <el-upload
                               class="upload-demo"
                               drag
                               :on-change="handleChangBKDetailHeadPic"
                               :on-success="handleSuccessBKDetailHeadPic"
                               :action="bankCardHeadPicUpload"
                               multiple>
                               <i class="el-icon-upload" v-if="!bankUrl.imageHeadUrl"></i>
                               <img v-if="bankUrl.imageHeadUrl" :src="bankUrl.imageHeadUrl" class="avatar">
                               <div class="el-upload__text" v-if="!bankUrl.imageHeadUrl">将文件拖到此处，或<em>点击上传</em></div>
                               <div class="el-upload__tip" slot="tip"><i v-if="bankUrl.imageHeadUrl">
                                   点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                           </el-upload>
                           <el-input v-model="bankDetailData.bankCardHeadPic"
                                     @key.native.enter="bankDetailSumbit('bankDetailData')" style="display: none"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="24">
                       <el-form-item prop="bankCardTailPic">
                           <label class="centerDetail">银行卡反面</label>
                           <el-upload
                               class="upload-demo"
                               drag
                               :on-change="handleChangBKDetailTailPic"
                               :on-success="handleSuccessBKDetailTailPic"
                               :action="bankCardTailPicUpload"
                               multiple>
                               <i class="el-icon-upload" v-if="!bankUrl.imageTailUrl"></i>
                               <img v-if="bankUrl.imageTailUrl" :src="bankUrl.imageTailUrl" class="avatar">
                               <div class="el-upload__text" v-if="!bankUrl.imageTailUrl">将文件拖到此处，或<em>点击上传</em></div>
                               <div class="el-upload__tip" slot="tip"><i v-if="bankUrl.imageTailUrl">点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                           </el-upload>
                           <el-input v-model="bankDetailData.bankCardTailPic"
                                     @key.native.enter="bankDetailSumbit('bankDetailData')"   style="display: none"></el-input>
                       </el-form-item>
                   </el-col>
               </el-col>
               <el-col :span="12">
                 <el-col :span="18" class="bankCardInfo">
                     <el-form-item prop="cardHolder" label="持卡人姓名：">
                         <el-input v-model="bankDetailData.cardHolder" disabled=""></el-input>
                     </el-form-item>
                     <el-form-item prop="cardHolder" label="开户银行名称：">
                         <el-input v-model="bankDetailData.bankName" ></el-input>
                     </el-form-item>
                     <el-form-item prop="cardHolder" label="开户行支行：">
                         <el-input v-model="bankDetailData.bankBranch"></el-input>
                     </el-form-item>
                     <el-form-item prop="bankCardNumbers" label="银行卡号：">
                         <el-input v-model="bankDetailData.bankCardNumbers"></el-input>
                     </el-form-item>
                     <el-form-item prop="bankCardStatus" label="审核结果">
                         <el-select v-model="bankDetailData.bankCardStatus">
                             <el-option  v-for="item in bankCardStatusList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                         </el-select>
                     </el-form-item>
                     <el-form-item prop="bankReason" label="审核备注">
                         <el-input v-model="bankDetailData.bankReason"
                                   @key.native.enter="bankDetailSumbit('bankDetailData')"  ></el-input>
                     </el-form-item>
                     <el-form-item align="center">
                         <el-button @click="bankDetailSumbit('bankDetailData')" type="info">保存</el-button>
                     </el-form-item>
                 </el-col>
               </el-col>
           </el-row>
        </el-form>
    </div>
</template>
<script>
    module.exports = require('../pageJS/BankAuditDetail')
</script>
<style class="scope" lang="less">
    .centerDetail{
        margin-left: 126px;
    }
    .redirectHistory{
        cursor: pointer;
    }
    .bankCardDetail .el-select{
        width:100%;
    }
    .bankCardInfo .el-form-item{
        margin-bottom:48px
    }
</style>

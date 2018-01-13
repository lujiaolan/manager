<template>
    <div class="CRMAuditEdit">
        <div class="redirectHistory"><span @click="redirectHistory" type="info"><i class="fa fa-fw fa-mail-reply-all"></i>返回上级列表</span></div>
        <el-form :model="CRMAuditEdit" label-width="120px" ref="CRMAuditEdit" :rules="CRMAuditEdit_rules">
            <el-row>
              <el-col :span="24">
                  <el-col :span="10">
                      <label class="upload-name">证件正面照</label>
                      <el-form-item prop="IDCardHeadPic">
                          <el-input  style="display: none" v-model="CRMAuditEdit.IDCardHeadPic" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                          <el-upload
                              class="upload-demo"
                              drag
                              :before-upload="beforeBankPicEditUpload"
                              :on-success="handleSuccessIDHeadPic"
                              action="http://120.77.55.98:8080/crm/ap/img/upload"
                              :show-file-list="false"
                              multiple>
                              <i class="el-icon-upload" v-if="!imageUrl.imageIDHeadUrl"></i>
                              <img v-if="imageUrl.imageIDHeadUrl" :src="imageUrl.imageIDHeadUrl" class="avatar">
                              <div class="el-upload__text" v-if="!imageUrl.imageIDHeadUrl">将文件拖到此处，或<em>点击上传</em></div>
                              <div class="el-upload__tip" slot="tip"><i v-if="imageUrl.imageIDHeadUrl">点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                      </el-form-item>
                  </el-col>
                  <el-col :span="10">
                      <label class="upload-name">证件反面照</label>
                      <el-form-item  prop="IDCardTailPic" >
                          <el-input style="display: none;" v-model="CRMAuditEdit.IDCardTailPic" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')" ></el-input>
                          <el-upload
                              class="upload-demo"
                              drag
                              :before-upload="beforeBankPicEditUpload"
                              :on-success="handleSuccessIDTailPic"
                              action="http://120.77.55.98:8080/crm/ap/img/upload"
                              :show-file-list="false"
                              multiple>
                              <i class="el-icon-upload" v-if="!imageUrl.imageIDTailUrl"></i>
                              <img v-if="imageUrl.imageIDTailUrl" :src="imageUrl.imageIDTailUrl" class="avatar">
                              <div class="el-upload__text" v-if="!imageUrl.imageIDTailUrl">将文件拖到此处，或<em>点击上传</em></div>
                              <div class="el-upload__tip" slot="tip"><i v-if="imageUrl.imageIDTailUrl">点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                      </el-form-item>
                  </el-col>
              </el-col>
               <el-col :span="24">
                   <el-col :span="10">
                       <label class="upload-name">银行卡正面照</label>
                       <el-form-item prop="bankCardHeadPic" >
                           <el-input style="display: none;"
                                     v-model="CRMAuditEdit.bankCardHeadPic" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                           <el-upload
                               class="upload-demo"
                               drag
                               :before-upload="beforeBankPicEditUpload"
                               :on-success="handleSuccessBankHeadPic"
                               action="http://120.77.55.98:8080/crm/ap/img/upload"
                               :show-file-list="false"
                               multiple>
                               <i class="el-icon-upload" v-if="!imageUrl.imageBankHeadUrl"></i>
                               <img v-if="imageUrl.imageBankHeadUrl" :src="imageUrl.imageBankHeadUrl" class="avatar">
                               <div class="el-upload__text" v-if="!imageUrl.imageBankHeadUrl">将文件拖到此处，或<em>点击上传</em></div>
                               <div class="el-upload__tip" slot="tip"><i v-if="imageUrl.imageBankHeadUrl">
                                   点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                           </el-upload>
                       </el-form-item>
                   </el-col>
                   <el-col :span="10">
                       <label class="upload-name">银行卡反面照</label>
                       <el-form-item prop="bankCardTailPic" >
                           <el-input style="display: none;"
                                     v-model="CRMAuditEdit.bankCardTailPic" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                           <el-upload
                               class="upload-demo"
                               drag
                               :before-upload="beforeBankPicEditUpload"
                               :on-success="handleSuccessBankTailPic"
                               action="http://120.77.55.98:8080/crm/ap/img/upload"
                               :show-file-list="false"
                               multiple>
                               <i class="el-icon-upload" v-if="!imageUrl.imageBankTailUrl"></i>
                               <img v-if="imageUrl.imageBankTailUrl" :src="imageUrl.imageBankTailUrl" class="avatar">
                               <div class="el-upload__text" v-if="!imageUrl.imageBankTailUrl">将文件拖到此处，或<em>点击上传</em></div>
                               <div class="el-upload__tip" slot="tip"><i v-if="imageUrl.imageBankTailUrl">
                                   点击图片进行修改</i>只能上传jpg/png文件，且不超过500kb</div>
                           </el-upload>
                       </el-form-item>
                   </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <el-form-item prop="IDName" label="姓名" >
                            <el-input  v-model="CRMAuditEdit.IDName" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="country" label="国籍">
                            <el-input v-model="CRMAuditEdit.country" placeholder="请输入国籍"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="IDNumber" label="证件号码">
                            <el-input v-model="CRMAuditEdit.IDNumber" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="bankName" label="开户行">
                            <el-input v-model="CRMAuditEdit.bankName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <el-form-item prop="userEngName" label="英文名">
                            <el-input v-model="CRMAuditEdit.userEngName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="addressSecond" label="城市">
                            <el-input v-model="CRMAuditEdit.addressSecond"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="cardHolder" label="持卡人">
                            <el-input v-model="CRMAuditEdit.cardHolder" disabled=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="bankBranch" label="开户支行">
                            <el-input v-model="CRMAuditEdit.bankBranch"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6" >
                        <el-form-item prop="spell" label="拼音">
                            <el-input v-model="CRMAuditEdit.spell"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                       <el-form-item prop="addressOne" label="省份">
                           <el-input v-model="CRMAuditEdit.addressOne"></el-input>
                       </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="userPhone" label="手机号">
                            <el-input v-model="CRMAuditEdit.userPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="bankCardNumbers" label="银行卡号">
                            <el-input v-model="CRMAuditEdit.bankCardNumbers"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <el-form-item prop="sex" label="性别">
                            <el-input v-model="CRMAuditEdit.sex"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="birthDay" label="出生日期">
                            <el-date-picker
                                v-model="CRMAuditEdit.birthDay"
                                type="date"
                                placeholder="选择日期"
                                >
                            </el-date-picker>
                            <!--<el-input  v-model="CRMAuditEdit.birthDay" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="userEmail" label="邮件">
                            <el-input v-model="CRMAuditEdit.userEmail" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="bankAddress" label="联系地址">
                            <el-input v-model="CRMAuditEdit.bankAddress" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-col :span="6">
                        <el-form-item prop="verifyStatus" label="审核结果">
                            <el-select v-model="CRMAuditEdit.verifyStatus" placeholder="请选择认证状态" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')">
                                <el-option
                                    v-for="item in stateVerify"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="reason" label="审核备注">
                            <el-input v-model="CRMAuditEdit.reason" @key.native.enter="saveCRMAuditEdit('CRMAuditEdit')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                       <el-form-item> <el-button type="info" @click="saveCRMAuditEdit('CRMAuditEdit')">{{CRMAuditEditSave?'修改':'保存'}}</el-button></el-form-item>
                    </el-col>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    module.exports = require('../pageJS/CRMAuditEdit')
</script>
<style scoped="" lang="less">
    .redirectHistory{
        top: -25px;
        left: -20px;
        position: relative
    }
    .fa-mail-reply-all{
        color: #00d1b2;
    }
    .CRMAuditEdit .el-select,.CRMAuditEdit .el-date-editor{
        width: 100%

    }
   .centerTop .el-form-item__label{
       margin-left: 265px;
       margin-bottom: 3px
    }
    .avatar{
        width: 370px;
        height: 177px;
    }
    .CRMAuditEdit .upload-name {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        text-align: center;
        color: rgb(72, 106, 106);
    }
</style>

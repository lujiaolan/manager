<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="searchCrmAgent" ref="searchCrmAgent" :rules="searchCrmAgent_rules" label-width="6px">
                <el-form-item prop="agentNameLike" >
                    <el-input v-model="searchCrmAgent.agentNameLike" placeholder="姓名/邮箱" class="handle-input mr10"></el-input>
                </el-form-item>
               <el-form-item prop="referralCode">
                   <el-input v-model.number="searchCrmAgent.referralCode" placeholder="代理ID" class="handle-input mr10"></el-input>
               </el-form-item>
                <el-form-item prop="agentLevel">
                    <el-select v-model="searchCrmAgent.agentLevel" placeholder="代理级别">
                        <el-option v-for="level in levelList" :key="level.value" :value="level.value" :label="level.label"></el-option>
                    </el-select>
                </el-form-item>
               <el-form-item prop="status">
                   <el-select v-model="searchCrmAgent.status" placeholder="账户状态" class="handle-select mr10">
                       <el-option v-for="status in CRMAgentStatus" :key="status.label" :label="status.label" :value="status.value"></el-option>
                   </el-select>
               </el-form-item>
                <el-form-item prop="address">
                    <el-select v-model="searchCrmAgent.address" placeholder="选择省份" class="handle-select mr10">
                        <el-option :key="item.index" :label="item.label" :value="item.value" v-for="item in select_country_list"></el-option>
                    </el-select>
                </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="getCrmAgent">查询</el-button>
                   <el-button type="primary" @click="addAgentFormshow">添加</el-button>
               </el-form-item>
            </el-form>
            <el-dialog title="添加代理信息" :visible.sync="addAgentFormVisible">
                <el-form :model="addAgentFormModel" :rules="addAgent_rules" ref="addAgentFormModel" label-width="160px">
                    <el-form-item label="姓名"  prop="IDName">
                        <el-input v-model="addAgentFormModel.IDName" @key.native.enter="addCrmAgentFrom('addAgentFormModel')"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称"  prop="userEngName">
                        <el-input v-model="addAgentFormModel.userEngName" @key.native.enter="addCrmAgentFrom('addAgentFormModel')"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱"  prop="userEmail">
                        <el-input v-model="addAgentFormModel.userEmail" @key.native.enter="addCrmAgentFrom('addAgentFormModel')"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="addAgentFormModel.sex" >
                            <el-radio :label="'男'">男</el-radio>
                            <el-radio :label="'女'">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item class="width-40" label="出生日期">
                        <el-date-picker
                            v-model="addAgentFormModel.birthDay"
                            type="date"
                            placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="代理级别" prop="agentLevel">
                        <el-select v-model="addAgentFormModel.agentLevel" placeholder="请选择代理级别"
                                   @key.native.enter="addCrmAgentFrom('addAgentFormModel')" :disabled="disAgentLevel">
                            <el-option  :value="item.value" :key="item.value" :label="item.label" v-for="item in levelList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推荐码" prop="referralCode">
                        <el-input v-model.number="addAgentFormModel.referralCode" :disabled='disReferralCode'
                                  @key.native.enter="addCrmAgentFrom('addAgentFormModel')"></el-input>
                    </el-form-item>
                    <el-form-item label="国家" >
                        <el-input v-model="addAgentFormModel.country"></el-input>
                    </el-form-item>
                    <el-form-item label="用户界面语言" >
                        <el-select v-model="addAgentFormModel.setUILocale" placeholder="请选择用户界面语言">
                            <el-option :label="item.label" :key="item.label" :value="item.value" v-for="item in setUILocaleList" ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item class="width-40" label="省市区" prop="address">
                        <el-cascader
                            :options="options"
                            v-model="addAgentFormModel.address"
                            @change="handleChange"
                            expand-trigger="hover"
                            :filterable="true">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="width-40" label="手机号"  prop="userPhone">
                        <el-input v-model="addAgentFormModel.userPhone"></el-input>
                    </el-form-item>
                    <el-form-item class="width-40" style="margin-bottom: 50px" >
                        <el-button @click="addAgentFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addCrmAgentFrom('addAgentFormModel')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table :data="tableData" border style="width: 100%" class="agentList">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="referralCode" label="代理ID" align="center"></el-table-column>
            <el-table-column prop="IDName" label="姓名"  align="center"></el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="200" align="center"></el-table-column>
            <el-table-column label="代理等级" align="center">
                <template scope="scope">
                    <span v-if="scope.row.agentLevel==1">一级代理</span>
                    <span v-if="scope.row.agentLevel==2">二级代理</span>
                    <span v-if="scope.row.agentLevel==3">三级代理</span>
                    <span v-if="scope.row.agentLevel==4">四级代理</span>
                    <span v-if="scope.row.agentLevel==5">五级代理</span>
                </template>
            </el-table-column>
            <el-table-column prop="superUserInfo" label="上级代理"  width="100" align="center"></el-table-column>
            <el-table-column label="认证状态" align="center">
                <template scope="scope">
                    <span v-if="scope.row.verifyStatus===-1">认证中</span>
                    <span v-if="scope.row.verifyStatus===0">未认证</span>
                    <span v-if="scope.row.verifyStatus===1">认证成功</span>
                    <span v-if="scope.row.verifyStatus===2">认证失败</span>
                </template>
            </el-table-column>
            <!--<el-table-column prop="country" label="国家 " align="center"></el-table-column>-->
            <el-table-column prop="address" label="地区"></el-table-column>
            <el-table-column prop="mt4Amount" label="MT4账户数" align="center"></el-table-column>
            <el-table-column prop="plusAmount" label="累计存款" align="center"></el-table-column>
            <el-table-column prop="minusAmount" label="累计取款" align="center"></el-table-column>
            <el-table-column prop="money" label="钱包余额($)" width="60" align="center"></el-table-column>
            <el-table-column prop="commissionAmount" label="返佣金额($)"  width="60" align="center"></el-table-column>
            <el-table-column prop="status" label="账户状态"  width="60" align="center">
                <template scope="scope">
                    <span v-if="scope.row.status==1">正常</span>
                    <span v-if="scope.row.status==-1">冻结</span>
                    <span v-if="scope.row.status==0">未激活</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="250" align="center">
                <template scope="scope">
                    <el-button size="small"
                               @click="baseInfoAgentShow(scope.$index, scope.row)">详情</el-button>
                    <el-button size="small"
                               @click="agentComsSet(scope.row)">佣金设置</el-button>
                    <el-dialog title="佣金设置" :visible.sync="agentComsSetVisible">
                        <el-form class="commissionSet">
                            <el-form-item class="width-50" label="代理等级" style="float: none">
                                <template>
                                    <span v-if="agentComsSetLevel==1" class="agentLeverStyle">一级代理</span>
                                    <span v-if="agentComsSetLevel==2" class="agentLeverStyle">二级代理</span>
                                    <span v-if="agentComsSetLevel==3" class="agentLeverStyle">三级代理</span>
                                    <span v-if="agentComsSetLevel==4" class="agentLeverStyle">四级代理</span>
                                    <span v-if="agentComsSetLevel==5" class="agentLeverStyle">五级代理</span>
                                </template>
                            </el-form-item>
                            <el-form-item label="返佣规则">
                                <template v-for="(item, index) in comsRules">
                                    <br/>
                                    <div class="typeContent varietyName">
                                        <!--由于item的所有symbolType都是一样的，所以选择item[0].symbolType显示-->
                                        <span>{{ item[0].symbolType }}</span>
                                        <label class="typeInfo comsLabel" v-for="child in item" @click="changeVal(child,$event)">
                                            <span class="typeInfo__input" v-bind:class="{ isChecked: child.selected }" @click="show1($event)">
                                                <span class="typeInfo__inner"></span>
                                                <input type="radio" class="typeInfo__original" :value="child._id">
                                            </span>
                                            <span class="typeInfo__label">{{ child.name }}</span>
                                        </label>
                                    </div>
                                </template>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <el-button size="small"
                               @click="changeBalance(scope.row)">调整金额</el-button>
                    <el-dialog title="调整金额" :visible.sync="changeBalanceVisible">
                        <el-form :model="changeBalanceForm" label-width="120px" ref="changeBalanceForm" :rules="changeBalanceRules">
                            <el-form-item class="width-40 marginR10" label="邮箱" prop="agentEmail">
                                <el-input v-model="changeBalanceForm.Email" disabled></el-input>
                            </el-form-item>
                            <el-form-item class="width-40 marginR10" label="钱包余额" prop="Balance">
                                <el-input v-model="changeBalanceForm.Balance" disabled></el-input>
                            </el-form-item>
                            <el-form-item class="width-40 marginR10" label="调整类型" required prop="changeType">
                                <el-select v-model="changeBalanceForm.changeType">
                                    <el-option label="入金" value="1"></el-option>
                                    <el-option label="出金" value="-1"></el-option>
                                    <el-option label="添加佣金" value="2"></el-option>
                                    <el-option label="减少佣金" value="-2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="width-40 marginR10" label="金额" prop="Count">
                                <el-input v-model="changeBalanceForm.Count"></el-input>
                            </el-form-item>
                            <el-form-item class="width-40 marginR10" label="管理员备注" >
                                <el-input v-model="changeBalanceForm.AdminTip"></el-input>
                            </el-form-item>
                            <el-form-item class="width-40 marginR10">
                                <template>
                                    <el-button @click="changeBalanceVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="changeBalanceS('changeBalanceForm')">确 定</el-button>
                                </template>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <el-button size="small"
                               @click="jumpAgentCrm(scope.$index, scope.row)">跳转</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="CrmAgentSizeChange" @current-change="currentChangeCrmAgent"
                           :current-page.sync="searchCrmAgent.page"
                           :page-sizes="[10,20,30, 50]" :page-size="searchCrmAgent.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalCrmAgent">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="baseInfoVisible" @close="baseInfoEditVisible = true" title="详情">
            <el-tabs type="border-card">
                <el-tab-pane label="基本信息">
                    <el-form :model="baseInfoAgentForm" label-width="120px" ref="baseInfoAgentForm" :rules="baseInfoAgentForm_rules">
                        <el-row>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="IDName">
                                        <el-input v-model="baseInfoAgentForm.IDName" :disabled="baseInfoEditVisible"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="英文名称" prop="userEngName">
                                        <el-input v-model="baseInfoAgentForm.userEngName" :disabled="baseInfoEditVisible"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="邮箱" prop="userEmail">
                                        <el-input v-model="baseInfoAgentForm.userEmail" disabled=""
                                                  ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="电话" prop="userPhone">
                                        <el-input v-model="baseInfoAgentForm.userPhone" :disabled="baseInfoEditVisible"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="代理级别" prop="agentLevel">
                                        <el-select v-model="baseInfoAgentForm.agentLevel" placeholder="请选择代理级别" disabled="">
                                            <el-option  :value="item.value" :key="item.value" :label="item.label" v-for="item in levelList"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">

                                    <el-form-item label="返佣规则" prop="RebateType">
                                        <el-select v-model="baseInfoAgentForm.RebateType" disabled="">
                                            <el-option  v-for="(item, index) in comsRules" :key="item.value" :value="item.value"
                                                        :label="item.label"></el-option>

                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="国家" prop="country">
                                        <el-input v-model="baseInfoAgentForm.country" :disabled="baseInfoEditVisible"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="性别"  v-if="baseInfoEditVisible">
                                        <el-input v-model="baseInfoAgentForm.sex"
                                                  :disabled="baseInfoEditVisible"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" v-else>
                                        <el-radio-group v-model="baseInfoAgentForm.sex">
                                            <el-radio :label="'男'">男</el-radio>
                                            <el-radio :label="'女'" >女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="出生日期" prop="birthDay">
                                        <el-date-picker
                                            v-model="baseInfoAgentForm.birthDay"
                                            type="date"
                                            placeholder="选择日期"
                                            :disabled="baseInfoEditVisible"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="用户界面语言" >
                                        <el-select v-model="baseInfoAgentForm.setUILocale" :disabled="baseInfoEditVisible" placeholder="请选择用户界面语言">
                                            <el-option :label="item.label" :key="item.label" :value="item.label" v-for="item in setUILocaleList" ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="省市区"  prop="address">
                                        <el-cascader
                                            :options="options"
                                            :disabled="baseInfoEditVisible"
                                            v-model="baseInfoAgentForm.address"
                                            expand-trigger="hover"
                                        >
                                        </el-cascader>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="上级代理邮箱" prop="superUserEmail">
                                        <el-input v-model="baseInfoAgentForm.superUserEmail" disabled=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="账户状态">
                                    <el-radio-group v-model="baseInfoAgentForm.status"  :disabled="baseInfoEditVisible">
                                        <el-radio :label="1">正常</el-radio>
                                        <el-radio :label="2" >冻结</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系地址" prop="addressDetail">
                                    <el-input v-model="baseInfoAgentForm.addressDetail" :disabled="baseInfoEditVisible"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item >
                                    <div class="dialog-footer" v-if="baseInfoEditVisible">
                                        <el-button type="primary" @click="baseInfoAgentEdit" style="float: right">编 辑</el-button>
                                    </div>
                                    <div class="dialog-footer" v-else>
                                        <el-button @click="ResetAgentPWD" style="float: right">重置密码</el-button>
                                        <el-button type="primary" @click="saveAgentBaseInfo('baseInfoAgentForm')" style="float: right">提交信息</el-button>

                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="证件信息">
                    <el-form :model="baseInfoAgentForm" label-width="130px">
                        <el-row>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="证件名称" >
                                        <el-input v-model="baseInfoAgentForm.IDName" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="证件号码" >
                                        <el-input v-model="baseInfoAgentForm.IDNumber" disabled></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="证件正面照" >
                                        <div class="baseImg IDIMG"><img :src="baseInfoAgentForm.IDCardHeadPic" alt="未上传" class="avatar"/></div>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="证件反面照" >
                                        <div class="baseImg IDIMG"><img :src="baseInfoAgentForm.IDCardTailPic" alt="未上传" class="avatar"/></div>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table :data="bankCardList" width="100%" class="editBank bankCardList">
                        <el-table-column label="开户行支行">
                            <template scope="scope">
                                <el-input v-model="scope.row.bankBranch" v-if="scope.$index==editVisibleIndex"></el-input>
                                <span v-else>{{scope.row.bankBranch }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="银行开户名字">
                            <template scope="scope">
                                <el-input v-model="scope.row.bankName" v-if="scope.$index==editVisibleIndex"></el-input>
                                <span v-else>{{scope.row.bankName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="银行卡号">
                            <template scope="scope">
                                <el-input v-model="scope.row.bankCardNumbers" v-if="scope.$index==editVisibleIndex"></el-input>
                                <span v-else>{{scope.row.bankCardNumbers }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="银行卡正面">
                            <template scope="scope">
                                <el-upload
                                    class="upload-demo"
                                    drag
                                    action="http://120.77.55.98:8080/crm/ap/img/upload"
                                    multiple
                                    :show-file-list="false"
                                    :before-upload="beforeBankHeadPicUpload"
                                    :on-success="handleSuccessAgentBankHeadPic"
                                    v-if="scope.$index==editVisibleIndex">
                                    <img :src="scope.row.bankCardHeadPic"/>
                                    <i class="el-icon-upload" v-if="scope.$index==editVisibleIndex&&!bankCardPost.bankCardHeadPic"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                                <div v-else class="noEditImg" @click="bigAgentImg(scope.row.bankCardHeadPic)">
                                    <img :src="scope.row.bankCardHeadPic"/></div>
                                <el-input v-model="bankCardPost.bankCardHeadPic" style="display:none;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="银行卡反面">
                            <template scope="scope">
                                <el-upload
                                    class="upload-demo"
                                    v-if="scope.$index==editVisibleIndex"
                                    drag
                                    :before-upload="beforeBankHeadPicUpload"
                                    :on-success="handleSuccessAgentBankTailPic"
                                    action="http://120.77.55.98:8080/crm/ap/img/upload"
                                    :show-file-list="false"
                                    multiple>
                                    <img :src="scope.row.bankCardTailPic"/>
                                    <i class="el-icon-upload load_icon_margin" v-if="scope.$index==editVisibleIndex&&!bankCardPost.bankCardTailPic"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                                <div v-else="" class="noEditImg" @click="bigAgentImg(scope.row.bankCardTailPic)">
                                    <img :src="scope.row.bankCardTailPic"/>
                                </div>
                                <el-input v-model="bankCardPost.bankCardTailPic"  style="display:none;"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="编辑" width="120">
                            <template scope="scope">
                                <el-button size="small"
                                           @click="changeAgentBankCard(scope.$index, scope.row)"
                                           v-if="scope.$index!==editVisibleIndex">
                                    <i class="el-icon-edit"></i></el-button>
                                <el-button size="small"
                                           @click="deleteAgentBankCard(scope.$index, scope.row)" v-if="scope.$index!==editVisibleIndex" :disabled="scope.row.importantCard==1">
                                    <i class="el-icon-delete"></i></el-button>
                                <el-button size="small" type="success" @click="saveAgentBankCard(scope.$index, scope.row)"
                                           v-if="scope.$index==editVisibleIndex">保存</el-button>
                                <el-button size="small" @click="cancelAgentBankCark(scope.$index,scope.row)"
                                           v-if="scope.$index==editVisibleIndex">取消</el-button>

                            </template>

                        </el-table-column>
                    </el-table>
                </el-tab-pane>

            </el-tabs>

        </el-dialog>

        <el-dialog title="放大图片"  :visible.sync="imgAgent.imgAgentShow" size="tiny">
            <img :src="imgAgent.imgAgentImgBig" width="420px">
        </el-dialog>
    </div>
</template>

<script>
    module.exports = require('../pageJS/CrmAgent')
</script>

<style lang="less">
    .avatar{
        width: 370px;
        height: 177px;
    }
    .IDIMG{
        width: 100%;
    }
    .el-upload-dragger .el-icon-upload{
        /*margin: -21px 0 16px;*/
    }
</style>

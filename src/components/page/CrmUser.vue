<template>
    <div class="crmAgent">
        <div class="handle-box">
          <el-form :model="CRMUserSearch" ref="CRMUserSearch" :rules="CRMUserSearch_rules" label-width="6px">
             <el-form-item prop="userNameLike">
                 <el-input v-model="CRMUserSearch.userNameLike" placeholder="姓名/邮箱" class="handle-input mr10"></el-input>
             </el-form-item>
              <!--<el-form-item prop="referralCode">-->
                  <!--<el-input v-model.number="CRMUserSearch.referralCode" placeholder="上级代理" class="handle-input mr10"></el-input>-->
              <!--</el-form-item>-->
             <el-form-item prop="status">
                 <el-select v-model="CRMUserSearch.status" placeholder="账户状态" class="handle-select mr10">
                     <el-option  :label="item.label" :value="item.value" :key="item.label" v-for="item in statusList"></el-option>
                 </el-select>
             </el-form-item>
              <el-form-item prop="address">
                  <el-select v-model="CRMUserSearch.address" placeholder="选择省份" class="handle-select mr10">
                      <el-option :key="item.index" :label="item.label" :value="item.value" v-for="item in select_country_list"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item >
                  <el-button type="primary" @click="getCRMUserList">查询</el-button>
                  <el-button type="primary" @click="addAgentFormShow">添加</el-button>
              </el-form-item>
          </el-form>
            <el-dialog title="添加用户信息" :visible.sync="addAgentFormVisible">
                <el-form :model="addAgentForm" :rules="addAgentRules" ref="addAgentForm" label-width="120px">
                    <el-row>
                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item  label="姓名"  prop="IDName">
                                    <el-input v-model="addAgentForm.IDName" @key.native.enter="addCrmAgent('addAgentForm')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item  label="英文名称"  prop="userEngName">
                                    <el-input v-model="addAgentForm.userEngName" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                           <el-col :span="12">
                               <el-form-item label="拼音" prop="spell">
                                   <el-input v-model="addAgentForm.spell" placeholder="请输入姓名拼音"></el-input>
                               </el-form-item>
                           </el-col>
                            <el-col :span="12">
                                <el-form-item  label="性别" prop="sex">
                                    <el-radio-group v-model="addAgentForm.sex">
                                        <el-radio :label="'男'">男</el-radio>
                                        <el-radio :label="'女'">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-col>

                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item  label="出生年月" prop="birthDay">
                                    <el-date-picker  v-model="addAgentForm.birthDay"
                                                     type="date"
                                                     placeholder="年月日"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item  label="邮箱"  prop="userEmail">
                                    <el-input v-model="addAgentForm.userEmail" @key.native.enter="addCrmAgent('addAgentForm')"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item  label="手机号"  prop="userPhone">
                                    <el-input v-model="addAgentForm.userPhone" @key.native.enter="addCrmAgent('addAgentForm')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item  label="国家" prop="country">
                                    <el-input v-model="addAgentForm.country"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-col>

                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item  label="用户界面语言" prop="setUILocale">
                                    <el-select v-model="addAgentForm.setUILocale" placeholder="请选择用户界面语言">
                                        <el-option label="English" value="English">English</el-option>
                                        <el-option label="中文" value="中文">中文</el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item  label="省市区" prop="address">
                                    <el-cascader
                                        :options="options"
                                        v-model="addAgentForm.address"
                                        @change="handleChange"
                                        expand-trigger="hover"
                                        :filterable="true">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-col>
                        <el-col :span="24">
                            <el-col :span="12">
                                <el-form-item  label="推荐码" prop="referralCode">
                                    <el-input v-model.number="addAgentForm.referralCode" @key.native.enter="addCrmAgent('addAgentForm')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item>
                                    <div class="footer-comfirm">
                                        <el-button @click="addAgentFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="addCrmAgent('addAgentForm')">确 定</el-button>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-col>

                    </el-row>
                </el-form>

            </el-dialog>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="IDName" label="姓名" width="180"></el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="superUserInfo" label="上级代理" width="180"></el-table-column>
            <el-table-column prop="userEngName" label="认证状态" width="100">
                <template scope="scope">
                    <span v-if="scope.row.verifyStatus==-1">认证中</span>
                    <span v-if="scope.row.verifyStatus==0" style="color:red">未认证</span>
                    <span v-if="scope.row.verifyStatus==1">认证成功</span>
                    <span v-if="scope.row.verifyStatus==2">认证失败</span>
                </template>
            </el-table-column>
            <!--<el-table-column prop="country" label="国家"></el-table-column>-->
            <el-table-column prop="address" label="地区"></el-table-column>
            <el-table-column prop="mt4Amount" label="MT4账户数"></el-table-column>
            <el-table-column prop="plusAmount" label="累计存款"></el-table-column>
            <el-table-column prop="minusAmount" label="累计取款"></el-table-column>
            <el-table-column prop="money" label="钱包余额"></el-table-column>
            <el-table-column prop="status" label="账户状态" >
              <template scope="scope">
                  <span v-if="scope.row.status==1">正常</span>
                  <span v-if="scope.row.status==2">暂停</span>
                  <span v-if="scope.row.status==-1">冻结</span>
                  <span v-if="scope.row.status==0">未激活</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template scope="scope">
                    <el-button size="small"
                               @click="baseInfoShow(scope.$index, scope.row)">详情</el-button>
                    <el-dialog :visible.sync="baseInfoVisible" @close="baseInfoEditVisible = true" title="详情">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基本信息">
                                <el-form :model="baseInfoUserForm" label-width="120px">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-col :span="12">
                                                <el-form-item  label="姓名" >
                                                    <el-input v-model="baseInfoUserForm.IDName" :disabled="baseInfoEditVisible"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item  label="用户属性" >
                                                    <el-input v-model="baseInfoUserForm.roles" disabled=""></el-input>
                                                </el-form-item>

                                            </el-col>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-col :span="12">
                                                <el-form-item  label="性别" >
                                                    <el-radio-group v-model="baseInfoUserForm.sex" :disabled="baseInfoEditVisible">
                                                        <el-radio :label="'男'">男</el-radio>
                                                        <el-radio :label="'女'" >女</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item  label="英文名称" >
                                                    <el-input v-model="baseInfoUserForm.userEngName" :disabled="baseInfoEditVisible"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-col :span="12">
                                                <el-form-item label="拼音" prop="spell">
                                                    <el-input v-model="baseInfoUserForm.spell" :disabled="baseInfoEditVisible"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item  label="邮箱" >
                                                    <el-input v-model="baseInfoUserForm.userEmail" disabled=""></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-col :span="12">
                                                    <el-form-item  label="手机号" >
                                                        <el-input v-model="baseInfoUserForm.userPhone" :disabled="baseInfoEditVisible"></el-input>
                                                    </el-form-item>

                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item  label="国家" >
                                                        <el-input v-model="baseInfoUserForm.country" :disabled="baseInfoEditVisible"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-col>
                                            <el-col :span="24">
                                                <el-col :span="12">
                                                    <el-form-item  label="出生日期" >
                                                        <el-date-picker v-model="baseInfoUserForm.birthDay" type='date' placeholder="选择出生日期"
                                                                        :disabled="baseInfoEditVisible"></el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-form-item  label="省市区" >
                                                        <el-cascader
                                                            :options="options"
                                                            :disabled="baseInfoEditVisible"
                                                            v-model="baseInfoUserForm.address"
                                                            @change="handleChange"
                                                            expand-trigger="hover"
                                                            :filterable="true">
                                                        </el-cascader>
                                                    </el-form-item>
                                                </el-col>
                                            </el-col>
                                            </el-col>
                                        <el-col :span="24">
                                            <el-col :span="12">
                                                <el-form-item  label="用户界面语言" >
                                                    <el-select v-model="baseInfoUserForm.setUILocale" :disabled="baseInfoEditVisible"
                                                               placeholder="请选择用户界面语言">
                                                        <el-option :label="item.label" :key="item.label"
                                                                   :value="item.value" v-for="item in setUILocaleList" ></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item  label="账户状态"  >
                                                    <el-radio-group v-model="baseInfoUserForm.status" :disabled="baseInfoEditVisible">
                                                        <el-radio :label="1">正常</el-radio>
                                                        <el-radio :label="-1" >冻结</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </el-col>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item  label="上级代理邮箱" >
                                                <el-input v-model="baseInfoUserForm.superUserEmail" disabled=""></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item  label="联系地址" >
                                                <el-input v-model="baseInfoUserForm.addressDetail" :disabled="baseInfoEditVisible"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                                <div class="dialog-footer" v-if="baseInfoEditVisible">
                                    <el-button type="primary" @click="baseInfoEdit" style="float: right">编 辑</el-button>
                                </div>
                                <div class="dialog-footer" v-else>
                                    <el-button @click="ResetUserPWD" style="float: right">重置密码</el-button>
                                    <el-button type="primary" @click="saveBaseInfo" style="float: right">提交信息</el-button>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="证件信息">
                                <el-form :model="baseInfoUserForm" label-width="120px">
                                   <el-row>
                                       <el-col :span='24'>
                                          <el-col :span="12">
                                              <el-form-item  label="姓名" >
                                                  <el-input v-model="baseInfoUserForm.IDName" disabled></el-input>
                                              </el-form-item>
                                          </el-col>
                                           <el-col :span="12">
                                               <el-form-item  label="证件号码" >
                                                   <el-input v-model="baseInfoUserForm.IDNumber" disabled></el-input>
                                               </el-form-item>
                                           </el-col>
                                       </el-col>
                                       <el-col :span="24">
                                           <el-col :span="12">
                                               <el-form-item  label="证件正面照" >
                                                   <div class="baseImg IDIMG">
                                                       <img :src="baseInfoUserForm.IDCardHeadPic" alt="未上传"  class="avatar"/></div>
                                               </el-form-item>
                                           </el-col>
                                          <el-col :span="12">
                                              <el-form-item  label="证件反面照" >
                                                  <div class="baseImg IDIMG">
                                                      <img :src="baseInfoUserForm.IDCardTailPic" alt="未上传" class="avatar"/></div>
                                              </el-form-item>
                                          </el-col>
                                       </el-col>
                                   </el-row>
                                </el-form>
                                <el-table :data="baseUserBankCard" width="100%" class="editBank">
                                    <el-table-column label="开户行支行">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.bankBranch" v-if="scope.$index==editVisibleUserIndex"></el-input>
                                            <span v-else>{{scope.row.bankBranch }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="银行开户名字">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.bankName" v-if="scope.$index==editVisibleUserIndex"></el-input>
                                            <span v-else>{{scope.row.bankName }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="银行卡号">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.bankCardNumbers" v-if="scope.$index==editVisibleUserIndex"></el-input>
                                            <span v-else>{{scope.row.bankCardNumbers }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="银行卡正面">
                                        <template scope="scope">
                                            <el-upload
                                                class="upload-demo"
                                                drag
                                                :action="bankCardHeadPicUpload"
                                                multiple
                                                :show-file-list="false"
                                                :before-upload="beforeBankHeadPicUserUpload"
                                                :on-success="handleSuccessUserBankHeadPic"
                                                v-if="scope.$index==editVisibleUserIndex">
                                                <img :src="scope.row.bankCardHeadPic"/>
                                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                                <i class="el-icon-upload" v-if="scope.$index==editVisibleUserIndex&&postBankImg.bankCardHeadPic"></i>
                                            </el-upload>
                                            <div v-else class="noEditImg" @click="bigIMGUser(scope.row.bankCardHeadPic)">
                                                <img :src="scope.row.bankCardHeadPic"/></div>
                                            <el-input v-model="postBankImg.bankCardHeadPic" style="display: none"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="银行卡反面">
                                        <template scope="scope">
                                            <el-upload
                                                class="upload-demo"
                                                drag
                                                :before-upload="beforeBankHeadPicUserUpload"
                                                :on-success="handleSuccessUserBankTailPic"
                                                :action="bankCardTailPicUpload"
                                                multiple
                                                :show-file-list="false"
                                                v-if="scope.$index==editVisibleUserIndex">
                                                <img :src="scope.row.bankCardTailPic"/>
                                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                                <i class="el-icon-upload" v-if="scope.$index==editVisibleUserIndex&&!postBankImg.bankCardTailPic"></i>
                                            </el-upload>
                                            <div v-else class="noEditImg" @click="bigIMGUser(scope.row.bankCardTailPic)">
                                                <img :src="scope.row.bankCardTailPic"/>
                                            </div>
                                            <el-input v-model="postBankImg.bankCardTailPic" style="display: none"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="编辑" width="120">
                                        <template scope="scope">
                                            <el-button size="small"
                                                       @click="changeBankCard(scope.$index, scope.row)"
                                                       v-if="scope.$index!=editVisibleUserIndex"><i class="el-icon-edit"></i></el-button>
                                            <el-button size="small"
                                                       @click="deleteBankCard(scope.$index, scope.row)"
                                                       v-if="scope.$index!=editVisibleUserIndex"
                                                       :disabled="scope.row.importantCard==1"><i class="el-icon-delete"></i></el-button>
                                            <el-button @click="cancelBankCard(scope.$index,scope.row)" size="small"
                                                       v-if="scope.$index==editVisibleUserIndex">取消</el-button>
                                            <el-button size="small" type="info"
                                                       @click="saveBankCard(scope.$index, scope.row)"
                                                       v-if="scope.$index==editVisibleUserIndex">保存</el-button>
                                        </template>

                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-dialog>
                    <el-button size="small"
                               @click="changeBalance(scope.row)">调整金额</el-button>
                    <el-dialog title="调整金额" :visible.sync="changeBalanceVisible">
                        <el-form :model="changeBalanceForm" label-width="120px" ref="changeBalanceForm" :rules="changeBalanceRules">
                            <el-row>
                                <el-form-item class="width-40 marginR10" label="姓名" prop="IDName">
                                    <el-input v-model="changeBalanceForm.IDName" disabled></el-input>
                                </el-form-item>
                                <el-form-item class="width-40 marginR10" label="钱包余额" prop="agentEmail">
                                    <el-input v-model="changeBalanceForm.Balance" disabled></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item class="width-40 marginR10" label="调整类型" required prop="changeType">
                                    <el-select v-model="changeBalanceForm.changeType" style="width: 100%">
                                        <el-option label="入金" value="1"></el-option>
                                        <el-option label="出金" value="-1"></el-option>
                                        <el-option label="添加拥金" value="2"></el-option>
                                        <el-option label="减少佣金" value="-2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="width-40 marginR10" label="金额" prop="Count">
                                    <el-input v-model="changeBalanceForm.Count"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item class="width-40 marginR10" label="管理员备注" >
                                    <el-input v-model="changeBalanceForm.AdminTip"></el-input>
                                </el-form-item>
                                <el-form-item class="width-40 marginR10">
                                    <template>
                                        <el-button type="primary" @click="changeBalanceS('changeBalanceForm')">确 定</el-button>
                                        <el-button @click="changeBalanceVisible = false">取 消</el-button>
                                    </template>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </el-dialog>
                    <el-button size="small"
                               @click="jumpUserCrm(scope.$index, scope.row)">跳转</el-button>
                    <el-button size="small" @click="guestToAgent(scope.row)" >成为代理</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="CrmUserSizeChange" @current-change="currentChangeCrmUser" :current-page.sync="CRMUserSearch.currentPage"
                           :page-sizes="[10,20,30, 50]" :page-size="CRMUserSearch.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCrmUser">
            </el-pagination>
        </div>
        <el-dialog title="放大图片"  :visible.sync="imgUser.imgUserShow" size="tiny">
            <img :src="imgUser.imgUserImgBig" width="420px">
        </el-dialog>
        <el-dialog title="申请成为代理：" :visible.sync="toAgentVisible" size="tiny" @close="cancelAgent">
            <el-form :model="toAgentInfo" ref="toAgentInfo" :rules="toAgent_rules" label-width="140px">
                <el-form-item label="姓名" prop="IDName">
                    <el-input v-model="toAgentInfo.IDName" disabled=""> </el-input>
                </el-form-item>
                <el-form-item label="上级代理：" prop="referralCode">
                    <el-select v-model="toAgentInfo.referralCode" filterable placeholder="请选择">
                        <el-option
                            v-for="item in toAgentInfoList"
                            :key="item.agentLevel"
                            :label="item.label"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="升级后代理等级：">
                    <el-input v-model="toAgentInfo.levelSelf" disabled=""></el-input>
                </el-form-item>
                <el-form-item label-width="160px">
                    <el-button type="info" @click="confirmAgent('toAgentInfo')">确认</el-button>
                    <el-button @click="cancelAgent"> 取消</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    module.exports = require('../pageJS/CrmUser')
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

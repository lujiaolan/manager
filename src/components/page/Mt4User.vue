<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form class="outMoneyMarginR20">
                <el-form-item>
                    <el-input v-model.number="searchMT4List.mt4UserId" placeholder="MT4账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchMT4List.mt4UserNameLike" placeholder="邮箱/姓名" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="mt4UserList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="syncMT4Visible"  v-loading="MT4Loading" :disabled="MT4SyncDisabled">同步账户</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createMT4">创建MT4</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" ref="multipleMT4" @selection-change="handleSelectionChange" border style="width: 100%">
            <el-table-column prop="mt4UserId" label="MT4账户" width="95"></el-table-column>
            <el-table-column prop="User" label="姓名" width="100"></el-table-column>
            <el-table-column prop="UserEmail" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="UserGroupName" label="MT4分组" width="100"></el-table-column>
            <el-table-column label="杠杆">
                <template scope="scope">
                    1:{{scope.row.UserLeverage}}
                </template>
            </el-table-column>
            <!--<el-table-column prop="" label="入金"></el-table-column>-->
            <!--<el-table-column prop="" label="出金"></el-table-column>-->
            <el-table-column prop="" label="盈亏" width=""></el-table-column>
            <el-table-column prop="" label="余额" width=""></el-table-column>
            <!--<el-table-column prop="" label="交易次数" width=""></el-table-column>-->
            <!--<el-table-column prop="" label="手数" width=""></el-table-column>-->
            <el-table-column prop="" label="净值"  width=""></el-table-column>
            <el-table-column prop="UserEnable"  label="账户状态" width="100">
                <template scope="scope">
                    <span v-if="scope.row.UserEnable==1">正常</span>
                    <span v-if="scope.row.UserEnable==0">冻结</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="开户日期" width="180"></el-table-column>
            <el-table-column label="操作" width="380">
                <template scope="scope">
                    <el-button size=small @click="sigleSyncMt4(scope.row)">同步</el-button>
                    <el-button size=small  @click="createSameMT4(scope.row)"
                               :disabled="scope.row.userId==''||scope.row.userId==undefined">创建同名账户</el-button>
                    <el-button size="small"  :disabled="scope.row.userId==''||scope.row.userId==undefined"
                               @click="resetMT4Pwd(scope.row)">重置密码</el-button>
                    <el-button size="small" @click="changeAttribute(scope.$index, scope.row)">调整帐户</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="重置密码" :visible.sync="resetPwdVisible" size="tiny">
            <el-form :model="resetMT4PwdData"  ref="resetPWDForm" label-width="120px">
                <el-form-item  label="密码类型">
                    <el-radio-group v-model="resetMT4PwdData.UserInvestPwdCheck">
                        <el-radio :label='0'>主密码</el-radio>
                        <el-radio :label='1'>观摩密码</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetPwdVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetPwd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="调整帐户属性" :visible.sync="changeAttributeVisible">
            <el-form :model="changeAttributeForm" label-width='120px' :rules="changeAttributeRules" ref="changeAttributeForm">
               <el-col :span="24">
                   <el-col :span="10">
                       <el-form-item  label="账户属性：" prop="accountType">
                           <el-select v-model="changeAttributeForm.accountType"  :disabled="accountTypeDisabled"
                                      @key.native.enter="changeAttributeS('changeAttributeForm')">
                               <el-option :value="item.value" :label="item.label" :key="item.value"
                                          v-for="item in groupTypeList"></el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col :span="14">
                       <el-form-item  label="MT4账户：" prop="UserLoginID">
                           <el-input v-model="changeAttributeForm.UserLoginID" disabled=""
                                     @key.native.enter="changeAttributeS('changeAttributeForm')"></el-input>
                       </el-form-item>
                   </el-col>
               </el-col>
                <el-col :span="24">
                    <el-col :span="10">
                        <el-form-item  label="姓名：" prop="IDName">
                            <el-input v-model="changeAttributeForm.IDName"
                                      :disabled="changeAttributeDisAble" @key.native.enter="changeAttributeS('changeAttributeForm')">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item  label="选择MT4分组：" prop="UserGroupName">
                            <el-select v-model="changeAttributeForm.UserGroupName" @key.native.enter="changeAttributeS('changeAttributeForm')">
                                <el-option :value="groud" :key="groud" :label="groud" v-for="groud in groudMT4List"
                                           @key.native.enter="changeAttributeS('changeAttributeForm')"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
               <el-col :span="24">
                   <el-col :span="10">
                       <el-form-item  label="杠杆：" prop="UserLeverage">
                           <el-select  v-model="changeAttributeForm.UserLeverage" @key.native.enter="changeAttributeS('changeAttributeForm')">
                               <el-option :value="lever.value" :key="lever.value" :label="lever.label" v-for="lever in leverList"></el-option>
                           </el-select>
                       </el-form-item>
                   </el-col>
                   <el-col :span="14">
                       <el-form-item   label="邮箱：" prop="UserEmail">
                           <el-input v-model="changeAttributeForm.UserEmail" placeholder="请输入邮箱"
                                     @key.native.enter="changeAttributeS('changeAttributeForm')"
                                     :disabled="userEmailAble"></el-input>
                       </el-form-item>
                   </el-col>
               </el-col>
               <el-col :span="24">
                   <el-col :span="10">
                       <el-form-item   label="手机号：" prop="UserPhone">
                           <el-input v-model="changeAttributeForm.UserPhone" placeholder="请输入手机号"></el-input>
                       </el-form-item>
                   </el-col>
                   <el-col :span="14">
                       <el-form-item label="证件号码:" prop="UserIRD">
                           <el-input v-model="changeAttributeForm.UserIRD"
                                     :disabled="disabledUserIRD" placeholder="请输入证件号码"></el-input>
                       </el-form-item>

                   </el-col>
               </el-col>
               <el-col :span="24">
                 <el-col :span="10">
                     <el-form-item   label="只读状态：" prop="UserEnableReadonly">
                         <el-radio-group v-model="changeAttributeForm.UserEnableReadonly">
                             <el-radio :label="1">只读</el-radio>
                             <el-radio :label="0" >正常</el-radio>
                         </el-radio-group>
                     </el-form-item>
                 </el-col>
                   <el-col :span="14">
                       <el-form-item   label="是否禁用：" prop="UserEnableStatus">
                           <el-radio-group v-model="changeAttributeForm.UserEnable">
                               <el-radio :label="0">禁用</el-radio>
                               <el-radio :label="1" >正常</el-radio>
                           </el-radio-group>
                       </el-form-item>

                   </el-col>
                   <el-form-item  >
                       <el-button @click="changeAttrCancel">关 闭</el-button>
                       <el-button type="primary" @click="changeAttributeS('changeAttributeForm')">确 定</el-button>
                   </el-form-item>
               </el-col>
            </el-form>

        </el-dialog>
        <el-dialog title="创建MT4" :visible.sync="addMT4Visible" >
            <el-form :model="addMt4Form" :rules="addMT4Rules" ref="addMt4Form" label-width="120px">
               <el-row>
                <el-col :span="24">
                    <el-col :span="10">
                        <el-form-item  label="账号属性：" prop="accountType" >
                            <el-select v-model="addMt4Form.accountType" placeholder="账户属性">
                                <el-option :value="item.value" :label="item.label" :key="item.value" v-for="item in groupTypeList"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item  label="MT4账号：" prop="UserID" >
                            <el-input v-model="addMt4Form.UserID" disabled
                                      @key.native.enter="addMT4('addMt4Form')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                  <el-col :span="24">
                      <el-col :span="10">
                          <el-form-item label="选择MT4分组：" prop="UserGroupName">
                              <el-select v-model="addMt4Form.UserGroupName">
                                  <el-option :value="groud" :key="groud" :label="groud" v-for="groud in groudMT4List"
                                             @key.native.enter="addMT4('addMt4Form')"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="14">
                          <el-form-item  label="杠杆比例：" prop="UserLeverage">
                              <el-select v-model="addMt4Form.UserLeverage">
                                  <el-option :value="lever" :key="lever" :label="'1:'+lever" v-for="lever in leverList"></el-option>
                              </el-select>
                          </el-form-item>

                      </el-col>
                  </el-col>
                  <el-col :span="24">
                      <el-col :span="10">
                          <el-form-item label="姓名：" prop="IDName">
                              <el-input v-model="addMt4Form.IDName" placeholder="请输入姓名"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="14">
                          <el-form-item label="证件号码:" prop="UserIRD">
                              <el-input v-model="addMt4Form.UserIRD"  @key.native.enter="addMT4('addMt4Form')"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-col>
                   <el-col :span="24">
                       <el-col :span="10">
                           <el-form-item  label="邮箱：" prop="UserEmail">
                               <el-input v-model="addMt4Form.UserEmail" @key.native.enter="addMT4('addMt4Form')"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="14">
                           <el-form-item  label="手机：" prop="UserPhone">
                               <el-input v-model="addMt4Form.UserPhone" placeholder="请输入手机号"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-col>
                   <el-col :span="24">
                       <el-col :span="10">
                           <el-form-item  label="主密码：" prop="UserPwd">
                               <el-input v-model="addMt4Form.UserPwd" @key.native.enter="addMT4('addMt4Form')"></el-input>
                           </el-form-item>
                       </el-col>
                       <el-col :span="10">
                           <el-form-item  label="观摩密码：" prop="UserInvestorpwd">
                               <el-input v-model="addMt4Form.UserInvestorpwd" @key.native.enter="addMT4('addMt4Form')"></el-input>
                           </el-form-item>
                       </el-col>
                   </el-col>
                   <el-col :span="24">
                       <el-form-item>
                           <div class="">
                               <el-button @click="cancelMT4Add('addMt4Form')">取 消</el-button>
                               <el-button type="primary" @click="addMT4('addMt4Form')">确 定</el-button>
                           </div>

                       </el-form-item>
                   </el-col>
               </el-row>
            </el-form>

        </el-dialog>
        <el-dialog title="创建同名账户" :visible.sync="addMT4SameVisible"  size="tiny">
            <el-form :model="addMt4FormSame" :rules="addMt4FormSameRules" ref="addMt4FormSame" label-width="120px">
                <el-form-item  label="邮箱：" prop="UserEmail">
                   <el-input v-model="addMt4FormSame.UserEmail" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="IDName">
                    <el-input v-model="addMt4FormSame.IDName" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="证件号码:" prop="">
                    <el-input v-model="addMt4FormSame.UserIRD" disabled="" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label="选择MT4分组：" prop="UserGroupName">
                    <el-select v-model="addMt4FormSame.UserGroupName">
                        <el-option :value="groud" :key="groud" :label="groud" v-for="groud in groudMT4List"
                                   @key.native.enter="adddSameMT4('addMt4FormSame')">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="杠杆：" prop="UserLeverage">
                    <el-select v-model="addMt4FormSame.UserLeverage">
                        <el-option :value="lever.value" :key="lever.value" :label="lever.label" v-for="lever in leverList"
                                   @key.native.enter="adddSameMT4('addMt4FormSame')"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="主密码：" prop="UserPwd">
                    <el-input v-model="addMt4FormSame.UserPwd" placeholder="6位以上英文字母+数字"
                              @key.native.enter="adddSameMT4('addMt4FormSame')"></el-input>
                </el-form-item>
                <el-form-item  label="观摩密码：" prop="UserInvestorpwd">
                    <el-input v-model="addMt4FormSame.UserInvestorpwd" placeholder="6位以上英文字母+数字"
                              @key.native.enter="adddSameMT4('addMt4FormSame')"></el-input>
                </el-form-item>
                <el-form-item>
                    总共可以开通5个账户,您还可以开通 {{canApplyMt4}}账户
                </el-form-item>
                <el-form-item >
                    <div class="">
                        <el-button @click="cancelSameAddMt4('addMt4FormSame')">取 消</el-button>
                        <el-button type="primary" @click="adddSameMT4('addMt4FormSame')">确 定</el-button>
                    </div>

                </el-form-item>
            </el-form>

        </el-dialog>
        <div class="block">
            <el-pagination @size-change="MT4SizeChange" @current-change="currentChangeMT4" :current-page.sync="searchMT4List.page"
                           :page-sizes="[10,20,30, 50]" :page-size="searchMT4List.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"  :total="totalMyInfo">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Mt4User')
</script>


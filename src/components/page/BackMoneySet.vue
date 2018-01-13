<template>
    <div>
    	<!--搜索栏-->
    	<div class="handle-box">
	    	<el-form :inline="true" :model="searchForm" class="demo-form-inline">
                <el-form-item label="交易种类">
                    <el-select v-model="searchForm.symbolType" placeholder="请选择交易种类">
			      	<el-option
                        v-for="symbol in symbolTypeList"
                        :key="symbol"
                        :value="symbol"
                        :label="symbol">
				    </el-option>
			    </el-select>
			    </el-form-item>
                <el-form-item label="返佣标准">
			    <el-select v-model="searchForm.ruleType" placeholder="请选择返佣标准">
			      <el-option
                      v-for="item in optionsRuleType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
				    </el-option>
			    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchBackMoneySet">查询</el-button>
                    <el-button type="info" @click="addCommissionRules">添加</el-button>
                </el-form-item>
			</el-form>
            <el-dialog title="添加返佣规则" :visible.sync="addORSetShow" class="dialogSetShow">
               <el-row>
                   <el-form :model="addBackMoneyOR" :rules="backMoneySet_rules" ref="addBackMoneyOR">
                      <el-col :span="12">
                         <el-col :span="12">
                             <el-form-item label="返佣标准" prop="ruleType">
                                 <el-select v-model="addBackMoneyOR.ruleType" placeholder="请选择"
                                            @key.nation.enter="backMoneyAdd('addBackMoneyOR')">
                                     <el-option v-for="item in optionsRuleType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                     ></el-option>
                                 </el-select>
                             </el-form-item>
                         </el-col>
                          <el-col :span="12">
                              <el-form-item prop="commissionMoney">
                                  <el-input placeholder="每手/金额,$"
                                            @key.nation.enter="backMoneyAdd('addBackMoneyOR')"
                                            v-model.number="addBackMoneyOR.commissionMoney"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="代理等级" prop="agentLevel">
                              <el-select v-model="addBackMoneyOR.agentLevel"
                                         @key.nation.enter="backMoneyAdd('addBackMoneyOR')">
                                  <el-option
                                      v-for="level in levelList"
                                      :key="level.value"
                                      :value="level.value"
                                      :label="level.label"
                                  ></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="交易种类" prop="symbolType">
                              <!--multiple-->
                              <el-select v-model="addBackMoneyOR.symbolType"
                                         @key.nation.enter="backMoneyAdd('addBackMoneyOR')">
                                 <el-option v-for="symbol in symbolTypeList"
                                            :key="symbol"
                                            :value="symbol"
                                            :label="symbol">
                                 </el-option>
                             </el-select>
                         </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="状态" prop="status">
                              <el-radio-group v-model="addBackMoneyOR.status"
                                              @key.nation.enter="backMoneyAdd('addBackMoneyOR')">
                                  <el-radio :label="true">开启</el-radio>
                                  <el-radio :label="false">禁用</el-radio>
                              </el-radio-group>
                          </el-form-item>
                      </el-col>
                      <el-col :span="12">
                          <el-form-item label="规则名称" prop="name">
                              <el-input v-model="addBackMoneyOR.name"
                                        @key.nation.enter="backMoneyAdd('addBackMoneyOR')"></el-input>
                          </el-form-item>
                      </el-col>
                     <el-col :offset="18" :span="4">
                         <el-form-item>
                             <el-button type='primary' @click="backMoneyAdd('addBackMoneyOR')">添加</el-button>
                             <el-button type="error" @click="cancelBackMoney">关闭</el-button>
                         </el-form-item>
                     </el-col>
                  </el-form>
               </el-row>
            </el-dialog>
    	</div>
    	<!--表单栏-->
		<div>
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      label="佣金规则编号">
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="规则名称">
			    </el-table-column>
			    <el-table-column
                    label="代理等级">
                   <template scope="scope">
                       <span v-if="scope.row.agentLevel==1">代理等级一</span>
                       <span v-if="scope.row.agentLevel==2">代理等级二</span>
                       <span v-if="scope.row.agentLevel==3">代理等级三</span>
                       <span v-if="scope.row.agentLevel==4">代理等级四</span>
                       <span v-if="scope.row.agentLevel==5">代理等级五</span>

                   </template>
			    </el-table-column>
			    <el-table-column
			      prop="symbolType"
			      label="交易种类">
			    </el-table-column>
			    <el-table-column
                    :prop="fields.ruleType.info.prop"
                    :label="fields.ruleType.info.label"
                    :width="fields.ruleType.style.width"
                    :filters="fields.ruleType.filter.list"
                    :sortable="fields.ruleType.info.sortable"
                    :formatter="formatterRuleType"
                    :filter-method="filterRuleType"
                    :filter-multiple="fields.ruleType.filter.multiple"
			      >
			    </el-table-column>
			    <el-table-column
                    label="返佣规则">
                    <template scope="scope">
                        <span v-show="scope.row.ruleType==1">固定返佣,每手/{{scope.row.commissionMoney}}$</span>
                        <span v-show="scope.row.ruleType==2">极差返佣,每手/{{scope.row.commissionMoney}}$</span>
                    </template>
			    </el-table-column>
			    <el-table-column
			      label="设置时间"
                prop="createTime">
			    </el-table-column>
			    <el-table-column
                  :prop="fields.status.info.prop"
                  :label="fields.status.info.label"
                  :width="fields.status.style.width"
                  :sortable="fields.status.info.sortable"
                  :formatter="formatterStatus"
                  :filters="fields.status.filter.list"
                  :filter-method="filterStatus"
                  :filter-multiple="fields.status.filter.multiple"
			     >
			    </el-table-column>
			    <el-table-column
			      label="操作" width="180">
			      <template scope="scope">
                      <el-button size="small" @click="backMoneyModify(scope.row)">修改</el-button>
                      <el-dialog title="修改返佣规则" :visible.sync="editORSetShow" class="dialogSetShow">
                          <el-row>
                              <el-form :model="backMoneyEdit" :rules="backMoneySet_rules" ref="backMoneyEdit">
                                  <el-col :span="12">
                                      <el-col :span="12">
                                          <el-form-item label="返佣标准" prop="ruleType">
                                              <el-select v-model="backMoneyEdit.ruleType" placeholder="请选择"
                                                         @key.nation.enter="backMoneySetEdit('backMoneyEdit')"
                                              :disabled="backMoneyEdit.disableEdit">
                                                  <el-option v-for="item in optionsRuleType"
                                                             :key="item.value"
                                                             :label="item.label"
                                                             :value="item.value"
                                                  ></el-option>
                                              </el-select>
                                          </el-form-item>
                                      </el-col>
                                      <el-col :span="12">
                                          <el-form-item prop="commissionMoney">
                                              <el-input placeholder="每手/金额,$"
                                                        @key.nation.enter="backMoneySetEdit('backMoneyEdit')"
                                                        v-model.number="backMoneyEdit.commissionMoney"
                                                        :disabled="backMoneyEdit.disableEdit"></el-input>
                                          </el-form-item>
                                      </el-col>
                                  </el-col>
                                  <el-col :span="12">
                                      <el-form-item label="代理等级" prop="agentLevel">
                                          <el-select v-model="backMoneyEdit.agentLevel"
                                                     @key.nation.enter="backMoneySetEdit('backMoneyEdit')"
                                                     :disabled="backMoneyEdit.disableEdit">
                                              <el-option
                                                  v-for="level in levelList"
                                                  :key="level.value"
                                                  :value="level.value"
                                                  :label="level.label"
                                              ></el-option>
                                          </el-select>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                      <el-form-item label="交易种类" prop="symbolType">
                                          <el-select v-model="backMoneyEdit.symbolType"
                                                     @key.nation.enter="backMoneySetEdit('backMoneyEdit')"
                                                     :disabled="backMoneyEdit.disableEdit">
                                              <el-option v-for="symbol in symbolTypeList"
                                                         :key="symbol"
                                                         :value="symbol"
                                                         :label="symbol">
                                              </el-option>
                                          </el-select>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                      <el-form-item label="状态" prop="status">
                                          <el-radio-group v-model="backMoneyEdit.status"
                                                          @key.nation.enter="backMoneySetEdit('backMoneyEdit')">
                                              <el-radio :label="true">开启</el-radio>
                                              <el-radio :label="false">禁用</el-radio>
                                          </el-radio-group>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                      <el-form-item label="规则名称" prop="name">
                                          <el-input v-model="backMoneyEdit.name"
                                                    @key.nation.enter="backMoneySetEdit('backMoneyEdit')"></el-input>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                      <span v-if="backMoneyEdit.disableEdit">此条规则已经应用于代理，只能修改状态和名称</span>
                                  </el-col>
                                  <el-col :offset="18" :span="4">
                                      <el-form-item>
                                          <el-button  @click="backMoneySetEdit('backMoneyEdit')"
                                                     v-loading="loginLoading"
                                                     size="small"
                                                     element-loading-spinner="el-icon-loading"
                                                     element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="loginLoading">修改
                                          </el-button>
                                          <el-button size="small" @click="cancelBackMoney">关闭</el-button>
                                      </el-form-item>
                                  </el-col>
                              </el-form>
                          </el-row>
                      </el-dialog>
			      		<el-button size="small" @click="backMoneyDel(scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
    	<!--表单栏结束-->
		<!--尾部栏-->
		<div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="currentChangeBackMoney" :current-page.sync="searchForm.page"
                           :page-sizes="[10,20,30, 50]" :page-size="searchForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalBackMoney">
            </el-pagination>
		</div>
		<!--尾部结束-->
    </div>
</template>

<script>
  module.exports = require('../pageJS/BackMoneySet');
</script>
<style lang="less" scoped="">
    .dialogSetShow{
        .el-select,.el-input{
            width: 50%;
        }
        .el-form-item__error{
            left: 67px!important;
        }
    }
</style>

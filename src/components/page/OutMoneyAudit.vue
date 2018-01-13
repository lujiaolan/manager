<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="出金审核" name="first">
            <div class="crmAgent">
                <div class="handle-box">
                   <el-form :model="outMoney" :rules="outMoney_rules" ref="outMoney">
                       <el-form-item prop="userEmail">
                           <el-input v-model="outMoney.userEmail" placeholder="邮箱" class="handle-input mr10"></el-input>
                       </el-form-item>
                       <el-form-item prop="orderNum">
                           <el-input v-model="outMoney.orderNum" placeholder="订单号" class="handle-input mr10"></el-input>
                       </el-form-item>
                       <el-form-item prop="status">
                           <el-select v-model="outMoney.status" placeholder="取款状态" class="handle-select mr10">
                               <el-option  v-for="item in select_statusList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                           </el-select>
                       </el-form-item>
                       <el-form-item prop="startTime">
                           <el-date-picker
                               v-model="outMoney.startTime"
                               type="date"
                               placeholder="开始时间">
                           </el-date-picker>
                       </el-form-item>
                       <el-form-item prop="endTime">
                           <el-date-picker
                               v-model="outMoney.endTime"
                               type="date"
                               placeholder="结束时间">
                           </el-date-picker>
                       </el-form-item>
                       <el-form-item>
                           <el-button type="primary" @click="withdrawSearch('outMoney')">查询</el-button>
                           <el-button type="primary" @click="exportOutMoneyAudit">导出Excel</el-button>
                       </el-form-item>
                   </el-form>
                </div>
                <el-table :data="outMoneyList" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
                    <el-table-column prop="_id" label="订单编号" width="200"></el-table-column>
                    <el-table-column prop="IDName" label="姓名"></el-table-column>
                    <el-table-column prop="userEmail" label="邮箱" width="180"></el-table-column>
                    <el-table-column prop="createTime" label="申请时间" width="110"></el-table-column>
                    <el-table-column prop="bankName" label="银行名称"  width="100"></el-table-column>
                    <el-table-column prop="bankCardNo" label="银行卡号" width="160"></el-table-column>
                    <el-table-column prop="amount" label="提现金额($)" width="100" align="center"></el-table-column>
                    <el-table-column prop="currentRate" label="实时汇率" width="100" ></el-table-column>
                    <el-table-column prop="flowMoney" label="实际到帐(￥)" width="100"  align="center"></el-table-column>
                    <el-table-column prop="handleTime" label="完成时间" width="110" align="center"></el-table-column>
                    <el-table-column  label="状态" align="center">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==1">已审核</span>
                            <span v-if="scope.row.tradeStatus==-100">待审核</span>
                            <span v-if="scope.row.tradeStatus==-1">已拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="comment" label="备注"></el-table-column>
                    <el-table-column label="操作" width="160" align="center" >
                        <template scope="scope">
                            <el-button size="small"
                                       @click="payAudit(scope.$index, scope.row)"
                                       :disabled="scope.row.tradeStatus==1||scope.row.tradeStatus==-1">通过</el-button>
                            <el-button size="small"
                                       @click="withdrawRefuse(scope.$index, scope.row)"
                                       :disabled="scope.row.tradeStatus==1||scope.row.tradeStatus==-1"
                            >拒绝</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-dialog title="审核" :visible.sync="payAuditVisible" size="tiny">
                    <el-form :model="payAuditFormOut" ref="payAuditForm" label-width="120px">
                        <el-form-item  label="账户姓名" prop="IDName">
                            <el-input v-model="payAuditFormOut.IDName" disabled=""></el-input>
                        </el-form-item>
                        <el-form-item  label="提现金额" >
                            <el-input v-model="payAuditFormOut.amount" disabled=""></el-input>
                        </el-form-item>
                        <el-form-item  label="实际到账" >
                            <el-input v-model="payAuditFormOut.flowMoney" disabled=""></el-input>
                        </el-form-item>
                        <el-form-item  label="备注"  prop="comment">
                            <el-input v-model="payAuditFormOut.comment" :rows="2" type="textarea" class="textarea110"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="payAuditVisible = false">取 消</el-button>
                            <el-button type="primary" @click="payAuditS">确 定</el-button>
                        </el-form-item>
                    </el-form>

                </el-dialog>
                <div class="block">
                    <el-pagination
                        @size-change="withdrawSizeChange"
                        @current-change="withdrawCurrentChange"
                        :current-page.sync="outMoney.page"
                        :page-sizes='[10,20,30,50]'
                        :page-size="outMoney.pageSize"
                        layout="total,sizes,prev,pager,next,jumper"
                        :total="withdrawTotal"></el-pagination>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="转出账户审核" name="second">
            <OutToCrmAudit></OutToCrmAudit>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    module.exports = require('../pageJS/OutMoneyAudit')
</script>
<style lang="less" scoped="">
    .crmAgent {
        .textarea110{
            width: 110%;
        }
    }
    .crmAgent {
        .handle-box{
            .el-form-item{
                margin-left: 10px;
            }
        }
    }
</style>

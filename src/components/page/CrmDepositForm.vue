<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="账户流水记录" name="first">
            <WaterAccount></WaterAccount>
        </el-tab-pane>
        <el-tab-pane label="账户入金记录" name="second" >
            <div class="crmAgent">
                <div class="handle-box">
                    <el-form :model="CRMdeposit" :rules="CRMdeposit_rules" ref="CRMdeposit" class="outMoneyMarginR20">
                        <el-form-item>
                            <el-input v-model="CRMdeposit.orderNum" placeholder="订单编号" class="handle-input mr10"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="CRMdeposit.condition" placeholder="邮箱/姓名" class="handle-input mr10" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="CRMdeposit.status" placeholder="所有存款状态" class="handle-select mr10">
                                <el-option v-for="item in statusList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker
                                v-model="CRMdeposit.startTime"
                                type="date"
                                :editable="editableDate"
                                @key.native.enter="searchCRMdeposit('CRMdeposit')"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker
                                v-model="CRMdeposit.endTime"
                                type="date"
                                :editable="editableDate"
                                @key.native.enter="searchCRMdeposit('CRMdeposit')"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchCRMdeposit('CRMdeposit')">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="exportCrmDeposit">导出Excel</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table :data="CRMdepositList" border style="width: 100%">
                    <el-table-column prop="_id" label="订单编号" width="200" align="center"></el-table-column>
                    <el-table-column prop="IDName" label="姓名" width="110"  align="center"></el-table-column>
                    <el-table-column prop="userEmail" label="邮箱" width="180"  align="center"></el-table-column>
                    <el-table-column prop="amount" label="支付金额（$）" ></el-table-column>
                    <el-table-column prop="flowMoney" label="等值人民币（￥）" ></el-table-column>
                    <el-table-column prop="currentRate" label="实时汇率"></el-table-column>
                    <el-table-column prop="payType" label="支付方式" ></el-table-column>
                    <el-table-column prop="tradeStatus" label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.tradeStatus==-1">支付失败</span>
                            <span v-if="scope.row.tradeStatus==-100">未支付</span>
                            <span v-if="scope.row.tradeStatus==-1">支付成功</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="申请时间"></el-table-column>
                    <el-table-column prop="handleTime" label="完成时间" width="150"></el-table-column>
                    <el-table-column prop="comment" label="备注" width="150"></el-table-column>
                    <!--<el-table-column label="操作" width="250">-->
                        <!--<template scope="scope">-->
                            <!--<el-button size="small"-->
                                       <!--@click="DrpositAgentCrm(scope.$index, scope.row)">人工加钱</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @size-change="depositSizeChange"
                        @current-change="depositCurrentChange"
                        :current-page.sync="CRMdeposit.page"
                        :page-sizes='[10,20,30,50]'
                        :page-size="CRMdeposit.pageSize"
                        layout="total,sizes,prev,pager,next,jumper"
                        :total="depositTotal"></el-pagination>
                </div>
            </div>
        </el-tab-pane>
        <el-dialog title="人工加钱" :visible.sync="depositVisible" size="tiny">
            <el-form :model="depositAddMoney" label-width="120px" :rules="depositAddMoney_rules" ref="depositAddMoney">
                <el-form-item label="用户账户">
                    <el-input v-model="depositAddMoney.userEmail" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="入账金额($)" prop="deposit">
                    <el-input v-model="depositAddMoney.deposit" @key.entive.enter="depositAdd('depositAddMoney')"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="depositAddMoney.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="depositAdd('depositAddMoney')" type="success">确认</el-button>
                    <el-button @click="depositAddCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-tab-pane label="账户出金记录" name="third">
            <CrmDrawForm></CrmDrawForm>
        </el-tab-pane>
        <el-tab-pane label="账户转账记录" name="four">
            <Mt4DepositForm></Mt4DepositForm>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    module.exports = require('../pageJS/CrmDepositForm')
</script>
<style></style>

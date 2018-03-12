<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form ref="outMoney" :model="outMoney" :rules="outMoney_rules" class="outMoneyMarginR20">
                <el-form-item prop="select_email">
                    <el-input v-model="outMoney.select_email" placeholder="邮箱" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="select_orderId">
                    <el-input v-model="outMoney.select_orderId" placeholder="订单号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="select_status">
                    <el-select v-model="outMoney.select_status" class="handle-select mr10">
                        <el-option key="2" label="全部审核状态" value="2"></el-option>
                        <el-option key="1" label="已审核" value="1"></el-option>
                        <el-option key="-1" label="已拒绝" value="-1"></el-option>
                        <el-option key="0" label="待审核" value="-100"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="dateValue1">
                    <el-date-picker
                        v-model="outMoney.dateValue1"
                        type="date"
                        :editable="editableDate"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="dateValue2">
                    <el-date-picker
                        v-model="outMoney.dateValue2"
                        type="date"
                        :editable="editableDate"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchOrder('outMoney')">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="exportOutToCrmAudit">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="outMoney.tableData" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
            <el-table-column prop="_id" label="订单编号" width="200"></el-table-column>
            <el-table-column prop="time" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="relUserEmail" label="转出账户" width="200"></el-table-column>
            <el-table-column prop="userEmail" label="收款账户" width="200"></el-table-column>
            <el-table-column prop="deposit" label="金额($)"></el-table-column>
            <el-table-column prop="handleTime" label="完成时间"></el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <span v-if="scope.row.status == -100">待审核</span>
                    <span v-if="scope.row.status == 1">已审核</span>
                    <span v-if="scope.row.status == -1">已拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="备注"></el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button size="small" :disabled="scope.row.MoneyToCrmVisible"
                               @click="MoneyToCrmAudit(scope.row)" >支付
                    </el-button>
                    <el-dialog class="outMoneyStyle" title="出金审核" :visible.sync="payAuditVisible" :before-close="cancelDialog">
                        <el-form :model="payAuditForm" ref="payAuditForm">
                            <el-form-item label="账户姓名">
                                <el-input v-model="payAuditForm.relUserName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="转帐金额">
                                <el-input v-model="payAuditForm.transNum" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="收款账户">
                                <el-input v-model="payAuditForm.userName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="phone">
                                <el-input v-model="payAuditForm.desc"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="payAuditVisible = false">取 消</el-button>
                            <el-button  @click="MoneyAuditConfirm"
                                       v-loading="loginLoading"
                                       element-loading-spinner="el-icon-loading"
                                       element-loading-background="rgba(0, 0, 0, 0.8)" :disabled="loginLoading">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button size="small" :disabled="scope.row.MoneyToCrmVisible"
                               @click="MoneyToCrmRefuse(scope.row)" >拒绝
                    </el-button>
                    <el-dialog class="outMoneyStyle" title="拒绝出金审核" :visible.sync="payRefuseVisible" :before-close="cancelDialog">
                        <el-form :model="payRefuseForm" ref="payRefuseForm">
                            <el-form-item label="账户姓名">
                                <el-input v-model="payRefuseForm.relUserName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="转账金额">
                                <el-input v-model="payRefuseForm.transNum" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="收款账户">
                                <el-input v-model="payRefuseForm.userName" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="phone">
                                <el-input v-model="payRefuseForm.desc"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="payRefuseVisible = false">取 消</el-button>
                            <el-button  @click="MoneyRefuseConfirm">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="searchMT4List.page"
                           :page-sizes="[10,20,30, 50]" :page-size="searchMT4List.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"  :total="totalRecords">
            </el-pagination>
        </div>
    </div>
</template>

<script>
   module.exports = require('../pageJS/OutToCrmAudit')
</script>


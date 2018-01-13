<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="MT4deposit" :rules="MT4deposit_rules" ref="MT4deposit" class="outMoneyMarginR20">
                <el-form-item prop="orderId">
                    <el-input v-model="MT4deposit.orderId" placeholder="订单编号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="condition">
                    <el-input v-model="MT4deposit.condition" placeholder="MT4账户/邮箱" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="selectType">
                    <el-select v-model="MT4deposit.selectType" class="handle-select mr10">
                        <el-option key="0" label="所有转帐方式" value="0"></el-option>
                        <el-option key="1" label="子账户转帐" value="1"></el-option>
                        <el-option key="2" label="CRM账户转账" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="dateValue1">
                    <el-date-picker
                        v-model="MT4deposit.dateValue1"
                        type="date"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="dateValue2">
                    <el-date-picker
                        v-model="MT4deposit.dateValue2"
                        type="date"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchMT4deposit('MT4deposit')">查询</el-button>
                    <el-button type="primary" @click="exportMT4deposit">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="MT4deposit.tableData" border style="width: 100%">
            <el-table-column prop="_id" label="订单编号" width="200"></el-table-column>
            <el-table-column label="转出账户">
                <template scope="scope">
                    <span v-if="scope.row.type == 4">{{ scope.row.userEmail }}</span>
                    <span v-if="scope.row.type == 5">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 6">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 7">{{ scope.row.relUserEmail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收款账户">
                <template scope="scope">
                    <span v-if="scope.row.type == 4">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 5">{{ scope.row.userEmail }}</span>
                    <span v-if="scope.row.type == 6">{{ scope.row.relMt4UserId }}</span>
                    <span v-if="scope.row.type == 7">{{ scope.row.userEmail }}</span>
                </template>
            </el-table-column>
            <el-table-column label="转账方式">
                <template scope="scope">
                    <span v-if="scope.row.type == 7">CRM账户转账</span>
                    <span v-else>子账户转账</span>
                </template>
            </el-table-column>
            <el-table-column prop="billMoney" label="转账金额($)"></el-table-column>
            <el-table-column prop="time" label="完成时间"></el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <span v-if="scope.row.status == 1">成功</span>
                    <span v-if="scope.row.status == 2">待审核</span>
                    <span v-if="scope.row.status == -100">失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="备注" width="150"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                           :current-page.sync="MT4deposit.page"
                           :page-sizes="[10,20,30, 50]" :page-size="MT4deposit.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="MT4deposit.tableData.records">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Mt4DepositForm')
</script>
<style></style>

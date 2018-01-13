<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="outMoney" :rules="outMoney_rules" ref="outMoney">
                <el-form-item prop="orderNum">
                    <el-input v-model="outMoney.orderNum" placeholder="订单编号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="userEmail">
                    <el-input v-model="outMoney.condition" placeholder="邮箱/姓名" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="status">
                    <el-select v-model="outMoney.status" placeholder="出金状态" class="handle-select mr10">
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
                    <el-button type="primary" @click="exportCrmDrawForm">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="outMoneyList" border style="width: 100%">
            <el-table-column prop="_id" label="订单编号" width="190"></el-table-column>
            <el-table-column prop="createTime" label="申请时间" width="110"></el-table-column>
            <el-table-column prop="userEmail" label="用户账户" width="180"></el-table-column>
            <el-table-column prop="IDName" label="姓名"></el-table-column>
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
        </el-table>
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
</template>

<script>
    module.exports = require('../pageJS/CrmDrawForm')
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

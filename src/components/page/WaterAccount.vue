<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="WaterAccount" :rules="WaterAccount_rules" ref="WaterAccount" class="outMoneyMarginR20">
                <el-form-item prop="orderId">
                    <el-input v-model="WaterAccount.orderId" placeholder="订单编号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="condition">
                    <el-input v-model="WaterAccount.condition" placeholder="MT4账户/姓名" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="selectType">
                    <el-select v-model="WaterAccount.selectType" class="handle-select mr10">
                        <el-option :value="item.value" :key="item.value" :label="item.label" v-for="item in options"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="dateValue1">
                    <el-date-picker
                        v-model="WaterAccount.dateValue1"
                        type="date"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="dateValue2">
                    <el-date-picker
                        v-model="WaterAccount.dateValue2"
                        type="date"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchWaterAccount('WaterAccount')">查询</el-button>
                    <el-button type="primary" @click="exportWaterAccount">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="WaterAccount.tableData" border style="width: 100%">
            <el-table-column prop="_id" label="订单编号" width="200"></el-table-column>
            <el-table-column label="变动时间">
                <template scope="scope">
                    <span v-if="scope.row.handleTime">{{scope.row.handleTime}}</span>
                    <span v-else>{{scope.row.time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="转出账户">
                <template scope="scope">
                    <span v-if="scope.row.type == 1">/</span>
                    <span v-if="scope.row.type == 2">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 4">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 5">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 6">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 7">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 9 || scope.row.type == 21 || scope.row.type == 22 || scope.row.type == 23 || scope.row.type == 24">平台</span>
                </template>
            </el-table-column>
            <el-table-column label="收款账户">
                <template scope="scope">
                    <span v-if="scope.row.type == 1">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 2">/</span>
                    <span v-if="scope.row.type == 4">{{ scope.row.mt4UserId }}</span>
                    <span v-if="scope.row.type == 5">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 6">{{ scope.row.relMt4UserId }}</span>
                    <span v-if="scope.row.type == 7">
                        <span v-if="scope.row.relIDName">{{ scope.row.relIDName }}</span>
                        <span v-else>{{ scope.row.relUserEmail }}</span>
                    </span>
                    <span v-if="scope.row.type == 9 || scope.row.type == 21 || scope.row.type == 22 || scope.row.type == 23 || scope.row.type == 24">
                        <span v-if="scope.row.IDName">{{ scope.row.IDName }}</span>
                        <span v-else>{{ scope.row.userEmail }}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="流水类型">
                <template scope="scope">
                    <span v-if="scope.row.type == 1">在线入金</span>
                    <span v-if="scope.row.type == 2">申请出金</span>
                    <span v-if="scope.row.type == 4">钱包转MT4</span>
                    <span v-if="scope.row.type == 5">MT4转钱包</span>
                    <span v-if="scope.row.type == 6">MT4转MT4</span>
                    <span v-if="scope.row.type == 7">钱包转钱包</span>
                    <span v-if="scope.row.type == 9">佣金转入</span>
                    <span v-if="scope.row.type == 21">系统入金</span>
                    <span v-if="scope.row.type == 22">系统出金</span>
                    <span v-if="scope.row.type == 23">添加佣金</span>
                    <span v-if="scope.row.type == 24">减少佣金</span>
                </template>
            </el-table-column>
            <el-table-column prop="billMoney" label="流水金额($)"></el-table-column>
            <el-table-column prop="status" label="操作状态">
                <template scope="scope">
                    <span v-if="scope.row.status == 1">操作成功</span>
                    <span v-if="scope.row.status == -1">操作失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="备注" width="150"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                           :current-page.sync="WaterAccount.page"
                           :page-sizes="[10,20,30, 50]" :page-size="WaterAccount.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="WaterAccount.tableData.records">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/WaterAccount')
</script>
<style></style>

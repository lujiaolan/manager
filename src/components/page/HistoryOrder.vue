<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="orderSelect" ref="orderSelect" :rules="orderSelect_rules" class="outMoneyMarginR20">
                <el-form-item prop="mt4UserId">
                    <el-input v-model="orderSelect.mt4UserId" placeholder="交易账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="orderId">
                    <el-input v-model="orderSelect.orderId" placeholder="订单编号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <span>交易品种:</span>
                </el-form-item>
                <el-form-item prop="symbolType">
                    <el-select v-model="orderSelect.symbolType" placeholder="交易品种" class="handle-select mr10">
                        <el-option v-for="item in symbolTypeOption" :key="item.val" :value="item.val" :label="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>时间:</span>
                </el-form-item>
                <el-form-item prop="startTime">
                    <el-date-picker
                        v-model="orderSelect.startTime"
                        type="date"
                        :editable="editableDate"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime">
                    <el-date-picker
                        v-model="orderSelect.endTime"
                        type="date"
                        :editable="editableDate"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchOrder('orderSelect')">查询</el-button>
                    <el-button type="primary" @click="exportHistoryOrder">导出Excel</el-button>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-select v-model="orderValue" @change="orderData">-->
                        <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
        <el-table :data="historyOrderData" border style="width: 100%" @sort-change="sortColumn">
            <el-table-column prop="TradeID" label="订单编号" width="110"></el-table-column>
            <el-table-column prop="IDName" label="姓名" width="110"></el-table-column>
            <el-table-column prop="UserLoginID" label="交易账户" width="100"></el-table-column>
            <el-table-column prop="TradeOpenTime" sortable label="开仓时间"></el-table-column>
            <el-table-column prop="TradeCmd" label="交易类型">
                <template scope="scope">
                    <span v-if="scope.row.TradeCmd == 0">buy</span>
                    <span v-if="scope.row.TradeCmd == 1">sell</span>
                </template>
            </el-table-column>
            <el-table-column prop="TradeVolume" label="交易手数"></el-table-column>
            <el-table-column prop="TradeSymbol" label="交易品种"></el-table-column>
            <el-table-column prop="Price" label="开仓价格"></el-table-column>
            <el-table-column label="止盈/止损">
                <template scope="scope">
                    <span>{{ scope.row.TradeTP }} / {{ scope.row.TradeSL }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="TradeCloseTime" sortable label="平仓时间" width="150"></el-table-column>
            <el-table-column prop="PriceClose" label="平仓价格"></el-table-column>
            <el-table-column prop="TradeCommission" label="手续费"></el-table-column>
            <el-table-column prop="TradeStorage" label="隔夜利息"></el-table-column>
            <el-table-column prop="TradeProfit" label="盈亏金额"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                           :current-page.sync="pageModel.page"
                           :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="historyOrderData.records">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/HistoryOrder')
</script>


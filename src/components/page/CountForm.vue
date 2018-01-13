<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="orderSelect" ref="orderSelect" :rules="orderSelect_rules" class="outMoneyMarginR20">
                <el-form-item>
                    <span>时间:</span>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="orderSelect.orderValue" @change="orderData">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>自定义:</span>
                </el-form-item>
                <el-form-item prop="startTime">
                    <el-date-picker
                        v-model="orderSelect.startTime"
                        type="date"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime">
                    <el-date-picker
                        v-model="orderSelect.endTime"
                        type="date"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchCount('orderSelect')">查询</el-button>
                    <el-button type="primary" @click="exportExcel">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<div style="clear: both;margin-bottom: 20px">-->
            <!--<span><strong>总计：</strong></span>-->
            <!--<span>总客户数：</span><span>{{customCount}}位</span>-->
            <!--<span>总交易手数/笔数：</span><span>{{customCount}}手/{{customCount}}笔</span>-->
            <!--<span>总存款：</span><span>{{customCount}}$</span>-->
            <!--<span>总取款：</span><span>{{customCount}}$</span>-->
            <!--<span>存取小结：</span><span>{{customCount}}$</span>-->
            <!--<span>总返佣：</span><span>{{customCount}}$</span>-->
            <!--<span>总盈亏：</span><span>{{customCount}}$</span>-->
        <!--</div>-->
        <el-table :data="countFormData" border style="width: 100%">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="userAmount" label="新增客户数"></el-table-column>
            <el-table-column label="交易手数/笔数">
                <template scope="scope">
                    <p>交易手数：{{scope.row.volumeAmount}}</p>
                    <p>笔数：{{scope.row.tradeAmount}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="plusAmount" label="总存款($)"></el-table-column>
            <el-table-column prop="minusAmount" label="总取款($)">
            </el-table-column>
            <el-table-column prop="closedAmount" label="存取小结($)"></el-table-column>
            <el-table-column prop="commissionAmount" label="总返佣($)"></el-table-column>
            <el-table-column prop="profitAmount" label="总盈亏($)"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                           :current-page.sync="pageModel.page"
                           :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="countFormData.records">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/CountForm')
</script>
<style></style>

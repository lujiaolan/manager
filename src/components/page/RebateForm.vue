<template>
    <div class="crmAgent">
        <div class="handle-box" style="margin-bottom: 0">
            <el-form :model="rebateFrom" ref="rebateFrom" :rules="rebateFrom_rules" class="outMoneyMarginR20">
                <el-form-item prop="condition">
                    <el-input v-model="rebateFrom.tradeAccount" placeholder="交易账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="condition">
                    <el-input v-model="rebateFrom.commAccount" placeholder="返佣账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <span>返佣状态：</span>
                </el-form-item>
                <el-form-item prop="rebateStatus">
                    <el-select v-model="rebateFrom.rebateStatus" class="handle-select mr10">
                        <el-option key="all" label="全部" value="all"></el-option>
                        <el-option key="1" label="已审核" value="1"></el-option>
                        <el-option key="2" label="待审核" value="2"></el-option>
                        <el-option key="-1" label="已拒绝" value="-1"></el-option>
                        <el-option key="0" label="未申请" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span>返佣等级：</span>
                </el-form-item>
                <el-form-item prop="agentLevel">
                    <el-select v-model="rebateFrom.agentLevel" class="handle-select mr10">
                        <el-option key="0" label="全部" value="0"></el-option>
                        <el-option key="1" label="一级代理" value="1"></el-option>
                        <el-option key="2" label="二级代理" value="2"></el-option>
                        <el-option key="3" label="三级代理" value="3"></el-option>
                        <el-option key="4" label="四级代理" value="4"></el-option>
                        <el-option key="5" label="五级代理" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <span class="dateData" v-for="item in dateSelect" @click="getDateData(item)" v-bind:class="{ isActive: item.active }">{{ item.value }}</span>
                </el-form-item>
                <el-form-item>
                    <span>自定义：</span>
                </el-form-item>
                <el-form-item prop="startTime">
                    <el-date-picker
                        v-model="rebateFrom.startTime"
                        type="date"
                        :editable="editableDate"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime">
                    <el-date-picker
                        v-model="rebateFrom.endTime"
                        type="date"
                        :editable="editableDate"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchRebateFrom('rebateFrom')" style="margin-left: 20px">查询</el-button>
                    <el-button type="primary" @click="exportRebateForm">导出Excel</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<div style="margin-bottom: 20px">-->
            <!--<span style="">总计：</span>-->
            <!--<span style="">已返佣总金额：</span><span>{{ rebateFrom.tableData.moneyAmount }}&nbsp;</span>$-->
            <!--<span style="">交易情况：</span><span>{{ rebateFrom.tableData.volume }}&nbsp;手&nbsp;/&nbsp;{{rebateFrom.tableData.count}}&nbsp;笔</span>-->
            <!--<span style="margin-left: 100px">已拒绝佣金总金额：</span><span>{{ rebateFrom.tableData.moneyAmount }}&nbsp;</span>$-->
            <!--<span style="">交易情况：</span><span>{{ rebateFrom.tableData.volume }}&nbsp;手&nbsp;/&nbsp;{{rebateFrom.tableData.count}}&nbsp;笔</span><br/>-->
            <!--<span style="margin-left: 52px">未返佣总金额：</span><span>{{ rebateFrom.tableData.moneyAmount }}&nbsp;</span>$-->
            <!--<span style="">交易情况：</span><span>{{ rebateFrom.tableData.volume }}&nbsp;手&nbsp;/&nbsp;{{rebateFrom.tableData.count}}&nbsp;笔</span>-->
        <!--</div>-->
        <el-table :data="rebateFrom.tableData" border style="width: 100%" class="comAudit">
            <el-table-column prop="_id" label="订单编号" width="270"></el-table-column>
            <el-table-column label="交易账户">
                <template scope="scope">
                    <span>{{scope.row.srcUserLoginID}} - </span>
                    <span>{{scope.row.srcIDName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="返佣账户" width="220">
                <template scope="scope">
                    <span>{{ scope.row.referralCode }}</span> -
                    <span>{{ scope.row.IDName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="TradeCmd" label="交易类型" width="">
                <template scope="scope">
                    <span v-if="scope.row.TradeCmd == 1">sell</span>
                    <span v-if="scope.row.TradeCmd == 0">buy</span>
                </template>
            </el-table-column>
            <el-table-column prop="symbolType" label="交易种类" width=""></el-table-column>
            <el-table-column prop="volume" label="交易手数" width=""></el-table-column>
            <el-table-column prop="agentLevel" label="返佣等级">
                <template scope="scope">
                    <span v-if="scope.row.agentLevel==1">一级代理</span>
                    <span v-if="scope.row.agentLevel==2">二级代理</span>
                    <span v-if="scope.row.agentLevel==3">三级代理</span>
                    <span v-if="scope.row.agentLevel==4">四级代理</span>
                    <span v-if="scope.row.agentLevel==5">五级代理</span>
                </template>
            </el-table-column>
            <el-table-column label="返佣规则">
                <template scope="scope">
                    <span v-if="scope.row.ruleType==1">固定 - {{ scope.row.commissionMoney }} / 手</span>
                    <span v-else>极差 - {{ scope.row.commissionMoney }} / 手</span>
                </template>
            </el-table-column>
            <el-table-column prop="money" label="返佣金额"></el-table-column>
            <el-table-column prop="handleTime" label="返佣时间" width="180"></el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <span v-if="scope.row.status==1">已审核</span>
                    <span v-if="scope.row.status==2">待审核</span>
                    <span v-if="scope.row.status==-1">已拒绝</span>
                    <span v-if="scope.row.status==-100">未申请</span>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" placement="top-start">
                        <div slot="content" style="width: 80px;word-wrap:break-word;">{{scope.row.comment}}</div>
                        <p class="commentStyle">{{scope.row.comment}}</p>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="rightPart">
            <div style="margin-right: 6px">共 {{ rebateFrom.tableData.totalCountApply }} 页</div>
            <el-pagination @current-change="currentChangeRebateFrom"
                           @size-change="rebateFromSizeChange"
                           :current-page.sync="rebateFromPagination.page"
                           :page-count="rebateFrom.tableData.totalCountApply"
                           :page-size="rebateFromPagination.pageSize"
                           :page-sizes="[10, 20, 30, 50]"
                           layout="prev, pager, next, sizes">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/RebateForm')
</script>
<style></style>

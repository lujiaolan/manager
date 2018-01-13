<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="commissionAudit" :rules="commissionAudit_rules" ref="commissionAudit" class="outMoneyMarginR20">
                <el-form-item prop="select_MT4ID">
                    <el-input v-model="commissionAudit.tradeAccount" placeholder="交易账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="select_MT4ID">
                    <el-input v-model="commissionAudit.commAccount" placeholder="返佣账户" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="select_status">
                    <el-select v-model="commissionAudit.select_status" placeholder="审核状态" class="handle-select mr10">
                        <el-option key="0" label="全部审核状态" value="0"></el-option>
                        <el-option key="2" label="待审核" value="2"></el-option>
                        <el-option key="-1" label="已拒绝" value="-1"></el-option>
                        <el-option key="1" label="已审核" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="dateValue1">
                    <el-date-picker
                        v-model="commissionAudit.dateValue1"
                        type="date"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="dateValue2">
                    <el-date-picker
                        v-model="commissionAudit.dateValue2"
                        type="date"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="searchCommission('commissionAudit')">查询</el-button>
                    <el-button type="primary" @click="exportCommissionAudit">导出Excel</el-button>
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
        <el-table :data="commissionAudit.tableData" border style="width: 100%" class="comAudit grayTable" :rowClassName="refuseRow">
            <el-table-column prop="_id" label="订单编号" width=""></el-table-column>
            <el-table-column label="申请时间" width="">
                <template scope="scope">
                    <span class="dateTime">{{ scope.row.applyTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="交易账户" width="">
                <template scope="scope">
                    <span>{{ scope.row.srcUserLoginID }}</span> -
                    <span>{{ scope.row.srcIDName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="返佣账户" width="">
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
            <el-table-column label="返佣等级">
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
            <el-table-column prop="money" label="返佣金额($)"></el-table-column>
            <el-table-column label="审核时间" width="">
                <template scope="scope">
                    <span class="dateTime">{{ scope.row.handleTime }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template scope="scope">
                    <span v-if="scope.row.status==1">已审核</span>
                    <span v-if="scope.row.status==2">待审核</span>
                    <span v-if="scope.row.status==-1">已拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="remarks" label="备注" width="">
                <template scope="scope">
                    <el-input v-model="scope.row.comment" v-if="scope.$index===indexEdit"></el-input>
                    <el-tooltip class="item" effect="dark" placement="top-start">
                        <div slot="content" style="width: 80px;word-wrap:break-word;">{{scope.row.comment}}</div>
                        <p v-if="scope.$index!==indexEdit" class="commentStyle">{{scope.row.comment}}</p>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="">
                <template scope="scope">
                    <el-button size="small"
                               @click="ComAudit(scope.$index, scope.row)" v-if="scope.$index!==indexEdit" :disabled="scope.row.status!=2">审核</el-button>
                    <el-button size="small"
                               @click="ComRefuse(scope.$index, scope.row)"  v-if="scope.$index!==indexEdit" :disabled="scope.row.status!=2">拒绝</el-button>
                    <el-button @click="ComAuditConfirm(scope.row)" size="small"  v-if="scope.$index===indexEdit">{{ sureText }}</el-button>
                    <el-button @click="cancelComAudit" size="small" v-if="scope.$index===indexEdit">取消操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="rightPart">
            <div style="margin-right: 6px">共 {{ commissionAudit.tableData.totalCountApply }} 页</div>
            <el-pagination @current-change="auditCurrentChange"
                           @size-change="auditSizeChange"
                           :current-page.sync="comAuditPaginationData.page"
                           :page-count="commissionAudit.tableData.totalCountApply"
                           :page-size="comAuditPaginationData.pageSize"
                           :page-sizes="[10, 20, 30, 50]"
                           layout="prev, pager, next, sizes">
            </el-pagination>
        </div>
    </div>
</template>
<style>
    @import "../../../static/css/main.css";
</style>
<script>
    module.exports = require('../pageJS/CommissionAudit')
</script>

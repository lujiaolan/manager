<template>
    <div class="crmAgent">
        <div class="handle-box">

            <el-form :model="teamForm" :rules="teamForm_rules" ref="teamForm">
                <el-form-item prop="agentNameLike">
                    <el-input v-model="teamForm.agentNameLike" placeholder="姓名/邮箱" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <span class="dateData" v-for="item in dateSelect" @click="getDateData(item)" v-bind:class="{ isActive: item.active }">{{ item.value }}</span>
                </el-form-item>
               <el-form-item prop="startTime">
                   <el-date-picker
                       v-model="teamForm.startTime"
                       type="date"
                       placeholder="选择日期">
                   </el-date-picker>
               </el-form-item>
                <el-form-item prop="endTime">
                    <el-date-picker
                        v-model="teamForm.endTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="searchTeamInfo('teamForm')">查询</el-button>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="exportExcel">导出Excel</el-button>
               </el-form-item>
            </el-form>

        </div>

        <el-table :data="teamInfoList" border style="width: 100%">
            <el-table-column prop="IDName" label="姓名" width="100">
                <template scope="scope">
                     <span v-if="scope.row.role=='agent'" @click="getAgent(scope.row)" class="agentClick">
                     <a style="color: #20a0ff" >{{scope.row.IDName}}</a>
                    </span>
                    <span v-else-if="scope.row.role=='commonUser'">
                        {{scope.row.IDName}}
                    </span>
                    <span v-else="">
                        {{scope.row.IDName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="账户类型" width="100">
               <template scope="scope">
                   <span v-if="scope.row.role=='agent'">代理</span>
                   <span v-if="scope.row.role=='commonUser'">直客</span>
               </template>
            </el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="220">
            </el-table-column>
            <el-table-column prop="agentLevel" label="代理级别">
                <template scope="scope">
                    <span v-if="scope.row.agentLevel===1">一级代理</span>
                    <span v-else-if="scope.row.agentLevel===2">二级代理</span>
                    <span v-else-if="scope.row.agentLevel===3">三级代理</span>
                    <span v-else-if="scope.row.agentLevel===4">四级代理</span>
                    <span v-else-if="scope.row.agentLevel===5">五级代理</span>
                    <span v-else="">/</span>
                </template>
            </el-table-column>
            <el-table-column label="客户情况" prop="totalNumber">
                <template scope="scope">
                    <p v-if="scope.row.role=='agent'">代理：{{ scope.row.agentCount }}个</p>
                    <p v-if="scope.row.role=='agent'">直客：{{ scope.row.commonUserCount}}个</p>
                    <p v-if="scope.row.role=='commonUser'">/</p>
                </template>
            </el-table-column>
            <el-table-column label="总交易量">
                <template scope="scope">
                    {{scope.row.totalVolumeAmount}}手/{{scope.row.totalTradeAmount}}笔
                </template>
            </el-table-column>
            <el-table-column label="总存款($)" prop="totalDeposit">
            </el-table-column>
            <el-table-column label="总取款($)" prop="totalWithdraw">
            </el-table-column>
            <el-table-column prop="totalCommisssion" label="总佣金"></el-table-column>
            <el-table-column prop="unClosePosition" label="未平仓"></el-table-column>
            <el-table-column prop="totalProfitAmount" label="盈亏"></el-table-column>
            <el-table-column prop="totalProcedureAmount" label="手续费"></el-table-column>
            <el-table-column prop="totalStoreCostAmount" label="利息"></el-table-column>
        </el-table>
        <div class="pagination">
            <div class="block">
                <el-pagination
                    @size-change="teamInfoSizeChange"
                    @current-change="teamInfoCurrentChange"
                    :current-page.sync="teamForm.page"
                    :page-sizes='[10,20,30,50]'
                    :page-size="teamForm.pageSize"
                    layout="total,sizes,prev,pager,next,jumper"
                    :total="teamFormTotal"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/TeamForm')
</script>
<style scoped="" lang="less">
    .handle-box {
        .el-form-item{
            margin-left: 18px;
        }
    }
    .agentClick{
        cursor: pointer;
        margin: -20px 0 18px 0px
    }
</style>

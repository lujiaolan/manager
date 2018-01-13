<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-input v-model="toAgentAudit.agentVerifyNameLike" placeholder="邮箱/名称/电话" class="handle-input mr10"></el-input>
            <el-select v-model="toAgentAudit.agentApplyStatus" placeholder="申请状态" class="handle-select mr10">
                <el-option v-for="item in agentStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-date-picker
                v-model="toAgentAudit.startTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
                v-model="toAgentAudit.endTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            <el-button type="primary" @click="searchToAgent">查询</el-button>
        </div>
        <el-table :data="toAgentList" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
            <el-table-column prop="_id" label="用户登录ID" width="110"></el-table-column>
            <el-table-column prop="userEngName" label="英文名称" width="100"></el-table-column>
            <el-table-column prop="IDName" label="中文名称"></el-table-column>
            <el-table-column prop="superAgentId" label="上级代理"></el-table-column>
            <el-table-column prop="verifyStatus" label="认证状态">
                <template scope="scope">
                    <span v-if="scope.row.verifyStatus==='-1'">未上传</span>
                    <span v-if="scope.row.verifyStatus==='0'">未审核</span>
                    <span v-if="scope.row.verifyStatus==='1'">审核成功</span>
                    <span v-if="scope.row.verifyStatus==='2'">审核失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="country" label="国家"></el-table-column>
            <el-table-column prop="address" label="地区"></el-table-column>
            <el-table-column prop="Mt4Count" label="MT4账户数"></el-table-column>
            <el-table-column prop="agentApplyTime" label="提交时间"></el-table-column>
            <el-table-column prop="agentVerifyTime" label="处理时间"></el-table-column>
            <el-table-column prop="agentApplyStatus" label="审核状态" width="150">
                <template scope="scope" >
                        <span v-if="scope.row.agentApplyStatus==='0'">未审核</span>
                        <span v-if="scope.row.agentApplyStatus==='1'">审核成功</span>
                        <span v-if="scope.row.agentApplyStatus==='2'">审核失败</span>
                </template>
            </el-table-column>
            <el-table-column prop="agentVerifyReason" label="备注">
                <template scope="scope">
                    <el-input v-model="scope.row.agentVerifyReason" v-if="scope.$index===indexEdit"></el-input>
                    <span v-if="scope.$index!==indexEdit">{{scope.row.agentVerifyReason}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button size="small"
                               @click="AgentToAudit(scope.$index, scope.row)" type="info" v-if="scope.$index!==indexEdit">审核</el-button>
                    <el-button size="small"
                               @click="AgentRefuse(scope.$index, scope.row)" type="success" v-if="scope.$index!==indexEdit">拒绝</el-button>
                    <el-button @click="AgentToAuditConfirm(scope.row)" size="small" type="success"  v-if="scope.$index===indexEdit">确认</el-button>
                    <el-button @click="cancelToAuditConfirm" size="small" v-if="scope.$index===indexEdit">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="PerToAgentSizeChange" @current-change="currentChangePerToAgent" :current-page.sync="toAgentAudit.currentPage"
                           :page-sizes="[10,20,30, 50]" :page-size="toAgentAudit.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"  :total="totalAgentAudit">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  module.exports = require('../pageJS/PersonToAgent')
</script>

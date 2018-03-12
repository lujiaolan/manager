<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="leverageModify" class="outMoneyMarginR20" ref="leverageModify" :rules="leverageModifyRules">
                <el-form-item prop="mt4">
                    <el-input v-model="leverageModify.mt4" placeholder="邮箱/姓名" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="mt4">
                    <el-input v-model="leverageModify.mt4" placeholder="上级代理" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchLeverage('leverageModify')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="leverageModify.tableData" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
            <el-table-column prop="mt4UserId" label="姓名" width="200"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="oldUserLeverage" label="上级代理" width="200"></el-table-column>
            <el-table-column prop="userLeverage" label="证件号码" ></el-table-column>
            <el-table-column prop="time" label="手机号" width="200"></el-table-column>
            <el-table-column label="激活状态">
                <template scope="scope">
                    <span v-if="scope.row.status == 0">待审核</span>
                    <span v-if="scope.row.status == 1">已通过</span>
                    <span v-if="scope.row.status == 2">已拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="auditTime" label="注册时间"></el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button  v-if="scope.$index!==rowIndex"
                                @click="startLeverageAudit(scope.$index)"
                                size="small" :disabled="scope.row.auditVisible">激活
                    </el-button>
                    <el-button   v-if="scope.$index!==rowIndex"
                                 @click="stopLeverageRefuse(scope.$index)"
                                 size="small" :disabled="scope.row.auditVisible">发送激活邮件
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="pageModel.page"
                           :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"  :total="totalRecords">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/RegisterList')
</script>
<style></style>

<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form :model="leverageModify" class="outMoneyMarginR20" ref="leverageModify" :rules="leverageModifyRules">
                <el-form-item prop="mt4">
                    <el-input v-model="leverageModify.mt4" placeholder="MT4帐号" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item prop="select_status">
                    <el-select v-model="leverageModify.select_status" class="handle-select mr10">
                        <el-option key="-1" label="所有审核状态" value="-1"></el-option>
                        <el-option key="1" label="已审核" value="1"></el-option>
                        <el-option key="2" label="已拒绝" value="2"></el-option>
                        <el-option key="0" label="待审核" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchLeverage('leverageModify')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="leverageModify.tableData" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
            <el-table-column prop="mt4UserId" label="mt4帐户名" width="200"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="oldUserLeverage" label="原杠杆比例" width="200"></el-table-column>
            <el-table-column prop="userLeverage" label="新杠杆比例" ></el-table-column>
            <el-table-column prop="time" label="申请时间" width="200"></el-table-column>
            <el-table-column prop="auditTime" label="审核时间"></el-table-column>
            <el-table-column label="状态">
                <template scope="scope">
                    <span v-if="scope.row.status == 0">待审核</span>
                    <span v-if="scope.row.status == 1">已通过</span>
                    <span v-if="scope.row.status == 2">已拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注">
                <template scope="scope">
                    <span  v-if="scope.$index!==rowIndex">{{scope.row.comment}}</span>
                    <el-input v-model="leverageEdit.remark" v-if="scope.$index===rowIndex"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <el-button  v-if="scope.$index!==rowIndex"
                               @click="startLeverageAudit(scope.$index)"
                               size="small" :disabled="scope.row.auditVisible">审核
                    </el-button>
                    <el-button   v-if="scope.$index!==rowIndex"
                               @click="stopLeverageRefuse(scope.$index)"
                               size="small" :disabled="scope.row.auditVisible">拒绝
                    </el-button>
                    <el-button  v-if="scope.$index===rowIndex" @click="LeverageAudit(scope.row)" size="small">保 存</el-button>
                    <el-button  v-if="scope.$index===rowIndex" @click="LeverageRefuse(scope.row)" size="small">取 消</el-button>
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
    module.exports = require('../pageJS/LeverageAudit')
</script>
<style></style>

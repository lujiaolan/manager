<template>
    <div class="crmAgent">
        <div class="handle-box">
            <el-form class="outMoneyMarginR20">
                <el-form-item>
                    <el-input v-model="BankCardAudit.userNameLike" placeholder="姓名/邮箱" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="BankCardAudit.bankCardStatus" placeholder="申请状态" class="handle-select mr10">
                        <el-option v-for="item in bankStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="bankCardSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="BankCardAuditList" border style="width: 100%" class="grayTable" :rowClassName="refuseRow">
            <el-table-column prop="cardHolder" label="姓名" ></el-table-column>
            <el-table-column prop="userEmail" label="邮箱" width="200"></el-table-column>
            <el-table-column prop="bankCardNumbers" label="银行卡号" width="150"></el-table-column>
            <el-table-column prop="bankName" label="开户行" width="120"></el-table-column>
            <el-table-column prop="bankBranch" label="开户支行" width="150"></el-table-column>
            <!--<el-table-column prop="bankCardType" label="银行卡类型" ></el-table-column>-->
            <el-table-column prop="bankCardHeadPic" label="银行卡正面" width="110">
                <template scope="scope">
                    <span v-if="scope.row.CardHeadShow=='未上传'" class="notUpload">未上传</span>
                    <span v-if="scope.row.CardHeadShow=='已上传'" class="uploaded">已上传</span>
                </template>
            </el-table-column>
            <el-table-column prop="bankCardTailPic" label="银行卡反面" width="110">
                <template scope="scope">
                    <span v-if="scope.row.CardTailShow=='未上传'" class="notUpload">未上传</span>
                    <span v-if="scope.row.CardTailShow=='已上传'" class="uploaded">已上传</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="上传时间" width="110"></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" width="110"></el-table-column>
            <el-table-column prop="bankCardStatus" label="状态">
                <template scope="scope">
                    <span v-if="scope.row.bankCardStatus==0">待审核</span>
                    <span v-if="scope.row.bankCardStatus==1">已审核</span>
                    <span v-if="scope.row.bankCardStatus==2">已拒绝</span>
                </template>
            </el-table-column>
            <el-table-column prop="bankReason" label="备注"  width="120"></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="bankAudit(scope.$index, scope.row)"
                               :disabled="scope.row.bankCardStatus==1||scope.row.bankCardStatus==2">审核</el-button>
                    <el-button @click="bankUserDel(scope.row)" size="small" :disabled="scope.row.importantCard==1">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="bankAuditSizeChange"
                @current-change="bankAuditCurrentChange"
                :current-page.sync="BankCardAudit.page"
                :page-sizes='[10,20,30,50]'
                :page-size="BankCardAudit.pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="bankAuditTotal"></el-pagination>
        </div>
    </div>
</template>

<script>
module.exports = require('../pageJS/BankCardAudit')
</script>
<style scoped="" lang="less">
    .crmAgent {
        img{
            width: 84px;
        }
    }
</style>

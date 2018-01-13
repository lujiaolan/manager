<template>
    <div>
        <div class="audit-box">
        	<!--查询栏-->
        	<el-row :gutter="20" class="handle-box">
        		<el-col :span="5" >
        			<el-input v-model="searchCRMList.userNameLike" placeholder="姓名/邮箱"></el-input>
        		</el-col>
        		<el-col :span="4">
        			<el-select v-model="searchCRMList.verifyStatus" placeholder="请选择认证状态">
					    <el-option
					      v-for="item in statesVerify"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
        		</el-col>
        		<el-col :span='1'>
        			<el-button type='primary'
        				 @click="searchCRMAudit">查询</el-button>
        		</el-col>
        	</el-row>
        	<!--表单栏-->
            <el-table
			    :data="tableData"
			    border
			    hight
			    style="width: 100%" class="grayTable" :rowClassName="refuseRow">
                <el-table-column prop="IDName" label="姓名" >
                </el-table-column>
			    <el-table-column prop="userEmail" label="邮箱" width="200" style="font-size:10px">
			    </el-table-column>
			    <!--<el-table-column prop="userPhone" label="电话" width="150"></el-table-column>-->
			    <el-table-column prop="role" label="客户类型" >
                    <template scope="scope">
                        <span v-if="scope.row.role==='agent'">代理</span>
                        <span v-if="scope.row.role==='commonUser'">直客</span>
                        <span></span>
                    </template>
			    </el-table-column>
			    <el-table-column label="证件正面" prop="IDCardHeadPic">
                    <template scope="scope">
                        <span v-if="scope.row.IDCardHeadPic=='未上传'" class="notUpload">未上传</span>
                        <span v-if="scope.row.IDCardHeadPic=='已上传'" class="uploaded">已上传</span>
                    </template>
			    </el-table-column>
			    <el-table-column prop="IDCard.IDCardTailPic" label="证件反面" >
                    <template scope="scope">
                        <span v-if="scope.row.IDCardTailPic=='未上传'" class="notUpload">未上传</span>
                        <span v-if="scope.row.IDCardTailPic=='已上传'" class="uploaded">已上传</span>
                    </template>
			    </el-table-column>
			    <el-table-column prop="bankCardHeadPic" label="银行卡正面" width="110">
                    <template scope="scope">
                        <span v-if="scope.row.bankCardHeadPic=='未上传'" class="notUpload">未上传</span>
                        <span v-if="scope.row.bankCardHeadPic=='已上传'" class="uploaded">已上传</span>
                    </template>
			    </el-table-column>
			    <el-table-column prop="bankCardTailPic"  label="银行卡反面" width="110">
                    <template scope="scope">
                        <span v-if="scope.row.bankCardTailPic=='未上传'" class="notUpload">未上传</span>
                        <span v-if="scope.row.bankCardTailPic=='已上传'" class="uploaded">已上传</span>
                    </template>
			    </el-table-column>
			    <el-table-column class="oneline" prop="createTime" label="上传时间" width="170">
			    </el-table-column>
			    <el-table-column prop="auditTime" label="审核时间" width="180">
			    </el-table-column>
			    <el-table-column  label="认证状态" width="100">
                    <template scope="scope">
                        <span v-if="scope.row.verifyStatus==-1">认证中</span>
                        <span v-if="scope.row.verifyStatus==0">未认证</span>
                        <span v-if="scope.row.verifyStatus==1">认证成功</span>
                        <span v-if="scope.row.verifyStatus==2">认证失败</span>
                    </template>
			    </el-table-column>
			    <el-table-column prop="reason" label="备注" width="">
			    </el-table-column>
			    <el-table-column label="操作">
			      	<template scope="scope">
	      				<el-button size="small" @click="editCRMAudit(scope.row)" :disabled="scope.row.verifyStatus==1">编辑</el-button>
                	</template>
			    </el-table-column>
			</el-table>
			<!--尾部栏-->
            <div class="block">
                <el-pagination @size-change="CRMSizeChange" @current-change="currentChangeCRM" :current-page.sync="searchCRMList.page"
                               :page-sizes="[10,20,30, 50]" :page-size="searchCRMList.pageSize"
                               layout="total, sizes, prev, pager, next, jumper"  :total="totalCRMInfo">
                </el-pagination>
            </div>
			<!--尾部结束-->
       </div>
    </div>
</template>
<style scoped>
</style>
<script>
    module.exports = require('../pageJS/CrmAudit')
</script>


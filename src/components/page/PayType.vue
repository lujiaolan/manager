    <template>
	<div>
		<div class="handle-box">
			<!--查询栏开始-->
		    <el-select v-model="searchPayType.payType" placeholder="全部支付方式" class="mgr20">
			    <el-option
			      v-for="item in optionsPayType"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-select v-model="searchPayType.payStatus" placeholder="是否启用" class="mgr20">
			    <el-option
			      v-for="item in optionsIfUse"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-button type="primary" class="mgr20" @click="payTypeSearch()">查询</el-button>
			<!--查询栏结束-->
		</div>
		<!--table表单开始-->
		<el-table
		    :data="payTypeForm"
		    border
		    style="width: 100%">
		    <el-table-column
		    	prop="payType"
		    	label="支付方式">
		    </el-table-column>
		    <el-table-column
		    	prop="nameThreePaPay"
		    	label="商户名称">
		    </el-table-column>
		    <el-table-column
		    	prop="partnerID"
		    	label="商户编号">
		    </el-table-column>
		    <el-table-column
		    	prop="payStatus"
		    	label="是否启用">
                <template scope="scope">
                    <span v-if="scope.row.payStatus==1">启用 </span>
                    <span v-if="scope.row.payStatus==0">禁用 </span>
                </template>
		    </el-table-column>
		    <el-table-column
		    	prop="notes"
		    	label="备注">
                <template scope="scope">
                    <span  v-if="scope.$index!==rowIndex">{{scope.row.notes}}</span>
                    <el-input v-model="payTypeEdit.remark" v-if="scope.$index===rowIndex"></el-input>
                </template>
		    </el-table-column>
		    <el-table-column
		    	label="操作">
		    	<template scope="scope">
		    		<el-button v-if="scope.$index!==rowIndex"
                               @click="startPayType(scope.$index,scope.row)"
                               size="small" :disabled="scope.row.payStatus==1">启 用</el-button>
		    		<el-button   v-if="scope.$index!==rowIndex"
                               @click="stopPayType(scope.$index,scope.row)"
                               :disabled="scope.row.payStatus==0"
                               size="small">禁 用</el-button>
		    		<el-button   v-if="scope.$index===rowIndex" @click="savePayType(scope.$index,scope.row)" size="small">保 存</el-button>
		    		<el-button  v-if="scope.$index===rowIndex" @click="cancelPayType(scope.$index,scope.row)" size="small">取 消</el-button>
		    	</template>
		    </el-table-column>
		</el-table>
		<!--table表单结束-->
	</div>
</template>
<style scope>
	.mgr20{margin-right: 20px;}
</style>
<script>
  module.exports = require('../pageJS/PayType')
</script>
<style></style>

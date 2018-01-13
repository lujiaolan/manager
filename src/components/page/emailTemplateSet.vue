<template>
    <div>
        <div class="emailTemplateSearchBox crmAgent handle-box">
            <el-input v-model="templSubject"
                      placeholder="邮件模板标题" class="handle-input"></el-input>
            <el-button type="primary" @click="templateSearch">查询</el-button>
        </div>
        <div  class="emailTemplateFormBox">
            <el-table
                :data="emailTemplateForm"
                border
                style="width: 100%">
                <el-table-column type="index" label="编号" width="70"></el-table-column>
                <el-table-column
                    prop="templSubject"
                    label="邮件模板标题">
                </el-table-column>
                <el-table-column
                    prop="templUrl"
                    label="模板地址">
                </el-table-column>
                <el-table-column
                    prop="_id"
                    label="邮件模板编号">
                </el-table-column>
            </el-table>
        </div>
      <div class="block">
          <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                         :current-page.sync="pageModel.page"
                         :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="emailTemplateForm.records">
          </el-pagination>
      </div>
    </div>
</template>
<script>
    module.exports = require('../pageJS/emailTemplateSet')
</script>

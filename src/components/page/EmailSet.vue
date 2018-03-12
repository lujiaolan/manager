<template>
    <div>
        <el-tabs v-model="EmailSet" >
            <el-tab-pane label="邮件列表" name="first">
                <div class="emailListSearchBox crmAgent">
                    <div class="listSearchBox handle-box">
                        <el-form :model="listSearchForm" ref="listSearchForm" :rules="listSearchFormRules" class="outMoneyMarginR20">
                            <el-form-item prop="searchEmail">
                                <el-input v-model="listSearchForm.searchEmail" placeholder="邮箱"
                                          class="handle-input mr10"></el-input>
                            </el-form-item>
                            <el-form-item prop="emailResult">
                                <el-select v-model="listSearchForm.emailResult">
                                    <el-option
                                        v-for="item in resultOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="timeBegin">
                                <el-date-picker
                                    v-model="listSearchForm.timeBegin"
                                    type="date"
                                    :editable="editableDate"
                                    placeholder="时间从">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="timeEnd">
                                <el-date-picker
                                    v-model="listSearchForm.timeEnd"
                                    type="date"
                                    :editable="editableDate"
                                    placeholder="时间至">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="emailTittle">
                                <el-input v-model="listSearchForm.emailTittle" placeholder="邮件标题"
                                          class="handle-input mr10"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="listSearch('listSearchForm')">查询</el-button>
                                <el-button type="primary" @click="listSend">群发</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="emailList" >
                    <div class="emailListFormBox">
                        <el-table
                            :data="emailListForm"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="emailTime"
                                label="发送时间">
                            </el-table-column>
                            <el-table-column
                                prop="senderEmail"
                                label="发件人邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="emailRecipients"
                                label="收件人邮箱">
                            </el-table-column>
                            <el-table-column
                                prop="emailSubject"
                                label="邮件标题">
                            </el-table-column>
                            <el-table-column
                                prop="templUrl"
                                label="邮件模板">
                            </el-table-column>
                            <el-table-column
                                label="发送结果">
                                <template scope="scope">
                                    <span v-if="scope.row.emailResult == 0">成功</span>
                                    <span v-if="scope.row.emailResult == -1">失败</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="errMsg"
                                label="错误信息">
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template scope="scope">
                                    <el-button size="small" @click="emailListWatch(scope.row)">查看</el-button>
                                    <el-button v-if="scope.row.emailResult == -1" size="small" @click="reSendEmail(scope.row)">重发</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--列表dialog开始-->
                   <div class="block">
                       <el-pagination @size-change="SizeChange" @current-change="CurrentChange"
                                      :current-page.sync="pageModel.page"
                                      :page-sizes="[10,20,30, 50]" :page-size="pageModel.pageSize"
                                      layout="total, sizes, prev, pager, next, jumper" :total="emailListForm.records">
                       </el-pagination>
                   </div>

                    <el-dialog title="邮件详情" :visible.sync="dialogVisible" class="emailDetail" :before-close="handleClose">
                        <iframe :src="emailDetailUrl" scrolling="no"></iframe>
                    </el-dialog>
                </div>
            </el-tab-pane>
            <el-tab-pane label="邮件模板" name="second">
                <email-templateSet></email-templateSet>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    module.exports = require ('../pageJS/EmailSet')
</script>
<style></style>

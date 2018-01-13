<template>
    <div>
        <div class="redirectHistory"><span @click="rebackEmailSet" type="info"><i class="fa fa-fw fa-mail-reply-all"></i>返回上级列表</span></div>
       <el-row>
           <el-col :span="12">
               <el-form :model="MassEmailData" label-width="160px" ref="MassEmailData" :rules="MassEmailData_rules" >
                   <el-form-item prop="userEmailList" label="收件人">
                       <div class="emailTabs">
                           <el-tag
                               v-model="MassEmailData.userEmailList"
                               @key.enter.native="submitMassEmailSend('MassEmailData')"
                           v-for="tag in MassEmailData.userEmailList"
                           :key="tag.name"
                           :closable="true"
                           :type="tag.type"
                           @close="closeTabMassSend(tag)"
                           >
                               {{tag.name}}
                       </el-tag> &nbsp;&nbsp;&nbsp;&nbsp;</div>
                   </el-form-item>
                   <el-form-item>
                       <el-button size="small"  type="info" @click="MassEmailVisible=true">添加收件人</el-button>
                       <el-button size="small" type="warning" @click="clearMassEmailSend">清空收件人</el-button>
                   </el-form-item>
                   <el-form-item prop="subject" label="邮件标题">
                       <el-input v-model="MassEmailData.subject"     @key.enter.native="submitMassEmailSend('MassEmailData')"></el-input>
                   </el-form-item>
                   <el-form-item prop="content" label="邮件内容">
                       <el-input  type="textarea" :rows="6"     @key.enter.native="submitMassEmailSend('MassEmailData')" v-model="MassEmailData.content"></el-input>
                   </el-form-item>
                   <el-form-item align="center">
                       <el-button @click="submitMassEmailSend('MassEmailData')" type="success">发送</el-button>
                       <el-button @click="resetMassEmailSend" type="warning">重置</el-button>
                   </el-form-item>
               </el-form>
           </el-col>
       </el-row>
        <el-dialog title="添加收件人邮箱" :visible.sync="MassEmailVisible">
            <el-form :model="massSendSearch">
                <el-row>
                    <el-col :span="4">
                        <el-form-item prop="">
                            <el-input v-model="massSendSearch.emailNameLike" placeholder="邮件/姓名/电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-form-item prop="superAgentId">
                            <el-input v-model="massSendSearch.superAgentId" placeholder="上级代理ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" :offset="1">
                        <el-form-item prop="role">
                            <el-select  v-model="massSendSearch.role" placeholder="账户类型" >
                                <el-option  v-for="item in roleList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item prop="agentLevel">
                            <el-select v-model="massSendSearch.agentLevel" placeholder="代理级别">
                                <el-option v-for="item in agentLevelList" :value="item.value" :label="item.label" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-form-item >
                            <el-button type="info" @click="getMassSendList">查询</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="success" @click="batchAddMass">批量添加</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="massEmailSendList">
                <el-table-column prop="userEmail" label="邮箱"></el-table-column>
                <el-table-column prop="userPhone" label="电话"></el-table-column>
                <el-table-column prop="agentLevel" label="类型">
                    <template scope="scope">
                        <span v-if="scope.row.agentLevel==1">一级代理</span>
                        <span v-if="scope.row.agentLevel==2">二级代理</span>
                        <span v-if="scope.row.agentLevel==3">三级代理</span>
                        <span v-if="scope.row.agentLevel==4">四级代理</span>
                        <span v-if="scope.row.agentLevel==5">五级代理</span>
                        <span v-if="!scope.row.agentLevel">普通用户</span>
                    </template>
                </el-table-column>
                <el-table-column prop="IDName" label="名字"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button @click="addMasssingle(scope.row)" type="success">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="massEmailSendSizeChange" @current-change="massEmailSendCurrentChange"
                           :current-page.sync="massSendSearch.page"
                           :page-sizes="[10,20,30, 50]" :page-size="massSendSearch.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="totalMassSend">
            </el-pagination>
        </el-dialog>
    </div>
</template>
<script>
    module.exports = require('../pageJS/MassEmail')
</script>
<style>
    .redirectHistory .fa-mail-reply-all{
        color: #20a0ff;
    }
    .emailTabs{
        border: 1px solid rgb(191, 217, 216)
    }
    .emailTabs:hover{
        border-color: rgb(131, 164, 165);
    }
    .emailTabs .el-tag {
        margin-left: 6px;
        margin-right: 12px
    }
</style>

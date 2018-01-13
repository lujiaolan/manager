<template>
    <div>
        <div class="emailListSearchBox crmAgent">
            <div class="listSearchBox handle-box">
                <el-form :model="logSearchForm" ref="logSearchForm" :rules="logSearchFormRules" class="outMoneyMarginR20">
                    <el-form-item>
                        <span>用户名：</span>
                    </el-form-item>
                    <el-form-item prop="userName">
                        <el-input v-model="logSearchForm.userName" placeholder="用户名"
                                  class="handle-input mr10"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span>日志模块：</span>
                    </el-form-item>
                    <el-form-item prop="typeRole">
                        <el-select v-model="logSearchForm.typeRole" class="handle-select mr10">
                            <el-option key="user" label="前台日志" value="user"></el-option>
                            <el-option key="admin" label="后台日志" value="admin"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span>日志类型：</span>
                    </el-form-item>
                    <el-form-item prop="logType">
                        <el-select v-model="logSearchForm.logType" class="handle-select mr10">
                            <el-option key="1" label="登录日志" value="1"></el-option>
                            <el-option key="0" label="标准日志" value="0"></el-option>
                            <el-option key="-1" label="错误日志" value="-1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <span class="dateData" v-for="item in dateSelect" @click="getDateData(item)" v-bind:class="{ isActive: item.active }">{{ item.value }}</span>
                    </el-form-item>
                    <el-form-item>
                        <span>自定义：</span>
                    </el-form-item>
                    <el-form-item prop="startTime">
                        <el-date-picker
                            v-model="logSearchForm.startTime"
                            type="date"
                            placeholder="时间从">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="endTime">
                        <el-date-picker
                            v-model="logSearchForm.endTime"
                            type="date"
                            placeholder="时间至">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="listSearch('logSearchForm')">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="logSearchForm.tableData" border style="width: 100%" class="comAudit">
                    <el-table-column prop="dateTime" label="时间" width="270"></el-table-column>
                    <el-table-column prop="ip" label="来源ip" width="220"></el-table-column>
                    <el-table-column prop="IDName" label="用户名" width="220"></el-table-column>
                    <el-table-column prop="detail" label="操作描述" width=""></el-table-column>
                </el-table>
                <div class="rightPart">
                    <div style="margin-right: 6px">共 {{ logSearchForm.tableData.totalCountApply }} 条</div>
                    <el-pagination @current-change="currentChange"
                                   @size-change="SizeChange"
                                   :current-page.sync="Pagination.page"
                                   :page-count="logSearchForm.tableData.totalCountApply"
                                   :page-size="Pagination.pageSize"
                                   :page-sizes="[10, 20, 30, 50]"
                                   layout="prev, pager, next, sizes">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = require('../pageJS/LoginLog')
</script>

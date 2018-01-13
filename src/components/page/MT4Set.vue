<template>
    <div>
        <el-tabs v-model="MT4Set" @tab-click="changeTab">
            <el-tab-pane label="MT4组别" name="first">
                <el-button type="info" style="margin-bottom: 20px" @click="syncGroupData">同步MT4组别</el-button>
                <el-table :data="Mt4ListForm" border style="width: 100%">
                    <el-table-column
                        prop="MT4GroupType"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        prop="groupName"
                        label="分组名称">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间">
                    </el-table-column>
                    <el-table-column
                        prop="changeVisible"
                        label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.changeVisible" @click="changeGroup(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :visible.sync="changeGroupVisible" title="分组编辑" size="tiny">
                    <el-form :model="changeGroupFrom" ref="changeGroupFrom" class="changeGroupFrom" :rules="changeGroupFromRules">
                        <el-form-item label="分组种类: ">
                            <el-input v-model="changeGroupFrom.name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="MT4分组: " prop="group">
                            <el-select v-model="changeGroupFrom.group" placeholder="请选择MT4分组" required>
                                <el-option v-for="item in groupFrom" :label="item.label" :value="item.label"
                                           :key="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="changeGroupVisible = false">取 消</el-button>
                            <el-button type="primary" @click="changeGroupConfirm('changeGroupFrom')">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="MT4交易品种" name="second">
                <el-button type="info" style="margin-bottom: 20px" @click="syncSymbolListData">同步MT4交易品种</el-button>
                <el-table :data="symbolListForm" border style="width: 100%;margin-bottom: 50px">
                    <el-table-column
                        width="70"
                        type="index"
                        label="编号">
                    </el-table-column>
                    <el-table-column
                        width="120"
                        prop="type"
                        label="交易种类">
                    </el-table-column>
                    <el-table-column
                        prop="symbolVariety"
                        label="交易品种">
                    </el-table-column>
                    <el-table-column
                        width="170"
                        prop="time"
                        label="更新时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    module.exports = require('../pageJS/MT4Set')
</script>
<style></style>

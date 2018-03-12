<template>
    <div class="header">
        <div class="logo">
            <img src="../../../static/img/logo_white.png"/>
        </div>
        <span v-if="this.$store.state.user.userinfo.expireTime<10" class="expireTimeClass">
            软件到期日期:{{this.$store.state.user.userinfo.invalidTime}}</span>
        <i class="header_user_full" @click="headerUserFull"></i>
        <i class="header_user_refresh" @click="headerUserRefresh"></i>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                 <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                   当前用户: {{this.$store.state.user.userinfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i><br>

                </span>
                <el-dropdown-menu slot="dropdown" class="clearTop text-color-6">
                    <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
                    <!--<el-dropdown-item command="loginout">退出登录</el-dropdown-item>-->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog :visible.sync="modifyPwdShow" size="tiny">
            <el-form :model="modifyPwdInfo" label-width="100px" :rules="modifyPwdInfo_rules" ref="modifyPwdInfo">
                <el-form-item prop="oldUserPassword" label="旧密码">
                    <el-input v-model="modifyPwdInfo.oldUserPassword" placeholder="请输入旧密码" @key.native.enter="handleModifyPwd('modifyPwdInfo')"></el-input>
                </el-form-item>
                <el-form-item prop="newUserPassword" label="新密码" >
                    <el-input v-model="modifyPwdInfo.newUserPassword" placeholder="请输入新密码" @key.native.enter="handleModifyPwd('modifyPwdInfo')"></el-input>
                </el-form-item>
                <el-form-item prop="dumpUserPassword" label="确认密码">
                    <el-input v-model="modifyPwdInfo.dumpUserPassword" placeholder="请再次输入密码" @key.native.enter="handleModifyPwd('modifyPwdInfo')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleModifyPwd('modifyPwdInfo')">确认</el-button>
                    <el-button @click="cancelModifyPwd('modifyPwdInfo')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
  module.exports = require('../pageJS/Header')
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background: rgb(43,51,62);
    }
    .header .logo{
        float: left;
        width: 150px;
        text-align: center;
        padding: 13px
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>

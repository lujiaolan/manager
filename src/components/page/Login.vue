<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">
                <div class="ms-logo"></div>
                <div class="lang-wrap">
                    <el-dropdown>
                        <el-button type="primary"><img src="../../../static/img/china.png"/>中<i
                            class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown" class="lang-choice">
                            <el-dropdown-item>
                                <router-link to=""><img src="../../../static/img/china.png"/>英</router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input type="password" placeholder="password"
                              v-model="ruleForm.userPassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                   <div class="login-check">
                       <el-checkbox v-model="remumber.remumber_flag" :checked="remumber.remumber_flag">记住密码</el-checkbox>
                       <el-button type="text" @click="forgetPwd">忘记密码  ?</el-button>
                   </div>
                <el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    module.exports = require('../pageJS/Login');
</script>

<style scoped>
    @import "../../../static/css/login.css";
</style>

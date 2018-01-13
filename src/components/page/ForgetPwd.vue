<template>
    <div class="wrap">
        <div class="lo-container">
            <div>
                <div class="logo-wrap">
                    <img src="../../../static/img/logo.png"/>
                </div>
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
            <el-tabs v-model="activeName" class="loginTab forgetTab">
                <el-tab-pane label="忘记密码" name="first">
                    <div class="fg-login">
                        <el-form :model="forgotNumForm" :rules="forgotNumRules" ref="forgotNumForm" class="demo-ruleForm">
                            <el-form-item prop="signEmail">
                                <label class="label-icon ion-email"></label>
                                <el-input v-model="forgotNumForm.email" placeholder="输入注册邮箱"
                                          @key.nation.enter="resetForgetPwd('forgotNumForm')"></el-input>
                                <el-button @click="forgetValid" class="idcode" :disabled="start">{{ timer + setCode }}</el-button>
                                <div class="idcodeTip" v-show="isShow"><i></i>验证码已发送到您的邮箱，请注意查收！</div>
                            </el-form-item>
                            <el-form-item prop="idCode">
                                <label class="label-icon ion-idcode"></label>
                                <el-input placeholder="输入验证码" v-model="forgotNumForm.idCode"
                                          @key.nation.enter="resetForgetPwd('forgotNumForm')"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPwd">
                                <label class="label-icon ion-lock"></label>
                                <el-input type="password" placeholder="请输入密码" v-model="forgotNumForm.newPwd"
                                          @key.nation.enter="resetForgetPwd('forgotNumForm')"></el-input>
                            </el-form-item>
                            <el-form-item prop="confirmPwd">
                                <label class="label-icon ion-verify"></label>
                                <el-input type="password" placeholder="再次输入密码" v-model="forgotNumForm.confirmPwd"
                                          @key.nation.enter="resetForgetPwd('forgotNumForm')"></el-input>
                            </el-form-item>
                            <div class="login-btn marginTop40">
                                <el-button class="lo-submit" @click="resetForgetPwd('forgotNumForm')">重置密码</el-button>
                            </div>
                            <div class="login-btn colorGray">
                                <el-button class="lo-submit" @click="resetForgetReback">已有账户,去登录
                                </el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    module.exports =  require('../pageJS/ForgetPwd')
</script>
<style>
    @import "../../../static/css/forgetPwd.css";
</style>

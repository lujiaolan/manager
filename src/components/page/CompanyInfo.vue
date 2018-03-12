<template>
    <div>
        <p style="color: rgb(72, 106, 106);margin-bottom: 30px">公司信息</p>
        <el-form :model="companyInfo" ref="companyInfo" class="companyInfo">
            <el-form-item label="公司名称：" prop="apNameCH">
                <el-input v-model="companyInfo.apNameCH" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="公司官网：" prop="websiteEN">
                <el-input v-model="companyInfo.websiteEN" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="联络邮箱：" prop="email">
                <el-input v-model="companyInfo.email" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="在线QQ：" prop="qq">
                <el-input v-model="companyInfo.qq" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="联络电话：" prop="tel">
                <el-input v-model="companyInfo.tel" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="公司地址：" prop="apAddressCH">
                <el-input v-model="companyInfo.apAddressCH" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="版权信息：" prop="copyRight">
                <el-input v-model="companyInfo.copyRight" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="MT4下载地址：" prop="mt4Win">
                <el-input v-model="companyInfo.mt4Win" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="            " prop="mt4IOS">
                <el-input v-model="companyInfo.mt4IOS" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="            " prop="mt4An">
                <el-input v-model="companyInfo.mt4An" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="LOGO:" v-if="!btnFlag">
                <div class="uploadStyle">
                    <img :src="imageUrl">
                </div>
            </el-form-item>
            <el-form-item label="LOGO:" prop="logoFile" v-if="btnFlag">
                <input type='file' @change="changeLogo" ref="input">
                <div class="uploadStyle">
                    <img :src="src" ref="img">
                </div>
                <div>请上传文件名为logo，且文件大小不超过500kb的jpg/png类型文件</div>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitCompanyInfo">{{ btnInfo }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    module.exports = require ('../pageJS/Companylnfo')
</script>
<style></style>

<template>
    <div>
        <p style="color: rgb(72, 106, 106);margin-bottom: 30px">公司信息</p>
        <el-form :model="emailInfo" ref="emailInfo" :rules="emailInfoRules" class="emailInfo">
            <el-form-item label="公司名称：" prop="companyName">
                <el-input v-model="emailInfo.companyName" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="contactPhone">
                <el-input v-model="emailInfo.contactPhone" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="contactEmail">
                <el-input v-model="emailInfo.contactEmail" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="网址：" prop="website">
                <el-input v-model="emailInfo.website" :disabled="editVisible"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="contactAddress">
                <el-input v-model="emailInfo.contactAddress" :disabled="editVisible"></el-input>
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
                <div>请上传文件名为logo，尺寸大小不超过217x75的jpg/png类型文件，且文件大小不超过500kb</div>
            </el-form-item>
            <el-form-item>
                <el-button @click="submitEmailInfo('emailInfo')">{{ btnInfo }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    module.exports = require ('../pageJS/emailnfo')
</script>
<style></style>

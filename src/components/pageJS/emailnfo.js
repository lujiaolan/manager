/**
 * Created by Udea-Manager on 2017/10/27.
 */

export default {
    data(){
        return{
            emailInfo:{
                companyName: '',
                contactPhone: '',
                contactEmail: '',
                website: '',
                contactAddress: '',
                logoFile: '',
            },
            emailInfoRules: {
                companyName: {
                    required: true,
                    message: '请输入公司名称',
                    trigger: 'blur'
                },
                companyPhone: {
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value===''){
                            callback(new Error('请输入公司电话'))
                        }else{
                            callback()
                        }
                    },
                    trigger: 'blur'
                },
                companyEmail: {
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value===''){
                            callback(new Error('请输入公司邮箱'))
                        }else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)||/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                callback()
                            }else{
                                callback(new Error('不是有效的邮箱,请重新输入'))
                            }
                        }
                    },
                    trigger: 'blur'
                },
                companyWeb: {
                    required: true,
                    message: '请输入公司网址',
                    trigger: 'blur'
                },
                companyAddress: {
                    required: true,
                    message: '请输入公司地址',
                    trigger: 'blur'
                },
            },
            editVisible: true,
            btnInfo: '修改',
            btnFlag: '',

            logo: '',
            imageUrl:'',
            src: '',
            elInput: null,
            WHDisable: true,
            nameDisable: true,
            typeDisable: true,
            sizeDisable: true,
        }
    },
    methods:{
        changeLogo(e){
            const self = this;
            const refs = this.$refs;
            const elInput = refs.input;
            const elImg = refs.img;
            const reader = new FileReader();
            const image = new Image();
            reader.onload = (e) => {
                elImg.src = e.target.result;
                image.onload = () => {
                    console.log(image.width);
                    console.log(image.height);
                    if(image.width > 217||image.height > 75){
                        // self.$message.error('请上传符合要求尺寸的文件');
                        self.WHDisable = false
                    }else {
                        self.WHDisable = true
                    }
                };
                image.src = e.target.result;
            };
            if (elInput.files && elInput.files[0]) {
                reader.readAsDataURL(elInput.files[0]);
            }
            // console.log('logoInfo e');
            // console.log(elInput.files[0]);
            const getImgInfo = (e) => {
                const fileName = e.target.files[0].name;
                const arrName = fileName.split(".");
                const imgInfo = {
                    size: e.target.files[0].size/1024,
                    type: e.target.files[0].type,
                    name: arrName[0],
                };
                return imgInfo
            };
            const imgInfo = getImgInfo(e);
            if(imgInfo.size > 500){
                self.sizeDisable = false
            }else {
                self.sizeDisable = true
            }
            if(imgInfo.type === 'image/jpeg' || imgInfo.type === 'image/png'){
                self.tyDisable = true
            }else {
                self.tyDisable = false
            }
            if(imgInfo.name === 'logo'){
                self.nameDisable = true
            }else {
                self.nameDisable = false
            }
            console.log('getSizeIncompatible');
            self.emailInfo.logoFile = elInput.files[0];
            console.log(self.emailInfo.logoFile);
        },

        submitEmailInfo(ref){
            const self = this;
            if(self.btnFlag === false){
                self.editVisible = false;
                self.btnInfo = '提交信息';
                self.btnFlag = true;
            }else {
                self.$refs[ref].validate((valid)=>{
                    if(valid){
                        if(!self.WHDisable){
                            self.$message.error('请选择尺寸为217x75的文件')
                        }else if(!self.sizeDisable){
                            self.$message.error('请选择大小小于500kb的文件')
                        }else if(!self.nameDisable){
                            self.$message.error('请选择文件名为logo的文件')
                        }else if(!self.typeDisable){
                            self.$message.error('请选择类型为jpg/png的文件')
                        }else {
                            self.editEmailInfo();
                            console.log('符合上传条件')
                        }
                    }else {
                        return false
                    }
                })
            }
        },
        getEmailInfo(){
            const self = this;
            self.$ajax({
                method: 'get',
                url: '/ap/contact/info/' + this.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode == 0){
                    if(res.data.data == ''){
                        self.editVisible = false;
                        self.btnInfo = '提交信息';
                        self.btnFlag = true;
                    }else {
                        self.editVisible = true;
                        self.emailInfo = res.data.data;
                        self.imageUrl = res.data.data.logoUrl;
                        self.src = self.imageUrl;
                        self.logo = res.data.data.logo;
                        self.btnInfo = '修改';
                        self.btnFlag = false;
                    }
                }else {
                    self.editVisible = false;
                    self.btnInfo = '提交信息';
                    self.btnFlag = true;
                }
                console.log(self.emailInfo)
            }).catch(function () {
            })
        },
        editEmailInfo(){
            const self = this;
            // console.log(self.emailInfo);
            // console.log(self.emailInfo.logoFile);
            const postData = new FormData();
            postData.append('apId',self.$store.state.domain.domain.domain.apId);
            postData.append('companyName',self.emailInfo.companyName);
            postData.append('contactPhone',self.emailInfo.contactPhone);
            postData.append('contactEmail',self.emailInfo.contactEmail);
            postData.append('website',self.emailInfo.website);
            postData.append('contactAddress',self.emailInfo.contactAddress);
            if(self.emailInfo.logoFile){
                postData.append('oldLogo',self.logo);
                postData.append('logoFile',self.emailInfo.logoFile);
            }
            console.log('/crm/ap/contact/info/edit postData');
            console.log(postData.get('logoFile'));
            console.log(postData);
            self.$ajax({
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                url: '/ap/contact/info/edit',
                method: 'post',
                data: postData,
                dataType: 'JSON',
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode == 0){
                    self.getEmailInfo();
                }else {
                    self.$message.error(res.data.message);
                }
            })
        }
    },
    mounted(){
        this.getEmailInfo();
    }
}

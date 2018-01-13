import MD5 from 'js-md5';
export default {
    data(){
        return {
            remumber:this.$store.state.user.remumber,
            userIp: '',
            value: '简体中文',
            checked: true,
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
//                        { min: 3, max: 5, message: '请输入3-5个字符', trigger: 'blur' }
                ],
                userPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
//                    console.log(valid);
                if (valid) {
                    if(self.$store.state.domain.domain.domain.apId){
                        self.$ajax({
                            method:'post',
                            url:'/ap/apUser/login',
                            data:{
                                userName:self.ruleForm.userName,
                                userPassword:MD5(self.ruleForm.userPassword),
                                apId:self.$store.state.domain.domain.domain.apId,
                                ip: self.userIp
                            }
                        }).then(function (res) {
                            console.log(res)
                            if(res.data.retCode==0){
                                if(self.remumber.remumber_flag===true){
                                    console.log("记住密码")
                                    console.log("self.loginForm.username,"+self.ruleForm.userName)
                                    console.log("sself.loginForm.password,"+self.ruleForm.userPassword)
                                    console.log(" token:res.data.data.token,"+ res.data.data.token)
                                    console.log("记住密码")
                                    self.$store.dispatch('update_remumber',{
                                        remumber_flag:self.remumber.remumber_flag,
                                        remumber_login_info:{
                                            password:self.ruleForm.userPassword,
                                            username: self.ruleForm.userName,
                                            token: res.data.data.token
                                        }

                                    },)
                                }
                                self.$store.dispatch('update_userinfo',{userinfo:res.data.data});
                                self.$router.push('/home')
                            }else{
                                self.$message({
                                    showClose:true,
                                    type:'warning',
                                    message:res.data.data.errMsg
                                })
                            }

                        }).catch(function (err) {

                        })
                    }else{
                        self.$message({
                            showClose:true,
                            message:'域名匹配错误,请重新配置',
                            type:'warning'
                        })
                    }
                    // localStorage.setItem('ms_username',self.ruleForm.username);
                    // if(self.ruleForm.username!=="1"){
                    //     self.$router.push('/Home');
                    // }else {
                    //     self.$message.error({
                    //         showClose: true,
                    //         message: '邮箱格式不正确',
                    //     });
                    // }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        forgetPwd() {
            this.$router.push('/forgetPwd')
        },
        postData(){
            const self = this;
            let URL =  document.location.origin;
            const postData = {
                domain:URL,
                type:'guest',
            };
            this.$ajax({
                method: 'post',
                data:postData,
                url:'/ap/getApId'
            }).then(function (res) {
                console.log(res)
                console.log(res.data.data)
                self.$store.dispatch('update_domain',res.data.data)
            }).catch(function (err) {
                console.log(err)
            })
        },
        getUserIp(){
            const self = this;
            jquery.getScript('http://pv.sohu.com/cityjson',function () {
                console.log('returnCitySN.cip');
                console.log(returnCitySN.cip);
                self.userIp = returnCitySN.cip;
            })
        }
    },
    mounted(){
        this.getUserIp()
    }
}

/**
 * Created by Udea-Manager on 2018/1/9.
 */
import MD5 from 'js-md5';
export default {
    data() {
        const validateEmailCode = (rules,value,callback)=>{
            if(value.length<=0){
                callback(new Error('验证码不能为空'));
            }else{
                if(this.checkValid()!==0){
                    callback(new Error('验证码失效'))
                }else{
                    callback()
                }
            }
        };
        return {
            activeName:'first',
            emailCode:'',
            isShow: false,
            forgotNumForm: {
                email: '',
                idCode: '',
                newPwd: ''
            },
            forgotNumRules: {
                email: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入注册邮箱'))
                        }else{
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                callback()
                            }else{
                                callback(new Error('邮箱格式不对,请重新输入'))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                idCode: [{
                    required: true,

                    validator:(rules,value,callback)=>{
                        if(value){
                            this.$ajax({
                                method: 'post',
                                url: '/check/validCode',
                                data: {
                                    validCode: value
                                }
                            }).then(function (res) {
                                if (res.data.retCode === 0) {
                                    callback()
                                } else {
                                    callback(new Error('验证码错误'))
                                }
                            }).catch(function (err) {
                                callback(new Error('验证码错误'))
                            });

                        }else {
                            callback(new Error('请输入验证码'))
                        }
                    },
                    trigger: 'blur'
                }],
                newPwd: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('请输入新密码'))
                        }else{
                            if(/^(\w){6,20}$/.test(value)){
                                callback()
                            }else{
                                callback(new Error('请输入6-20个字母、数字、下划线 '))
                            }
                        }
                    },
                    trigger: 'blur'
                }],
                confirmPwd: [{
                    required: true,
                    validator:(rules,value,callback)=>{
                        if(value==''){
                            callback(new Error('确认密码不能为空'))
                        }else{
                            if(value!==this.forgotNumForm.newPwd){
                                callback(new Error('两次的密码输入不一致'))
                            }else{
                                callback()
                            }
                        }
                    },
                    trigger: 'blur'
                }]
            },

            // 发送验证码按钮
            setCode: '发送验证码',
            start: false,
            timer: '',
        }
    },
    methods: {
        resetForgetPwd(formName) {
            const self = this;
            console.log('self.$store.state.domain.domain.domain.apId')
            console.log(self.$store.state.domain.domain.domain.apId)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(self.$store.state.domain.domain.domain.apId){
                        this.$ajax({
                            method: 'post',
                            url: "/ap/userPwd/forget",
                            data: {
                                apId: self.$store.state.domain.domain.domain.apId,
                                newUserPassword: MD5(self.forgotNumForm.newPwd),
                                userEmail: self.forgotNumForm.email,
                            }
                        }).then(function (res) {
                            console.log(res)
                            if(res.data.retCode==0){
                                self.$message({
                                    type:'info',
                                    showClose:true,
                                    message:'密码重置成功',
                                });
                                self.$router.push('/login')
                            }else{
                                self.$message({
                                    type:'warning',
                                    showClose:true,
                                    message:'重置密码失败,请重新输入'
                                })
                            }
                        }).catch(function (err) {
                            self.$message({
                                type:'error',
                                showClose:true,
                                message:'网络错误'
                            })
                        })
                    }else{
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'域名匹配错误,请重新配置'
                        })
                    }
                } else {
                    return false;
                }
            })
        },
        forgetValid(){
            const self = this;
            console.log('hahah')
            if(this.forgotNumForm.email){
                if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.forgotNumForm.email)){
                    this.$ajax({
                        method: 'post',
                        url: '/pwdReset/validCode',
                        data: {
                            userEmail: self.forgotNumForm.email,
                            apId: self.$store.state.domain.domain.domain.apId
                        }
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                type:'info',
                                showClose:true,
                                message:'验证码已发送邮箱,请注意查收'
                            });
                            self.sendCode();
                        }else {
                            self.$message({
                                type:'warning',
                                showClose:true,
                                message:'发送错误,请重新发送'
                            })
                        }
                    }).catch(function (err) {
                        self.$message({
                            type:'error',
                            showClose:true,
                            message:'网络错误'
                        })
                    });
                }else{
                    // callback(new Error('邮箱格式不对,请重新输入'))
                }
            }else{
                self.$message({
                    type:'warning',
                    showClose:true,
                    message:'请输入邮箱'
                })
            }
        },
        checkValid(){
            const theh = this;
            this.$ajax({
                method: 'post',
                url: '/check/validCode',
                data: {
                    validCode: this.forgotNumForm.idCode
                }
            }).then(function (res) {
                console.log(res);
                if (res.data.retCode === 0) {
                    theh.emailCode = res.data.retCode;
                } else {
                    theh.emailCode = res.data.retCode;
                }
            }).catch(function (err) {
                console.log(err)
            });
            return theh.emailCode;
        },
        resetForgetReback(){
            this.$router.push('/login')
        },


        // 发送验证码倒计时
        sendCode(){
            const _this = this;
            let countDown = setInterval(function () {
                if(_this.timer == 0){
                    clearInterval(countDown);
                    _this.start = false;
                    _this.timer = '';
                    _this.setCode = '发送验证码';
                }else {
                    _this.timer --;
                }
            },1000);
            if(typeof _this.setCode != "number"){
                _this.start = true;
                _this.timer = 60;
                _this.setCode = ' s';
                countDown;
            }
        }
    }
}

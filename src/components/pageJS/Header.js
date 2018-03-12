/**
 * Created by Udea-Manager on 2018/1/11.
 */
import md5 from 'js-md5';
export default {
    data() {
        return {
            name: 'linxin',
            modifyPwdShow:false,
            modifyPwdInfo:{
                type:1,
                userEmail:this.$store.state.user.userinfo.userEmail,
                apId:this.$store.state.user.userinfo.apId,
                oldUserPassword:'',
                newUserPassword:'',
                dumpUserPassword:''
            },
            modifyPwdInfo_rules:{
                oldUserPassword:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value){
                                callback()
                                // this.$ajax({
                                //     method:'post',
                                //     url:'',
                                //     data:''
                                // }).then(function (res) {
                                //     if(res.data.retCode==0){
                                //         callback()
                                //     }else{
                                //         callback(new Error('旧密码输入错误,请重新输入'))
                                //     }
                                // }).catch(function (err) {
                                //     callback(new Error('旧密码输入错误'))
                                // })
                            }else{
                                callback(new Error('请输入旧密码'))
                            }
                        }
                    }
                ],
                newUserPassword:[
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur',
                    },
                    {
                        min:6,
                        message:'设置的密码必须要大于六位数'
                    }
                ],
                dumpUserPassword:[
                    {
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(value===this.modifyPwdInfo.newUserPassword){
                                    callback()
                                }else{
                                    callback(new Error('两次输入的密码不一致,请重新输入'))
                                }
                            }else{
                                callback(new Error('请再次输入密码'))
                            }
                        }
                    }
                ]
            }
        }
    },
    methods:{
        headerUserFull(){
            console.log('userFull')
        },
        headerUserRefresh(){
            console.log('headerUserRefresh')
        },
        handleCommand(command){
            const self= this;
            if (command == 'loginout') {
                this.$router.push('/login');
                this.$ajax({
                    method: get,
                    url: '/logout/' + self.$store.state.user.userinfo.userId
                }).then(function (res) {

                }).catch(function () {

                })
            }
            if(command=='modifyPwd'){
                this.modifyPwdShow = true;
            }
        },
        handleModifyPwd(ref){
            const self = this;
            console.log(this.modifyPwdInfo)
            const postData = {
                type:this.modifyPwdInfo.type,
                userEmail:this.modifyPwdInfo.userEmail,
                apId:this.modifyPwdInfo.apId,
                oldUserPassword:md5(this.modifyPwdInfo.oldUserPassword),
                newUserPassword:md5(this.modifyPwdInfo.newUserPassword)
            };
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        url:'/ap/reset/userPwd',
                        data:postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                showClose:true,
                                // message:'修改密码成功',
                                message:'邮件发送成功，请注意查收',
                                type:'info'
                            });
                            self.modifyPwdShow = false;
                            self.$store.dispatch('remove_userinfo',{userinfo:res.data.data});
                            self.$router.push('/login');
                        }else if(res.data.retCode==1){
                            self.$message({
                                showClose:true,
                                // message:'修改密码成功',
                                message:'操作成功，请稍后查收邮件',
                                type:'info'
                            });
                            self.modifyPwdShow = false;
                            self.$store.dispatch('remove_userinfo',{userinfo:res.data.data});
                            self.$router.push('/login');
                        }else{
                            self.$message({
                                showClose:true,
                                // message:'修改密码失败',
                                message:'操作失败，请稍后再试',
                                type:'warning'
                            })
                        }
                    }).catch(function (err) {
                        self.$message({
                            showClose:true,
                            message:'网络错误',
                            type:'error'
                        })
                    })
                }else{
                    return false;
                }
            })
        },
        cancelModifyPwd(ref){
            this.$refs[ref].resetFields();
            this.modifyPwdShow = false;
        }
    },
    mounted(){
        console.log(this.$store.state.user.userinfo)
    }
}

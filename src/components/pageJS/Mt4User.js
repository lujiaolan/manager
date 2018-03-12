export default {
    data() {
        let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位数身份证正则表达式
        let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[a-zA-Z])$/;
        return {
            MT4Loading:false,
            changeAttributeDisAble:false,
            MT4SyncDisabled:false,
            totalMyInfo:null,
            accountTypeDisabled:false,
            userEmailAble:true,
            disabledUserIRD:true,
            multipleMT4:[],
            addMT4Visible: false,
            addMT4SameVisible: false,
            canApplyMt4:null,
            searchMT4List:{
                apId:this.$store.state.domain.domain.domain.apId,
                mt4UserNameLike:'',
                pageSize:10,
                currentPage:1,
                mt4UserId:null
            },
            addMt4FormSame:{
                apId: '',
                IDName:'',
                UserIRD:'',
                accountType:'' ,
                UserID: null,
                UserPhone: '',
                UserEmail: '',
                UserComment: '',
                UserLeverage: '',
                UserGroupName: '',
                UserPwd: '',
                UserInvestorpwd:''
            },

            resetMT4PwdData:{
                apId:this.$store.state.domain.domain.domain.apId,
                UserLoginID:'',
                userEmail:'',
                UserInvestPwdCheck:1
            },
            groupTypeList:[
                {
                    value:'realTransferRules',
                    label:'个人'
                },
                {
                    value:'agentAccountRules',
                    label:'代理'
                }],
            MT4TypeList:[
                {
                    value:'1',
                    label:'主账号'
                },
                {
                    value:'0',
                    label:'标准账户'
                }],
            leverList:[],
            groudMT4List:[],
            addMt4Form: {
                apId: this.$store.state.domain.domain.domain.apId,
                IDName:'',
                UserIRD:'',
                accountType:'realTransferRules' ,
                UserID: '',
                UserPhone: '',
                role: 'commonUser',
                UserEmail: '',
                UserComment: '',
                UserLeverage: '',
                UserGroupName: '',
                UserPwd: 'qwe123',
                UserInvestorpwd:'qwe123'
            },
            addMt4FormSameRules:{
                UserPwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('请输入主密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserInvestorpwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('请输入观摩密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserID: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('无法申请MT4账号'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserGroupName: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择分组'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserLeverage: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择杠杆比例'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                type: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择账户类型'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                    }
                ],
                UserIRD: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }  else{
                                if( value.match(arg1) == null && value.match(arg2) == null){
                                    callback(new Error('身份证格式错误,请重新输入'))
                                }else{
                                    callback();
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            },
            addMT4Rules: {
                accountType:[
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('请选择账户属性'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserPwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value===undefined){
                                callback(new Error('请输入主密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                      trigger: 'blur'
                    }
                ],
                UserInvestorpwd: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value===undefined){
                                callback(new Error('请输入主密码'))
                            }else {
                                if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                                    callback()
                                }else{
                                    callback(new Error('请输入6-20个字母或数字组成的密码'))
                                }
                            }
                        },
                      trigger: 'blur'
                    }
                ],
                UserID: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null){
                                callback(new Error('无法申请MT4账号,请重新选择账户属性'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserGroupName: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请选择分组'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                UserLeverage: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==undefined){
                                callback(new Error('请选择杠杆比例'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                IDName: [
                    {
                        required: true,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback(new Error('请输入姓名'))
                            }else {
                                callback()
                            }
                        },
                        trigger: 'blur',
                        }
                ],
                UserEmail: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                          if(value){
                              if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                  this.$ajax({
                                      method:'post',
                                      url:'/other/user/dumpRepeat',
                                      data:{
                                          apId:this.$store.state.domain.domain.domain.apId,
                                          userEmail:value
                                      }
                                  }).then(function (res) {
                                      if(res.data.retCode==0){
                                          callback()
                                      }else{
                                          callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                      }
                                  }).catch(function (err) {
                                      callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                  })
                              }else{
                                  callback(new Error('请输入有效的邮箱'))
                              }

                          } else{
                              callback()
                          }
                        },
                        trigger: 'blur' }
                ],
                UserPhone: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }  else{
                                if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                    this.$ajax({
                                        method:'post',
                                        url:'/other/user/dumpRepeat',
                                        data:{
                                            apId:this.addMt4Form.apId,
                                            userPhone:value
                                        }
                                    }).then(function (res) {
                                        if(res.data.retCode==0){
                                            callback()
                                        }else {
                                            callback(new Error('手机号被占用,请重新输入手机号'))
                                        }
                                    }).catch(function (err) {
                                        callback(new Error('手机号被占用,请重新输入手机号'))
                                    })
                                }else{

                                    callback(new Error('手机号格式错误,请重新输入'))
                                }
                            }
                        },
                        trigger: 'blur' }
                ],
                UserIRD: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }  else{
                                if( value.match(arg1) == null && value.match(arg2) == null){
                                    callback(new Error('身份证格式错误,请重新输入'))
                                }else{
                                    callback();
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
            },
            syncForm:{
                chooseValue: '',
                select_syncId: ''
            },
            syncOneVisible: false,

            tableData: [],
            resetPwdVisible: false,
            changeAttributeVisible: false,
            changeAttributeForm: {
                accountType:'',
                IDName:'',
                apId:'',
                UserEnableStatus:null,
                UserLoginID:null,
                UserGroupName:'',
                UserLeverage:null,
                UserIRD:'',
                UserEmail:'',
                UserPhone:'',
                UserEnable:null,
                UserEnableReadonly:null,
            },
            baseInfoVisible: false,
            baseInfoForm: {
                ZhName: '',
                EnName: '',
                Email: '',
                Phone: '',
                AgentLever: '',
                RebateType: '',
                Country: '',
                faceLanguage: '',
                BDay: '',
                Addr: '',
                HigherLever: '',
                refId: '',
            },
            baseInfoEditVisible: true,
            baseBankCard: [],
            showImg: false,

            changeBalanceVisible: false,
            changeBalanceForm: {
                Name: '',
                Phone: '',
                Email: '',
                Balance: '',
                changeTYpe: '',
                Count: '',
                AdminTip: '',
            },
            changeAttributeRules:{
                UserEmail: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(this.userEmailAble===true){
                                callback()
                            }else{
                                if(value){
                                    if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)){
                                        this.$ajax({
                                            method:'post',
                                            url:'/other/user/dumpRepeat',
                                            data:{
                                                apId:this.$store.state.domain.domain.domain.apId,
                                                userEmail:value
                                            }
                                        }).then(function (res) {
                                            if(res.data.retCode==0){
                                                callback()
                                            }else{
                                                callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                            }
                                        }).catch(function (err) {
                                            callback(new Error('邮箱已经存在CRM,请创建同名账户'))
                                        })
                                    }else{
                                        callback(new Error('请输入有效的邮箱'))
                                    }

                                } else{
                                    callback()
                                }
                            }
                        },
                        trigger: 'blur' }
                ],
                accountType:[
                    {
                        require:false,
                        validator:(rules,value,callback)=>{
                            if(value==''||value==null||value==undefined){
                              callback()
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                UserPhone: [
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(this.changeAttributeForm.UserPhone){
                                callback()
                            }else{
                                if(value==''||value==undefined){
                                    callback()
                                }  else{
                                    if(this.changeAttributeForm.UserPhone){
                                        if(/^1[3,4,5,7,8]\d{9}$/.test(value)){
                                            this.$ajax({
                                                method:'post',
                                                url:'/other/user/dumpRepeat',
                                                data:{
                                                    apId:this.changeAttributeForm.apId,
                                                    userPhone:value
                                                }
                                            }).then(function (res) {
                                                if(res.data.retCode==0){
                                                    callback()
                                                }else {
                                                    callback(new Error('手机号被占用,请重新输入手机号'))
                                                }
                                            }).catch(function (err) {
                                                callback(new Error('手机号被占用,请重新输入手机号'))
                                            })
                                        }else{

                                            callback(new Error('手机号格式错误,请重新输入'))
                                        }
                                    }else{
                                        callback(new Error('不能修改用户手机号,请填写手机号'))
                                    }
                                }
                            }
                        },
                        trigger: 'blur' }
                ],
                UserIRD:[
                    {
                        required: false,
                        validator:(rules,value,callback)=>{
                            if(value==''){
                                callback()
                            }  else{
                                if( value.match(arg1) == null && value.match(arg2) == null){
                                    callback(new Error('身份证格式错误,请重新输入'))
                                }else{
                                    callback();
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    watch:{
        'addMt4Form.accountType':function (val) {
            console.log(val)
            if(val=='agentAccountRules'){
                console.log(val)
                this.addMt4Form.role = 'agent';
                this.getMt4MaxAccount();

            }else if(val=='realTransferRules'){
                this.addMt4Form.role = 'commonUser';
                this.getMt4MaxAccount();
            }
        }
    },
    methods: {
        getMt4MaxAccount(){
            const self = this;
            const postData = {
                apId:this.addMt4Form.apId,
                type:this.addMt4Form.accountType
            };
            this.$ajax({
                method:'post',
                url:'/ap/mt4Config/mt4MaxAccount',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log(res)
                    if(res.data.data.MaxNum){
                        self.addMt4Form.UserID = res.data.data.MaxNum+1;
                    }else{
                        self.addMt4Form.UserID= null;
                    }

                }
            }).catch(function (err) {

            })
        },
        MT4SizeChange(val){
            this.searchMT4List.pageSize = val;
            this.mt4UserList();
        },
        currentChangeMT4(val){

            this.searchMT4List.currentPage = val;
            this.mt4UserList();
        },
        cancelSameAddMt4(ref){
           this.addMT4SameVisible = false;
            this.$refs[ref].resetFields();
        },

        addMT4(ref){
            const self = this;
            console.log(this.addMt4Form)
            this.addMt4Form.UserLeverage = parseInt(this.addMt4Form.UserLeverage)
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        url:'/mt4/add',
                        method:'post',
                        data:this.addMt4Form
                    }).then(function (res) {
                        console.log(res)
                        if(res.data.retCode==0){

                            self.$message({
                                message:'申请成功,账户为:'+res.data.data.mt4UserId,
                                showClose:true,
                                type:'info'
                            });
                                self.addMT4Visible = false;
                                self.mt4UserList();
                                self.$refs[ref].resetFields();
                        }else{

                            self.$message({
                                message:'申请失败,错误原因:'+res.data.data.errMsg,
                                showClose:true,
                                type:'warning'
                            });
                            self.$refs[ref].resetFields();
                            self.addMT4Visible = false;
                        }
                    }).catch(function (err) {
                        console.log(err)
                        self.$message({
                            message:'网络错误',
                            showClose:true,
                            type:'error'
                        });
                        self.$refs[ref].resetFields();
                        self.addMT4Visible = false;
                    })
                }else {
                    return false;
                }
            })

        },
        adddSameMT4(ref){
            const self = this;
            console.log(this.addMt4FormSame)
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        url:'/mt4/add/sameNameAccount',
                        method:'post',
                        data:this.addMt4FormSame
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            console.log(res)
                            self.$message({
                                message:'申请成功,账号为:'+res.data.data.mt4UserId,
                                type:'info',
                                showClose:true
                            })
                            self.addMT4SameVisible = false;
                            self.mt4UserList();
                            self.$refs[ref].resetFields();
                        }else{
                            self.$message({
                                message:'申请失败,失败原因:'+res.data.data.errMsg,
                                type:'warning',
                                showClose:true
                            });
                            self.addMT4SameVisible = false;
                            self.mt4UserList();
                        }
                    }).catch(function (err) {
                        self.$message({
                            message:'网络错误',
                            type:'error',
                            showClose:true
                        });
                        self.addMT4SameVisible = false;
                    })
                }else {
                    return false;
                }
            })
        },

        cancelMT4Add(ref){
            this.$refs[ref].resetFields();
            this.addMT4Visible = false
        },
        chooseSyncType(val){
            // console.log(val);
            if(val === 1){
                this.syncOneVisible = true;
            }else {
                this.syncOneVisible = false;
            }
        },
        syncMT4Visible(){

            const self = this;
            self.MT4Loading = true;
            self. MT4SyncDisabled = true;
            // this.$message({
            //     type:'info',
            //     showClose:true,
            //     message:'接口没给我'
            // });
            // console.log(this.$store.state.domain.domain.domain.apId);
            self.$ajax({
                method:'get',
                url:'/ap/group/sync/' + self.$store.state.domain.domain.domain.apId,
                // headers: {'Authorization': 'Bearer ' + this.$store.state.user.userinfo.token},
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode === 0){
                    self.$ajax({
                        method: 'get',
                        url: '/ap/users/sync/' + self.$store.state.domain.domain.domain.apId
                    }).then(function (res) {
                        // console.log('同步客户');
                        console.log(res);
                        if(res.data.retCode === 0){
                            self.$message({
                                type: 'success',
                                message: '用户同步成功'
                            });
                            self.MT4Loading = false;
                            self. MT4SyncDisabled = false;
                            self.mt4UserList();
                        }else {
                            self.$message({
                                type: 'error',
                                message: '用户同步没有成功'
                            })
                            self.MT4Loading = false;
                            self. MT4SyncDisabled = false;
                        }
                    }).catch(function (res) {
                        self.$message({
                            type: 'error',
                            message: '网络错误'
                        })
                        self.MT4Loading = false;
                        self. MT4SyncDisabled = false;
                    })
                }else {
                    self.$message({
                        type: 'error',
                        message: '同步组没有成功'
                    })
                    self.MT4Loading = false;
                    self. MT4SyncDisabled = false;
                }
            }).catch(function (res) {
                self.$message({
                    type: 'error',
                    message: '网络错误'
                })
                self.MT4Loading = false;
                self. MT4SyncDisabled = false;
            })
        },
        resetPwd(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/mt4/mt4Pwd/pwdReset',
                data:this.resetMT4PwdData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        // message:'修改成功,请查收邮箱',
                        message:'邮件发送成功，请注意查收',
                        type:'info',
                        showClose:true
                    });
                    self.resetPwdVisible = false;
                    self.mt4UserList();
                }else if(res.data.retCode==1){
                    self.$message({
                        // message:'修改成功,请查收邮箱',
                        message:'操作成功，请稍后查收邮件',
                        type:'info',
                        showClose:true
                    });
                    self.resetPwdVisible = false;
                    self.mt4UserList();
                }else{
                    self.$message({
                        // message:'修改失败',
                        message:'操作失败，请稍后再试',
                        type:'warning',
                        showClose:true
                    })
                }
            }).catch(function (err) {
                self.$message({
                    message:'网络错误',
                    type:'error',
                    showClose:true
                })
            })

        },
        resetMT4Pwd(row){
            this.resetPwdVisible = true;
            this.resetMT4PwdData = {
                apId:this.resetMT4PwdData.apId,
                UserLoginID:row.mt4UserId,
                userEmail:row.UserEmail,
                UserInvestPwdCheck:1
            };
            console.log(row)
        },
        changeAttrCancel(){
            this.changeAttributeVisible = false;
            this.userEmailAble = true;
            this.mt4UserList();
        },
        changeAttribute(index, row) {
            console.log(row);
            console.log(row.UserEmail);
            this.changeAttributeForm.accountType = '';
            if(row.UserEmail){
                this.userEmailAble = true;
            }else {
                this.userEmailAble = false;
            }
            if(row.UserIRD){
                this.disabledUserIRD = true;
            }else{
                this.disabledUserIRD = false;
            }
            this.getApGroupList();
            if(row.accountType=='realTransferRules'){
                this.accountTypeDisabled = true;
                this.changeAttributeForm.accountType = 'realTransferRules';
            }else{
                this.accountTypeDisabled = true;
                this.changeAttributeForm.accountType = 'agentAccountRules';
            }
            this.changeAttributeVisible = true;
            this.changeAttributeForm = {
                accountType:row.accountType,
                apId:row.apId,
                IDName:row.User,
                UserLoginID:row.mt4UserId,
                UserGroupName:row.UserGroupName,
                UserLeverage:row.UserLeverage,
                UserEmail:row.UserEmail,
                UserIRD:row.UserIRD,
                UserPhone:row.UserPhone,
                UserEnable:row.UserEnable,
                UserEnableReadonly:row.UserEnableReadonly,
            }
            if(row.UserEmail){
               this. changeAttributeDisAble=true;
            }else{
                this. changeAttributeDisAble = false;
            }
            console.log('this.changeAttributeForm')
            console.log(this.changeAttributeForm)
        },
        changeAttributeS(ref){
            const self = this;
            let role = ''
            if(this.changeAttributeForm.accountType=='realTransferRules'){
                role = 'commonUser';
            }else {
                role = 'agent';
            }
            const postData = {
                apId:this.changeAttributeForm.apId,
                UserLoginID:this.changeAttributeForm.UserLoginID,
                UserGroupName:this.changeAttributeForm.UserGroupName,
                UserLeverage:this.changeAttributeForm.UserLeverage,
                UserIRD:this.changeAttributeForm.UserIRD,
                IDName:this.changeAttributeForm.IDName,
                UserPhone:this.changeAttributeForm.UserPhone,
                UserEnable:this.changeAttributeForm.UserEnable,
                UserEnableReadonly:this.changeAttributeForm.UserEnableReadonly,
                role:role
            };

            this.$refs[ref].validate((valid)=>{
                if(valid){
                    self.$ajax({
                        method:'post',
                        url:'/modify/mt4',
                        data: postData
                    }).then(function (res) {
                        if(res.data.retCode==0){
                            self.$message({
                                message:'调整属性成功',
                                type:'info',
                                showClose:true
                            });
                            self.mt4UserList();
                            self.changeAttributeVisible = false;
                        }else{
                            self.$message({
                                message:'调整属性失败',
                                type:'warning',
                                showClose:true
                            });
                            self.mt4UserList();
                            self.changeAttributeVisible = false;
                        }
                    }).catch(function (err) {
                        self.$message({
                            message:'网络错误',
                            type:'error',
                            showClose:true
                        });
                    })
                }else{
                    return false;
                }
            })

        },
        mt4UserList(){
            const self = this;
            if(this.searchMT4List.mt4UserId==''){
                this.searchMT4List.mt4UserId=null;
            }
            this.$ajax({
                method:'post',
                url:'/list/mt4User',
                data:this.searchMT4List
            }).then(function (res) {
                console.log("getMT4ApplyList");
                console.log(res.data.data.content);
                console.log(res.data.data.totalAmount);
                self.tableData  =res.data.data.content;
                self.totalMyInfo = res.data.data.totalAmount;
            }).catch(function (err) {
                console.log(err);
            })
        },
        handleSelectionChange(val){
            this.multipleMT4 =val;
            console.log( 'this.multipleMT4');
            console.log(this.multipleMT4)
        },
        createMT4(){
            this.addMT4Visible = true;
            this.getApGroupList();
            this.getMt4MaxAccount();
            this.getMt4Lever();
        },
        getMt4Lever(){
            const self = this;
            this.$ajax({
                method:'get',
                url:'/ap/mt4Config/'+this.$store.state.domain.domain.domain.apId+'/mt4Info'
            }).then(function (res) {
                console.log(res)
                if (res.data.retCode===0){
                    self.leverList = res.data.data.leverConfig;
                }else{
                    self.leverList = ['无数据']
                }
            }).catch(function (err) {
                self.leverList = ['无数据']
            })
        },
        sigleSyncMt4(row){
            const self = this;
            this.$confirm('您确定要同步'+row.mt4UserId+'这个账号吗?','同步账户',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                const postData = {
                    apId:row.apId,
                    mt4UserId:row.mt4UserId.toString()
                };
                console.log(row)
                console.log(postData)
                self.$ajax({
                    method:'post',
                    url:'/ap/user/sync',
                    data:postData
                }).then(function (res) {
                    if(res.data.retCode===0){
                        self.$message({
                            message:'同步成功',
                            type:'info',
                            showClose:true
                        })
                    }else{
                        self.$message({
                            message:'同步失败',
                            type:'warning',
                            showClose:true
                        })
                    }
                }).catch(function (err) {
                    self.$message({
                        message:'网络错误',
                        type:'error',
                        showClose:true
                    })
                })
            }).catch(()=>{
                // self.$message({
                //     message:'取消同步',
                //     type:'success',
                //     showClose:true
                // })
            })
        },
        createSameMT4(row){
            console.log(row)
            const self = this;
            this.$ajax({
                method:'get',
                url:'/user/'+row.userId+'/verifyStatus',
            }).then(function (res) {
                if(res.data.retCode===0){
                    console.log(res)
                    if(res.data.data.verifyStatus===0){
                        self.$message({
                            message:'该账户信息未审核,请审核该账户',
                            showClose:true,
                            type:'warning'
                        })
                    }
                    else if(res.data.data.verifyStatus===1){
                        self.$ajax({
                            method:'get',
                            url:'/mt4User/'+row.userId+'/canApplyMt4',
                        }).then(function (res) {
                            if(res.data.retCode==0){
                                console.log(res)
                                self.canApplyMt4 = 5 - res.data.data.mt4UserNumber;
                                self.getApGroupList();
                                self.addMt4FormSame = {
                                    userId:row.userId,
                                    UserEmail:row.UserEmail,
                                    UserGroupName:row.UserGroupName,
                                    IDName:row.IDName,
                                    UserLeverage:row.UserLeverage,
                                    UserPwd:'',
                                    UserInvestorpwd:'',
                                    UserIRD:row.UserIRD,
                                    apId:row.apId
                                };
                                self.addMT4SameVisible = true;
                            }else{
                                self.$message({
                                    message:'同名账户已经达到最大限制',
                                    type:'warning',
                                    showClose:true
                                })
                            }
                        }).catch(function (err) {
                            self.$message({
                                message:'网络错误',
                                type:'error',
                                showClose:true
                            })
                        })
                    }
                    else if(res.data.data.verifyStatus===-1){
                        self.$message({
                            message:'该账户信息未上转,请通知账户上传资料',
                            showClose:true,
                            type:'warning'
                        })
                    }
                    else if(res.data.data.verifyStatus===2){
                        self.$message({
                            message:'该账户审核失败,请通知账户上传资料',
                            showClose:true,
                            type:'warning'
                        })
                    }
                }else{
                    console.log(res)

                }
            }).catch(function (err) {
                self.$message({
                    message:'网络错误',
                    type:'error',
                    showClose:true
                })
            })

        },
        getApGroupList(){
            let apGroupList = [];
           if(this.$store.state.domain.domain.domain.apId){
               this.$ajax({
                   method:'get',
                   url:'/ap/group/'+this.$store.state.domain.domain.domain.apId
               }).then(function (res) {
                   if(res.data.retCode===0){
                       console.log(res.data.data)
                       for(let i=0;i<res.data.data.length;i++){
                           apGroupList.push(res.data.data[i])
                       }
                       // apGroupList.push(res.data.data);
                   }
               })
        }
            this.groudMT4List = apGroupList;
           console.log('apGroupList')
           console.log(apGroupList)
        }

    },
    mounted(){
        this.mt4UserList();
        console.log('this.$store.state.domain.domain.domain');
        console.log(this.$store.state.domain.domain.domain)
    }
}

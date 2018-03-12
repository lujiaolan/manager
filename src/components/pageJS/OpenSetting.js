/**
 * Created by Udea-Manager on 2017/11/8.
 */
import $Jquery from 'jquery';
export default {
    data(){
        return {
            OpenEditOrSave:'',
            openAcountForm: {
                openAccountType:this.$store.state.domain.domain.domain.openAccountType,
                demoMt4Status:this.$store.state.domain.domain.domain.demoMt4Status,
                openProtocol:this.$store.state.domain.domain.domain.openProtocol,
                riskDisclosure:this.$store.state.domain.domain.domain.riskDisclosure,
                disclaimer:this.$store.state.domain.domain.domain.disclaimer,
                openProtocolContent:this.$store.state.domain.domain.domain.openProtocolContent,
                riskDisclosureContent:this.$store.state.domain.domain.domain.riskDisclosureContent,
                disclaimerContent:this.$store.state.domain.domain.domain.disclaimerContent,
                apId:this.$store.state.user.userinfo.apId,
                leverConfig:'',
                mt4DepositAmount:this.$store.state.domain.domain.domain.mt4DepositAmount
            },
            styleObject:{
                openProtocolColor:{
                    color:'black'
                },
                riskDisclosureColor:{
                    color:'black'
                },
                disclaimerColor:{
                    color:'black'
                }
            },
            fileListOpen:[],
            openAcountForm_rules:{
                openProtocolContent:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                           if(value){
                               if(value==='错误'){
                                   callback(new Error('文件不符合要求,请重新上传'))
                               }else {
                                   callback()
                               }
                           }else {
                               callback()
                           }
                        }
                    }
                ],
                riskDisclosureContent:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(value==='错误'){
                                    callback(new Error('文件不符合要求,请重新上传'))
                                }else {
                                    callback()
                                }
                            }else {
                                callback()
                            }
                        }
                    }
                ],
                disclaimerContent:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(value){
                                if(value==='错误'){
                                    callback(new Error('文件不符合要求,请重新上传'))
                                }else {
                                    callback()
                                }
                            }else {
                                callback()
                            }
                        }
                    }
                ],
                mt4DepositAmount:[
                    {
                        required:false,
                        trigger:'blur',
                        validator:(rules,value,callback)=>{
                            if(typeof value=='number'){
                                callback()
                            }else{
                                callback(new Error('请输入数字'))
                            }
                        }
                    }
                ]
            }
        }
    },
    // watch:{
    //   'openAcountForm.leverConfig':function (val) {
    //       console.log('openAcountForm.leverConfig')
    //
    //        val=val.split(",");
    //       for(let i=0;i<val.length;i++){
    //           console.log(val)
    //           if(/^[1-9]\d*$/.test(val[i])){
    //               this.checkLever = true;
    //               console.log(this.checkLever)
    //           }else{
    //               this.checkLever = false;
    //               console.log(this.checkLever)
    //
    //           }
    //       }
    //       console.log(val)
    //   }
    // },
    methods: {
        saveOpenAcountBox(ref){
            console.log('this.openAcountForm.leverConfig');
            console.log(this.openAcountForm.leverConfig);
            let leverList = [];
            let lever = this.openAcountForm.leverConfig;
            lever=lever.split(",");
            for(let i=0;i<lever.length;i++){
                if(lever[i]){
                    leverList.push(lever[i])
                }
            }
            console.log(leverList)
            const postData = {
                openAccountType:this.openAcountForm.openAccountType,
                demoMt4Status:this.openAcountForm.demoMt4Status,
                openProtocol:this.openAcountForm.openProtocol,
                riskDisclosure:this.openAcountForm.riskDisclosure,
                disclaimer:this.openAcountForm.disclaimer,
                openProtocolContent:this.openAcountForm.openProtocolContent,
                riskDisclosureContent:this.openAcountForm.riskDisclosureContent,
                disclaimerContent:this.openAcountForm.disclaimerContent,
                apId:this.openAcountForm.apId,
                leverConfig:leverList,
                mt4DepositAmount:this.openAcountForm.mt4DepositAmount
            };
            const self = this;
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.$confirm('确定要修改开户控制吗?','编辑开户控制',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'success'
                    }).then(()=>{
                        self.$ajax({
                            method:'post',
                            url:'/ap/openAccountControl/add',
                            data:postData
                        }).then(function (res) {
                            if(res.data.retCode==0){
                                self.OpenEditOrSave = '修改';
                                self.$message({
                                    type:'info',
                                    message:'编辑成功',
                                    showClose:true
                                });
                               self.getApId();
                            }else{
                                self.$message({
                                    type:'warning',
                                    message:'编辑失败',
                                    showClose:true
                                })
                            }

                        }).catch(function (err) {
                            console.log(err)
                            self.$message({
                                type:'error',
                                message:'网络错误',
                                showClose:true
                            })
                        })
                    }).catch(()=>{
                        self.$message({
                            type:'success',
                            message:'取消',
                            showClose:true
                        })
                    })
                }else {
                    return false;
                }
            })

        },
        getApId(){
            const self = this;
            let URL =  document.location.origin;
            const postData = {
                domain:URL,
                type:'apManager',
            };
            console.log('postData')
            console.log(postData)
            this.$ajax({
                method: 'post',
                data:postData,
                url:'/other/ap/getApId'
            }).then(function (res) {
                console.log(res)
                console.log(res.data.data)
                self.$store.dispatch('update_domain',res.data.data)

            }).catch(function (err) {
                console.log("getApId")
                console.log(err)
            })
        },
        riskDisclosureOnUpload(file){
            console.log('file.size')
            console.log(file.target.files[0])
            const isJPG = file.target.files[0].type === 'application/pdf';
            const isLt2M = file.target.files[0].size / 1024/1024 < 2;
            console.log('isLt2M');
            this.styleObject.riskDisclosureColor.color = 'black';
            console.log(file.target.files[0].size / 1024 )
            if (!isJPG) {
                this.openAcountForm.riskDisclosureContent = '错误';
               return this.$message.error('上传文件只能上传pdf格式的');
            }
           else if (!isLt2M) {
                this.openAcountForm.riskDisclosureContent = '错误';
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }else{
                console.log(file)
                const self = this;
                const formData = new FormData();
                console.log(file.target.files[0])
                formData.append('files',file.target.files[0]);
                console.log("formData files")
                console.log(formData)
                formData.append('type','test');
                console.log("formData type")
                console.log(formData)
                this.$ajax({
                    url:'/ap/img/upload',
                    method:'post',
                    data:formData
                }).then(function (res) {
                    if(res.data.retCode===0){
                        console.log(res)
                        self.openAcountForm.riskDisclosureContent = res.data.data.fileName;
                    }
                }).catch(function (err) {

                })
            }
        },
        onUploadAgreement(file){
            console.log(file)
            const formData = new FormData();
            const self = this;
            self.styleObject.openProtocolColor.color = 'black';
            formData.append('files',file.target.files[0]);
            formData.append('type','test');
            const isJPG = file.target.files[0].type === 'application/pdf';
            const isLt2M = file.target.files[0].size / 1024/1024 < 2;
            console.log('isLt2M');
            console.log(file.target.files[0].size / 1024 )
            if (!isJPG) {
                this.openAcountForm.openProtocolContent = '错误';
                return this.$message.error('上传文件只能上传pdf格式的');
            }
            else if (!isLt2M) {
                this.openAcountForm.openProtocolContent = '错误';
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }else {
                this.$ajax({
                    url:'/ap/img/upload',
                    method:'post',
                    data:formData
                }).then(function (res) {
                    if(res.data.retCode===0){
                        console.log(res)
                        self.openAcountForm.openProtocolContent = res.data.data.fileName;
                    }
                }).catch(function (err) {

                })
            }
        },
        disclaimerOnUpload(file){
            console.log(file)
            const formData = new FormData();
            const self = this;
            self.styleObject.disclaimerColor.color = 'black';
            formData.append('files',file.target.files[0]);
            formData.append('type','test');
            const isJPG = file.target.files[0].type === 'application/pdf';
            const isLt2M = file.target.files[0].size / 1024/1024 < 2;
            console.log('isLt2M');
            console.log(file.target.files[0].size / 1024 )
            if (!isJPG) {
                this.openAcountForm.disclaimerContent = '错误';
                return this.$message.error('上传文件只能上传pdf格式的');
            }
            else if (!isLt2M) {
                this.openAcountForm.disclaimerContent = '错误';
                return this.$message.error('上传头像图片大小不能超过 2MB!');
            }else {
                this.$ajax({
                    url:'/ap/img/upload',
                    method:'post',
                    data:formData
                }).then(function (res) {
                    if(res.data.retCode===0){
                        console.log(res)
                        self.openAcountForm.disclaimerContent = res.data.data.fileName;
                    }
                }).catch(function (err) {

                })
            }
        }
    },
    mounted(){
        console.log('修改')
        console.log(this.$store.state.domain.domain.domain.leverConfig)
        if(this.$store.state.domain.domain.domain.leverConfig){
            for(let i=0;i<this.$store.state.domain.domain.domain.leverConfig.length;i++){
                if(i===this.$store.state.domain.domain.domain.leverConfig.length-1){
                    this.openAcountForm.leverConfig = this.openAcountForm.leverConfig+this.$store.state.domain.domain.domain.leverConfig[i];
                }else{
                    this.openAcountForm.leverConfig = this.openAcountForm.leverConfig+this.$store.state.domain.domain.domain.leverConfig[i]+',';
                }

            }
        }
        if(this.$store.state.domain.domain.domain.openProtocolContent){
           this.OpenEditOrSave = '修改';
           this.styleObject.openProtocolColor.color = 'transparent';
        }
        if(this.$store.state.domain.domain.domain.riskDisclosureContent){
            this.styleObject.riskDisclosureColor.color = 'transparent';
        }
        if(this.$store.state.domain.domain.domain.disclaimerContent){
            this.styleObject.disclaimerColor.color = 'transparent';
        }
    }
}

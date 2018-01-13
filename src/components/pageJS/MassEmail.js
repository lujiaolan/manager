/**
 * Created by Udea-Manager on 2017/11/7.
 */
export default {
    data(){
        return {
            MassEmailVisible:false,
            MassEmailData:{
                apId:this.$store.state.domain.domain.domain.apId,
                userEmailList:[],
                content:'',
                subject:''
            },
            postUserEmail:[],
            MassEmailData_rules:{
                userEmailList:[
                    {
                        trigger:'blur',
                        required:true,
                        validator:(rules,value,callback)=>{
                            if(value){
                               callback()
                            }else{
                                callback( new Error('请选择收件人'));
                            }
                        }



                    }
                ],
                content:[{
                    required:true,
                    message:'请填写内容',
                    trigger:'blur'
                }],
                subject:[{
                    required:true,
                    message:'请填写主题',
                    trigger:'blur'
                }]

            },
            totalMassSend:null,
            massSendSearch:{
                apId:this.$store.state.domain.domain.domain.apId,
                role:'',
                emailNameLike:'',
                superAgentId:'',
                agentLevel:null,
                page:1,
                pageSize:10,
                currentPage:1,
                type:'1'
            },
            resultss:[],
            massEmailSendList:[],
            agentLevelList:[
                {
                    value:null,
                    label:'代理级别'
                },
                {
                    value:1,
                    label:'一级代理'
                },
                {
                    value:2,
                    label:'二级代理'
                },
                {
                    value:3,
                    label:'三级代理'
                },
                {
                    value:4,
                    label:'四级代理'
                },
                {
                    value:5,
                    label:'五级代理'
                }
            ],
            roleList:[
                {
                    value:'',
                    label:'账户类型'
                },
                {
                    value:'agent',
                    label:'代理'
                },
                {
                    value:'commonUser',
                    label:'直客'
                }
            ]
        }

    },
    methods:{
        rebackEmailSet(){
            this.$router.push('/EmailSet')
        },
        clearMassEmailSend(){
            this.MassEmailData.userEmailList = [];
        },
        resetMassEmailSend(){
            this.MassEmailData= {
                apId:this.$store.state.domain.domain.domain.apId,
                    userEmailList:[],
                    content:'',
                    subject:''
            };
        },
        closeTabMassSend(tag){
            this.MassEmailData.userEmailList.splice(this.MassEmailData.userEmailList.indexOf(tag), 1);
            console.log(tag)
            console.log("MassEmailPost")
        },
        submitMassEmailSend(ref){
            const userEmailList = [];
            for(let i = 0; i < this.MassEmailData.userEmailList.length; i++){
                userEmailList.push(this.MassEmailData.userEmailList[i].type)
            }
            console.log(this.MassEmailData.userEmailList)
            const postData = {
                apId:this.MassEmailData.apId,
                userEmailList:userEmailList,
                content:this.MassEmailData.content,
                subject:this.MassEmailData.subject
            }
            const self  = this;
           this.$refs[ref].validate((valid)=>{
             if(valid){
                 self.$ajax({
                     method:'post',
                     data:postData,
                     url:'/email/massSending'
                 }).then(function (res) {
                     if(res.data.retCode==0){
                         self.$message({
                             type:'info',
                             message:'发送成功',
                             showClose:true
                         });
                         self.resetMassEmailSend();
                     }else{
                         self.$message({
                             type:'warning',
                             message:'发送失败',
                             showClose:true
                         });

                     }
                 }).catch(function (err) {
                     self.$message({
                         type:'error',
                         message:'网络错误',
                         showClose:true
                     });
                 })
             }  else {
                 return false
             }
           })

        },
        getMassSendList(){
            const self = this;
            this.$ajax({
                method:'post',
                url:'/email/list',
                data:this.massSendSearch
            }).then(function (res) {
                console.log('res.data.data.content')
                console.log(res)
                if(res.data.retCode==0){
                    self.massEmailSendList = res.data.data.content;
                    self.totalMassSend = res.data.data.totalAmount;
                }
            }).catch(function (err) {

            })
        },
        massEmailSendSizeChange(val){
            this.massSendSearch.pageSize = val;
            this.getMassSendList();
        },
        massEmailSendCurrentChange(val){
            this.massSendSearch.currentPage = val;
            this.getMassSendList();
        },
        addMasssingle(row){
            console.log(this.MassEmailData.userEmailList)
            let userName = '';
            if(row.IDName){
                userName  =row.IDName + '<' + row.userEmail + '>';
            }else{
                userName =  '<' + row.userEmail + '>';
            }
            const b = {
                name: userName,
                type: row.userEmail
            };
            this.MassEmailData.userEmailList.push(b);
            let results = [];
            let res = [this.MassEmailData.userEmailList[0]];
            for(let i = 1; i < this.MassEmailData.userEmailList.length; i++){
                let repeat = false;
                for(let j = 0; j < res.length; j++){
                    if(this.MassEmailData.userEmailList[i].type == res[j].type){
                        repeat = true;
                        break;
                    }
                }
                if(!repeat){
                    res.push(this.MassEmailData.userEmailList[i]);
                }
            }
            results = res;
            // this.MassEmailData.userEmailList = results;
            console.log('result')
            console.log(results)
            this.MassEmailData.userEmailList = results;
        },
        batchAddMass(){
            const postData = {
                type:'0',
                role:this.massSendSearch.role,
                apId:this.massSendSearch.apId,
                emailNameLike:this.massSendSearch.emailNameLike,
                superAgentId:this.massSendSearch.superAgentId,
                agentLevel:this.massSendSearch.agentLevel
            };
            const self = this;
            this.$ajax({
                method:'post',
                url:'/email/list',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('batchAddMass')
                    console.log( res.data.data.userEmailList);
                    const postMassBatch  = res.data.data.userEmailList;
                    console.log( postMassBatch);
                    let resultsBatch = [];
                    let resBacth = [postMassBatch[0]];
                    for(let i = 1; i < postMassBatch.length; i++){
                        let repeat = false;
                        for(let j = 0; j < resBacth.length; j++){
                            if(postMassBatch[i].userEmail == resBacth[j].userEmail){
                                repeat = true;
                                break;
                            }
                        }
                        if(!repeat){
                            resBacth.push(postMassBatch[i]);
                        }
                    }
                    resultsBatch = resBacth;
                    console.log('results');
                    console.log(resultsBatch);
                    if(resultsBatch){
                        resultsBatch.forEach(function (item) {
                            let userName = '';
                            if(item.IDName){
                               userName = item.IDName + '<' + item.userEmail + '>';
                            }else{
                                userName = '<' + item.userEmail + '>';
                            }
                            const post = {
                                name:userName,
                                type:item.userEmail
                            };
                            self.MassEmailData.userEmailList.push(post);
                        })
                    }
                }
            }).catch(function (err) {
            })
        }
    },
    mounted(){
        this.getMassSendList()
    }
}

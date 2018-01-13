/**
 * Created by Udea-Manager on 2017/10/27.
 */
import emailTemplateSet from '../page/emailTemplateSet.vue';
import emailInfo from '../page/emailInfo.vue'

export default {
    components:{
        emailTemplateSet,
        emailInfo
    },
    data(){
        return{
            EmailSet:'first',
            listSearchForm:{
                searchEmail:'',
                timeBegin:'',
                timeEnd:'',
                emailTittle:''
            },
            listSearchFormRules: {
                searchEmail: {
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(val)){
                                callback()
                            }else {
                                callback(new Error('请输入有效的邮箱号'))
                            }
                        }else {
                            callback()
                        }
                    }
                },
                timeBegin:{
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(this.listSearchForm.timeEnd == ''){
                                callback(new Error('请选择结束时间'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                },
                timeEnd:{
                    required: false,
                    validator: (rules,val,callback)=>{
                        if(val){
                            if(this.listSearchForm.timeBegin == ''){
                                callback(new Error('请选择开始时间'))
                            }else if(val<this.listSearchForm.timeBegin){
                                callback(new Error('开始时间不能大于结束时间'))
                            }else {
                                callback()
                            }
                        }else {
                            callback()
                        }
                    }
                }
            },
            emailListForm:[],
            pageModel: {
                page: 1,
                pageSize: 10
            },
            dialogVisible: false,
            emailDetailUrl: '',
            allEmailDetailUrl: '',
        }
    },
    methods:{
        getEmailListData(){
            const self = this;
            const postData = {
                query: {
                    apId: self.$store.state.domain.domain.domain.apId
                },
                pageModel: {
                    page: self.pageModel.page,
                    pageSize: self.pageModel.pageSize,
                    sortBy: {
                        emailTime: -1
                    }
                }
            };
            if(self.listSearchForm.timeBegin){
                postData.query.startTime = ((new Date(self.moment(self.listSearchForm.timeBegin).format('YYYY/MM/DD'))).getTime())/1000;
            }
            if(self.listSearchForm.timeEnd){
                postData.query.endTime = ((new Date(self.moment(self.listSearchForm.timeEnd).format('YYYY/MM/DD'))).getTime())/1000;
            }
            if(self.listSearchForm.searchEmail){
                postData.query.recipients = self.listSearchForm.searchEmail
            }
            if(self.listSearchForm.emailTittle){
                postData.query.emailSubject = self.listSearchForm.emailTittle
            }
            console.log('emailListData postData');
            console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/email/record'
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode ==0){
                    console.log(res.data.data);
                    self.emailListForm = res.data.data.rows;
                    self.emailListForm.records = res.data.data.total;
                    res.data.data.rows.forEach(function (item,index) {
                        self.emailListForm[index].emailTime = self.moment(item.emailTime*1000).format('YYYY-MM-DD HH:mm:ss');
                        if(item.groupFlag === 0){
                            item.emailRecipients.forEach(function (val,i) {
                                item.emailRecipients[i] = val + '; ';
                            })
                        }
                    });
                    self.allEmailDetailUrl = res.data.data.emailDetailUrl;
                }
            }).catch(function (err) {
                self.$message.error(err.data.errMsg)
            })
        },
        SizeChange(val){
            this.pageModel.pageSize = val;
            this.getEmailListData()
        },
        CurrentChange(val){
            this.pageModel.page = val;
            this.getEmailListData()
        },
        listSearch(ref){
            this.$refs[ref].validate((valid)=>{
                if(valid){
                    this.getEmailListData()
                }
            });
        },
        listSend(){
            console.log('list发送');
            this.$router.push('/MassEmail')
        },

        emailListWatch(row){
            const self = this;
            if(row.groupFlag === 0){
                this.emailDetailUrl = 'http://120.77.55.98:8080/crm/email/record/groupDetail/' + row._id;
            }else {
                this.emailDetailUrl = this.allEmailDetailUrl + row._id;
            }
            setTimeout(function () {
                self.dialogVisible = true;
            },300);
        },
        handleClose(){
            this.dialogVisible = false;
        },
        reSendEmail(row){
            const self = this;
            const postData = {
                apId: this.$store.state.domain.domain.domain.apId,
                emailRecipients: row.emailRecipients,
                groupFlag: row.groupFlag,
                emailSubject: row.emailSubject,
            };
            if(row.groupFlag === -1){
                postData.emailDataPack = row.emailDataPack;
                postData.templUrl = row.templUrl
            }else {
                postData.emailContent = row.emailContent
            }
            this.$ajax.post('/email/reSend',postData).then(function (res) {
                if(res.data.retCode === 0){
                    self.$message.success('重发邮件成功，请注意查收')
                }else {
                    self.$message.error('重发邮件失败，请稍微再试')
                }
            }).catch(function () {
                self.$message.error('网络错误，请稍微再试')
            })
        }
    },
    mounted(){
        this.getEmailListData();
    }
}

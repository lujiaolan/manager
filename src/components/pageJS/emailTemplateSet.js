/**
 * Created by Udea-Manager on 2017/10/27.
 */
export default {
    data(){
        return {
            templSubject: '',
            emailTemplateForm:[{
                emailTittle:'模板标题1',
                receiveEmail:'收件人@qq.com',
                emailId:'模板编号1',
                sendEmail:'发件人@qq.con'
            },{
                emailTittle:'模板标题2',
                receiveEmail:'收件人2@qq.com',
                emailId:'模板编号2',
                sendEmail:'发件人2@qq.con'
            }],
            pageModel: {
                page: 1,
                pageSize: 10
            }
        }
    },
    methods:{
        templateSearch(){
            const self = this;
            let postData = {
                pageModel: {
                    page: self.pageModel.page,
                    pageSize: self.pageModel.pageSize
                },
                query: {
                }
            };
            if(self.templSubject!==''){
                postData.query.templSubject = self.templSubject;
            }
            console.log(postData);
            self.$ajax({
                method: 'post',
                data: postData,
                url: '/email/template'
            }).then(function (res) {
                if(res.data.retCode == 0){
                    self.emailTemplateForm = res.data.data.rows;
                    self.emailTemplateForm.records = res.data.data.total;
                }
                console.log(self.emailTemplateForm)
            }).catch(function (err) {
                console.log(err)
            })
        },
        SizeChange(){},
        CurrentChange(){}
    },
    mounted(){
        this.templateSearch()
    }
}

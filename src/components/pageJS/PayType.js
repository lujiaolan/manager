/**
 * Created by Udea-Manager on 2017/11/17.
 */
export default {
    data:function(){
        return{
            rowIndex:null,
            payTypeEdit:{
                remark:'',
                saveStatus:''
            },
            payTypeForm:[],
            optionsPayType:[
                {
                    value:'',
                    label:'全部支付方式'
                },
                {
                    value:'1',
                    label:'在线支付'
                },
                {
                    value:'2',
                    label:'电汇'
                },
                {
                    value:'3',
                    label:'信用卡'
                }],
            optionsIfUse:[
                {
                    value:'',
                    label:'全部'
                },
                {
                    value:'1',
                    label:'启用'
                },
                {
                    value:'2',
                    label:'禁用'
                }
               ],
            searchPayType:{
                payType:'',
                apId:this.$store.state.domain.domain.domain.apId,
                type:'1',
                payStatus:'',
                notes:''
            },
        }
    },
    mounted() {
        this.payTypeSearch();
    },
    methods:{
        payTypeSearch(){
            console.log(this.searchForm);
            const self = this;
            this.$ajax({
                method:'post',
                url:'/payChannelList/pay',
                data:this.searchPayType
            }).then(function (res) {
                console.log(res)
                if(res.data.retCode==0){
                    self.payTypeForm = res.data.data.data;
                }
            }).catch(function (err) {

            })
        },
        startPayType(index,row){
            this.rowIndex = index;
            this.payTypeEdit.saveStatus = '1';
        },
        stopPayType(index,row){
            this.rowIndex = index;
            this.payTypeEdit.saveStatus = '0';
        },
        savePayType(index,row){
            console.log(row)
            const self = this;
            let msgFail = '';
            let msg = '';
            if(this.payTypeEdit.saveStatus==='0'){
                msg  = '禁用成功';
                msgFail = '禁用失败'
            }else{
                msg  = '启用成功';
                msgFail = '启用失败'
            }
            const postData = {
                // apId:this.$store.state.domain.domain.domain.apId,
                partnerID:row.partnerID,
                payStatus:this.payTypeEdit.saveStatus,
                notes:this.payTypeEdit.remark
            };
            this.$ajax({
                method:'post',
                url:'/ap/'+this.$store.state.domain.domain.domain.apId+'/payStatus',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:msg,
                        showClose:true
                    });
                    self.rowIndex = null;
                    self.payTypeSearch();
                }else {
                    self.$message({
                        type:'warning',
                        message:msgFail,
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
        },
        cancelPayType(index,row){
            this.rowIndex = null;
        }
    }
}

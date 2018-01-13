/**
 * Created by Udea-Manager on 2017/10/26.
 */
export default {
    data(){
        return {
            innerTurnForm:{
                apId:this.$store.state.domain.domain.domain.apId,
                innerTransfer:0,
                anyAccount:0,
                commissionVerify:0
            }
        }
    },
    methods:{
        saveInnerTurnSet(){
            console.log(this.innerTurnForm);
            const self = this;
            this.$ajax({
                method:'post',
                url:'/innerTrans/add',
                data:this.innerTurnForm
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:'编辑成功',
                        showClose:true
                    });
                    self.getInnerTransConfig();
                }else{
                    self.$message({
                        type:'warning',
                        message:'编辑失败',
                        showClose:true
                    })
                }
            }).catch(function (err) {
                self.$message({
                    type:'error',
                    message:'网络错误',
                    showClose:true
                })
            })
        },
        getInnerTransConfig(){
            const getId = this.$store.state.domain.domain.domain.apId;
            const self = this;
            this.$ajax({
                method:'get',
                url:'/'+getId+'/3/financialRule'
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('financialRule')
                    console.log(res)
                    if(res.data.data.innerTransConfig){
                        const innerForm = res.data.data.innerTransConfig;
                        self.innerTurnForm.innerTransfer= innerForm.innerTransfer;
                        self.innerTurnForm.anyAccount= innerForm.anyAccount;
                        self.innerTurnForm.commissionVerify= innerForm.commissionVerify;
                    }
                }
            })
        }
    },
    created(){
        this.getInnerTransConfig();
    }
}

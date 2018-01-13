/**
 * Created by Udea-Manager on 2017/10/17.
 */
import $ from 'jquery'
export default {
    data() {
        return {
            totalAgentAudit:null,
            indexEdit:null,
            auditOrRefuseStatus:'',
            toAgentAudit: {
                apId:this.$store.state.domain.domain.domain.apId,
                agentVerifyNameLike: "",
                agentApplyStatus: "",
                pageSize:10,
                currentPage:1,
                startTime:'',
                endTime:'',
            },
            toAgentList:[],
            agentStatusList:[
                {
                    label:'待审核',
                    value:'0'
                },
                {
                    label:'已通过',
                    value:'1'
                },
                {
                    label:'已拒绝',
                    value:'2'

                }
            ]
        }
    },
    methods: {
        handleCurrentChange(val){
            this.cur_page = val;
            this.getData();
        },
        AgentToAudit(index,row){
            console.log(index,row);
            this.indexEdit = index;
            this.auditOrRefuseStatus = '1';
        },
        AgentRefuse(index,row){
            this.indexEdit = index;
            this.auditOrRefuseStatus = '2';
        },
        cancelToAuditConfirm(){
            this.indexEdit = null;
            this.searchToAgent();
        },
        AgentToAuditConfirm(row){
            const self = this;
            const postData ={
                _id:row._id,
                agentApplyStatus:self.auditOrRefuseStatus,
                apId: this.$store.state.domain.domain.domain.apId,
                agentVerifyReason:row.agentVerifyReason,
                userEmail:row.userEmail
            };
            this.$ajax({
                method:'post',
                url:'/user/userUpToAgent/verify',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    self.$message({
                        type:'info',
                        message:'审核成功',
                        showCloe:true
                    });
                    self.searchToAgent();
                }else{
                    self.$message({
                        type:'warning',
                        message:'审核失败',
                        showCloe:true
                    })
                }
                self.searchToAgent();
            }).catch(function (err) {
                self.$message({
                    type:'error',
                    message:'网络错误',
                    showCloe:true
                })
            });
        },
        searchToAgent(){
            this.indexEdit = null;
            let agentStatus= [];
            if(this.toAgentAudit.agentApplyStatus==''||this.toAgentAudit.agentApplyStatus==undefined){
                agentStatus = ['0','1','2']
            }else{
                agentStatus.push(this.toAgentAudit.agentApplyStatus)
            }
            const postData = {
                apId:this.toAgentAudit.apId,
                agentVerifyNameLike: this.toAgentAudit.agentVerifyNameLike,
                agentApplyStatus: agentStatus,
                pageSize:this.toAgentAudit.pageSize,
                currentPage:this.toAgentAudit.currentPage,
                startTime:this.toAgentAudit.startTime,
                endTime:this.toAgentAudit.endTime,
            };
            console.log(this.toAgentAudit)
            const self = this;
            if(this.toAgentAudit.apId){
                self.$ajax({
                    method:'post',
                    data:postData,
                    url:'/user/applyAgent/verify'
                }).then(function (res) {
                    console.log("res applyAgent")
                    console.log(res)
                    if(res.data.retCode==0){
                        self.toAgentList = res.data.data.content;
                        self.totalAgentAudit = res.data.data.totalAmount;
                    }
                }).catch(function (err) {

                })
            }
        },
        PerToAgentSizeChange(val){
            this.toAgentAudit.pageSize = val;
            this.searchToAgent();
            this.indexEdit = null;
        },
        currentChangePerToAgent(val){
            this.toAgentAudit.currentPage = val;
            this.searchToAgent();
            this.indexEdit = null;
        },

        refuseRow(row){
            // console.log('refuseRow row');
            // console.log(row)
            if(row.agentApplyStatus == 2){
                return 'refuse-row'
            }else {
                return ''
            }
        }

    },
    mounted(){
        this.searchToAgent();
    }
}

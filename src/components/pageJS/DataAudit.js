
/**
 * Created by Udea-Manager on 2017/11/16.
 */
import RegisterList from '../page/RegisterList.vue'
import CrmAudit from '../page/CrmAudit.vue'
import BankCardAudit from '../page/BankCardAudit.vue'
import LeverageAudit from '../page/LeverageAudit.vue'
export default {
    components: {
        RegisterList,
        CrmAudit,
        BankCardAudit,
        LeverageAudit,
    },
    data() {
        return {
            activeName: this.$store.state.dataAuditTabActive
        }
    },
    methods: {
        testTab(val){
            console.log(val.name);
            console.log(this.$store.state.dataAuditTabActive)
        }
    }
}


/**
 * Created by Udea-Manager on 2017/11/16.
 */
import InMoneyCrmAudit from '../page/InToCrmAudit.vue'
import OutMoneyAudit from '../page/OutMoneyAudit.vue'
import OutToCrmAudit from '../page/OutToCrmAudit.vue'
import CommissionAudit from '../page/CommissionAudit.vue'
export default {
    components: {
        InMoneyCrmAudit,
        OutMoneyAudit,
        OutToCrmAudit,
        CommissionAudit
    },
    data() {
        return {
            activeName: 'first',
        }
    },
}

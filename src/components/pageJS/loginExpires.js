/**
 * Created by Udea-Manager on 2018/2/6.
 */
export default {
    data(){
        return  {

        }
    },
    methods:{
        reEntry(){
            this.$store.dispatch('remove_userinfo');
            this.$store.dispatch('remove_token');
            this.$router.push('/login')

        }
    }
}

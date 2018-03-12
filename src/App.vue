<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/common.css";
    /*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
</style>

<script>
    export default {
        name: 'app',
        components: {},
        methods:{
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
            }
        },
        mounted(){
            this.getApId();
        },
        watch:{
            $route(to,from){
                // console.log(to);
                if (!to.matched.length) {
                    this.$router.push('/404');
                }
            }
        }
    }
</script>


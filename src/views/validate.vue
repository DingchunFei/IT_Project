<template>
    <div class="my-6">
        Verify email address success
        <!-- The 10 seconds time counter-->
        <div class="my-6">
            <v-card-text>
                <div class="time_line">You will go to login page in  {{timerCount}} seconds</div>
            </v-card-text>
        </div>
        <div>
            {{ValidCode}}
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "validate",
        data() {
            return {
                timerCount: 10,
                checked:0,
                ValidCode:'0',
            }
        },
        watch: {
            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else {
                        if(this.ValidCode === 1){
                            this.$router.push({path:'/'});}
                        else{
                            this.ValidCode = 'sorry, the time is expired, please try register again!';
                        }
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        },

        mounted:function () {
            //this.ValidCode = this.$route.query.code;
            axios
                .post("/validate",
                    {code: this.$route.query.code },
                    {
                        headers:{

                        },})
                .then((response)=>{
                    console.log(response);
                    if(response.data.code === 0){
                        this.ValidCode = 1;
                    }

                })
                .catch(err => {
                    console.log(err.response);
                });

        }
    }
</script>

<style scoped>

</style>
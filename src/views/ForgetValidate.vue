<template>
    <div class="my-6">
        <v-card class="mx-auto" max-width="500" outlined>
            <v-card-text>
                <el-form class="apply-form first-form" :model="formData" ref="form">
                    <el-form-item>
                        <h1>Password</h1>
                    </el-form-item>
                    Verification is success, please redefine your password!
                    <el-form-item label="Password" prop="UserPassword">
                        <el-input v-model="formData.password" :maxlength="18" placeholder="Password" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="onsubmit" size="medium">submit</el-button>
                    </el-form-item>
                </el-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import crypto from "crypto";
    function onsubmit() {
        let vm = this;
        let md5 = crypto.createHash("md5");
        md5.update(vm.formData.password);
        let password = md5.digest('hex');  //MD5 password
        return axios
            .post("/forget/validate",
                {code: this.$route.query.code, password: password},
                {
                    headers:{

                    },})
            .then((response)=>{
                console.log(response);
                if(response.data.code === 0){
                    vm.$router.push("/");
                }

            })
            .catch(err => {
                console.log(err.response);
            });

    }
    export default {
        name: "ForgetValidate",
        data() {
            return {
                formData: {
                    password: ''
                },
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

        methods:{
            onsubmit
        }
    }
</script>

<style scoped>
    .mx-auto{
        background: rgba(242, 242, 242, 1);
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        position: absolute;
        left: 383px;
        top: 43px;
        width: 356px;
        height: 483px;
        display: flex;
    }
    h1{
        color: #015478;
    }

</style>
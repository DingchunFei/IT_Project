<template>
    <div class="my-6">
        <v-card class="mx-auto" max-width="500" outlined>
            <v-card-text>
                <el-form class="apply-form first-form" :model="formData" ref="form">
                    <el-form-item>
                        <h1>Please input your register Email</h1>
                    </el-form-item>
                    <el-form-item label="E-mail" prop="UserEmail">
                        <el-input v-model="formData.email" placeholder="E-mail" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="onsubmit">Find password</el-button>
                    </el-form-item>
                </el-form>
                <!--validation message -->
                <div><p class="error-content">{{ValidateMessage}}</p></div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    function onsubmit() {
        let vm = this;
        return axios
            .post(
                "/forget",
                {email: vm.formData.email},
                {
                    headers:{

                    },}
            )
            .then((response)=>{
                console.log(response);
                if(response.data.code === 0){
                    this.ValidateMessage = "The validate email has been sent, please go and confirm the validation!";
                }else {
                    this.ValidateMessage = "The email is not register yet, please register first!";
                }

            })
            .catch(err => {
                console.log(err.response);
            });
    }
    export default {
        name: "FindPassworld",
        data() {
            return {
                ValidateMessage: "",
                formData: {
                    email: '',
                },
            };
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
        height: 683px;
        display: flex;
    }
    h1{
        color: #015478;
    }
    .error-content{
        margin-top: 4px;
        color: crimson;
    }
</style>
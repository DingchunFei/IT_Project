<template>
    <div>
        <div class="my-6">
            <v-card class="mx-auto" max-width="500" outlined>
                <v-card-text>
                    <el-form class="apply-form first-form" :model="formData" :rules="rule" ref="form">
                        <el-form-item>
                            <h1>Register</h1>
                        </el-form-item>
                        <el-form-item label="first-name">
                            <el-input v-model="formData.firstName" placeholder="FName" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="last-name">
                            <el-input v-model="formData.lastName" placeholder="LName" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="E-mail" prop="UserEmail">
                            <el-input v-model="formData.email" placeholder="E-mail" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="Password">
                            <el-input v-model="formData.password" :maxlength="18" placeholder="Password" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm Password" prop="Password">
                            <el-input v-model="formData.RetypePassword" :maxlength="18" placeholder="ConfirmPassword" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="onsubmit">Register</el-button>
                        </el-form-item>
                    </el-form>
                    <!--Register validation messeage -->
                    <div><p class="error-content">{{ValidateMessage}}</p></div>
                </v-card-text>
            </v-card>
        </div>
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
            .post(
                "/register",
                {email: vm.formData.email, password: password, first_name: vm.formData.firstName, last_name: vm.formData.lastName },
                {
                    headers:{

                    },}
            )
            .then((response)=>{
                console.log(response);
                if(response.data.code === 0){
                    this.ValidateMessage = 'The validate email has been sent, please go and confirm the validation!';
                }

            })
            .catch(err => {
                console.log(err.response);
            });
    }
    export default {
        name: "Register",
        data() {
            return {
                formData: {
                    email: '',
                    cardType: 1,
                    password: '',
                    RetypePassword:'',
                    firstName:'',
                    lastName:'',
                    ValidateMessage:'',
                },
                rule: {
                    UserEmail: [
                        //{ required: true, message: 'Please input your email.', trigger: 'blur' },
                        //{required: true, pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/, message: 'Name does not support special characters.', trigger: 'blur'}
                    ],
                    Password: [
                        //{ required: true, message: 'Please enter your password.', trigger: 'blur' },
                        //{ min: 15, max: 18, message: 'Please fill in the 18-digit number truthfully for the school security department to check.', trigger: 'blur' },
                        //{required: true, pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: 'Please enter the correct ID number.', trigger: 'blur'}
                    ]
                }
            };
        },
        methods:{
            onsubmit
        }
    }
</script>

<style scoped>

</style>
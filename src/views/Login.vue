<template>
    <div>
        <!-- Form -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="500" outlined>
                <v-card-text>
                    <el-form class="apply-form first-form" :model="formData" :rules="rule" ref="form">
                        <el-form-item>
                            <h1>Log In</h1>
                        </el-form-item>
                        <el-form-item label="E-mail" prop="UserEmail">
                            <el-input v-model="formData.email" placeholder="E-mail" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="UserPassword">
                            <el-input v-model="formData.password" :maxlength="18" placeholder="Password" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="onsubmit" size="medium">Login</el-button>
                        </el-form-item>
                        <el-link href="Register" target="_blank" type="primary">register</el-link> |
                        <el-link href="FindPassworld" target="_blank" type="primary">forget password</el-link>
                    </el-form>
                    <!--Error messeage -->
                    <div><p class="error-content">{{ErrorMessage}}</p></div>
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
        //console.log(password)

        return axios
            .post(
                '/login',{email: vm.formData.email, password: password },{
                    headers:{

                    },}
            )
            .then((response)=>{
                console.log(response);
                if(response.data.code === 0){
                    vm.$router.push("/Home");
                }else {
                    this.errored = true;
                    this.ErrorMessage = "This is an invalid E-mail or password! please register first";
                }
            })
            .catch(err => {
                console.log(err.response);
            });

    }

    export default {
        name: "Login",
        data() {
            return {
                ErrorMessage: "",
                formData: {
                    email: '',
                    cardType: 1,
                    password: ''
                },
                rule: {
                    UserEmail: [
                        //{ required: true, message: 'Please input your email.', trigger: 'blur' },
                        /** {
                            required: true,
                            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                            message: 'Name does not support special characters.',
                            trigger: 'blur'
                        }**/
                    ],
                    UserPassword: [
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
    .error-content{
        margin-top: 4px;
        color: crimson;
    }

</style>
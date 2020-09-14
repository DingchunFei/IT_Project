<template>
    <div>
        <!-- Form -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="500" outlined>
                <v-card-text class="form">
                    <h1>Log In</h1>
                    <v-form ref="form" v-model="isFormValid">
                        <div class="input">
                            <v-text-field v-model="email" :rules="emailRules" :counter="30" label="e-mail" required></v-text-field>
                        </div>
                        <!--<v-text-field class="input" v-model="email" :rules="emailRules" :counter="30" label="e-mail" required></v-text-field>
                        <v-text-field class="input" v-model="password" :rules="passwordRules" :counter="30" label="password" required></v-text-field>
                        <v-btn class="mr-4" :disabled="!isFormValid" >Log in</v-btn>-->

                    </v-form>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                isFormValid: false,
                passwordRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 30) || 'Name cannot be longer than 30 characters',
                ],
                emailRules: [
                    v => !!v || 'ID is required',
                    v => (v && v.length <= 30) || 'Game ID cannot be longer than 30 characters',
                ],
            };
        },

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
    width: 256px;
    height: 283px;
    display: flex;
}
.input{
    position: absolute;
    background-color: rgba(255, 255, 255, 1);
    width: 234px;
    height: 50px;
}
h1{
    color: #015478;
}

</style>
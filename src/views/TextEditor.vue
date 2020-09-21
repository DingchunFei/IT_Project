<template>
  <div>
    <div class="edit">
      <h1>Update your information</h1>
      <el-card class="richText">
      <el-form>
<!--              :label-position="labelPosition"-->
<!--              label-width="80px"-->
<!--              :model="customer"-->
<!--              :rules="rules"-->
<!--              ref="ruleForm">-->
        <el-container style="height: 100%">
          <el-main>
          <el-row :gutter="20">

            <el-col :span="5">
              <div>
                <el-avatar
                        icon="el-icon-user-solid"
                        :size="200"
                        shape="square"
                        fit="fill"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </div>
            </el-col>

            <el-col :span="16">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="First Name" prop="name">
                    <el-input v-model="user.firstName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="Last Name" prop="name">
                    <el-input v-model="user.lastName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <div>
                    <quill-editor class="editor"
                            v-model="user.desc"
                            ref="myQuillEditor"
                            :options="editorOption">
                    </quill-editor>
                  </div>
              </el-row>
            </el-col>

            <el-col :span="3" :gutter="20">
              <el-row>
                <el-form-item
                        label="Phone"
                        prop="phone">
                  <el-input v-model="user.phone"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="E-mail" prop="email">
                  <el-input v-model="user.email"></el-input>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          </el-main>

          <el-footer>
            <el-col >
              <el-form-item >
                <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                <el-button @click="goHome" >Cancel</el-button>
              </el-form-item>
            </el-col>
          </el-footer>

        </el-container>
      </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    name: 'FuncFormsEdit',
    components: {
      quillEditor
    },
    data(){
      return {
        labelPosition: 'right',
        user:{
          firstName:'',
          lastName:'',
          phone:'',
          email:'',
          desc:''
        },
        rules:{
          name:[
            { required: true, message: 'Please enter your name', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: 'Please enter your phone number', trigger: 'blur' }
          ],
          email:[
            { required: true, message: 'Please enter your email', trigger: 'blur' }
          ],
          desc:[
            { required: true, message: 'Please enter your brief introduction', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      goHome() {
        this.$router.replace('/Home')
      }
    },
  }

</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .richText{
    width: 80%;
    height: 100%;
    justify-self: center;
  }
  .editor{
    height: 200px;
  }
  .bottom {
    margin-bottom: 13px;
  }
</style>
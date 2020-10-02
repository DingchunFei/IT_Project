<template>
    <div>
        <div>
            <div class="menu">
                <el-menu
                        class="el-menu-demo"
                        mode="horizontal"
                        router
                >
                    <el-menu-item index="/Add"><i class="el-icon-user-solid"></i></el-menu-item>
                    <el-menu-item index="/"><i class="el-icon-download"></i></el-menu-item>
                    <el-menu-item index="/"><i class="el-icon-setting"></i></el-menu-item>
                    <el-menu-item index="/"><i class="el-icon-upload"></i></el-menu-item>
                </el-menu>
            </div>

            <div class="">
                <el-row :gutter="20">
                    <el-col :span="6" :offset="1">
                        <div class="grid-content bg-purple">
                            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :data="Tabs">
                                <el-tab-pane :label="tabs.title" :name="tabs.title" v-for="(tabs,i) in Tabs" v-bind:key="i"></el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                    <el-col :span="6" :offset="9">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
                            <router-link to="/Editor">
                                <el-button type="primary" icon="el-icon-edit"></el-button>
                            </router-link>
                            <el-dropdown>
                                <el-button type="primary">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-button v-for="(tabs,i) in Tabs" v-bind:key="i" @click="deleteTabs(tabs.tab_id)" v-model="tabId">{{tabs.title}}</el-button>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
                

            </div>

            <!--Add Tab Form -->
            <el-dialog title="Add Tabs" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="Title" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Content" :label-width="formLabelWidth">
                        <el-input v-model="form.content" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="onsubmit">Okay</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    function getTabs() {
        let vm = this;
        return axios
            .get('/tab')
            .then((response) => {
                console.log(response);
                if (response.data.code === 0) {
                    //console.log(response.data);
                    vm.Tabs = response.data.data.tabs; //get tab list
                    //console.log(vm.Tabs);
                }
            })
            .catch((error) => {
                console.log("errorMessage: " + error);
            });
    }

    function onsubmit() {
        let vm = this;
        return axios
            .post('/tab',
                {title: vm.form.title, content: vm.form.content},
                { headers:{},})
            .then((response) => {
                console.log(response);
                if (response.data.code === 0) {
                    console.log(response.data);
                    vm.dialogFormVisible = false;
                    location.reload();
                }
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    }
    
    function deleteTabs(TabId) {
        //let vm = e;
        console.log("tab id is:" + TabId);

        return axios
            .post('/tab/'+ TabId + '/delete')
            .then((response) => {
                console.log(response);
                if (response.data.code === 0) {
                    console.log(response.data);
                    location.reload();
                }
            })
            .catch((error) => {
                console.log("errorMessage: " + error);
            });
    }
    export default {
        name: "Home",
        data() {
            return {
                activeName: 'profile',
                dialogFormVisible: false,
                Tabs:[],
                tabId:0,
                form: {
                    title: '',
                    content: '',
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getTabs,
            onsubmit,
            deleteTabs
        },
        created() {
            this.getTabs();

        }
    }
</script>

<style scoped>

</style>
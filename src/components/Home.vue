<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                router
        >
            <el-menu-item index="/Add"><i class="el-icon-plus"></i></el-menu-item>
            <el-menu-item index="/"><i class="el-icon-edit"></i></el-menu-item>
            <el-menu-item index="/"><i class="el-icon-setting"></i></el-menu-item>
            <el-menu-item index="/"><i class="el-icon-delete"></i></el-menu-item>
        </el-menu>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="profile" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="education" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="internship" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="new" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import axios from 'axios';
    function getTages() {
        //let vm = this;
        return axios
            .get('/login')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    }
    export default {
        name: "Home",
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getTages,
        },
        created() {
            getTages()
        }
    }
</script>

<style scoped>

</style>
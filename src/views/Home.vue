<template>
    <div>
        <div>
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                router
            >
                <el-menu-item index="/Add"><i class="el-icon-plus"></i></el-menu-item>
                <el-menu-item index="/Editor"><i class="el-icon-edit"></i></el-menu-item>
                <el-menu-item index="/"><i class="el-icon-setting"></i></el-menu-item>
            </el-menu>
        </div>

        <el-tabs type="border-card">
            <el-tab-pane v-for="tab in tabs" :label="tab.title" :key="tab.tab_id">
                <AboutMe v-if="tab.title === 'AboutMe'" :tabId="tab.tab_id.toString()" :tabTitle="tab.title"/>
                <Tab v-else :tabId="tab.tab_id.toString()" :tabTitle="tab.title"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import axios from "axios";
    import Tab from "../components/Tab"
    import AboutMe from "../components/AboutMe";
    export default {
        name: "Home",
        components: {AboutMe, Tab},
        comments: {
          Tab
        },
        data(){
            return {
                //tab数组
                tabs: [],
                // tabContents: [],
            }
        },
        created() {
            //读取所有tab
            this.readAllTabs()
        },
        methods: {
            //获取tab id数组
            readAllTabs(){
                return axios.get('/tab').then(res => {
                    this.tabs = res.data.data.tabs
                    console.log(this.tabs)
                })
            },
            // //根据tab id数组分别获取tab内容
            // readAllTabsContent(){
            //     for(let i = 0; i < this.tabs.length; i++){
            //         this.readTabContent(this.tabs[i].tab_id)
            //     }
            //     return null
            // },
            // //通过tab id获取tab内容
            // readTabContent(tabId){
            //     return axios.get('/tab/'+tabId).then(res => {
            //         const data = res.data.data
            //         this.createTab(data)
            //         // console.log(res)
            //     })
            // },
            // //读取并动态创建tab
            // createTab(data){
            //     this.tabContents.push(data)
            // }
            
        }
    }
</script>

<style scoped>

</style>
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
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
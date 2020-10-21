<template>
  <div>
    <ThemePicker/>
    <el-button type="primary">
      <i class="el-icon-s-order"></i>
    </el-button>
  </div>
</template>

<script>
  import ThemePicker from "../components/ThemePicker";
  export default {
    name: "Profile",
    components: {
      ThemePicker,
    }
  }
</script>

<style scoped>

</style>
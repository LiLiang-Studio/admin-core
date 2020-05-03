<template>
  <div>
    <el-form ref="Form" :model="formData" :rules="rules">
      <el-form-item prop="username">
        <el-input
          placeholder="用户名"
          prefix-icon="el-icon-user"
          v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          prefix-icon="el-icon-lock"
          type="password"
          show-password
          v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          style="width: 100%;" 
          :loading="loading">{{loading ? '登录中...' : '登 录'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {},
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
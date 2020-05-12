<template>
  <div>
    <el-card shadow="never" style="margin-bottom:12px;">
      <pre style="font-size:14px;line-height:1.6;">
        this.$adminCore.createIpRule({
          trigger: String, // 模拟事件
          required: Boolean, // 是否必填
          port: Boolean, // 是否包含端口
          msg: String, // 非空错误提示
          regmsg: String, // 正则不通过提示
          remoteMethod: Function // 远程验证函数 (rule, value, callback) => {}
        })

        this.$adminCore.createPortRule({
          trigger: String, // 模拟事件
          required: Boolean, // 是否必填
          msg: String, // 非空错误提示
          regmsg: String, // 正则不通过提示
          remoteMethod: Function // 远程验证函数 (rule, value, callback) => {}
        })

        <b style="color:red">以上方法参数所有字段可选</b>
      </pre>
    </el-card>
    <el-card shadow="never">
      <el-form ref="Form" :model="form" :rules="rules">
        <el-form-item label="IP地址 this.$adminCore.createIpRule()" prop="ip">
          <el-input v-model="form.ip"/>
        </el-form-item>
        <el-form-item label="IP地址和端口 this.$adminCore.createIpRule({ port: true })" prop="ipAndPort">
          <el-input v-model="form.ipAndPort"/>
        </el-form-item>
        <el-form-item label="IP blur验证 this.$adminCore.createIpRule({ trigger: 'blur' })" prop="ipBlur">
          <el-input v-model="form.ipBlur"/>
        </el-form-item>
        <el-form-item label="端口 this.$adminCore.createPortRule()" prop="port">
          <el-input v-model="form.port"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        ip: this.$adminCore.createIpRule(),
        ipAndPort: this.$adminCore.createIpRule({ port: true }),
        ipBlur: this.$adminCore.createIpRule({ trigger: 'blur' }),
        port: this.$adminCore.createPortRule()
      }
    }
  },
  methods: {
    reset() {
      this.form = {}
      this.$nextTick(() => this.$refs.Form.clearValidate())
    },
    submit() {
      this.$refs.Form.validate(valid => {
        console.log(valid)
      })
    }
  }
}
</script>
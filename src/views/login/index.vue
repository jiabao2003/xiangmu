<template>
  <div style="display: flex;">
    <div style="width: 59%; height: 100vh;">
      <img src="https://heimahr.itheima.net/static/img/login_back.5ecbf4ab.png" alt=""
        style="width: 100%; height: 99.6vh; border-radius: 10px;">
    </div>
    <div style="width: 30%;">
      <div style="width: 90%; margin-top: 300px; margin-left: 90px; ">
        <h2 style="margin-left: 100px; margin-bottom:30px;">登录</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" style="background-color: #f4f5fb;"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="ruleForm.isAgree">
              请勾选用户平台协议
            </el-checkbox>
          </el-form-item>
        </el-form>
        <div style="margin-left: 100px; margin-top: 20px;">
          <el-button type="primary" style="width: 100%;" @click="logins">登录</el-button>
        </div>
        <p style="margin-left: 100px; color: red; font-size: 14px;">仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  data() {
    const isAgreeFn = (rule, value, callback) => {
      value ? callback() : callback(new Error('请勾选用户协议'))
    }
    return {
      ruleForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!',
        isAgree: true,
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 12, min: 6, message: "密码需要6-12位", trigger: 'blur' }
        ],
        isAgree: [
          { validator: isAgreeFn }
        ]
      }

    }

  },
  methods: {
    ...mapActions('user', ['login']),
    async logins() {
      await this.login(this.ruleForm)
      this.$router.push('/')
    }
  },
  components: {

  },
  computed: {

  },
  filters: {

  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
}
</script>

<style lang='scss'>
.el-input__inner {
  background-color: #f4f5fb !important;
}
</style>

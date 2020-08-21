<template>
  <div class id>
    <el-dialog title="添加用户" :visible="showVisible" @close="close(0)">
      <el-form :model="addUserForm" label-width="100px" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" placeholder></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" placeholder type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email" placeholder></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('addUserForm')">确定</el-button>
          <el-button @click="resetForm('addUserForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
/* pageFullScreen在index.css */
</style>
<script>
export default {
  props: {
    showVisible: Boolean,
  },
  data() {
    let checkMobile = (rule, value, callback) => {
      const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value) {
        return callback();
      }
      if (mobileReg.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号格式"));
    };
    return {
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "密码不能空",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            validator: checkMobile,
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$http
          .post("users", this.addUserForm)
          .then((res) => {
            this.$message.success("添加用户成功");
            this.close();
          })
          .catch((err) => {
            this.$message.error("添加用户失败");
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

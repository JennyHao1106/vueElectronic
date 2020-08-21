<template>
  <div class id>
    <el-dialog title="修改用户" :visible="showVisible" @close="close(0)">
      <el-form :model="editUserForm" label-width="100px" :rules="rules" ref="editUserForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email" placeholder></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('editUserForm')">确定</el-button>
          <el-button @click="resetForm('editUserForm')">重置</el-button>
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
    editUserForm_: Object,
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
      editUserForm: this.editUserForm_,
      rules: {
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
          .put(`users/` + this.editUserForm_.id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile,
          })
          .then((res) => {
            this.$message.success("更新用户成功");
            this.close();
          })
          .catch((err) => {
            this.$message.error("更新用户失败");
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

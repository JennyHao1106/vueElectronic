<template>
  <div class="content" id>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入搜索条件"
          class="input-with-select"
          v-model="searchName"
          clearable
          @clear="handleUsers"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleAddUser">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="users">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="手机" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <div>
            <el-switch
              v-model="scope.row.mg_state"
              @change="handleChangeState(scope.row.mg_state,scope.row.id)"
            ></el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope)"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" @click="handleSetting(scope)"></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        @prev-click="handleCurrentChange"
        @next-click="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalpage"
      ></el-pagination>
    </el-row>
  <add-user @close="closeAddUser" :showVisible="showAddUserFlag"></add-user>
  <edit-user @close="closeEditUser" :showVisible="showEditUserFlag" :editUserForm_="editUserForm"></edit-user>
  </div>
</template>
<style lang="less" scoped>
.content {
  width: 100%;
}
.el-table {
  margin: 15px 0px;
}
</style>
<script>
import addUser from './AddUser';
import editUser from './EditUser';
export default {
  components:{
    addUser,
    editUser
  },
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 10,
      users: [],
      totalpage: 0,
      searchName: "",
      showAddUserFlag:false,
      showEditUserFlag:false,
      editUserForm:{}
    };
  },
  created() {
    this.handleUsers();
  },
  methods: {
    handleUsers() {
      this.$http
        .get("users", {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(res => {
          this.users = res.users;
          this.totalpage = res.total;
          this.pagenum = res.pagenum;
        })
        .catch(err => {
          this.$message.error(err.msg || "未查询到相关信息");
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.handleUsers();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.handleUsers();
    },
    handleChangeState(state, id) {
      this.$http
        .put(`users/${id}/state/${state}`)
        .then(res => {
          return this.$message.success("更新用户信息成功");
        })
        .catch(err => {
          state = !state;
          return this.$message.error("更新用户信息失败");
        });
    },
    handleSearch() {
      if (this.searchName == "") {
        this.handleUsers();
        return; //保证用户在此次请求完后后面的方法不再执行
      }
      let searchItem = this.users.find(item => {
        return item.username == this.searchName ? item : "";
      });
      this.$http
        .get(`users/${searchItem.id}`)
        .then(res => {
          this.users = [];
          this.users.push(res);
        })
        .catch(err => {
          return this.$message.error("要查找的用户不存在");
        });
    },
    handleAddUser(){
      this.showAddUserFlag = true;
    },
    handleEdit(value){
      this.editUserForm={
        id:value.row.id,
        email:value.row.email,
        mobile:value.row.mobile
      }
      this.showEditUserFlag = true;
    },
    handleDelete(value){
      
      this.$http.delete(`users/${value.row.id}`).then(res=>{
        this.$message.success('删除成功');
        this.handleSearch();
      }).catch(err=>{
        this.$message.error('删除失败');

      })
    },
    closeAddUser(val){
      this.showAddUserFlag = false;
      this.handleUsers()
    },
    closeEditUser(){
      this.showEditUserFlag = false;
      this.handleUsers();
    }
  }
};
</script>


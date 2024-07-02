<template>
  <div>
    <el-table :data="engineers" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="100">
      </el-table-column>
      <el-table-column prop="qualification" label="工程师资质" width="120">
      </el-table-column>
      <el-table-column prop="serviceArea" label="服务区域" width="120">
      </el-table-column>
      <el-table-column prop="performanceRating" label="绩效评级" width="100">
      </el-table-column>
      <el-table-column prop="applianceTypes" label="擅长修理的家电类型" width="200">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.applianceTypes">
            {{ scope.row.applianceTypes.join(', ') }}
          </span>
          <span v-else>-</span>
        </template> -->
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="openDialog(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑工程师信息" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
      <el-form ref="engineerForm" :model="currentEngineer" label-width="100px">
        <el-form-item label="工程师资质">
          <el-input v-model="currentEngineer.qualification"></el-input>
        </el-form-item>
        <el-form-item label="服务区域">
          <el-input v-model="currentEngineer.serviceArea"></el-input>
        </el-form-item>
        <el-form-item label="绩效评级">
          <el-input v-model="currentEngineer.performanceRating"></el-input>
        </el-form-item>
        <el-form-item label="擅长修理的家电类型">
          <el-input v-model="currentEngineer.applianceTypes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定
          
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EngineerView',
  created() {
    this.fetchEngineers();
  },
  data() {
    return {
      engineers: [],
      currentEngineer: [],
      dialogVisible: false,
    };
  },
  methods: {
    handleView(row) {
      console.log('查看工程师信息:', row);
      // 这里可以根据需要处理查看操作
    },
    openDialog(row) {
      console.log('编辑工程师信息:', row);
      this.currentEngineer = { ...row };
      // 点击按钮打开对话框
      this.dialogVisible = true;
    },
    handleSubmit() {
      // 处理表单提交逻辑
      console.log('表单提交:', this.formData);

      const index = this.engineers.findIndex(e => e.id === this.currentEngineer.id);
      if (index !== -1) {
        // 更新 engineers 数组中对应工程师的数据
        this.engineers[index].qualification = this.currentEngineer.qualification;
        this.engineers[index].serviceArea = this.currentEngineer.serviceArea;
        this.engineers[index].performanceRating = this.currentEngineer.performanceRating;
        this.engineers[index].applianceTypes = this.currentEngineer.applianceTypes;
      }

      this.dialogVisible = false; // 提交后关闭对话框
      console.log('工程师信息更新成功:', this.currentEngineer);

      // 发送 POST 请求更新后端数据
      axios.post(`http://localhost:8080/home/engineers/updateById`, {
        id: this.currentEngineer.id,
        qualification: this.currentEngineer.qualification,
        serviceArea: this.currentEngineer.serviceArea,
        performanceRating: this.currentEngineer.performanceRating,
        applianceTypes: this.currentEngineer.applianceTypes
      })
        .then(response => {
          console.log('工程师信息更新成功:', response.data);
          // 可以根据需要处理更新成功后的逻辑
        })
        .catch(error => {
          console.error('工程师信息更新失败:', error);
          // 可以根据需要处理更新失败后的逻辑
        });

    },
    fetchEngineers() {
      // 调用后端接口获取工程师列表数据
      axios.get('http://localhost:8080/home/engineers/getAll')
        .then(response => {
          this.engineers = response.data.data;
          console.log('工程师列表数据:', this.engineers);
        })
        .catch(error => {
          console.error('获取工程师列表数据失败:', error);
        });
    },
  },
};
</script>
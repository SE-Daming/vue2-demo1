<template>
    <div>
        <el-table :data="orders" border style="width: 100%">

            <el-table-column prop="contact_phone" label="联系电话" width="120"></el-table-column>
            <el-table-column prop="user_address" label="用户地址" width="180"></el-table-column>

            <el-table-column prop="travel_time" label="赶路时间" width="180"></el-table-column>


            <el-table-column prop="repair_duration" label="维修时长" width="120"></el-table-column>
            <el-table-column prop="completion_time" label="完成时间" width="180"></el-table-column>
            <el-table-column prop="area" label="所在区域" width="120"></el-table-column>
            <el-table-column prop="order_status" label="订单状态" width="120"></el-table-column>
            <el-table-column prop="priority" label="优先级" width="100"></el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="openDialog(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="详细订单信息" :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
            <el-form ref="orderForm" :model="currentOrder" label-width="100px">
                <el-form-item label="家电产品类型">
                    <el-input v-model="currentOrder.product_type" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="故障描述">
                    <el-input v-model="currentOrder.description" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户联系电话">
                    <el-input v-model="currentOrder.contact_phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户地址">
                    <el-input v-model="currentOrder.user_address" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="故障相关图片">
                    <el-input v-model="currentOrder.fault_images" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="工程师赶路时间">
                    <el-date-picker v-model="currentOrder.travel_time" type="datetime"
                        :disabled="true"></el-date-picker>
                </el-form-item>
                <el-form-item label="工程师赶路时间长短">
                    <el-input v-model="currentOrder.travel_duration" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="维修开始时间">
                    <el-date-picker v-model="currentOrder.repair_time" type="datetime"
                        :disabled="true"></el-date-picker>
                </el-form-item>
                <el-form-item label="工程师维修时间长短">
                    <el-input v-model="currentOrder.repair_duration" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="完成时间">
                    <el-date-picker v-model="currentOrder.completion_time" type="datetime"
                        :disabled="true"></el-date-picker>
                </el-form-item>
                <el-form-item label="所在区域">
                    <el-input v-model="currentOrder.area" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-input v-model="currentOrder.order_status" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-input v-model="currentOrder.priority" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分配的工程师ID">
                    <el-input v-model="currentOrder.assigned_engineer" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="订单创建时间">
                    <el-date-picker v-model="currentOrder.created_at" type="datetime" :disabled="true"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">
                    关闭
                </el-button>
            </span>
        </el-dialog>


        <!-- 分页器 -->
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
//   import axios from 'axios';
export default {
    name: 'OrderView',
    // created(){
    //     this.getOrders();
    // },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            currentOrder: [],
            dialogVisible: false,
            orders: [{
                description: '故障描述1',
                contact_phone: '1234567890',
                user_address: '地址1',
                fault_images: '图片1.jpg',
                travel_time: '2024-07-01 08:00:00',
                travel_duration: '2 hours',
                repair_time: '2024-07-01 10:00:00',
                repair_duration: '1 hour',
                completion_time: '2024-07-01 11:00:00',
                area: '区域A',
                order_status: 'NEW',
                priority: 'LOW'
            },
            {
                description: '故障描述2',
                contact_phone: '9876543210',
                user_address: '地址2',
                fault_images: '图片2.jpg',
                travel_time: '2024-07-01 09:00:00',
                travel_duration: '3 hours',
                repair_time: '2024-07-01 12:00:00',
                repair_duration: '2 hours',
                completion_time: '2024-07-01 14:00:00',
                area: '区域B',
                order_status: 'COMPLETED',
                priority: 'HIGH'
            },],
        };
    },

    methods: {
        //   getOrders() {
        // const params={pageNum:this.currentPage,pageSize:this.pageSize}
        //     axios.get('http://localhost:8000/api/orders/pageQuery',{params})
        //       .then(response => {
        //         this.orders = response.data.data;
        //         console.log("所有的订单:", this.orders);
        //       })
        //       .catch(error => {
        //         console.log(error);
        //       });
        //   },
        openDialog(row) {
            console.log('编辑工程师信息:', row);
            this.currentOrder = { ...row };
            // 点击按钮打开对话框
            this.dialogVisible = true;
        },
        handleSubmit() {
            // axios.post('http://localhost:8000/api/orders/updateOrder', this.currentOrder)
            //     .then(response => {
            //         console.log('更新成功:', response.data);
            //         // 更新成功后，可以在这里调用后端接口更新工程师信息
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
            this.dialogVisible = false;
            // 提交表单后，可以在这里调用后端接口更新工程师信息
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1; // 切换每页条数时，重置到第一页
            // this.getOrders(); // 获取数据
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            // this.getOrders(); // 获取数据
        }
    },
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
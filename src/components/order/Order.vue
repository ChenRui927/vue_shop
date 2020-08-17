<template>
  <div>
    <!-- 头部面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜素区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- clearable使输入框可以清空 -->
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" width="80px"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status" width="80px">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" width="80px"></el-table-column>
        <el-table-column label="下单时间" prop="create_time" width="200px">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>

      <!-- 修改地址的对话框 -->
      <el-dialog title="修改地址" :visible.sync="addresDialogVisible" width="50%" @close="addresDialogClosed">
        <el-form :model="addresForm" :rules="addresFormRules" ref="addresFormRef" label-width="100px">
          <el-form-item label="省市区/县" prop="addres1">
            <!-- 选择省市区/县的级联选择框 -->

            <!-- options 用来指定数据源 -->
            <!-- clearable 清空选项 -->
            <el-cascader expand-trigger="hover" :options="cityData" v-model="addresForm.addres1" clearable>
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="addres2">
            <el-input v-model="addresForm.addres2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addresDialogVisible = false">确 定</el-button>
          <el-button @click="addresDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 展示物流进度的对话框 -->
      <el-dialog title="物流进度" :visible.sync="progressDialogVisible" width="50%">
        <!-- 时间线 -->
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in progressInfo"
            :key="index"
            :timestamp="activity.time">
            {{activity.context}}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import cityData from './citydata.js'

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 总数据条数
      total: 0,
      // 订单列表
      orderList: [],
      // 控制修改地址的对话框的显示与隐藏
      addresDialogVisible: false,
      // 修改地址的数据表单
      addresForm: {
        addres1: [],
        addres2: ''
      },
      // 修改地址表单的验证规则对象
      addresFormRules: {
        addres1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        addres2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      // 选择省市区/县的级联选择器的数据 cityData: cityData
      cityData,
      // 控制物流进度的对话框的显示与隐藏
      progressDialogVisible: false,
      // 物流信息
      progressInfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 获取订单列表
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })

      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }
      console.log(res)
      this.total = res.data.total
      this.orderList = res.data.goods
    },
    // pagesize改变的函数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 页码值发生变化调用的函数
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 展示修改地址的对话框
    showBox() {
      this.addresDialogVisible = true
    },
    // 关闭表单并重置数据
    addresDialogClosed() {
      this.$refs.addresFormRef.resetFields()
    },
    // 展示物流进度的对话框
    async showProgressBox() {
      const { data: res } = await this.$http.get('/kuaidi/804909574412544580')
      if (res.meta.status !== 200) {
         this.$message.error('获取物流信息失败！')
      }
      this.progressInfo = res.data
      this.progressDialogVisible = true
      console.log(this.progressInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>

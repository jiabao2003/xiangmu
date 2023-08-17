<template>
    <div style="padding: 15px;background-color: #f6f6f6; width: 100%; height: 100vh;">
        <div style=" background-color: white; height: 900px;">
            <el-row :gutter="20" style="border-right: 1px solid #ccc;">
                <el-col :span="4">
                    <div style="padding: 10px; border-right: 1px solid #ccc">
                        <el-input v-model="input" @input='epoyessshou' style="width: 90%;"
                            placeholder="输入员工姓名人员搜索"></el-input>
                        <el-tree :highlight-current="true" :data="list" @node-click="handleNodeClick"
                            :default-expand-all="true">
                            <template slot-scope="{data}">
                                {{ data.name }}
                            </template>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div>
                        <div style="padding: 10px; height: 50px; position: relative;">
                            <div style="position: absolute; right: 20px;">
                                <el-button v-employee="'employee'" size="small"
                                    style="background-color: #2752fb; color: white;" @click="employtj">
                                    添加员工</el-button>
                                <el-button size="small" @click="dialogVisible = true">Excel导入</el-button>
                                <el-button size="small" @click="excelgo">excel导出</el-button>
                            </div>
                        </div>
                        <el-table :data="arr" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
                            <el-table-column prop="staffPhoto" label="头像" width="180" align="center">
                                <template slot-scope="scope">
                                    <img v-if="scope.row.staffPhoto" :src="scope.row.staffPhoto" alt=""
                                        style="width:40px; height: 40px;">
                                    <div v-else class="block"><el-avatar style=" background-color: #04c9be;" :size="40">{{
                                        scope.row.username.charAt(0) }}</el-avatar></div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="姓名" width="100">
                            </el-table-column>
                            <el-table-column prop="mobile" label="手机号" sortable width="150">
                            </el-table-column>
                            <el-table-column prop="workNumber" label="工号" sortable width="150">
                            </el-table-column>
                            <el-table-column prop="formOfEmployment" label="聘用形式" width="100">
                                <template slot-scope="scope">
                                    {{ ['非正式', '正式'][scope.row.formOfEmployment] }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="departmentName" label="部门" width="130">
                            </el-table-column>
                            <el-table-column prop="timeOfEntry" label="入职时间" width="130">
                            </el-table-column>
                            <el-table-column prop="departmentName" label="操作" width="180">
                                <template slot-scope="scope">
                                    <a href="#" @click="$router.push(`/employee/detail/${scope.row.id}`)">查看</a>
                                    <a href="#" @click="emoloy(scope.row)">角色</a>
                                    <a href="#">删除</a>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div style="text-align: center; margin-top: 10px;">
                            <el-pagination layout="prev, pager, next" :total="total" :page-size="add.pagesize"
                                :current-page.sync="add.page" @current-change="getemployee(add)"
                                :current-pagesize.sync="add.pagesize">
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <exports :dialogVisible.sync="dialogVisible" @getemployee="getemployee"></exports>
        <employtk :dialogVisibl.sync="dialogVisibl" :emplid="emplid" ref="ind"></employtk>
    </div>
</template>

<script>
import exports from '../../components/exports.vue'
import { transListToTreeData } from '../../utils/index'
import { getDepartmet, getemployee, exportEmployee } from '../../api/user'
import employtk from '../../components/employtk.vue'
import { saveAs } from 'file-saver';
export default {
    data() {
        return {
            dialogVisible: false,
            dialogVisibl: false,
            input: '',
            list: [],
            arr: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            add: {
                departmentId: 1,
                page: 1,
                pagesize: 10,
                keyword: ""
            },
            total: 0,
            emplid: null
        }
    },
    methods: {
        async getDepartmet() {
            let res = await getDepartmet()
            this.list = transListToTreeData(res.data.data, 0)
        },
        handleNodeClick(data) {
            this.add.departmentId = data.id
            this.getemployee(this.add)
        },
        async getemployee(data) {
            let res = await getemployee(data)
            this.arr = res.data.data.rows
            this.total = res.data.data.total
        },
        epoyessshou() {
            this.add.keyword = this.input
            this.getemployee(this.add)
        },
        formatter(row, column) {
            return row.address;
        },
        employtj() {
            this.$router.push('/employee/detail')
        },

        employbj(ref) {
            this.$router.push('/employee/detail')
        },

        async excelgo() {
            let res = await exportEmployee()
            saveAs(res.data, '员工信息表.xlsx')
        },
        exportsyc(a) {
            this.dialogVisible = a
        },
        emoloy(row) {
            this.dialogVisibl = true
            this.emplid = row.id
            this.$nextTick(() => {
                this.$refs.ind.getEnabledRoles()
            })


        }
    },
    components: {
        exports, employtk
    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.getDepartmet()
        this.getemployee(this.add)
    },
    mounted() {

    },
}
</script>

<style lang='scss'>
a {
    color: #409eff;
    margin-left: 10px;

}

.el-tree-node .el-tree-node__content {
    height: 40px !important;
    font-size: 14px;
}
</style>

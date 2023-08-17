<template>
    <div style="width: 100%; background-color: #f1f1f1; height: 100vh; padding-top: 20px;">
        <div style="width: 98%; margin-left: 15px; padding: 10px; background-color: white; ">
            <el-button type="primary" @click="permissget">添加权限</el-button>
            <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="组织架构" sortable width="180">
                </el-table-column>
                <el-table-column prop="code" label="标识" sortable width="180">
                </el-table-column>
                <el-table-column prop="description" label="描述">
                </el-table-column>
                <el-table-column prop="description" label="描述">
                    <template slot-scope="scope">
                        <div>
                            <a href="#" v-if="scope.row.pid == 0" @click="tj(scope.row)">添加</a>
                            <a href="#" @click="bj(scope.row)">编辑</a>
                            <a href="#">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <ball :dialogVisible.sync="dialogVisible" @getpermission="getpermission" ref='abb' :pid="pid" :from="from"></ball>
    </div>
</template>

<script>
import { getpermission } from '../../api/user'
import { transListToTreeData } from '../../utils/index'
import ball from './components/ball'
export default {
    data() {
        return {
            list: [],
            dialogVisible: false,
            pid: '',
            from: [],
        }
    },
    methods: {
        async getpermission() {
            let res = await getpermission()
            this.list = transListToTreeData(res.data.data, 0)
        },
        permissget() {
            this.dialogVisible = true
            this.pid = '0'
        },
        tj(row) {
            this.pid = row.id
            this.dialogVisible = true
        },
        bj(row) {
            this.dialogVisible = true
            this.from = row
            this.$nextTick(() => {
                this.$refs.abb.ballq()
            })
        }
    },
    components: {
        ball
    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.getpermission()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped>
a {
    color: #409eff;
    margin-left: 10px;
}
</style>

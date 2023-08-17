<template>
    <div style="padding: 20px 0 30px 30px;">
        <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
            <template v-slot="{ data }">
                <el-row class="myrow" type="flex" justify="space-between">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">{{ data.name }}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <template>
                                <span style="font-size: 14px;">{{ data.managerName }}</span> &emsp;
                                <el-dropdown trigger="click" @command="handleCommand($event, data.id, data)">
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown" trigger="click">
                                        <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                        <el-dropdown-item command="bbb">编辑部门</el-dropdown-item>
                                        <el-dropdown-item command="c">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </div>

                    </el-col>
                </el-row>
            </template>
        </el-tree>
        <addept :title="title" :ruleForm="ruleForm" @coqk="coqk" :item="item" :dialogVisible.sync="dialogVisible"
            @code="code" :pid="pid" @getDepartmet="getDepartmet">
        </addept>
    </div>
</template>

<script>
import addept from '../../components/add-dept.vue'
import { getDepartmet } from '../../api/user'
import { transListToTreeData } from '../../utils/index'
export default {
    data() {
        return {
            pid: null,
            data: [],
            title: '',
            item: [],
            ruleForm: {
                code: '',
                introduce: '',
                managerId: '',
                name: '',
                pid: ''
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dialogVisible: false
        }
    },
    methods: {
        async getDepartmet() {
            let res = await getDepartmet()
            console.log(res);
            this.data = transListToTreeData(res.data.data, 0)

        },







        handleCommand(type, id, data) {
            if (type == 'add') {
                this.dialogVisible = true
                this.title = '添加'
                this.pid = id
            }
            if (type == 'bbb') {
                this.title = '编辑'
                this.dialogVisible = true
                this.ruleForm = JSON.parse(JSON.stringify(data))
                this.pid = id
            }
        },
        code() {
            this.dialogVisible = false
        },
        coqk() {
            this.ruleForm = {}
            this.pid = null
        }
    },
    components: {
        addept
    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.getDepartmet()
    },
    mounted() {

    },
}

</script>

<style lang='scss' scoped>
.myrow {
    height: 30px;
    line-height: 30px;
    width: 100%;
}

.myrow:hover {
    color: aqua !important;
}
</style>

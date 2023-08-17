<template>
    <div style="margin-left: 20px;">
        <el-button style="background-color: #2752fb; color: white; margin-top: 15px; margin-bottom: 15px;"
            @click="roletj">添加角色</el-button>
        <div style="height: 300px;">
            <el-table ref="singleTable" border :data="list" style="width: 100%">
                <el-table-column type="index" label='序列号' width="120">
                </el-table-column>
                <el-table-column property="name" label="角色" width="220">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isEdit" placeholder="请输入内容" v-model="scope.row.newlist.name"></el-input>
                        <span v-else>{{ scope.row.newlist.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="state" label="启用" width="220">
                    <template slot-scope="scope">
                        <el-switch v-if="scope.row.isEdit" v-model="scope.row.newlist.state" :active-value="1"
                            :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                        <span v-else>{{ ['未启用', '已启用'][scope.row.newlist.state] }}</span>
                    </template>
                </el-table-column>
                <el-table-column property="description" label="描述">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isEdit" placeholder="请输入内容"
                            v-model="scope.row.newlist.description"></el-input>
                        <span v-else>{{ scope.row.newlist.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isEdit">
                            <el-button size="mini" @click="roleqd(scope.row)">确定</el-button>
                            <el-button size="mini" type="danger" @click="roleqx(scope.row)">取消</el-button>
                        </div>
                        <div v-else>
                            <a @click="rolefp(scope.row)">分配权限</a>
                            <a @click="rolebj(scope.row)">编辑</a>
                            <a @click="rolesc(scope.row.id)">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="text-align: center; margin-top: 10px;">
            <el-pagination layout="prev, pager, next" :total="token" :page-size="dat.pagesize" :current-page.sync="dat.page"
                @current-change="getRole()" :current-pagesize.sync="dat.pagesize">
            </el-pagination>
        </div>
        <role :dialogVisible="dialogVisible" @roleqx="roleqx" @getRole="getRole"></role>


        <rolefe :display.sync="display" :allocation="allocation" ref="ad"></rolefe>

    </div>
</template>

<script>
import rolefe from './components/role'
import { getRole, putrole, DELETEsc } from '../../api/user'
import role from '../../components/add-role.vue'
export default {
    data() {
        return {
            allocation: null,
            dialogVisible: false,
            display: false,
            dat: {
                page: 1,
                pagesize: 5
            },
            list: [],
            token: 0
        }
    },
    methods: {
        async getRole() {
            let res = await getRole(this.dat)
            this.list = res.data.data.rows
            this.token = res.data.data.total
            this.list.forEach((item) => {
                this.$set(item, 'isEdit', false)
                this.$set(item, 'newlist', {
                    name: item.name,
                    description: item.description,
                    state: Number(item.state)
                })
            })
        },
        rolebj(row) {
            row.isEdit = true
        },
        roleqx(row) {
            row.isEdit = false
            row.newlist.name = row.name
            row.newlist.description = row.description
            row.newlist.state = Number(row.state)
        },
        async roleqd(row) {
            console.log(row.state);
            if (row.newlist.name && row.newlist.description) {
                await putrole({ ...row.newlist, id: row.id })
                this.$message.success("更新成功")
                row.isEdit = false
            } else {
                this.$message.success("不能为空")
            }
        },

        roletj() {
            this.dialogVisible = true
        },
        roleqx() {
            this.dialogVisible = false
        },
        async rolesc(id) {
            let res = await DELETEsc({ id: id })
            this.getRole()
        },
        rolefp(row) {
            this.allocation = row.id
            this.display = true
            this.$nextTick(() => {
                this.$refs.ad.getrol()
            })
        }
    },
    components: {
        role, rolefe
    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.getRole()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped>
a {
    color: #6cabff;
    margin-left: 10px;
}
</style>

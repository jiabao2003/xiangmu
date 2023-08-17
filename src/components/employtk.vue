<template>
    <div>
        <el-dialog title="权限" :visible="dialogVisibl" width="30%" @close="$emit('update:dialogVisibl', false)">

            <el-checkbox-group v-model="roleid">
                <el-checkbox :label="item.id" v-for="(item, index) in  roleList" :key="item.id">{{ item.name
                }}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="employqx">取 消</el-button>
                <el-button type="primary" @click="roleqd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getEnabledRoles, getEmployeeid, getEmplo } from '../api/user'
export default {
    props: ['dialogVisibl', 'emplid'],
    data() {
        return {
            roleid: [],
            roleList: []
        }
    },
    methods: {
        employqx() {

            this.$emit('update:dialogVisibl', false)
        },
        async getEnabledRoles() {
            let res = await getEnabledRoles(this.emplid)
            this.roleList = res.data.data
            console.log(res);
            let ress = await getEmployeeid({ id: this.emplid })
            console.log(ress.data.data.roleIds);
            this.roleid = ress.data.data.roleIds
        },
        async roleqd() {
            let res = await getEmplo({ id: this.emplid, roleIds: this.roleid })
            this.$emit('update:dialogVisibl', false)
        }
    },
    components: {

    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>

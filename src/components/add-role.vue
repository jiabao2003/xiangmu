<template>
    <div>
        <el-dialog title="新增角色" :visible.sync="dialogVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="启用">
                    <el-switch v-model="form.state" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleqx">取 消</el-button>
                <el-button type="primary" @click="roleadd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { poshadd } from '../api/user'
export default {
    props: ['dialogVisible', 'getRole'],
    data() {
        return {
            form: {
                name: "",
                state: 1,
                description: ""
            }
        }
    },
    methods: {
        roleqx() {
            this.$emit('roleqx',)
        },
        async roleadd() {
            let res = await poshadd(this.form)
            this.$emit('getRole')
            this.$emit('roleqx',)
            this.form = {

            }
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

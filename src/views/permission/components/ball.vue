<template>
    <div>
        <el-dialog title="新增权限" :visible.sync="dialogVisible" width="30%" @close="$emit('update:dialogVisible', false)">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="description">
                    <el-input v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="开启" prop="enVisible">
                    <el-switch v-model="ruleForm.enVisible" active-value="1" inactive-value="2"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
                <el-button type="primary" @click="ballqd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { poshpermission, getpermiss, putpermiss } from '../../../api/user'
export default {
    props: ['dialogVisible', 'pid', 'from'],
    data() {
        return {
            ruleForm: {
                name: '',
                code: '',
                type: '2',
                enVisible: '1',
                description: '',
                pid: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入权限标识', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        async ballqd() {
            if (this.pid == '0') {
                this.ruleForm.pid = '0'
                let res = await poshpermission(this.ruleForm)
                this.$emit('getpermission')
                this.$emit('update:dialogVisible', false)
            } else {
                if (this.from) {
                    let res = await putpermiss({ id: this.pid, ...this.ruleForm, })
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '编辑成功',
                    })
                    this.$emit('getpermission')
                    this.$emit('update:dialogVisible', false)

                } else {
                    this.ruleForm.pid = this.pid
                    let res = await poshpermission(this.ruleForm)
                    this.$emit('getpermission')
                    this.$emit('update:dialogVisible', false)
                }
            }
        },

        async ballq() {
            let res = await getpermiss({ id: this.from.id })
            this.ruleForm = res.data.data
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

<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="部门负责人" prop="managerId">
                    <el-select v-model="ruleForm.managerId" placeholder="请选择负责人" style="width: 100%;">
                        <el-option v-for="(item, index) in ManagerList" :key="index" :label="item.username"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input type="textarea" v-model="ruleForm.introduce"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cliqx">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getDepartmet, getManagerList, addDepartment, updateDepartment } from '../api/user'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        pid: {
            type: Number,
            default: null
        },
        title: {
            type: String,

        },
        item: {
            type: Array,

        },
        ruleForm: {

        }
    },
    data() {
        const validateName = async (rule, value, callback) => {
            let res = await getDepartmet()
            if (res.data.data.some(item => item.name == value)) {
                if (this.title == '添加') {
                    callback(new Error("部门中已经有该名称了"))
                } else {
                    callback()

                }
            } else {
                callback()
            }
        }
        const validatecode = async (rule, value, callback) => {
            let res = await getDepartmet()
            if (res.data.data.some(item => item.code == value)) {
                if (this.title == '添加') {
                    callback(new Error("部门中已经有该编码了"))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            ManagerList: [],
            // ruleForm: {
            //     code: '',
            //     introduce: '',
            //     managerId: '',
            //     name: '',
            //     pid: ''
            // },
            rules: {
                name: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入编码', trigger: 'blur' },
                    { validator: validatecode, trigger: 'blur' }
                ],
                managerId: [
                    { required: true, message: '请至少选择一个负责人', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '请输入部门介绍', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        cliqx() {
            this.$emit('coqk')
            this.$emit('code')
        },
        async getManagerList() {
            let res = await getManagerList()
            this.ManagerList = res.data.data

        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.title == '添加') {
                        await addDepartment({ ...this.ruleForm, pid: this.pid })
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.$emit('getDepartmet')
                        this.$emit('code')
                        this.$emit('coqk')
                    } else {
                        await updateDepartment(this.ruleForm)
                        this.$emit('getDepartmet')
                        this.$emit('code')
                        this.$emit('coqk')
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
            this.$emit('coqk')
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

        this.getManagerList()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>

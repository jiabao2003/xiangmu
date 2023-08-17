<template>
    <div style="width: 500px;  padding: 15px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
                <el-input v-model="ruleForm.workNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>

            <el-form-item label="部门" prop="departmentId">
                <template>
                    <employ v-model="ruleForm.departmentId" @input="input"></employ>
                </template>
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment" style="width: 100%;">
                <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
                    <el-option label="正式" :value="1"></el-option>
                    <el-option label="非正式" :value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="入职时间" required>
                <el-col :span="11">
                    <el-form-item prop="timeOfEntry">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.timeOfEntry
                            " style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="转正时间" required>
                <el-col :span="11">
                    <el-form-item prop="correctionTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.correctionTime"
                            style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="上传头像">
                <template>
                    <images v-model="ruleForm.staffPhoto"></images>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="add('ruleForm')">立即创建</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import employ from '../../components/employ.vue'
import { addEmployee, getEmployeeDetail, getEmployeebj } from '../../api/user'
import images from '../../components/image-upload'
export default {
    data() {

        const time = (rule, value, callback) => {
            if (this.ruleForm.timeOfEntry) {
                if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
                    callback(new Error('转正时间不能小于入职时间'))
                    return
                }
            }
            callback()
        }
        return {
            value: 1,
            ruleForm: {
                departmentId: 1,
                username: '',
                mobile: '',
                staffPhoto: '',
                formOfEmployment: '',
                correctionTime: '',
                workNumber: '',
                timeOfEntry: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6个字符', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: "blur" },
                    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: "blur" }
                ],
                formOfEmployment: [
                    { required: true, message: '不能为空', trigger: 'change' },

                ],
                departmentId: [
                    { required: true, message: '不能为空', trigger: 'blue' },
                ],
                correctionTime: [
                    { required: true, message: '不能为空', trigger: 'change' },
                    { validator: time, trigger: 'blue' }
                ],
                timeOfEntry: [{ required: true, message: '不能为空', trigger: 'change' },

                ]
            }
        }
    },
    methods: {
        add(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.$route.params.id) {
                        this.$message({ type: "success", message: '编辑成功' })
                        getEmployeebj({ ...this.ruleForm, id: this.$route.params.id }).then(res => {
                            console.log(res);
                            this.$router.go(-1)
                        })
                        this.$router.go(-1)
                    } else {
                        await addEmployee(this.ruleForm)
                        this.$router.go(-1)
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }, input(value) {
            this.ruleForm.departmentId = value
        }
    },
    components: {
        employ, images
    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        console.log(this.$route.params.id);
        if (this.$route.params.id) {
            getEmployeeDetail(this.$route.params.id).then(res => {
                console.log(res);
                this.ruleForm = res.data.data
            })
        }
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>

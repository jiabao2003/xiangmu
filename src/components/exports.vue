<template>
    <div>
        <el-dialog title="导出" :visible="dialogVisible" width="30%" @close="$emit('update:dialogVisible', false)">
            <div class="box">
                <el-row style="text-align: center; margin-top: 10px;">
                    <i class="el-icon-upload" style="font-size: 100px; color: #c0c4cc; "></i>
                </el-row>
                <input type="file" ref="undget" v-show="false" @change="monitor">
                <el-row style="text-align: center; margin-top: 10px;">
                    <p>将文件拖到此处,或<span style="color: #409eff;" @click="exportgo">点击上传</span></p>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { importEmployee } from '../api/user'
export default {
    props: ['dialogVisible'],
    data() {
        return {

        }
    },
    methods: {
        exportgo() {
            this.$refs['undget'].click()
        },
        async monitor(event) {
            const files = event.target.files
            const data = new FormData()
            if (files.length > 0) {
                data.append('file', files[0])
                await importEmployee(data)
            }
            this.$emit('getemployee')
            this.$emit('update:dialogVisible', false)
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

<style lang='scss' scoped>
.box {
    margin: auto;
    width: 400px;
    height: 200px;
    border: 1px dashed #ccc;
}
</style>

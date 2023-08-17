<template>
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" :http-request="uploadImage">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import COS from 'cos-js-sdk-v5'
export default {
    props: {
        value: {
            type: String,
            default: ""
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadImage(params) {
            console.log(params.file)
            const cos = new COS({
                SecretId: 'AKIDIRN4WkphLlxud7NOCmBECwjLn36yd8QY',
                SecretKey: '1lMlz2sVwueBVdWBcpoZ5NjtqcAUbWuB'
            }) // 完成cos对象的初始化
            cos.putObject({
                Bucket: 'pjb-2210c-1320041667', // 存储桶名称
                Region: 'ap-beijing', // 地域名称
                Key: params.file.name, // 文件名称
                StorageClass: 'STANDARD', // 固定值
                Body: params.file // 文件对象
            }, (err, data) => {
                if (data.statusCode === 200 && data.Location) {
                    // 拿到了腾讯云返回的地址  data.Location
                    // 通过input自定义事件将地址传出去
                    this.$emit('input', 'http://' + data.Location) // 将地址返回了
                } else {
                    this.$message.error(err.Message) // 上传失败提示消息
                }
            })
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

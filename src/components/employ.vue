<template>
    <div>
        <el-cascader :options="treeDate" @change="handleChange" separator="-" size="mini" :props="prop"></el-cascader>
    </div>
</template>

<script>
import { getDepartmet } from '../api/user'
import { transListToTreeData } from '../utils/index'
export default {
    // props: ['value'],
    data() {
        return {
            treeDate: [],
            prop: {
                label: 'name',
                value: "id"
            }

        }
    },
    methods: {
        handleChange(v) {
            if (v.length > 0) {
                this.$emit('input', v[v.length - 1])
            } else {
                this.$emit('input', null)
            }
        },

        async getDepartmet() {
            let res = await getDepartmet()
            this.treeDate = transListToTreeData(res.data.data, 0)
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
        this.getDepartmet()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>

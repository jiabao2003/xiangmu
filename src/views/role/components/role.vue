<template>
    <div>
        <el-dialog title="提示" :visible.sync="display" width="30%" @close="
            $emit('update:display', false)">
            <el-tree check-strictly :data="list" default-expand-all show-checkbox node-key="id" :props="defaultProps"
                ref="treeRef">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:display', false)">取 消</el-button>
                <el-button type="primary" @click="roleqd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getrole, getroleall, putroles } from '../../../api/user'
import { transListToTreeData } from '../../../utils/index'
export default {
    props: ['display', 'allocation'],
    data() {
        return {
            permIds: [],
            list: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        async getrol() {
            let res = await getrole({ id: this.allocation })
            this.$nextTick(() => {
                this.$refs.treeRef.setCheckedKeys(res.data.data.permIds)
            })
        },
        async getroleall() {
            let res = await getroleall()
            this.list = transListToTreeData(res.data.data, 0)
        },

        async roleqd() {
            let time = this.$refs.treeRef.getCheckedKeys()
            let res = await putroles({ id: this.allocation, permIds: time })
            this.$emit('update:display', false)
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
        this.getroleall()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>

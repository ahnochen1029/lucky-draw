import { conversionCategoryName, getDomData } from '@/helper/index';
export default {
    name: 'c-Result',
    props: {
        visible: Boolean
    },
    computed: {
        result: {
            get() {
                return this.$store.state.result;
            },
            set(val) {
                this.$store.commit('setResult', val);
            }
        },
        resultList() {
            const list = [];
            for (const key in this.result) {
                if (this.result.hasOwnProperty(key)) {
                    const element = this.result[key];
                    let name = conversionCategoryName(key);
                    list.push({
                        label: key,
                        name,
                        value: element
                    });
                }
            }
            return list;
        }
    },
    methods: {
        deleteRes(event, row) {
            const Index = getDomData(event.target, 'res');
            if (!Index) {
                return;
            }
            this.$confirm('此操作將移除該中獎號碼，確定刪除?', '警告', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    if (Index) {
                        const result = this.result;
                        result[row.label] = this.result[row.label].filter(
                            item => item !== Number(Index)
                        );
                        this.result = result;
                        this.$message({
                            type: 'success',
                            message: '刪除成功!'
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        }
    }
};
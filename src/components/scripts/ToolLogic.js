import {
    clearData,
    removeData,
    configField,
    listField,
    resultField,
    conversionCategoryName
} from '@/helper/index';
import { database, DB_STORE_NAME } from '@/helper/db';

export default {
    props: {
        running: Boolean,
        closeRes: Function
    },
    computed: {
        config: {
            get() {
                return this.$store.state.config;
            }
        },
        remain() {
            return (
                this.config[this.form.category] -
                (this.result[this.form.category]
                    ? this.result[this.form.category].length
                    : 0)
            );
        },
        result() {
            return this.$store.state.result;
        },
        categorys() {
            const options = [];
            for (const key in this.config) {
                if (this.config.hasOwnProperty(key)) {
                    const item = this.config[key];
                    if (item > 0) {
                        let name = conversionCategoryName(key);
                        name && options.push({
                            label: name,
                            value: key
                        });
                    }
                }
            }
            return options;
        }
    },
    data() {
        return {
            showSetwat: false,
            showImport: false,
            showImportphoto: false,
            showRemoveoptions: false,
            removeInfo: { type: 0 },
            form: {
                category: '',
                mode: 1,
                qty: 1,
                allin: false
            },
            listStr: ''
        };
    },
    watch: {
        showRemoveoptions(v) {
            if (!v) {
                this.removeInfo.type = 0;
            }
        }
    },
    methods: {
        resetConfig() {
            const type = this.removeInfo.type;
            this.$confirm('此操作將重置所選數據，是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    switch (type) {
                        case 0:
                            clearData();
                            this.$store.commit('setClearStore');
                            database.clear(DB_STORE_NAME);
                            break;
                        case 1:
                            removeData(configField);
                            this.$store.commit('setClearConfig');
                            break;
                        case 2:
                            removeData(listField);
                            this.$store.commit('setClearList');
                            break;
                        case 3:
                            database.clear(DB_STORE_NAME);
                            this.$store.commit('setClearPhotos');
                            break;
                        case 4:
                            removeData(resultField);
                            this.$store.commit('setClearResult');
                            break;
                        default:
                            break;
                    }

                    this.closeRes && this.closeRes();

                    this.showRemoveoptions = false;
                    this.$message({
                        type: 'success',
                        message: '重置成功!'
                    });

                    this.$nextTick(() => {
                        this.$emit('resetConfig');
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        onSubmit() {
            if (!this.form.category) {
                return this.$message.error('請選擇本次抽取的獎項');
            }
            if (this.remain <= 0) {
                return this.$message.error('該獎項剩餘人數不足');
            }
            if (this.form.mode === 99) {
                if (this.form.qty <= 0) {
                    return this.$message.error('必須輸入本次抽取人數');
                }
                if (this.form.qty > this.remain) {
                    return this.$message.error('本次抽獎人數已超過本獎項的剩餘人數');
                }
            }
            if (this.form.mode === 1 || this.form.mode === 5) {
                if (this.form.mode > this.remain) {
                    return this.$message.error('本次抽獎人數已超過本獎項的剩餘人數');
                }
            }
            this.showSetwat = false;
            this.$emit(
                'toggle',
                Object.assign({}, this.form, { remain: this.remain })
            );
        },
        startHandler() {
            this.$emit('toggle');
            if (!this.running) {
                this.showSetwat = true;
            }
        },
        transformList() {
            const { listStr } = this;
            if (!listStr) {
                this.$message.error('没有資料');
            }
            const list = [];
            const rows = listStr.split('\n');
            if (rows && rows.length > 0) {
                rows.forEach(item => {
                    const rowList = item.split(/\t|\s/);
                    if (rowList.length >= 2) {
                        const key = Number(rowList[0].trim());
                        const name = rowList[1].trim();
                        key &&
                            list.push({
                                key,
                                name
                            });
                    }
                });
            }
            this.$store.commit('setList', list);

            this.$message({
                message: '儲存成功',
                type: 'success'
            });
            this.showImport = false;
            this.$nextTick(() => {
                this.$emit('resetConfig');
            });
        }
    }
};

import { setData, configField } from '@/helper/index';
import { randomNum } from '@/helper/algorithm';
export default {
    name: 'LotteryConfig',
    props: {
        visible: Boolean
    },
    computed: {
        form: {
            get() {
                return this.$store.state.config;
            },
            set(val) {
                // this.$store.commit('setConfig', val);
                return val;
            }
        },
        storeNewLottery() {
            return this.$store.state.newLottery;
        }
    },
    data() {
        return {
            showAddLottery: false,
            newLottery: { name: '' }
        };
    },
    methods: {
        onSubmit() {
            setData(configField, this.form);
            this.$store.commit('setConfig', this.form);
            this.$emit('update:visible', false);

            this.$message({
                message: '儲存成功',
                type: 'success'
            });

            this.$nextTick(() => {
                this.$emit('resetconfig');
            });
        },
        addLottery() {
            this.showAddLottery = true;
        },
        randomField() {
            const str = 'abcdefghijklmnopqrstuvwxyz';
            let fieldStr = '';
            for (let index = 0; index < 10; index++) {
                fieldStr += str.split('')[randomNum(1, 27) - 1];
            }
            return `${fieldStr}${Date.now()}`;
        },
        addHandler() {
            const field = this.randomField();
            const data = {
                key: field,
                name: this.newLottery.name
            };
            this.$store.commit('setNewLottery', data);

            this.showAddLottery = false;
        }
    }
};
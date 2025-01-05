import { conversionCategoryName } from '@/helper/index';

export default {
    name: 'Publicity',
    computed: {
        config() {
            return this.$store.state.config;
        },
        result() {
            return this.$store.state.result;
        },
        message() {
            const { result, config } = this;
            const fields = Object.keys(config);

            let message = [{ key: 0, title: config.name }];
            fields.forEach((item, index) => {
                let label = conversionCategoryName(item);
                if (result[item] && config[item] > 0) {
                    message.push({
                        key: index + 1,
                        title: `${label}抽獎结果:`,
                        value: `${result[item].length > 0 ? result[item].join('、') : '暫未抽出'
                            }`
                    });
                }
            });

            return message;
        }
    }
};
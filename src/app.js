import LotteryConfig from '@/components/LotteryConfig';
import Publicity from '@/components/Publicity';
import Tool from '@/components/Tool';
import bgaudio from '@/assets/bg.mp3';
import beginaudio from '@/assets/begin.mp3';
import {
    getData,
    configField,
    resultField,
    newLotteryField,
    conversionCategoryName,
    listField,
} from '@/helper/index';
import { luckydrawHandler } from '@/helper/algorithm';
import Result from '@/components/Result';
import { database, DB_STORE_NAME } from '@/helper/db';
export default {
    name: 'App',
    components: { LotteryConfig, Publicity, Tool, Result },
    computed: {
        resCardStyle() {
            const style = { fontSize: '30px' };
            const { number } = this.config;
            if (number < 100) {
                style.fontSize = '100px';
            } else if (number < 1000) {
                style.fontSize = '80px';
            } else if (number < 10000) {
                style.fontSize = '60px';
            }
            return style;
        },
        config: {
            get() {
                return this.$store.state.config;
            },
        },
        result: {
            get() {
                return this.$store.state.result;
            },
            set(val) {
                this.$store.commit('setResult', val);
            },
        },
        list() {
            return this.$store.state.list;
        },
        allresult() {
            let allresult = [];
            for (const key in this.result) {
                if (this.result.hasOwnProperty(key)) {
                    const element = this.result[key];
                    allresult = allresult.concat(element);
                }
            }
            return allresult;
        },
        datas() {
            const { number } = this.config;
            const nums = number >= 1500 ? 500 : this.config.number;
            const configNum = number > 1500 ? Math.floor(number / 3) : number;
            const randomShowNums = luckydrawHandler(configNum, [], nums);
            const randomShowDatas = randomShowNums.map((item) => {
                const listData = this.list.find((d) => d.key === item);
                const photo = this.photos.find((d) => d.id === item);
                return {
                    key: item * (number > 1500 ? 3 : 1),
                    name: listData ? listData.name : '',
                    photo: photo ? photo.value : '',
                };
            });
            return randomShowDatas;
        },
        categoryName() {
            return conversionCategoryName(this.category);
        },
        photos() {
            return this.$store.state.photos;
        },
    },
    created() {
        const data = getData(configField);
        if (data) {
            this.$store.commit('setConfig', Object.assign({}, data));
        }
        const result = getData(resultField);
        if (result) {
            this.$store.commit('setResult', result);
        }

        const newLottery = getData(newLotteryField);
        if (newLottery) {
            const config = this.config;
            newLottery.forEach((item) => {
                this.$store.commit('setNewLottery', item);
                if (!config[item.key]) {
                    this.$set(config, item.key, 0);
                }
            });
            this.$store.commit('setConfig', config);
        }

        const list = getData(listField);
        if (list) {
            this.$store.commit('setList', list);
        }
    },

    data() {
        return {
            running: false,
            showRes: false,
            showConfig: false,
            showResult: false,
            resArr: [],
            category: '',
            audioPlaying: false,
            audioSrc: bgaudio,
        };
    },
    watch: {
        photos: {
            deep: true,
            handler() {
                this.$nextTick(() => {
                    this.reloadTagCanvas();
                });
            },
        },
    },
    mounted() {
        this.startTagCanvas();
        setTimeout(() => {
            this.getPhoto();
        }, 1000);
        window.addEventListener('resize', this.reportWindowSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.reportWindowSize);
    },
    methods: {
        reportWindowSize() {
            const AppCanvas = this.$el.querySelector('#rootcanvas');
            if (AppCanvas.parentElement) {
                AppCanvas.parentElement.removeChild(AppCanvas);
            }
            this.startTagCanvas();
        },
        playHandler() {
            this.audioPlaying = true;
        },
        pauseHandler() {
            this.audioPlaying = false;
        },
        playAudio(type) {
            if (type) {
                this.$el.querySelector('#audiobg').play();
            } else {
                this.$el.querySelector('#audiobg').pause();
            }
        },
        loadAudio() {
            this.$el.querySelector('#audiobg').load();
            this.$nextTick(() => {
                this.$el.querySelector('#audiobg').play();
            });
        },
        getPhoto() {
            database.getAll(DB_STORE_NAME).then((res) => {
                if (res && res.length > 0) {
                    this.$store.commit('setPhotos', res);
                }
            });
        },
        speed() {
            return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
        },
        createCanvas() {
            const canvas = document.createElement('canvas');
            canvas.width = document.body.offsetWidth;
            canvas.height = document.body.offsetHeight;
            canvas.id = 'rootcanvas';
            this.$el.querySelector('#main').appendChild(canvas);
        },
        startTagCanvas() {
            this.createCanvas();
            const { speed } = this;
            window.TagCanvas.Start('rootcanvas', 'tags', {
                textColour: null,
                initial: speed(),
                dragControl: 1,
                textHeight: 20,
                noSelect: true,
                lock: 'xy',
            });
        },
        reloadTagCanvas() {
            window.TagCanvas.Reload('rootcanvas');
        },
        closeRes() {
            this.showRes = false;
        },
        toggle(form) {
            console.log('toggle', form)
            const { speed, config } = this;
            if (this.running) {
                this.audioSrc = bgaudio;
                this.loadAudio();

                window.TagCanvas.SetSpeed('rootcanvas', speed());
                this.showRes = true;
                this.running = !this.running;
                this.$nextTick(() => {
                    this.reloadTagCanvas();
                });
            } else {
                this.showRes = false;
                if (!form) {
                    return;
                }

                this.audioSrc = beginaudio;
                this.loadAudio();

                const { number } = config;
                const { category, mode, qty, remain, allin } = form;
                let num = 1;
                if (mode === 1 || mode === 5) {
                    num = mode;
                } else if (mode === 0) {
                    num = remain;
                } else if (mode === 99) {
                    num = qty;
                }
                const resArr = luckydrawHandler(
                    number,
                    allin ? [] : this.allresult,
                    num
                );
                this.resArr = resArr;

                this.category = category;
                if (!this.result[category]) {
                    this.$set(this.result, category, []);
                }
                const oldRes = this.result[category] || [];
                const data = Object.assign({}, this.result, {
                    [category]: oldRes.concat(resArr),
                });
                console.log('data', data)
                this.result = data;
                window.TagCanvas.SetSpeed('rootcanvas', [5, 1]);
                this.running = !this.running;
            }
        },
    },
};
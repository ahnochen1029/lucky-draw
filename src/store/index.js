import Vue from 'vue';
import Vuex from 'vuex';
import {
    setData,
    resultField,
    newLotteryField,
    listField
} from '@/helper/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {
            name: '尾牙抽獎',
            number: 70,
            firstPrize: 2,
            secondPrize: 3,
            thirdPrize1: 8,
            thirdPrize2: 1,
            thirdPrize3: 1,
            thirdPrize4: 5,

        },
        result: {
            firstPrize: [],
            secondPrize: [],
            thirdPrize1: [],
            thirdPrize2: [],
            thirdPrize3: [],
            thirdPrize4: [],

        },
        newLottery: [],
        list: [],
        photos: []
    },
    mutations: {
        setClearConfig(state) {
            state.config = {
                name: '尾牙抽獎',
                number: 70,
                firstPrize: 2,
                secondPrize: 3,
                thirdPrize1: 8,
                thirdPrize2: 1,
                thirdPrize3: 1,
                thirdPrize4: 5,
                fourthPrize1: 24,
                fourthPrize2: 16,
                fourthPrize3: 1,
                fourthPrize4: 6,
                fourthPrize5: 2,
                fourthPrize6: 1,
            };
            state.newLottery = [];
        },
        setClearList(state) {
            state.list = [];
        },
        setClearPhotos(state) {
            state.photos = [];
        },
        setClearResult(state) {
            state.result = {
                firstPrize: [],
                secondPrize: [],
                thirdPrize1: [],
                thirdPrize2: [],
                thirdPrize3: [],
                thirdPrize4: [],
                fourthPrize1: [],
                fourthPrize2: [],
                fourthPrize3: [],
                fourthPrize4: [],
                fourthPrize5: [],
                fourthPrize6: [],
            };
        },
        setClearStore(state) {
            state.config = {
                name: '尾牙抽獎',
                number: 70,
                firstPrize: 2,
                secondPrize: 3,
                thirdPrize1: 8,
                thirdPrize2: 1,
                thirdPrize3: 1,
                thirdPrize4: 5,
                fourthPrize1: 24,
                fourthPrize2: 16,
                fourthPrize3: 1,
                fourthPrize4: 6,
                fourthPrize5: 2,
                fourthPrize6: 1,
            };
            state.result = {
                firstPrize: [],
                secondPrize: [],
                thirdPrize1: [],
                thirdPrize2: [],
                thirdPrize3: [],
                thirdPrize4: [],
                fourthPrize1: [],
                fourthPrize2: [],
                fourthPrize3: [],
                fourthPrize4: [],
                fourthPrize5: [],
                fourthPrize6: [],
            };
            state.newLottery = [];
            state.list = [];
            state.photos = [];
        },
        setConfig(state, config) {
            state.config = config;
        },
        setResult(state, result = {}) {
            state.result = result;

            setData(resultField, state.result);
        },
        setNewLottery(state, newLottery) {
            if (state.newLottery.find(item => item.name === newLottery.name)) {
                return;
            }
            state.newLottery.push(newLottery);
            setData(newLotteryField, state.newLottery);
        },
        setList(state, list) {
            const arr = state.list;
            list.forEach(item => {
                const arrIndex = arr.findIndex(data => data.key === item.key);
                if (arrIndex > -1) {
                    arr[arrIndex].name = item.name;
                } else {
                    arr.push(item);
                }
            });
            state.list = arr;

            setData(listField, arr);
        },
        setPhotos(state, photos) {
            state.photos = photos;
        }
    },
    actions: {},
    modules: {}
});

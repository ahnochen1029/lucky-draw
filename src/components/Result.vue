<template>
    <el-dialog :visible="visible" @close="$emit('update:visible', false)" width="600px" class="c-Result"
        :append-to-body="true">
        <div class="dialog-title" slot="title">
            <span :style="{ fontSize: '18px' }">
                抽獎結果
            </span>
            <span :style="{ fontSize: '14px', color: '#999', marginLeft: '10px' }">
                (點擊號碼可以刪除)
            </span>
        </div>
        <div v-for="(item, index) in resultList" :key="index" class="listrow" @click="event => {
            deleteRes(event, item);
        }
            ">
            <span class="name">
                {{ item.name }}
            </span>
            <span class="value">
                <span v-if="item.value && item.value.length === 0">
                    暫未抽獎
                </span>
                <span class="card" v-for="(data, j) in item.value" :key="j" :data-res="data">
                    {{ data }}
                </span>
            </span>
        </div>
    </el-dialog>
</template>
<script>
import logic from './scripts/ResultLogic.js'; // 根據實際路徑調整

export default {
    name: 'c-Result',
    mixins: [logic] // 使用 mixin 混入邏輯
};
</script>
<style lang="scss">
.c-Result {
    .el-dialog__body {
        max-height: 500px;
        overflow-y: auto;
    }

    .listrow {
        display: flex;
        line-height: 30px;

        .name {
            width: 200px;
            font-weight: bold;
        }

        .value {
            flex: 1;
        }

        .card {
            display: inline-block;
            // width: 40px;
            padding: 0 5px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border-radius: 4px;
            border: 1px solid #ccc;
            background-color: #f2f2f2;
            margin-left: 5px;
            margin-bottom: 5px;
            position: relative;
            cursor: pointer;

            &:hover {
                &::before {
                    content: '刪除';
                    width: 100%;
                    height: 100%;
                    background-color: #ccc;
                    position: absolute;
                    left: 0;
                    top: 0;
                    color: red;
                }
            }
        }
    }
}
</style>

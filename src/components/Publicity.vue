<template>
    <div class="c-Publicity">
        <el-carousel height="50px" :autoplay="true" indicator-position="none" arrow="never" :interval="3000">
            <el-carousel-item v-for="item in message" :key="item.key">
                <div class="item" :class="{ actiname: item.key === 0 }">
                    <span v-if="item.title" class="title"> {{ item.title }}</span>
                    <span v-if="item.value" class="value">
                        {{ item.value }}
                    </span>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import logic from './scripts/PublicityLogic.js'; // 根據實際路徑調整

export default {
    name: 'Publicity',
    mixins: [logic] // 使用 mixin 混入邏輯
};
</script>
<style lang="scss">
.c-Publicity {
    height: 100%;
    // width: 1000px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    .el-carousel {
        width: 80vw;
        margin: 0 auto;
    }

    .item {
        text-align: center;
        color: #fff;
        font-size: 16px;

        .title {
            color: #ccc;
        }

        .value {
            margin-left: 10px;
        }

        &.actiname {
            .title {
                color: red;
                font-size: 20px;
            }
        }
    }
}
</style>

<template>
    <div id="root">
        <header>
            <Publicity v-show="!running" />
            <el-button class="res" type="text" @click="showResult = true">
                抽獎結果
            </el-button>
            <el-button class="con" type="text" @click="showConfig = true">
                抽獎配置
            </el-button>
        </header>
        <div id="main" :class="{ mask: showRes }"></div>
        <div id="tags">
            <ul v-for="item in datas" :key="item.key">
                <li>
                    <a href="javascript:void(0);" :style="{
                        color: '#fff',
                    }">
                        {{ item.name ? item.name : item.key }}
                        <img v-if="item.photo" :src="item.photo" :width="50" :height="50" />
                    </a>
                </li>
            </ul>
        </div>
        <transition name="bounce">
            <div id="resbox" v-show="showRes">
                <p @click="showRes = false">{{ categoryName }}抽獎结果：</p>
                <div class="container">
                    <span v-for="item in resArr" :key="item" class="itemres" :style="resCardStyle" :data-id="item"
                        @click="showRes = false" :class="{
                            numberOver:
                                !!photos.find((d) => d.id === item) ||
                                !!list.find((d) => d.key === item),
                        }">
                        <span class="cont" v-if="!photos.find((d) => d.id === item)">
                            <span v-if="!!list.find((d) => d.key === item)" :style="{
                                fontSize: '40px',
                            }">
                                {{ list.find((d) => d.key === item).name }}
                            </span>
                            <span v-else>
                                {{ item }}
                            </span>
                        </span>
                        <img v-if="photos.find((d) => d.id === item)" :src="photos.find((d) => d.id === item).value"
                            alt="photo" :width="160" :height="160" />
                    </span>
                </div>
            </div>
        </transition>

        <el-button class="audio" type="text" @click="() => {
            playAudio(!audioPlaying);
        }
            ">
            <i class="iconfont" :class="[audioPlaying ? 'iconstop' : 'iconplay1']"></i>
        </el-button>

        <LotteryConfig :visible.sync="showConfig" @resetconfig="reloadTagCanvas" />
        <Tool @toggle="toggle" @setStart="setStart" @resetConfig="reloadTagCanvas" @getPhoto="getPhoto"
            :running="running" :closeRes="closeRes" :showStart="showStart" />
        <Result :visible.sync="showResult"></Result>

        <span class="copy-right">
            Copyright©
        </span>

        <audio id="audiobg" preload="auto" controls autoplay loop @play="playHandler" @pause="pauseHandler">
            <source :src="audioSrc" />
            你的瀏覽器不支援audio標籤
        </audio>
    </div>
</template>
<script src="./app.js"></script>
<style lang="scss">
#root {
    height: 100%;
    position: relative;
    background-image: url('./assets/bg1.jpg');
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #121936;

    .mask {
        -webkit-filter: blur(5px);
        filter: blur(5px);
    }

    header {
        height: 50px;
        line-height: 50px;
        position: relative;

        .el-button {
            position: absolute;
            top: 17px;
            padding: 0;
            z-index: 9999;

            &.con {
                right: 20px;
            }

            &.res {
                right: 100px;
            }
        }
    }

    .audio {
        position: absolute;
        top: 100px;
        right: 30px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #fff;
        border-radius: 50%;
        padding: 0;
        text-align: center;

        .iconfont {
            position: relative;
            left: 1px;
        }
    }

    .copy-right {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #ccc;
        font-size: 12px;
    }

    .bounce-enter-active {
        animation: bounce-in 1.5s;
    }

    .bounce-leave-active {
        animation: bounce-in 0s reverse;
    }
}

#main {
    height: 100%;
}

#resbox {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1280px;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;

    p {
        color: red;
        font-size: 50px;
        line-height: 120px;
    }

    .container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .itemres {
        background: #fff;
        width: 160px;
        height: 160px;
        border-radius: 4px;
        border: 1px solid #ccc;
        line-height: 160px;
        font-weight: bold;
        margin-right: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .cont {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &.numberOver::before {
            content: attr(data-id);
            width: 30px;
            height: 22px;
            line-height: 22px;
            background-color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 14px;
            // border-radius: 50%;
            z-index: 1;
        }
    }
}
</style>

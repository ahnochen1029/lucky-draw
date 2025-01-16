<template>
    <el-dialog :visible="visible" :append-to-body="true" width="390px" @close="$emit('update:visible', false)"
        class="c-LotteryConfig">
        <div class="c-LotteryConfigtitle" slot="title">
            <span :style="{ fontSize: '16px', marginRight: '20px' }">
                抽獎配置
            </span>
            <el-button size="mini" @click="addLottery">增加獎項</el-button>
            <el-button size="mini" type="primary" @click="onSubmit">儲存配置</el-button>
            <el-button size="mini" @click="$emit('update:visible', false)">取消</el-button>
        </div>
        <div class="container">
            <el-form ref="form" :model="form" size="mini">
                <el-form-item label="抽獎標題">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="抽獎總人數">
                    <el-input type="number" v-model="form.number" :min="1" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="頭獎">
                    <el-input type="number" v-model="form.firstPrize" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="二獎">
                    <el-input type="number" v-model="form.secondPrize" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="三獎-郵政禮券">
                    <el-input type="number" v-model="form.thirdPrize1" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="三獎-遠東百貨禮券">
                    <el-input type="number" v-model="form.thirdPrize2" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="三獎-SOGO禮卷">
                    <el-input type="number" v-model="form.thirdPrize3" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="三獎-現金">
                    <el-input type="number" v-model="form.thirdPrize4" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-現金">
                    <el-input type="number" v-model="form.fourthPrize1" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-郵政禮券">
                    <el-input type="number" v-model="form.fourthPrize2" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-Lenovo Tab M10">
                    <el-input type="number" v-model="form.fourthPrize3" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-新光三越禮券">
                    <el-input type="number" v-model="form.fourthPrize4" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-禮券">
                    <el-input type="number" v-model="form.fourthPrize5" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item label="四獎-電熱水瓶">
                    <el-input type="number" v-model="form.fourthPrize6" :min="0" :step="1"></el-input>
                </el-form-item>
                <el-form-item :label="newitem.name" v-for="newitem in storeNewLottery" :key="newitem.key">
                    <el-input type="number" :min="0" :step="1" v-model="form[newitem.key]" @change="val => {
                        form[newitem.key] = Number(val);
                    }"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog :visible.sync="showAddLottery" :append-to-body="true" width="300px" class="dialog-showAddLottery">
            <div class="add-title" slot="title">增加獎項</div>
            <el-form ref="newLottery" :model="newLottery" size="mini">
                <el-form-item label="獎項名稱">
                    <el-input v-model="newLottery.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addHandler">增加獎項</el-button>
                    <el-button @click="showAddLottery = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-dialog>
</template>
<script>
import logic from './scripts/LotteryConfigLogic.js'; // 根據實際路徑調整

export default {
    name: 'LotteryConfig',
    mixins: [logic] // 使用 mixin 混入邏輯
};
</script>
<style lang="scss">
.c-LotteryConfig {
    .el-dialog__body {
        height: 340px;

        .container {
            height: 100%;
            overflow-y: auto;
            padding: 0 10px;
        }
    }
}

.dialog-showAddLottery {
    .el-dialog {
        height: 186px;
    }
}
</style>

<template>
    <div id="tool">
        <el-button @click="startHandler" type="primary" size="mini">{{
            running ? '停止' : '開始'
            }}</el-button>
        <el-button size="mini" @click="showRemoveoptions = true">
            重置
        </el-button>
        <el-button size="mini" @click="showImport = true">
            導入名單
        </el-button>
        <el-button size="mini" @click="showImportphoto = true">
            導入照片
        </el-button>
        <el-dialog :append-to-body="true" :visible.sync="showSetwat" class="setwat-dialog" width="400px">
            <el-form ref="form" :model="form" label-width="80px" size="mini">
                <el-form-item label="抽取獎項">
                    <el-select v-model="form.category" placeholder="請選取本次抽取的獎項">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in categorys"
                            :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label=" " v-if="form.category">
                    <span>
                        共&nbsp;
                        <span class="colorred">{{ config[form.category] }}</span>
                        &nbsp;名
                    </span>
                    <span :style="{ marginLeft: '20px' }">
                        剩餘&nbsp;
                        <span class="colorred">{{ remain }}</span>
                        &nbsp;名
                    </span>
                </el-form-item>

                <el-form-item label="抽取方式">
                    <el-select v-model="form.mode" placeholder="請選取本次抽取方式">
                        <el-option label="抽1人" :value="1"></el-option>
                        <el-option label="抽5人" :value="5"></el-option>
                        <el-option label="一次抽取完" :value="0"></el-option>
                        <el-option label="自定義" :value="99"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="抽取人數" v-if="form.mode === 99">
                    <el-input v-model="form.qty" type="number" :clearable="true" :min="1" :max="remain ? remain : 100"
                        :step="1"></el-input>
                </el-form-item>

                <el-form-item label="全員參與">
                    <el-switch v-model="form.allin"></el-switch>
                    <span :style="{ fontSize: '12px' }">
                        （開啟後將在全體成員「無論有無中獎」中抽獎）
                    </span>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即抽獎</el-button>
                    <el-button @click="showSetwat = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :append-to-body="true" :visible.sync="showImport" class="import-dialog" width="400px">
            <el-input type="textarea" :rows="10" placeholder="請輸入對應的號碼與名單(可直接從excel複製)，格式(號碼 名字)，導入的名單將代替號碼顯示在抽獎中。如：
1 小明
2 小王
3 小玉
				" v-model="listStr"></el-input>
            <div class="footer">
                <el-button size="mini" type="primary" @click="transformList">確定</el-button>
                <el-button size="mini" @click="showImport = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- <Importphoto :visible.sync="showImportphoto" @getPhoto="$emit('getPhoto')"></Importphoto> -->

        <el-dialog :visible.sync="showRemoveoptions" width="300px" class="c-removeoptions" :append-to-body="true">
            <el-form ref="form" :model="removeInfo" label-width="80px" size="mini">
                <el-form-item label="重置選項">
                    <el-radio-group v-model="removeInfo.type">
                        <el-radio border :label="0">重置全部數據</el-radio>
                        <el-radio border :label="1">重置抽獎配置</el-radio>
                        <el-radio border :label="2">重置名單</el-radio>
                        <el-radio border :label="3">重置照片</el-radio>
                        <el-radio border :label="4">重置抽獎结果</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetConfig">確定重置</el-button>
                    <el-button @click="showRemoveoptions = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import ToolLogic from './scripts/ToolLogic.js'; // 根據實際路徑調整

export default {
    name: 'Tool',
    mixins: [ToolLogic]
};
</script>
<style lang="scss">
#tool {
    position: fixed;
    width: 60px;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .el-button+.el-button {
        margin-top: 20px;
        margin-left: 0px;
    }
}

.setwat-dialog {
    .colorred {
        color: red;
        font-weight: bold;
    }
}

.import-dialog {
    .footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
}

.c-removeoptions {
    .el-dialog {
        height: 290px;
    }

    .el-radio.is-bordered+.el-radio.is-bordered {
        margin-left: 0px;
    }

    .el-radio.is-bordered {
        margin-bottom: 10px;
    }
}
</style>

<template>
    <div>
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-people">
                        <i class="el-icon-notebook-1 card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">试卷总量</div>
                        <count-to :start-val="0" :end-val="136" :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-message">
                        <i class="el-icon-document-copy card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">试题总量</div>
                        <count-to :start-val="0" :end-val="1520" :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-money">
                        <i class="el-icon-download card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">下载总量</div>
                        <count-to :start-val="0" :end-val="240" :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-shopping">
                        <i class="el-icon-user card-panel-icon"></i>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">用户总量</div>
                        <count-to :start-val="0" :end-val="102" :duration="2600" class="card-panel-num" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row style="background:#f0f2f5;padding:16px 16px 0;margin:32px 0;">
            <line-chart :chart-data="lineChartData" />
        </el-row>
    </div>
</template>

<script>
import LineChart from './LineChart'
import CountTo from 'vue-count-to'
export default {
    name: 'Dashboard',
    components: { LineChart, CountTo },
    data () {
        return {
            lineChartData: {
                expectedData: [100, 120, 161, 134, 105, 160, 165],
                actualData: [120, 82, 91, 154, 162, 140, 145]
            }
        }
    }
}
</script>

<style lang="less" scoped>
.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        // background: #fff;
        background: #f0f2f5;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-message {
            color: #36a3f7;
        }

        .icon-money {
            color: #f4516c;
        }

        .icon-shopping {
            color: #34bfa3
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}
</style>

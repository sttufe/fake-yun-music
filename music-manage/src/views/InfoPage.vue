<template>
    <el-row :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="card-content">
                    <div class="card-left">
                        <el-icon>
                            <user />
                        </el-icon>
                    </div>
                    <div class="card-right">
                        <div class="card-num">{{ userCount }}</div>
                        <div>用户总数</div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="card-content">
                    <div class="card-left">
                        <el-icon>
                            <headset />
                        </el-icon>
                    </div>
                    <div class="card-right">
                        <div class="card-num">{{ songCount }}</div>
                        <div>歌曲总数</div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="card-content">
                    <div class="card-left">
                        <el-icon>
                            <mic />
                        </el-icon>
                    </div>
                    <div class="card-right">
                        <div class="card-num">{{ singerCount }}</div>
                        <div>歌手数量</div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="card-content">
                    <div class="card-left">
                        <el-icon>
                            <document />
                        </el-icon>
                    </div>
                    <div class="card-right">
                        <div class="card-num">{{ songListCount }}</div>
                        <div>歌单数量</div>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <h3>用户性别比例</h3>
            <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="userSex"></el-card>
        </el-col>
        <el-col :span="12">
            <h3>歌曲类型</h3>
            <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="songStyle"></el-card>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <h3>歌手性别比例</h3>
            <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="singerSex"></el-card>
        </el-col>
        <el-col :span="12">
            <h3>歌手国籍</h3>
            <el-card class="cav-info" shadow="hover" :body-style="{ padding: '0px' }" id="country"></el-card>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="8">
            <h3>圆饼</h3>
            <el-card class="cav-info1" shadow="hover" :body-style="{ padding: '0px' }" id="symbol"></el-card>
        </el-col>
        <el-col :span="8">
            <h3>线条</h3>
            <el-card class="cav-info1" shadow="hover" :body-style="{ padding: '0px' }" id="custme"></el-card>
        </el-col>
        <el-col :span="8">
            <h3>柱形</h3>
            <el-card class="cav-info1" shadow="hover" :body-style="{ padding: '0px' }" id="score"></el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
// import { ref, reactive, getCurrentInstance } from "vue";
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import { Mic, Document, User, Headset } from "@element-plus/icons-vue";
import { HttpManager } from "@/api/index";

// const { proxy } = getCurrentInstance();
const userCount = ref(0);
const songCount = ref(0);
const singerCount = ref(0);
const songListCount = ref(0);
const userSex = reactive({
    series: [
        {
            type: "pie",
            data: [
                {
                    value: 0,
                    name: "男",
                },
                {
                    value: 0,
                    name: "女",
                },
            ],
        },
    ],
});
const songStyle = reactive({
    xAxis: {
        type: "category",
        data: ["华语", "粤语", "欧美", "日韩", "BGM", "轻音乐", "乐器"],
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: "bar",
            barWidth: "20%",
        },
    ],
});
const singerSex = reactive({
    series: [
        {
            type: "pie",
            data: [
                {
                    value: 0,
                    name: "男",
                },
                {
                    value: 0,
                    name: "女",
                },
            ],
        },
    ],
});
const country = reactive({
    xAxis: {
        type: "category",
        data: [
            "中国",
            "韩国",
            "意大利",
            "新加坡",
            "美国",
            // "马来西亚",
            "西班牙",
            "日本",
        ],
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            type: "bar",
            barWidth: "20%",
        },
    ],
});

function setSex(sex, arr) {
    let value = 0;
    const name = sex === 0 ? "男" : "女";
    for (let item of arr) {
        if (sex === item.sex) {
            value++;
        }
    }
    return { value, name };
}
HttpManager.getAllUser().then((res) => {
    const result = res as ResponseBody;
    userCount.value = result.data.length;
    userSex.series[0].data.push(setSex(0, result.data));
    userSex.series[0].data.push(setSex(1, result.data));

    // const userSexChart = echarts.init(proxy.$refs.userSex);
    const userSexChart = echarts.init(document.getElementById("userSex"));
    userSexChart.setOption(userSex);
});

HttpManager.getAllSong().then((res) => {
    songCount.value = (res as ResponseBody).data.length;
});
HttpManager.getSongList().then((res) => {
    const result = res as ResponseBody;
    songListCount.value = result.data.length;
    for (let item of result.data) {
        for (let i = 0; i < songStyle.xAxis.data.length; i++) {
            if (item.style.includes(songStyle.xAxis.data[i])) {
                songStyle.series[0].data[i]++;
            }
        }
    }
    // const songStyleChart = echarts.init(proxy.$refs.songStyle);
    const songStyleChart = echarts.init(document.getElementById("songStyle"));
    songStyleChart.setOption(songStyle);
});

HttpManager.getAllSinger().then((res) => {
    const result = res as ResponseBody;
    singerCount.value = result.data.length;
    singerSex.series[0].data.push(setSex(0, result.data));
    singerSex.series[0].data.push(setSex(1, result.data));
    const singerSexChart = echarts.init(document.getElementById("singerSex"));
    singerSexChart.setOption(singerSex);

    for (let item of result.data) {
        for (let i = 0; i < country.xAxis.data.length; i++) {
            if (item.location.includes(country.xAxis.data[i])) {
                country.series[0].data[i]++;
            }
        }
    }
    const countryChart = echarts.init(document.getElementById("country"));
    countryChart.setOption(country);
});


const symbol = reactive({
    xAxis: {},
    yAxis: {},
    series: [
        {
            symbolSize: 20,
            data: [
                [10.0, 8.04],
                [8.07, 6.95],
                [13.0, 7.58],
                [9.05, 8.81],
                [11.0, 8.33],
                [14.0, 7.66],
                [13.4, 6.81],
                [10.0, 6.33],
                [14.0, 8.96],
                [12.5, 6.82],
                [9.15, 7.2],
                [11.5, 7.2],
                [3.03, 4.23],
                [12.2, 7.83],
                [2.02, 4.47],
                [1.05, 3.33],
                [4.05, 4.96],
                [6.03, 7.24],
                [12.0, 6.26],
                [12.0, 8.84],
                [7.08, 5.82],
                [5.02, 5.68]
            ],
            type: 'scatter'
        }
    ]
});


const custmePie = reactive({
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip: {
        trigger: 'item'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 274, name: 'Union Ads' },
                { value: 235, name: 'Video Ads' },
                { value: 400, name: 'Search Engine' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
});

const score = reactive({
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
        {
            name: 'Pressure',
            type: 'gauge',
            progress: {
                show: true
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}'
            },
            data: [
                {
                    value: 50,
                    name: 'SCORE'
                }
            ]
        }
    ]
})

onMounted(() => {
    const symbolPic = echarts.init(document.getElementById("symbol")).setOption(symbol);
    const custmPiePic = echarts.init(document.getElementById("custme")).setOption(custmePie);
    const scorePic = echarts.init(document.getElementById("score")).setOption(score);


})
</script>

<style scoped>
.card-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    padding-left: 20%;
    text-align: center;
}

.card-left {
    display: flex;
    font-size: 3rem;
}

.card-right {
    flex: 1;
    font-size: 14px;
}

.card-num {
    font-size: 30px;
    font-weight: bold;
}

h3 {
    margin: 10px 0;
    text-align: center;
}

.cav-info {
    border-radius: 12px;
    overflow: hidden;
    height: 250px;
    background-color: white;
}

.cav-info1 {
    border-radius: 6px;
    height: 250px;
    background: white;
}
</style>

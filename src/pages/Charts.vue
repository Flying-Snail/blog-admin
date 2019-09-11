<template>
  <div class="main">
    <div id="charts1" class="charts1"></div>
    <div id="charts2" class="charts1"></div>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let charts1 = this.$echarts.init(document.querySelector("#charts1"));
      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: "网站日访问量",
          x: "center",
          align: "right"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          type: "category",
          data: [
            "19-06-12",
            "19-06-13",
            "19-06-14",
            "19-06-15",
            "19-06-16",
            "19-06-17"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [10, 16, 11, 6, 0, 5, 20],
            type: "line",
            smooth: true
          }
        ]
      };
      let charts2 = this.$echarts.init(document.querySelector("#charts2"));
      let option2 = {
        title: {
          text: "用户访问来源统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["PC端", "移动端"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 60, name: "PC端" },
              { value: 8, name: "移动端" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      charts1.setOption(option1)
      charts2.setOption(option2)
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="stylus" scoped>
.main {
  padding-top: 20px;
}

.charts1 {
  width: 90%;
  height: 350px;
}
</style>

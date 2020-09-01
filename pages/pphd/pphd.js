import * as echarts from '../../ec-canvas/echarts';
import {env} from '../../profile.js'
var chart=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: function initChart(canvas, width, height) {
         chart = echarts.init(canvas, null, {
          width: width,
          height: height,
		  devicePixelRatio:2.5
        });
        canvas.setChart(chart);
        return chart;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: env.url+'/statistics/productInit',
     method: 'GET',
     success(res) {
         console.log(res);
         chart.setOption(
		 { 
          grid:{
            x:0,
            y:0,
            x2:0,
            y2:0,
            borderWidth:1,
        },
           // ===================================option内容
           color: ['#3398DB'],
    tooltip: {
        // trigger: 'axis',
        // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        // }
    },

    grid: {
        left: '12%',
        right: '20%',
		top:'30%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
			name:'活动名称',
            data: ['训练营', '开发者大赛'],
            axisTick: {
                alignWithLabel: true
            },
			splitLine:{show:false}
        }
    ],
    yAxis: [
        {
            type: 'value',
			name:'活动举办次数（次）',
			splitLine:{show:false}
        }
    ],
    series: [
        {
            name: '人数',
            type: 'bar',
            barWidth: '30%',
            data: [4, 1],
            itemStyle: {        //上方显示数值
              normal: {
                  label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                          color: 'black',
                          fontSize: 16
                      }
                  }
              }
          }
        }
    ]
        // ===================================option内容
        }

		);
      }
   })
   wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
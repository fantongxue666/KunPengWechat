import * as echarts from '../../ec-canvas/echarts';
import {env} from '../../profile.js'
let chart=null;
Page({
  toMain:function(){
    wx.navigateTo({
      url: '../main/main',
    })
  },
  data: {
    list:[],
    one_one_xtzs:'', one_one_xtzs_percent:'',
    one_one_yzsdj:'',one_one_yzsdj_percent:'',
    one_one_ytysp:'',one_one_ytysp_percent:'',
    one_one_bdsp:'',one_one_bdsp_percent:'',
    one_one_zbsp:'',one_one_zbsp_percent:'',

    two_two_xtzs:'', two_two_xtzs_percent:'',
    two_two_yzsdj:'',two_two_yzsdj_percent:'',
    two_two_ytysp:'',two_two_ytysp_percent:'',
    two_two_bdsp:'',two_two_bdsp_percent:'',
    two_two_zbsp:'',two_two_zbsp_percent:'',

    three_three_xtzs:'', three_three_xtzs_percent:'',
    three_three_yzsdj:'',three_three_yzsdj_percent:'',
    three_three_ytysp:'',three_three_ytysp_percent:'',
    three_three_bdsp:'',three_three_bdsp_percent:'',
    three_three_zbsp:'',three_three_zbsp_percent:'',

    four_four_xtzs:'', four_four_xtzs_percent:'',
    four_four_yzsdj:'',four_four_yzsdj_percent:'',
    four_four_ytysp:'',four_four_ytysp_percent:'',
    four_four_bdsp:'',four_four_bdsp_percent:'',
    four_four_zbsp:'',four_four_zbsp_percent:'',



    currentTabsIndex:1,
    res:[],
    currentTabsIndex1:1,
    currentTabsIndex2:1,
    currentTabsIndex3:1,
    ec: {
		
      onInit: function initChart(canvas, width, height) {
         chart = echarts.init(canvas, null, {
          width: width,
          height: height,
      devicePixelRatio:2.25
        });
        canvas.setChart(chart);
		// console.log(chart)
        return chart;
      }
    },
  },
  test:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex:index
    });
  },
  test1:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex1:index
    });
  },
  test2:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex2:index
    });
  },
  lala:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex3:index
    });

        //八周内新增产品数量
        wx.request({
          url: env.url+'/statistics/eightWeekNumber',
          data:{
            status:2
          },
         method: 'GET',
         success(res) {
			 console.log(res)
          var data=null;
		 
          if(index==1){
            data=res.data.addProductNumber.adaptStartDate;
          }else if(index==2){
            data=res.data.addProductNumber.adaptEndDate;
          }else if(index==3){
            data=res.data.addProductNumber.testStartDate;
          }else if(index==4){
            data=res.data.addProductNumber.testEndDate;
          }else if(index==5){
            data=res.data.addProductNumber.reviewEndDate;
          }else if(index==6){
            data=res.data.addProductNumber.certificationEndDate;
          }
		 
		  
             chart.setOption({
              grid:{
                x:20,
                y:10,
                x2:20,
                y2:46,
                borderWidth:1
            },
               // ===================================option内容
               tooltip: {
                trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: res.data.addProductNumber.dateTime,
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize:9
                  }
             },
             axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            },
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize: 5
                }
            },
            show:false,
            axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            },
            splitLine:{
              show:false//不显示网格线
          },
          },
            series: [
                {
                    name: '提交方案认证',
                    type: 'line',
                    data: data,
                    smooth: true,
					// symbol:'none',
                    areaStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1, [{
                              offset: 0,
                              color: '#7744FF'
                            },
                            {
                              offset: 1,
                              color: 'white'
                            }
                          ]
                        )
                      }
                    },
                    itemStyle : { 
                      normal : { 
                      // color:'#275F82', //改变折线点的颜色
                      lineStyle:{ 
                      color:'#9F88FF' //改变折线颜色
                      } 
                      } 
                      },
                 },
                 
              
            ]
              //================================option内容
             },true);
			 return chart;
          }
       })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
	
    // 合作院校
     wx.request({
      url: env.url+'/wechat/hzgxList',
     method: 'POST',
     success(res) {
       console.log("合作院校")
         console.log(res)
         that.setData({
           list:res.data
         });
         // wx.hideLoading();
      },
	  // fail:function(res){
	  // 	wx.hideLoading()
	  // }
   })
    

    // 八周内新增产品数量
   //  wx.request({
   //    url: env.url+'/statistics/eightWeekNumber',
   //    data:{
   //      status:2
   //    },
   //   method: 'GET',
   //   success(res) {
   //     console.log("123456789")
   //       console.log(res)
		 // console.log(chart)
		 // console.log(chart.setOption)
		 // var data=res.data.addProductNumber.adaptStartDate;
		 
   //       chart.setOption({
   //        grid:{
   //          x:20,
   //          y:10,
   //          x2:20,
   //          y2:46,
   //          borderWidth:1
   //      },
   //         // ===================================option内容
   //         tooltip: {
   //          trigger: 'axis'
   //      },
   //      xAxis: {
   //          type: 'category',
   //          boundaryGap: false,
   //          data: res.data.addProductNumber.dateTime,
   //          axisLabel: {
   //            show: true,
   //            textStyle: {
   //              fontSize: 5
   //              }
   //         },
   //         axisTick:{
   //          show:false//不显示坐标轴刻度线
   //        },
   //        axisLine: {
   //          show: false,//不显示坐标轴线
   //        },
   //      },
   //      yAxis: {
   //          type: 'value',
   //          axisLabel: {
   //            show: true,
   //            textStyle: {
   //              fontSize: 5
   //            }
   //        },
   //        show:false,
   //        axisTick:{
   //          show:false//不显示坐标轴刻度线
   //        },
   //        axisLine: {
   //          show: false,//不显示坐标轴线
   //        },
   //        splitLine:{
   //          show:false//不显示网格线
   //      },
   //      },
   //      series: [
   //          {
   //              name: '提交方案认证',
   //              type: 'line',
   //              data:data,
   //              smooth: true,
   //              areaStyle: {
   //                normal: {
   //                  color: new echarts.graphic.LinearGradient(
   //                    0, 0, 0, 1, [{
   //                        offset: 0,
   //                        color: '#7744FF'
   //                      },
   //                      {
   //                        offset: 1,
   //                        color: 'white'
   //                      }
   //                    ]
   //                  )
   //                }
   //              },
   //              itemStyle : { 
   //                normal : { 
   //                // color:'#275F82', //改变折线点的颜色
   //                lineStyle:{ 
   //                color:'#9F88FF' //改变折线颜色
   //                } 
   //                } 
   //                },
   //           }
   //      ]
   //        //================================option内容
   //       },true);
   //    }
   // })
    
   
    //ISV拓展信息
    wx.request({ 
      url: env.url+'/statistics/st3',
      data:{
        "hy":''
      },
     method: 'GET',
     success(res) {
      console.log("333333333333")
         console.log(res)
         var array1=res.data[0];
         var array2=res.data[1];
         var array1_allNum=0;
         var array2_allNum=0;
         for(let i=0;i<array1.length;i++){
           array1_allNum+=array1[i];
         }
         for(let i=0;i<array2.length;i++){
          array2_allNum+=array2[i];
        }
        
         that.setData({
           one_one_xtzs:array1[0],one_one_xtzs_percent:Math.round(array1[0]/ (array1_allNum) * 10000) / 100.00,
           one_one_yzsdj:array1[1],one_one_yzsdj_percent:Math.round(array1[1]/ (array1_allNum) * 10000) / 100.00,
           one_one_ytysp:array1[2],one_one_ytysp_percent:Math.round(array1[2]/ (array1_allNum) * 10000) / 100.00,
           one_one_bdsp:array1[3],one_one_bdsp_percent:Math.round(array1[3]/ (array1_allNum) * 10000) / 100.00,
           one_one_zbsp:array1[4],one_one_zbsp_percent:Math.round(array1[4]/ (array1_allNum) * 10000) / 100.00,
           two_two_xtzs:array2[0],two_two_xtzs_percent:Math.round(array2[0]/ (array2_allNum) * 10000) / 100.00,
           two_two_yzsdj:array2[1],two_two_yzsdj_percent:Math.round(array2[1]/ (array2_allNum) * 10000) / 100.00,
           two_two_ytysp:array2[2],two_two_ytysp_percent:Math.round(array2[2]/ (array2_allNum) * 10000) / 100.00,
           two_two_bdsp:array2[3],two_two_bdsp_percent:Math.round(array2[3]/ (array2_allNum) * 10000) / 100.00,
           two_two_zbsp:array2[4],two_two_zbsp_percent:Math.round(array2[4]/ (array2_allNum) * 10000) / 100.00,
         });

      }
   })

   //适配认证信息
   wx.request({
    url: env.url+'/statistics/st4',
   method: 'GET',
   success(res) {
    console.log("111222")
       console.log(res)
       var array1=res.data[0];
         var array2=res.data[1];
         var array1_allNum=0;
         var array2_allNum=0;
         for(let i=0;i<array1.length;i++){
           array1_allNum+=array1[i];
         }
         for(let i=0;i<array2.length;i++){
          array2_allNum+=array2[i];
        }
        
         that.setData({
           three_three_xtzs:array1[0],three_three_xtzs_percent:Math.round(array1[0]/ (array1_allNum) * 10000) / 100.00,
           three_three_yzsdj:array1[1],three_three_yzsdj_percent:Math.round(array1[1]/ (array1_allNum) * 10000) / 100.00,
           three_three_ytysp:array1[2],three_three_ytysp_percent:Math.round(array1[2]/ (array1_allNum) * 10000) / 100.00,
           three_three_bdsp:array1[3],three_three_bdsp_percent:Math.round(array1[3]/ (array1_allNum) * 10000) / 100.00,
           three_three_zbsp:array1[4],three_three_zbsp_percent:Math.round(array1[4]/ (array1_allNum) * 10000) / 100.00,
           four_four_xtzs:array2[0],four_four_xtzs_percent:Math.round(array2[0]/ (array2_allNum) * 10000) / 100.00,
           four_four_yzsdj:array2[1],four_four_yzsdj_percent:Math.round(array2[1]/ (array2_allNum) * 10000) / 100.00,
           four_four_ytysp:array2[2],four_four_ytysp_percent:Math.round(array2[2]/ (array2_allNum) * 10000) / 100.00,
           four_four_bdsp:array2[3],four_four_bdsp_percent:Math.round(array2[3]/ (array2_allNum) * 10000) / 100.00,
           four_four_zbsp:array2[4],four_four_zbsp_percent:Math.round(array2[4]/ (array2_allNum) * 10000) / 100.00,
         });

    }
 })

 //项目维度整体业务系统进度
 wx.request({
  url: env.url+'/statistics/productInit',
 method: 'GET',
 success(res) {
     console.log(res)

  }
})


   wx.hideLoading();
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	   // 八周内新增产品数量
 wx.request({
      url: env.url+'/statistics/eightWeekNumber',
      data:{
        status:2
      },
     method: 'GET',
     success(res) {
       console.log("123456789")
         console.log(res)
		 // console.log(chart)
		 // console.log(chart.setOption)
		 var data=res.data.addProductNumber.adaptStartDate;
		 
         chart.setOption({
          grid:{
            x:20,
            y:10,
            x2:20,
            y2:46,
            borderWidth:1
        },
           // ===================================option内容
           tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.data.addProductNumber.dateTime,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 9
                }
           },
           axisTick:{
            show:false//不显示坐标轴刻度线
          },
          axisLine: {
            show: false,//不显示坐标轴线
          },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 5
              }
          },
          show:false,
          axisTick:{
            show:false//不显示坐标轴刻度线
          },
          axisLine: {
            show: false,//不显示坐标轴线
          },
          splitLine:{
            show:false//不显示网格线
        },
        },
        series: [
            {
                name: '提交方案认证',
                type: 'line',
                data:data,
                smooth: true,
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1, [{
                          offset: 0,
                          color: '#7744FF'
                        },
                        {
                          offset: 1,
                          color: 'white'
                        }
                      ]
                    )
                  }
                },
                itemStyle : { 
                  normal : { 
                  // color:'#275F82', //改变折线点的颜色
                  lineStyle:{ 
                  color:'#9F88FF' //改变折线颜色
                  } 
                  } 
                  },
             }
        ]
          //================================option内容
         },true);
 
	  },
	  
   })
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
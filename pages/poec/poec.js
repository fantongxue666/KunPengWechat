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
		  // devicePixelRatio:2.5
        });
        canvas.setChart(chart);
        return chart;
      }
    },
    nvalist:[
      { text: '全部' },
      { text: '交通' },
      { text: '电力' },
      { text: '大企业' },
      { text: '数字政府' },
      { text: '安平' },
      { text: '教育' },
      { text: '运营商' },
      { text: '医疗' },
      { text: '互联网' },
    ],
    currenentIndexNav:0,// 0：全部  1：交通  2：电力  3：大企业  4：数字政府  5：安平  6：教育  7：运营商  8：医疗  9：互联网
    currentTabsValue:1, //  1：累计企业   2：累计产品数量
    one_one_xtzs:'', one_one_xtzs_percent:'',
    one_one_yzsdj:'',one_one_yzsdj_percent:'',
    one_one_ytysp:'',one_one_ytysp_percent:'',
    one_one_bdsp:'',one_one_bdsp_percent:'',
    one_one_zbsp:'',one_one_zbsp_percent:'',
    three_three_xtzs:'', three_three_xtzs_percent:'',
    three_three_yzsdj:'',three_three_yzsdj_percent:'',
    three_three_ytysp:'',three_three_ytysp_percent:'',
    three_three_bdsp:'',three_three_bdsp_percent:'',
    three_three_zbsp:'',three_three_zbsp_percent:'',
   
  },

  tabs:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsValue:index
    });
   this.publicMethod();
   this.publicMethodTwo();

  },
 
  publicMethodTwo:function(){
    var index1=this.data.currenentIndexNav;
    var index2=this.data.currentTabsValue;
    var params='';
    if(index1==0){
      //全部

    }else if(index1==1){
      params='38';
    }else if(index1==2){
      //电力

    }else if(index1==3){
      params='dqy';
    }else if(index1==4){
      params='30';
    }else if(index1==5){
      params='39';
    }else if(index1==6){
      params='28';
    }else if(index1==7){
      params='37';
    }else if(index1==8){
      params='31';
    }else if(index1==9){
      params='32';
    }
    var that=this;
    //适配认证信息
   wx.request({
    url: env.url+'/statistics/st10',
    data:{
      "hy":params
    },
   method: 'GET',
   success(res) {
       console.log("适配认证信息")
       console.log(res.data)
       var array1=res.data[0];
         var array2=res.data[1];
         var array1_allNum=0;
         var array2_allNum=0;
         var array1_max=0;
         var array2_max=0;
         for(let i=0;i<array1.length;i++){
           array1_allNum+=array1[i];
           if(array1_max<array1[i]){
            array1_max=array1[i];
          }
         }
         for(let i=0;i<array2.length;i++){
          array2_allNum+=array2[i];
          if(array2_max<array2[i]){
            array2_max=array2[i];
          }
        }
        if(index2==1){
          that.setData({
            three_three_xtzs:array1[0],three_three_xtzs_percent:Math.round(array1[0]/ (array1_max) * 10000) / 100.00,
            three_three_yzsdj:array1[1],three_three_yzsdj_percent:Math.round(array1[1]/ (array1_max) * 10000) / 100.00,
            three_three_ytysp:array1[2],three_three_ytysp_percent:Math.round(array1[2]/ (array1_max) * 10000) / 100.00,
            three_three_bdsp:array1[3],three_three_bdsp_percent:Math.round(array1[3]/ (array1_max) * 10000) / 100.00,
            three_three_zbsp:array1[4],three_three_zbsp_percent:Math.round(array1[4]/ (array1_max) * 10000) / 100.00
          });
        }else if(index2==2){
          that.setData({
            three_three_xtzs:array2[0],three_three_xtzs_percent:Math.round(array2[0]/ (array2_max) * 10000) / 100.00,
            three_three_yzsdj:array2[1],three_three_yzsdj_percent:Math.round(array2[1]/ (array2_max) * 10000) / 100.00,
            three_three_ytysp:array2[2],three_three_ytysp_percent:Math.round(array2[2]/ (array2_max) * 10000) / 100.00,
            three_three_bdsp:array2[3],three_three_bdsp_percent:Math.round(array2[3]/ (array2_max) * 10000) / 100.00,
            three_three_zbsp:array2[4],three_three_zbsp_percent:Math.round(array2[4]/ (array2_max) * 10000) / 100.00,
          });
        }
        

    }
 })
  },
  publicMethod:function(){
    var index1=this.data.currenentIndexNav;
    var index2=this.data.currentTabsValue;
    var params='';
    if(index1==0){
      
    }else if(index1==1){
      params='01';
    }else if(index1==2){
      params='02';
    }else if(index1==3){
      params='03';
    }else if(index1==4){
      params='04';
    }else if(index1==5){
      params='05';
    }else if(index1==6){
      params='06';
    }else if(index1==7){
      params='07';
    }else if(index1==8){
      params='08';
    }else if(index1==9){
      params='11';
    }

    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
    //ISV拓展信息
    wx.request({ 
      url: env.url+'/statistics/st3',
      data:{
        "hy":params
      },
    method: 'GET',
    success(res) {
        console.log(res)
        var array1=res.data[0];
        var array2=res.data[1];
        var array1_allNum=0;
        var array2_allNum=0;
        var array1_max=0;
        var array2_max=0;
        for(let i=0;i<array1.length;i++){
          array1_allNum+=array1[i];
          if(array1_max<array1[i]){
            array1_max=array1[i];
          }
        }
        for(let i=0;i<array2.length;i++){
          array2_allNum+=array2[i];
          if(array2_max<array2[i]){
            array2_max=array2[i];
          }
        }
        console.log("######## array1_max #########"+array1_max)
        console.log("####### array2_max ##########"+array2_max)
        
        if(index2==1){
          that.setData({
            one_one_xtzs:array1[0],one_one_xtzs_percent:Math.round(array1[0]/ (array1_max) * 10000) / 100.00,
            one_one_yzsdj:array1[1],one_one_yzsdj_percent:Math.round(array1[1]/ (array1_max) * 10000) / 100.00,
            one_one_ytysp:array1[2],one_one_ytysp_percent:Math.round(array1[2]/ (array1_max) * 10000) / 100.00,
            one_one_bdsp:array1[3],one_one_bdsp_percent:Math.round(array1[3]/ (array1_max) * 10000) / 100.00,
            one_one_zbsp:array1[4],one_one_zbsp_percent:Math.round(array1[4]/ (array1_max) * 10000) / 100.00,
          });
        }else if(index2==2){
          that.setData({
            one_one_xtzs:array2[0],one_one_xtzs_percent:Math.round(array2[0]/ (array2_max) * 10000) / 100.00,
            one_one_yzsdj:array2[1],one_one_yzsdj_percent:Math.round(array2[1]/ (array2_max) * 10000) / 100.00,
            one_one_ytysp:array2[2],one_one_ytysp_percent:Math.round(array2[2]/ (array2_max) * 10000) / 100.00,
            one_one_bdsp:array2[3],one_one_bdsp_percent:Math.round(array2[3]/ (array2_max) * 10000) / 100.00,
            one_one_zbsp:array2[4],one_one_zbsp_percent:Math.round(array2[4]/ (array2_max) * 10000) / 100.00,
          });
        }
        

      }
    })
    wx.hideLoading();
  },

  // 当用户点击文本后，显示相应的导航栏文本模块
  test(e){
  var that=this;
    console.log(e);
    that.setData({
      currenentIndexNav:e.target.dataset.index
    })
    that.publicMethod();
    that.publicMethodTwo();
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
         chart.setOption({ 
          grid:{
            x:0,
            y:0,
            x2:0,
            y2:0,
            borderWidth:1
        },
           // ===================================option内容
          title: {
            text: '适配系统行业占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
			// {a}/n
            formatter: '{b} : {c} ({d}%)',
			position:'bottom',
        },
        series: [
            {
                name: ["互联网", "公共事业", "基础软件", "建筑", "政府", "教育", "服务业", "能源", "金融", "零售业"],
                type: 'pie',
                radius: '33%',
                center: ['50%', '45%'],
                data: res.data.industry_class.list,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    }
                },
            }
        ]
        // ===================================option内容
        });
      }
   })
   that.publicMethod();
   that.publicMethodTwo();

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
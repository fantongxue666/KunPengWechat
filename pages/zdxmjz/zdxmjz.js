// pages/top100/top100.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:[],
    isvList:[],
    showModal:false
  },
  go:function(){
    this.setData({
      showModal:false,
	  isvList:[]
    });
   },
  xiangqing:function(e){
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
    that.setData({
      showModal:true
    });
    var projectuuid=e.currentTarget.dataset.index;
    console.log(projectuuid);
    wx.request({
      url: env.url+'/wechat/selectIsvAndProductAndStatusByProjectuuid?projectuuid='+projectuuid,
     method: 'GET',
     success(res) {
         console.log(res.data);
		 var list=res.data;
		 sortData(list);
		 function sortData(lists){
		 	for(var n=1;n<lists.length;n++){
		 		for(var k=0;k<lists.length-1;k++){
		 			var max=lists[k].STATUS;                   				
		 			if(max!="已适配"){
		 				var preData=lists[k];
		 				lists[k]=lists[k+1];
		 				lists[k+1]=preData;
		 			}
		 		}
		 	}
		 	console.log(lists)
		 }
        that.setData({
          isvList:res.data
        });
      }
   })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    });
    wx.request({
      url: env.url+'/wechat/zdxmwd',
     method: 'POST',
     success(res) {
         var list=res.data;
		 sortData(list);
		 function sortData(lists){
		 	for(var n=1;n<lists.length;n++){
		 		for(var k=0;k<lists.length-1;k++){
		 			var max=lists[k].spzs;
		 			var nextCount=lists[k+1].spzs;
		 			if(nextCount>max){
		 				var preData=lists[k];
		 				lists[k]=lists[k+1];
		 				lists[k+1]=preData;
		 			}
		 		}
		 	}
		 	console.log(lists)
		 }
         for(var i=0;i<list.length;i++){
          var spwc_percent=Math.round(list[i].spwc/ (list[i].spzs) * 10000) / 100.00 + "%";
          var spz_percent=Math.round(list[i].spz/ (list[i].spzs) * 10000) / 100.00 + "%";
          var wks_percent=Math.round(list[i].wks/ (list[i].spzs) * 10000) / 100.00 + "%";
          list[i]={
            projectname:list[i].projectname,
            projectuuid:list[i].projectuuid,
            spzs:list[i].spzs,
            spwc:list[i].spwc,
            spz:list[i].spz,
            wks:list[i].wks,
            spwc_percent:spwc_percent,
            spz_percent:spz_percent,
            wks_percent:wks_percent,
            spzs:list[i].spzs
          }

         }
         console.log("项目重点维度系统分析数据")
         console.log(res)
         that.setData({
          topList:res.data
         });
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
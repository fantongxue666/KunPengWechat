// pages/top100/top100.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:[],
    showModal:false,
    obj:{}
  },

  go:function(){
    this.setData({
      showModal:false,
	  obj:{}
    });
   },
  percent:function(e){
    var that=this;
    var isvuuid=e.currentTarget.dataset.index;
	console.log(isvuuid)
    wx.showLoading({
      title: '正在加载...',
    })
    this.setData({
      showModal:true
    });
    wx.request({
      url: env.url+'/wechat/getDetailTop100?isvuuid='+isvuuid,
     method: 'GET',
     success(res) {
         console.log(res.data)
		 var list=res.data
		 // 排序
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
          //本地适配中的百分比 
          var sping_percent=Math.round(res.data.sping/ (res.data.product_num) * 10000) / 100.00 + "%";
          //本地已完成的百分比
          var localfinish_percent=Math.round(res.data.localfinish/ (res.data.product_num) * 10000) / 100.00 + "%";
          //总部适配的百分比
          var spgeneral_percent=Math.round(res.data.spgeneral/ (res.data.product_num) * 10000) / 100.00 + "%";
          that.setData({
            obj:{'first':sping_percent,'second':localfinish_percent,'third':spgeneral_percent},
		  list:res.data
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
      url: env.url+'/wechat/top100',
     method: 'POST',
     success(res) {
      
         var list=res.data;
		 sortData(list);
		 function sortData(lists){
		 	for(var n=1;n<lists.length;n++){
		 		for(var k=0;k<lists.length-1;k++){
		 			var max=lists[k].sping+lists[k].localfinish;
		       var nextCount=lists[k+1].sping+lists[k+1].localfinish;
		       var max1=lists[k].localfinish;
		       var nextCount1=lists[k+1].localfinish;
		 			if(nextCount>max){
		 				var preData=lists[k];
		 				lists[k]=lists[k+1];
		 				lists[k+1]=preData;
		 			}else if(nextCount==max&&max1<nextCount1){
		         var preData=lists[k];
		 				lists[k]=lists[k+1];
		 				lists[k+1]=preData;
		       }
		 		}
		 	}
		 	console.log(lists)
		 }
		 console.log(list)
         for(var i=0;i<list.length;i++){
          //本地适配中的百分比 
          var sping_percent=Math.round(list[i].sping/ (list[i].productNum) * 10000) / 100.00 + "%";
          //本地已完成的百分比
          var localfinish_percent=Math.round(list[i].localfinish/ (list[i].productNum) * 10000) / 100.00 + "%";
          //总部适配的百分比
          var spgeneral_percent=Math.round(list[i].spgeneral/ (list[i].productNum) * 10000) / 100.00 + "%";
          list[i]={
            isvname:list[i].isvname,
            localfinish:list[i].localfinish,
            order:list[i].order,
            sping_percent:sping_percent,
            localfinish_percent:localfinish_percent,
            spgeneral_percent:spgeneral_percent,
            isvuuid:list[i].isvuuid,
			product_num:list[i].productNum,
			sping:list[i].sping,
			spgeneral:list[i].spgeneral
          }
         }
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
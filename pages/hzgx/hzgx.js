// pages/hzgx/hzgx.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    showModal:false,
    obj:{}
  },

  test:function(e){
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
   var id = e.currentTarget.dataset.index;
    wx.request({
      url: env.url+'/wechat/getHzgxByUuid',
      data:{
        uuid:id
      },
     method: 'GET',
     success(res) {
       console.log("详情")
         console.log(res)
         
         that.setData({
           obj:res.data
         });
         wx.hideLoading();
      }
   })
   this.setData({
     showModal:true
   });
   wx.hideLoading();
  },
  go:function(){
    this.setData({
      showModal:false,
	  obj:{}
    });
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
      url: env.url+'/wechat/hzgxList',
     method: 'POST',
     success(res) {
         console.log(res)
         that.setData({
           list:res.data
         });
         wx.hideLoading();
      }
   })
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
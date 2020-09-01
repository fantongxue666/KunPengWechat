// pages/main/main.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTabsIndex:1,
    banners:[],
    firstMenuList:[],
    secondMenuList:[],
	indicatorDots:true
  },
  getPhone(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  onTabsItemTap:function(e){
    var index=e.currentTarget.dataset.index;
    this.setData({
      currentTabsIndex:index
    });
  },
  toCyld:function(e){
    var url=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: url
    })
  },
  toSchool:function(e){
    var url=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: url
    })
  },
  toView:function(){
    wx.navigateTo({
      url: '../zdhytj/zdhytj'
    })
  },
stopTouchMove: function () {
 
return true;
 
},
 
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.request({
      url: env.url+'/wechat/showBanner',
     method: 'POST',
     success(res) {
         console.log(res)
         that.setData({
           banners:res.data
         });
      }
   })

   var phone=wx.getStorageSync('phone');
   console.log("查询权限数据之前获取手机号："+phone);
   wx.request({
    url: env.url+'/wechat/checkRolesByPhone?phone='+phone,
   method: 'GET',
   success(res) { 
     console.log("登录用户所对应的权限数据");
     console.log(res)
     that.setData({
       firstMenuList:res.data.firstMenuList,
       secondMenuList:res.data.secondMenuList
     });
    }
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
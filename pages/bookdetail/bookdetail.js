// pages/bookdetail/bookdetail.js
import {env} from '../../profile.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{},
    borrowPerson:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    var that=this;
    var ids=options.id;
    var borrowPerson=options.index2
    console.log("接收到的ID："+ids);
    console.log("接收到的借书人："+borrowPerson);
    if(borrowPerson=='undefined'){
      borrowPerson="当前没有人";
    }
    that.setData({
      borrowPerson:borrowPerson
    });

    wx.request({
      url: env.url+'/wechat/getBookById?uuid='+ids,
     method: 'GET',
     success(res) {
     console.log(res.data)
     that.setData({
       book:res.data
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
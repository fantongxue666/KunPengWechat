// pages/ok/ok.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first:'',
    second:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data=options.data;
    if(data==1){
        this.setData({
          first:'已提交',
          second:'请等待管理员确认'
        });
    }else if(data==2){
      this.setData({
        first:'已借阅',
        second:''
      });
    }else if(data==4){
      this.setData({
        first:'已提交',
        second:'请等待原借书人确认'
      });
    }
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
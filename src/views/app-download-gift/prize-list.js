module.exports = function() {
  /**
   * index: Number       奖品索引
   * idInServer: Number  对应的后端奖品 ID
   * name: String        奖品名
   * shortName: String   奖品简写名称
   * hideInList: Boolean 在列表中隐藏
   *
   * 1 iPhone12 pro max 256g
   * 2 透明雨伞
   * 3 健身杯
   * 4 纸巾盒
   * 5 毛毡记事本
   * 6 谢谢参与
   */
  return [
    {
      index: 0,
      idInServer: 1,
      name: 'iPhone12 pro max 256g',
      shortName: 'iPhone'
    },
    { index: 1, idInServer: 6, name: '谢谢参与', isEmpty: true },
    { index: 2, idInServer: 3, name: '健身杯' },
    { index: 3, idInServer: 4, name: '纸巾盒' },
    { index: 4, idInServer: 5, name: '毛毡记事本' },
    { index: 5, idInServer: 2, name: '透明雨伞' }
  ]
}

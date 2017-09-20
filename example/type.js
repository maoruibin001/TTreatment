/**
 * Created by lenovo on 2017/9/20.
 */
const utils = {
  getRealType: function (ele) {
    let realType = Object.prototype.toString.call(ele).slice(8, -1).toLowerCase();
    return realType;

  },
  checkType: function (ele, type) {
    type = type.toLowerCase();
    let realType = utils.getRealType(ele);

    if (realType !== type) throw new Error('type: ' + realType + ' ，Please send the correct type: ' + type);
  },
}

var aa = [];

utils.checkType(aa, 'String')

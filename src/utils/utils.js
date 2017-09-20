/**
 * Created by lenovo on 2017/9/19.
 */
// 时间插件采用moment，可以兼容手机端各种浏览器对时间的处理
const moment = require('moment');
const AM = 1; //上午
const PM = 0; //下午

// 工具箱
const utils = {
  /**
   * 获取元素的真实类型
   * @param  {String}  d 今天之后第几天 如果不传则默认返回当前是星期几
   * @return {String}  以小写的形式返回元素的类型。
   */
  getRealType: function (ele) {
    return Object.prototype.toString.call(ele).slice(8, -1).toLowerCase();
  },

  /**
   * 检查元素类型
   * @param  {any}  ele 待检查的元素
   * @param  {String} type 待检查的元素的类型
   * @return {undefined}  如果类型出错会报错。
   */
  checkType: function (ele, type) {
    type = type.toLowerCase();
    let realType = utils.getRealType(ele);
    if (realType !== type) throw new Error('type: ' + realType + ' ，Please send the correct type: ' + type);
  },
  /**
   * 获取星期几
   * @param  {Number} d 今天之后第几天 如果不传则默认返回当前是星期几
   * @return {String} 返回当前是星期几，返回类型为字符串。
   */
  getDay: function (d) {
    d = d || 0;
    utils.checkType(d, 'number');
    return d ? moment().add(d, 'd').format('d') : moment().format('d');
  },

  /**
   * 时间格式化
   * @param  {Number} d 今天之后第几天 如果不传则默认对今天进行YYYY-MM-DD格式化
   * @return {String} 返回YYYY-MM-DD格式的时间字符串。
   */
  // TODO：下个版本兼容多格式
  format: function (d) {
    d = d || 0;
    utils.checkType(d, 'number');
    return d ? moment().add(d, 'd').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
  },

  /**
   * 星期转化为汉字
   * @param  {Number} d 星期几 如果不传则默认为1
   * @return {string} 返回周日~周六
   */
  day2Week: function (d) {
    d = d || 1;
    if (d > 6) throw new Error('请传入小于6的数字，实际传入值为：' + d);
    utils.checkType(d, 'number');
    let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weeks[d];
  },

  /**
   * 创建日期map
   * @param  {Number}  gap 间隔几日 如果不传则默认为7
   * @return {Object} 返回日期map，包含两个list，一个只存储周一到周五上午，一个只存储周一到周六下午
   */
  createDateMap: function (gap) {
    gap = gap || 7;
    utils.checkType(gap, 'number');
    let AMs = [];
    let PMs = [];
    let day = Number(utils.getDay());

    // 如果当前时间大于12点，上午则取下一个周的上午
    if (new Date().getHours() > 12) {
      // 排除周六和周日
      if (day !== 6 && day !== 0) {
        PMs.push({
          date: utils.format(), //日期 YYYY-MM-DD格式
          isAM: PM, //日期 YYYY-MM-DD格式
          isAMDesc: '下午',
          day: day, //星期几
          name: utils.day2Week(day), //星期几汉字
          belong: 'time', //归属于哪个选项
          isActive: false //是否选中
        });

        AMs.push({
          date: utils.format(7),
          isAM: AM,
          isAMDesc: '上午',
          day: utils.getDay(7),
          name: utils.day2Week(Number(utils.getDay(7))),
          belong: 'time',
          isActive: false
        })
      }

    } else {
      PMs.push({
        date: utils.format(),
        isAM: PM,
        isAMDesc: '下午',
        day: day,
        name: utils.day2Week(day),
        belong: 'time',
        isActive: false
      });
      AMs.push({
        date: utils.format(),
        isAM: AM,
        isAMDesc: '上午',
        day: day,
        name: utils.day2Week(day),
        belong: 'time',
        isActive: false
      });
    }
    for (let i = 1; i < gap; i++) {
      let date = utils.format(i),
        day = Number(utils.getDay(i)),
        weekday = utils.day2Week(day);

      // 排除周六和周日
      if (day === 0 || day === 6) continue;
      AMs.push({
        date: date,
        isAM: AM,
        isAMDesc: '上午',
        day: day,
        name: weekday,
        isActive: false,
        belong: 'time'
      });


      PMs.push({
        date: date,
        isAM: PM,
        isAMDesc: '下午',
        day: day,
        name: weekday,
        isActive: false,
        belong: 'time'
      });

    }

    AMs.sort(function (a, b) {
      return a.day - b.day;
    });

    PMs.sort(function (c, d) {
      return c.day - d.day;
    });
    return {
      AMs: AMs,
      PMs: PMs
    }
  }
};

module.exports = utils;

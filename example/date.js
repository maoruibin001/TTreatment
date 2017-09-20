/**
 * Created by lenovo on 2017/9/19.
 */

const createDateMap = require('../src/utils/utils').createDateMap;

// function getDay(d) {
//   return d ? moment().add(d, 'd').format('d') : moment().format('d');
// }
//
// function format(d) {
//   return d ? moment().add(d, 'd').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
// }
// function createDateMap(gap) {
//   gap = gap || 7;
//   let AMs = [];
//   let PMs = [];
//
//   if (new Date().getHours() > 12) {
//     let day = getDay();
//     if (day !== '6' && day !== '0') {
//       PMs.push({
//         date: format(),
//         isAM: '0',
//         day: getDay(),
//         active: false
//       });
//
//       AMs.push({
//         date: format(7),
//         isAM: '1',
//         day: getDay(7),
//         active: false
//       })
//     }
//
//   } else {
//     PMs.push({
//       date: format(),
//       isAM: '0',
//       day:  getDay(),
//       active: false
//     });
//     AMs.push({
//       date: format(),
//       isAM: '1',
//       day:  getDay(),
//       active: false
//     });
//   }
//   for (let i = 1; i < gap; i ++) {
//     let date = format(i),
//         day = getDay(i);
//
//     if (day === '0' || day === '6') continue;
//     AMs.push({
//       date: date,
//       isAM: '1',
//       day: day,
//       active: false
//     });
//
//
//     PMs.push({
//       date: date,
//       isAM: '0',
//       day: day,
//       active: false
//     });
//
//   }
//
//   AMs.sort(function(a, b) {
//     return a.day - b.day;
//   });
//
//   PMs.sort(function(c, d) {
//     return c.day - d.day;
//   });
//   return {
//     AMs: AMs,
//     PMs: PMs
//   }
// }

console.log(createDateMap());

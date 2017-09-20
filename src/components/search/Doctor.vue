<template>
  <div>
    <div class="row options">
      <div class="col-xs-4 noPadding" v-for="option,index in options" @click="showOption(option)"
           :class="option.isActive ? 'blue': ''">
        {{option.name}}
        <img v-show="option.isActive" src="../../assets/down.jpg">
        <img v-show="!option.isActive" src="../../assets/up.jpg">
        <span class="divider" v-show="index !== (options.length - 1)">|</span>
      </div>
      <!--<div class="col-xs-4">医生职称<img src="../../assets/up.jpg"> <span class="divider">|</span></div>-->
      <!--<div class="col-xs-4">预约时间<img src="../../assets/up.jpg"></div>-->
    </div>
    <div class="row list">
      <div @click="closePop()" v-show="activeOption.isActive" class="popup-wrapper"></div>

      <div class="slidedown" v-show="activeOption.belong === 'area'">
        <div @click="chooseArea(area)" class="col-xs-12 slide-item" v-for="area in areas">{{area.name}}</div>
      </div>

      <div class="slidedown" v-show="activeOption.belong === 'title'">
        <div @click="chooseTitle(title)" class="col-xs-12 slide-item" v-for="title in titles">{{title.name}}</div>
      </div>

      <div class="slidedown date-box" v-show="activeOption.belong === 'time'">
        <div class="time-box">
          <div class="col-xs-12 time text-left">预约时间 (可多选)</div>
          <ul class="week-group">
            <li @click="chooseDate(dateAM)" class="week" v-for="dateAM in dates.AMs">{{dateAM.name}}</li>
          </ul>
          <ul class="week-group">
            <li :class="dateAM.isActive ? 'date-active' : ''" @click="chooseTime(dateAM)" class="am" v-for="dateAM in dates.AMs">{{dateAM.isAMDesc}}</li>
          </ul>
          <ul class="week-group">
            <li :class="datePM.isActive ? 'date-active' : ''" @click="chooseTime(datePM)" class="pm" v-for="datePM in dates.PMs">{{datePM.isAMDesc}}</li>
          </ul>
        </div>
        <div class="col-xs-12 gap"></div>
        <div class="col-xs-6"><button class="btn btn-default cancel" @click="cancel()">取消</button></div>
        <div class="col-xs-6"><button class="btn sure" @click="chooseDate()">确定</button></div>
        <!--<div class="center">-->
        <!--</div>-->
        <div class="col-xs-12 gap"></div>


        <!--<div class="card-group">-->
          <!--<div @click="chooseDate(datePM)" class="card" v-for="datePM in dates.PMs">{{datePM.name}}</div>-->
        <!--</div>-->
      </div>


      <div class="col-xs-12 text-left">
        <span class="text-gray">医生</span>
        <span class="right text-gray" @click="filter()"><img src="../../assets/filter.png"
                                                             style="width: 1.6em;">筛选</span>
      </div>
      <div class="col-xs-12 text-left">
        <div class="hr"></div>
      </div>

      <div class="col-xs-12">
        <ul class="media-list">
          <li class="media" v-for="item in doctors">
            <div class="media-left">
              <a href="#" class="media-left media-bottom">
                <img class="media-object" :src="item.imgUrl">
              </a>
            </div>
            <div class="media-body text-left">
              <div><span class="media-heading font-name">{{item.name}}</span> <span>{{item.title}}</span> <span
                class="right consult" v-show="item.active === '1'" @click="toConsult(item)">咨询</span></div>
              <div class="lh-2">{{item.hospital}} {{item.subject}}  <span class="consult"
                                                                          v-show="item.consult=== '1'">可咨询</span>
              </div>
              <div class="text-gray">擅长领域：{{item.field}} <span class="right">预约量：{{item.count}}</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>

<script>
  import utils from '../../utils/utils';

  export default {
    name: 'Doctor',
    props: ['doctors'],
    created() {
      this.dates = utils.createDateMap(7);
      this.requestData();
    },
    data () {
      return {
        activeOption: {
          aId: '',
          name: '',
          isActive: false
        },
        options: [],
        areas: [],
        titles: [],
        dates: [],
      }
    },

    methods: {
//      请求mock数据
      requestData() {
        utils.ajax('http://localhost:8080/mock/titles', {}, (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          this.titles = data.titles;
        });

        utils.ajax('http://localhost:8080/mock/options', {}, (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          this.options = data.options;
        });

        utils.ajax('http://localhost:8080/mock/areas', {}, (error, data) => {
          if (error) {
            console.log(error);
            return;
          }
          this.areas = data.areas;
        });
      },

      //      过滤
      filter() {
        alert('filter');
      },

//      显示不同项目对应弹框
      showOption(option) {
        if (option.isActive) {
          option.isActive = false;
          this.activeOption = {
            aId: '',
            name: '',
            isActive: false
          };
        } else {

          this.activeOption.isActive = false;
          option.isActive = true;
          this.activeOption = option;
        }

      },

//      选择一个区域
      chooseArea(area) {
        if (!area) return;
        this.options.splice(0, 1, area);
        this.activeOption = {
          aId: '',
          name: '',
          isActive: false
        }
        area.isActive = false;
      },

//      选择一种职称
      chooseTitle(title) {
        if (!title) return;
        this.options.splice(1, 1, title);
        this.activeOption = {
          aId: '',
          name: '',
          isActive: false
        }
        title.isActive = false;
      },

//      关闭遮罩层
      closePop() {
        this.activeOption = {
          aId: '',
          name: '',
          isActive: false
        }
        this.options.forEach(e => {e.isActive = false;})
      },


//      点击时间选择取消按钮
      cancel() {
        this.options[2].isActive = false;
        this.activeOption = {
          aId: '',
          name: '',
          isActive: false
        }
      },

//      点击选择时间，可多选
      chooseTime(date) {
        date.isActive = !date.isActive;
      },

//      点击确定按钮，会返回一个list，
//      list第一个为默认显示时间，
//      并且第一个是默认为离自己最近的时间
      chooseDate() {
        let dateList = [];

        let ams = this.dates.AMs.filter(e => e.isActive),
            pms = this.dates.PMs.filter(e => e.isActive);


        dateList = ams.concat(pms);

//        按时间排下序，这样显示最近的一个预约时间比较友好
        dateList.sort( (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (dateList[0]) {
          let date = dateList[0];

          let name = date.name + date.isAMDesc;
          let t = Object.assign({}, date, {name: name, isActive: false});
          this.options.splice(2, 1, t);
          this.activeOption = {
            aId: '',
            name: '',
            isActive: false
          }
          console.log(dateList);
          return dateList;
        }

      },


//      跳转到向医生提问的页面
      toConsult(item) {
        this.$router.replace({
          name: 'Consult',
          params: {
            doctor: item
          }
        });
      }
    }
  }
</script>

<style scoped>
  .options {
    padding: 1em;
    -moz-box-shadow: 10px -10px 5px #888888; /* 老的 Firefox */
    box-shadow: 0 6px 6px 6px #ddd;
    margin-bottom: 5px;
    border-bottom: 1px solid #ddd;
  }

  .blue {
    color: #7AABF6
  }

  .noPadding {
    padding: 0;
  }

  .popup-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7);
  }

  .slidedown {
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    z-index: 200;
    overflow: hidden;
    background-color: #F1F1F1;
  }

  .slidedown > .slide-item {
    padding: .8em 0;
    border-top: 1px solid #E8E8E8;
    font-size: 1.1em;
  }
  .gap {
    height: 1.5em;
  }
  .time {
    padding: 1em 0 1.1em 0;
    margin-left: 5%;
  }
  .week-group {
    padding: 0;
    width: 90%;
    margin: 0 auto;
    position: relative;
    list-style: none;
  }

  .week-group > .week {
    /*list-style: none;*/
    float: left;
    width: 19%;
    margin-right: 1%;
    color: #ccc;
  }

  .week-group > .am, .week-group > .pm {
    float: left;
    width: 19%;
    margin-right: 2px;
    background: #EAEAEA;
    margin-bottom: 2px;
    padding: .4em 0;
    /*color: #ccc;*/
  }
  .week-group .date-active {
    background-color: #D5DEEB;
    background-image: url('../../assets/success.gif');
    background-repeat: no-repeat;
    background-position: 100% 80%;
  }

  .btns {
    padding: 3em 0;
    position: relative;
  }

  .cancel, .sure {
    padding: .5em 4em;
    float:left;
    outline: none;
  }
  .cancel {
    background-color: #f0f0f0;
    margin-left: 1em;
  }
  .sure {
    margin-left: -1em;
    background: #428BEF;
    color: #fff;
  }

  .divider {
    float: right;
    color: #ccc;
  }

  .font-name {
    font-size: 1.2em;
    font-weight: 500;
  }

  .list {
    background-color: #fff;
    padding: 5px 0;
    position: relative;
  }

  .lh-2 {
    line-height: 2;
  }

  .text-gray {
    color: #b4b4b4;
  }

  .right {
    float: right;
  }

  .consult {
    padding: 3px 5px;
    background-color: #CDE3F8;
    border-radius: 3px;
    font-size: .7em;
  }

  .hr {
    border-bottom: 1px solid #ccc;
    margin: .5em 0;
  }


</style>

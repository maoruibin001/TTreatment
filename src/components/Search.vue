<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 no-gap-box">
        <div class="header">
          <div class="content">
            <span class="back-icon"><img src="../assets/back.jpg" alt="">返回</span>
            <span class="title">搜索</span>
            <span class="slickMenu-icon">...</span>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12 search-box">
        <div class="input-group">
          <input type="text" class="form-control border-right-none outline-none search-input">
          <span class="input-group-btn">
            <a href="#" class="btn btn-default border-left-none search-text">搜索</a>
					</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 no-gap-box">
        <Tab :items="subjectItems" @change="changeSubject"></Tab>
      </div>
    </div>


    <div v-show="subject === 't1'" class="row list">
      <h1>我是百科咨询</h1>
    </div>

    <div v-show="subject === 't2'" class="row list">
      <h1>我是医患问答</h1>
    </div>
    <Doctor v-show="subject === 't3'" :doctors="doctors"></Doctor>

    <div v-show="subject === 't4'" class="row list">
     <h1>我是治疗药品</h1>
    </div>
  </div>
</template>

<script>
  import Tab from '../commons/components/Tab.vue';
  import Doctor from './search/Doctor.vue';

  export default {
    name: 'hello',
    components: {
      Tab,
      Doctor,
    },
    data () {
      return {
        subject: 't3',
        doctors: [
          {
            name: '赵可欣',
            title: '主任医师',
            consult: '0',
            imgUrl: '/static/img/doctor_1.jpg',
            hospital: '北京协和医院',
            subject: '乳腺外科',
            field: '乳腺肿瘤',
            count: '112',
            'active': '1'
          },
          {
            name: '韩大生',
            title: '主任医师',
            consult: '0',
            imgUrl: '/static/img/doctor_2.jpg',
            hospital: '北京协和医院',
            subject: '乳腺外科',
            field: '乳腺肿瘤',
            count: '73',
            'active': '0'
          },
          {
            name: '陈淑',
            title: '主任医师',
            consult: '1',
            imgUrl: '/static/img/doctor_3.jpg',
            hospital: '北京协和医院',
            subject: '乳腺外科',
            field: '乳腺肿瘤',
            count: '44',
            'active': '0'
          },
        ],
        subjectItems: [
          {subject: 't1', name: '百科咨询', isCurrent: '0'},
          {subject: 't2', name: '医患问题', isCurrent: '0'},
          {subject: 't3', name: '相关医生', isCurrent: '1'},
          {subject: 't4', name: '治疗药品', isCurrent: '0'}]
      }
    },
    methods: {
//      切换不同的项目
      changeSubject(item) {
          this.subject = item.subject;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    font-size: 1.2em;
  }

  .list {
    background-color: #fff;
    padding: 5px 0;
  }

  .border-left-none {
    border-left: none;
  }

  .border-right-none {
    border-right: none;
  }

  .outline-none:focus {
    outline: none;
  }

  .outline-none {
    outline: none;
  }

  .search-text {
    color: #71D087;
    background-color: #fff;
  }

  .search-text:hover {
    background-color: #fff;
  }

  .no-gap-box {
    padding: 0;
    margin: 0;
  }

  .search-box {
    padding: 3px 5px;
  }

  .search-input {
    padding-left: 2.5em;
    position: relative;
    left: 0;
    background-image: url('/static/img/search.jpg');
    background-position: .4em .3em;
    background-repeat: no-repeat;
  }

  .back-icon {
    float: left;
  }

  .slickMenu-icon {
    float: right;
    font-weight: 500;
    font-size: 1.5em;
    padding: 0 10px;
    line-height: .5em;
  }

  .header {
    background: #000;
    height: 2em;
    width: 100%;
    color: #fff;
    padding: .3em 0 2.5em 0;
  }
</style>

<template>
  <div class="container no-gap-box">

    <div @click="closePop()" v-show="active" class="popup-wrapper"></div>

    <div class="row no-gap-box">
      <div class="col-xs-12 no-gap-box">
        <div class="header">
          <div class="content">
            <span class="back-icon" @click="back()"><img src="../assets/back.jpg" alt="">返回</span>
            <span class="title">向{{doctor.name.slice(0, 1)}}医生提问</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row no-gap-box" style="margin-bottom: .4em;">
      <div class="col-xs-12 gap"></div>
      <div class="col-xs-5 text-left"><h4 class="disease">选择病种</h4></div>
      <!--<div class="col-xs-4"></div>-->
      <div class="col-xs-7" @click="active=true"><div class="img-box">{{activeDisease.name}} <img class="img" src="../assets/arrow-down.jpg" alt=""></div></div>
      <div class="col-xs-12 gap"></div>
    </div>

    <div class="row no-gap-box">
      <div class="col-xs-12 text-left">
        <h4>病情描述</h4>
      </div>

      <div class="col-xs-12 text-left">
        <textarea rows="10" class="textarea" onfocus="document.getElementById('note').style.display='none'"
                  onblur="if(value=='')document.getElementById('note').style.display='block'"></textarea>
        <div id="note" class="note">
          <span class="gray">请详细描述您的症状，疾病和身体状况，便于医生能准确为您作出判断.</span>
        </div>

        <div id="font" class="font">
          <span class="gray">可输入200字.</span>
        </div>

      </div>


    </div>


    <div class="slidedown" v-show="active">
      <div :class="disease.isActive ? 'active-item' : ''" @click="chooseDisease(disease)" class="col-xs-12 slide-item text-left" v-for="disease in diseases">{{disease.name}}</div>
    </div>


    <div class="btns-box">
      <button class="btn btn-full" @click="toPay()">立即支付10元</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Consult',
    components: {},
    created() {
      this.doctor = this.$route.params.doctor;
    },
    data () {
      return {
        doctor: {},
        diseases: [
          {dId: 'd0', name: '心脑血管', isActive: false},
          {dId: 'd1', name: '心内科', isActive: false},
          {dId: 'd2', name: '神经外科', isActive: false},
          {dId: 'd3', name: '神经内科', isActive: false},
          {dId: 'd4', name: '妇科', isActive: false},
          {dId: 'd5', name: '便秘', isActive: false},
          {dId: 'd6', name: '其他儿科常见问题', isActive: false},
        ],
        active: false,
        activeDisease: {},

      }
    },
    methods: {
//      返回
      back() {
        this.$router.replace('/')
      },

//      选择某种疾病
      chooseDisease(disease) {
        this.diseases.forEach(e => {e.isActive = false});
        disease.isActive = true;
        this.activeDisease = disease;
        this.closePop();
      },

//      关闭遮罩层
      closePop() {
        this.active = false;
      },

//      跳转到支付页面
      toPay() {
        alert('调转到支付');
      }
    }
  }
</script>

<style scoped>
  .container .row {
    background-color: #fff;
  }

  .title {
    font-size: 1.2em;
  }

  .no-gap-box {
    padding: 0;
    margin: 0;
  }

  .back-icon {
    float: left;
  }

  .header {
    background: #000;
    height: 2em;
    width: 100%;
    color: #fff;
    padding: .3em 0 2.5em 0;
  }

  .container .select {
    position: relative;
    padding: 4em 1em;
  }

  .gap {
    height: 1.5em;
  }

  .textarea {
    position: relative;
    background: none;
    z-index: 9;
    border:none;
    width: 100%;
    outline: none;
  }

  .note {
    position: absolute;
    line-height: 1.5em;
    padding: .5em;
    left: .5em;
    top: 0;
  }

  .font {
    position: absolute;
    line-height: 1.5em;
    right: 1em;
    bottom: .5em;
  }
  .gray {
    color:#CACACA;
  }

  .img-box {
    float: right;
    margin-top: .5em;
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
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    overflow: hidden;
    background-color: #fff;
  }

  .slidedown > .slide-item {
    padding: .8em 0 .8em 1em;
    border-top: 1px solid #E8E8E8;
    font-size: 1.1em;
  }

  .slidedown > .active-item {
    background-color: #F4F4F4;
    color: #307FEE;
    background-image: url('../assets/timg.gif');
    background-repeat: no-repeat;
    background-position: 95% 50%;
  }

  .btns-box {
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .btns-box > .btn-full {
    width: 100%;
    padding: .8em 0;
    background-color: #307FEE;
    color: #fff;
  }
</style>

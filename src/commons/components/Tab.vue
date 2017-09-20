<template>
  <div class="range-screening tabs">
    <div class="content">
      <ul class="screening-list text-left">
        <li v-for="item in items" @click="tabItem(item)" :class="{current: item.isCurrent === '1'}">
          {{item.name}}
          <div></div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Tab',
    props: ['items'],
    created() {
//      初始化时对激活项赋值
      this.activeItem = this.items.filter(e => e.isCurrent === '1');
    },
    data() {
      return {
        activeItem: null,
      }
    },
    methods: {
//      切换项目
      tabItem (item) {
          this.activeItem = item;
          this.items.forEach(e => {
            e.isCurrent = e.subject === item.subject ? '1' : '0';
          });

          this.$emit('change', item);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tabs {
    background-color: #fff;
  }

  .range-screening {
    position: relative;
    width: 100%;
    z-index: 100;
    border-top: 1px solid #bfbfbf;
    background: #fff
  }

  .range-screening > .content {
    position: relative;
    padding: .2em;
    background: #fff;
  }

  .screening-list {
    width: auto;
    /*height: 3.12889em;*/
    padding: 1em 0;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    margin: 0;
  }
  .screening-list::-webkit-scrollbar {
    width:0;
    height:0
  }

  .screening-list ::-webkit-scrollbar {
    display: none
  }

  .screening-list > li {
    display: inline-block;
    padding: 0 1em;
    position: relative;
    border-right: 1px solid #ccc;
  }
  .screening-list > li:last-child {
    border-right: none;
  }

  .screening-list > li > div {
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 300;
  }

  .screening-list > li.current > div {
    background: #7AABF6;
  }

  .screening-list > li.current {
    color: #7AABF6;
  }
</style>

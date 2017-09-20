<template>
  <div>
    <h1>我是百科咨询</h1>
    <button @click="request()">request</button>
  </div>

</template>

<script>
  import utils from '../../utils/utils';
  export default {
    name: 'Wiki',
    props: [],
    data () {
      return {}
    },

    methods: {
      request() {
        utils.ajax('http://localhost:8080/mock/titles', {}, function(error, data) {
          if (error) {
            console.log(error);
            return;
          }
        }, null);
      }
    }
  }
</script>

<style scoped>

</style>

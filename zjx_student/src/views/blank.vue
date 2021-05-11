<template>
  <div class="text"><span>路由跳转中...</span></div>
</template>

<script>
export default {
  created(){
      let that=this;
      console.log(this.$route.params);
      setTimeout(function(){
          that.$router.push({name:'VideoView',params:{
        videoSourceId:that.$route.params.videoSourceId,
        chapterId:that.$route.params.chapterId,
        index1:that.$route.params.index1,
        index2:that.$route.params.index2
      }});
      },500);
  }
}
</script>

<style scoped >
.text{
  padding: 50px 0;
  text-align: center;
  font-size: 25px;
}
</style>

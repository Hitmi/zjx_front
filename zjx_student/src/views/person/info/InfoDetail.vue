<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    {{ info }}
  </div>
</template>

<script>

export default {
  name: 'InfoDetail',
  props: {// 资料信息
    info: {
      type: Object,
      default: function() {
        return {
          id: '',
          name: '',
          sex: '',
          birth: '',
          graduateDate: '',
          clazz: '',
          departmentId: '',
          mobile: '',
          wxId: '',
          avatar: '',
          sign: ''
        }
      }
    }
  }
}
</script>

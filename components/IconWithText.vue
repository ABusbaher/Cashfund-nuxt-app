<script>
export default {
  name: 'IconWithText',
  props: {
    text: {
      type: String,
      required: true,
      default: ''
    },
    icon: {
      type: String,
      required: true,
      default: ''
    },
  }
}
</script>

<template>
  <div class="icon-with-text">
    <div class="icon-with-text__icon">
      <img :src="require('@/assets/images/icons/' + icon)" :alt="text">
    </div>
    <p>{{ text }}</p>
  </div>
</template>

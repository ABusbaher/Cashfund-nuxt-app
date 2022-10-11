<script>
export default {
  name: 'TheButton',
  props: {
    text: {
      type: String,
      request: true,
      default: ''
    },
    bkgColor: {
      type: String,
      request: false,
      default: '#009CC4'
    },
    textColor: {
      type: String,
      request: false,
      default: '#FFFFFF'
    },
    link: {
      type: String,
      request: true,
      default: '/'
    }
  }
}
</script>

<template>
  <nuxt-link :to="link">
    <button :style="{ 'background-color': bkgColor, 'color': textColor }">
      {{ text }}
    </button>
  </nuxt-link>
</template>

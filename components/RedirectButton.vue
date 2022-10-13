<script>
export default {
  name: 'TheButton',
  props: {
    text: {
      type: String,
      required: true
    },
    bkgColor: {
      type: String,
      required: false,
      default: '#009CC4'
    },
    textColor: {
      type: String,
      required: false,
      default: '#FFFFFF'
    },
    link: {
      type: String,
      required: true
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

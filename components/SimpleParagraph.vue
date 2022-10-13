<script>
import RedirectButton from '@/components/RedirectButton.vue'

export default {
  name: 'SimpleParagraph',
  components: {
    RedirectButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Read more'
    },
    buttonLink: {
      type: String,
      required: true
    },
    bkgColor: {
      type: String,
      required: false,
      default: 'white'
    }
  }
}
</script>

<template>
  <div class="simple-paragraph" :style="{ backgroundColor: bkgColor }">
    <span class="simple-paragraph__subtitle">{{ subtitle }}</span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <RedirectButton :text="buttonText" :link="buttonLink" />
  </div>
</template>

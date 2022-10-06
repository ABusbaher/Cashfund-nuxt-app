<script>
import TheButton from "@/components/TheButton.vue";

export default {
  name: 'SimpleParagraph',
  components: {
    TheButton,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: ''
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
    <h6>{{ subtitle }}</h6>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <TheButton :text="buttonText" />
  </div>
</template>

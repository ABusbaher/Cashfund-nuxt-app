<script>
import HeroBanner from '@/components/HeroBanner.vue'
import ContentParagraph from '@/components/ContentParagraph.vue'

export default {
  name: 'IndexPage',
  components: {
    HeroBanner,
    ContentParagraph
  }
}
</script>
<template>
  <div>
    <HeroBanner
      title="A special purpose investment company"
      description="You invest in our deep domain expertise"
      :image-path="require('@/assets/images/pexels-pixabay-372470_1.png')"
    />
    <ContentParagraph
      subtitle="welcome there!"
      title="Welcome to the Best Business Support Company"
      description="Cashfund is a Special Purpose Investment Holding Company (SPIC) formed with an impetus for creating,
      building business, & Merger and Acquisition, it will aim at developing itself as a strong global player,
      by building a proven track record and achieving significant milestones in the next 5 years."
      button-text="more about us"
      link="/about"
    >
      <template #main>
        <img class="paragraph-content__slot-img" :src="require('@/assets/images/photo-1519085360753-af0119f7cbe7_1.jpg')" alt="title">
      </template>
    </ContentParagraph>
  </div>
</template>

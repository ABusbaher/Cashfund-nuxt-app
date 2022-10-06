<script>
import HeroBanner from '@/components/HeroBanner.vue'
import ContentParagraph from '@/components/ContentParagraph.vue'
import BulletParagraph from '@/components/BulletParagraph.vue'
import IconWithText from '@/components/IconWithText'

export default {
  name: 'IndexPage',
  components: {
    HeroBanner,
    ContentParagraph,
    BulletParagraph,
    IconWithText
  },
  data () {
    return {
      bullets: [
        {
          number: '01',
          title: 'Fashion and Luxury',
          description: 'At the core of every project that will be released by Cashfund in fashion and luxury, ' +
            'there will be quintessentially a strong commitment to unmatched creativity and quality,' +
            ' aligned with the changing needs of the international market.',
          bkgColor: '#F3F0E9'
        },
        {
          number: '02',
          title: 'Media and Entertainment',
          description: 'Forward-looking Media and entertainment business, whose mission is to enable unique ' +
            'investment opportunities, by allowing investors to express their aspirations and aesthetics ' +
            'with the highest level of quality and refinement.'
        },
        {
          number: '03',
          title: 'Technology',
          description: 'Technology growth has been led by the rapid advancement and proliferation of ' +
            'Artificial intelligence, cloud, and machine learning, virtually impacting every ' +
            'business and consumer in its path.',
          bkgColor: '#F3F0E9'
        }
      ],
      iconsWithText: [
        {
          text: 'What would we do',
          iconName: 'work-from-home.svg',
        },
        {
          text: 'Special Purpose Investments the Cashfund way',
          iconName: 'save-money.svg',
        },
        {
          text: 'Borderless Investing Community with focused vertical',
          iconName: 'community.svg',
        },
        {
          text: 'Holistic view to invest in the best opportunities',
          iconName: 'star.svg',
        },
      ]
    }
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
    <div v-for="bullet in bullets" :key="bullet.number" class="bullet-paragraphs">
      <BulletParagraph
        :number="bullet.number"
        :title="bullet.title"
        :description="bullet.description"
        :bkg-color="bullet.bkgColor"
      />
    </div>
    <ContentParagraph
      subtitle="Who We Are"
      title="We are Leaders on the Market"
      description="We will identify, conceive and build business that will create substantial
      long-term value for our investing community"
      button-text="Read more"
      link="/contact"
    >
      <template #main>
        <div v-for="icon in iconsWithText">
          <IconWithText
            :text="icon.text"
            :icon="icon.iconName">
          </IconWithText>
        </div>
      </template>
    </ContentParagraph>
  </div>
</template>

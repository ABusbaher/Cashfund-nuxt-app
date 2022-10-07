<script>
export default {
  name: 'TheFooter',
  // props: {
  //   text: {
  //     type: String,
  //     required: true,
  //     default: ''
  //   },
  //   icon: {
  //     type: String,
  //     required: true,
  //     default: ''
  //   }
  // },
  data () {
    return {
      showLinks: false,
      links: [
        {
          title: 'Home',
          href: '/'
        },
        {
          title: 'About',
          href: '/about'
        },
        {
          title: 'Contact',
          href: '/contact'
        }
      ]
    }
  }
}
</script>

<template>
  <div>
    <div class="footer-up">
      <img :src="require('@/assets/images/icons/logo-white.svg')" alt="logo-white">
      <ul class="footer-up__links">
        <li v-for="link in links" :key="link.href">
          <nuxt-link :to="link.href">
            {{ link.title }}
          </nuxt-link>
        </li>
      </ul>
      <h4>Our offices</h4>
      <p>singapure | australia | mumbai</p>
    </div>
    <div class="footer-bottom">
      <p>Copyright © 2021 Cashfund PLC</p>
      <p>Powered by <b><u>Vega IT</u></b></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
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
      <div class="footer-up__menu">
        <img :src="require('@/assets/images/icons/logo-white.svg')" alt="logo-white">
        <ul class="footer-up__menu__links">
          <li v-for="link in links" :key="link.href">
            <nuxt-link :to="link.href">
              {{ link.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <h4>Our offices</h4>
      <p>singapure | australia | mumbai</p>
    </div>
    <div class="footer-bottom">
      <p>Copyright © 2021 Cashfund PLC</p>
      <p>Powered by <strong><em><u>Vega IT</u></em></strong></p>
    </div>
  </div>
</template>

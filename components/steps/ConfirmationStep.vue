<script>
export default {
  name: 'ConfirmationStep'
}
</script>

<template>
  <div class="confirmation">
      <h2 class="form__title">
        Thank you!
      </h2>
    <div class="confirmation__text_image">
      <div>
        <img class="confirmation__image" :src="require('/assets/images/volunteer_activism.png')" alt="thank you">
      </div>
      <div class="confirmation__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus quis arcu ut laoreet.
          Suspendisse consectetur arcu neque, ac tincidunt sapien vulputate sed. Duis efficitur, magna ac
          pellentesque dignissim, diam felis posuere ligula, sed congue nisl tellus a arcu.
          Sed vestibulum mattis libero id bibendum. Sed vitae commodo justo, a semper arcu.
          Sed ullamcorper iaculis velit quis aliquet. Ut convallis eros nec metus ultrices, non aliquam sem aliquam.
        </p>
        <p>
          Praesent id accumsan odio. Nam sit amet purus fringilla, bibendum risus sed, tempus nulla.
          Curabitur iaculis dictum turpis. Aliquam erat volutpat. Duis velit diam, euismod quis justo vel,
          accumsan posuere metus. Nunc ac dapibus tortor, consectetur dapibus augue.
          Mauris facilisis finibus venenatis. Morbi orci lectus, congue id mauris a, imperdiet ultricies orci.
          Sed lobortis, urna nec posuere tempus, eros elit accumsan metus, suscipit blandit lectus nisi a libero.
          Sed lacinia fringilla justo, id cursus est elementum eget.
        </p>
      </div>
    </div>
    <button class="button btn-active">
      <NuxtLink class="button btn-active" to="/">
        Return home
      </NuxtLink>
    </button>
  </div>


</template>

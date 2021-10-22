<template>
<!-- Begin MailChimp Signup Form -->
<div id=" mb-40">
  <!-- <p>Sign up for the newsletter:</p><br /> -->

  <div id="newsletterinner">
    <form @submit="checkForm" action="https://sandervanwettum.us3.list-manage.com/subscribe/post?u=6092bbd06bcaa72ce7d9a3847&amp;id=293641fc8b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
      novalidate>


      <div id="mc_embed_signup_scroll">
        <input @focus="$event.target.select()" v-model="email" type="email" name="EMAIL" class="required email is-underlined-index mr-10" id="mce-EMAIL">
        <input @focus="$event.target.select()" v-model="name" type="text" value="Enter your names" name="FNAME" class="required name is-underlined-index mr-10" id="mce-FNAME">
        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="Aligner-item is-underlined-index submitbutton">
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6092bbd06bcaa72ce7d9a3847_293641fc8b" tabindex="-1" value=""></div>
      </div>

    </form>
  </div>
  <p v-if="errors.length>0" :style="errors.length>0 ? {'opacity':1}: {'opacity':0}" class="mt-10">
    Error: <span v-for="(error,index) in errors" v-html="error+ (index===errors.length-1 ?' required.':' and ')"></span>
  </p>
</div>

<!--End mc_embed_signup-->
</template>

<script>
export default {
  data: function() {
    return {
      errors: [],
      email: "Enter your email",
      name: "Enter your name"
    }
  },
  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.name) this.errors.push("Name");
      if (this.name === "Enter your name") this.errors.push("name");
      if (!this.email) {
        this.errors.push("email");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("valid email");
      }
      if (!this.errors.length) return true;
      e.preventDefault();
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
  // components: {
  // queryresults
  // },
  // props: ['content']
}
</script>

<style scoped lang="scss">
#newsletter {
    display: inline-block;
}
#newsletterinner {
    display: flex;
}
input {
    color: #091540;
    border: 0;
    background: transparent;
    font-size: inherit;
    outline: none;
    padding: 0;
    &.email {
        max-width: 200px;
    }
}


.submitbutton {
    margin: 0;
    padding: 0;
    cursor: pointer;
}
</style>

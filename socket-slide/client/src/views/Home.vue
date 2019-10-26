<template>
  <div>
    <b-carousel
      id="carousel-fade"
      v-model="slide"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <div v-for="slideData in slides" :key="slideData.id">
        <b-carousel-slide
          :caption="slideData.title"
          :img-src="slideData.src"
        ></b-carousel-slide>
      </div>
    </b-carousel>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "home",
  props: {
    currentSlide: Object
  },
  data() {
    return {
      slide: 0,
      slides: []
    };
  },
  created() {
    Axios({
      method: "get",
      url: "http://localhost:3000"
    })
      .then(({ data }) => {
        this.slides = data;
      })
      .catch(console.log);
  },
  watch: {
    slide() {
      this.$emit("requestChangeSlide", this.slide + 1);
    },
    currentSlide() {
      this.slideData = this.currentSlide;
      console.log(this.slideData);
    }
  }
};
</script>

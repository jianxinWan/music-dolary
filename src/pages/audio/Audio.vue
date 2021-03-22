<template>
  <div>
    <div>
      <audio controls="controls">
        <source
          src="https://cdn-px-hws-test.pxjy.com/audiozone/20200929/1601370183985.mp3"
          type="audio/mp3"
        />
      </audio>
    </div>
    <!-- 自定义audio -->
    <p>{{ message }}</p>
    <PlayBar></PlayBar>
  </div>
</template>

<script>
import PlayBar from "../../components/PlayBar";

export default {
  data() {
    return {};
  },
  components: {
    PlayBar
  },
  methods: {}
};
</script>
<style scoped></style>

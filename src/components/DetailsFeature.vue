<template>
  <div class="detailsFeature">
    <div class="detailsFeature_header">
      <h3 class="detailsFeature_title">Feature Link</h3>
    </div>    
    <div class="detailsFeature_container">
      <!-- <router-link class="detailsFeature_link" :to="{path, query: { filter: 'features', id: feature.id}}">
        {{ feature.title }}
      </router-link> -->
      <a class="detailsFeature_link" :href="`${path}?filter=features&id=${feature.id}`">
        {{ feature.title }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DetailsFeatures',

  components: {},

  props: {
    feature: {
      type: Object,
    },
  },

  data: () => ({
    path: '',
    show: false,
  }),

  created(this: any) {
    this.path = this.$route.path;
  },

  methods: {
    toggleAddFeature(this: any) {
      this.show = !this.show;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsFeature {
  padding: 1rem;

  &_header {
    align-items: center;
    border-bottom: 1px solid @madison;
    display: flex;
    justify-content: space-between;
  }

  &_title {
    margin: 0;
  }

  &_container {
    padding: 1rem 1rem 0;
  }

  &_link {
    color: @madison;

    &:hover {
      color: darken(@medium-sea-green, 10%);
      text-decoration: underline;
    }
  }
}

</style>

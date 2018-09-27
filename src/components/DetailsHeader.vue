<template>
  <div class="detailsHeader">
    <span class="detailsHeader_text">
      <bug-icon v-if="icon === 'bug'" />
      <component-icon v-if="icon === 'component'" />
      <feature-icon v-if="icon === 'feature'" />
      <h2
        class="detailsHeader_title"
        contenteditable="true"
        @blur="handleChange($event.target.innerText)"
      >
        {{ title }}
      </h2>
      </span>
      <close-button :onClose="onClose" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BugIcon from './BugIcon.vue';
import CloseButton from './CloseButton.vue';
import ComponentIcon from './ComponentIcon.vue';
import FeatureIcon from './FeatureIcon.vue';
import TaskIcon from './TaskIcon.vue';

export default Vue.extend({
  name: 'DetailsHeader',

  components: {
    BugIcon,
    CloseButton,
    ComponentIcon,
    FeatureIcon,
    TaskIcon,
  },

  props: {
    onChange: {
      type: Function,
    },
    onClose: {
      type: Function,
    },
    title: {
      default: '',
      type: String,
    },
  },

  data: () => ({
    icon: {
      default: '',
      type: String,
    },
  }),

  created(this: any) {
    this.icon = this.$route.query.filter.slice(0, -1);
  },

  methods: {
    handleChange(this: any, value: string) {
      this.onChange('title', value);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsHeader {
  align-items: center;
  // border-bottom: 1px solid @madison;
  display: flex;
  justify-content: space-between;

  &_text {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &_title {
    margin: 0;

    &:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }

    @media only screen and (max-width: 640px) {
      font-size: 1.2rem;
    }
  }
}
</style>

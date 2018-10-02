<template>
  <details-panel>
    <details-header
      :on-change="handleTextChange"
      :on-close="onClose"
      :title="item.title"
    />
    <details-data :item="item" />
    <description
      :on-change="handleTextChange"
      :text="item.description"
    />
    <details-items v-if="filter === 'features'" :items="featureItems" />
    <details-feature v-if="filter === 'items'" :feature="feature" />
    <links :links="links" />
    <comments :comments="comments" />
  </details-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Comments from '@/components/Comments.vue';
import Description from '@/components/Description.vue';
import DetailsData from '@/components/DetailsData.vue';
import DetailsFeature from './DetailsFeature.vue';
import DetailsHeader from '@/components/DetailsHeader.vue';
import DetailsItems from './DetailsItems.vue';
import DetailsPanel from '@/components/DetailsPanel.vue';
import Links from '@/components/Links.vue';
import { Comment, Link, Feature, Item } from '@/types';
import { Comment1, Comment2 } from '@/store/state';

export default Vue.extend({
  name: 'ItemDetails',

  components: {
    Comments,
    Description,
    DetailsData,
    DetailsFeature,
    DetailsHeader,
    DetailsItems,
    DetailsPanel,
    Links,
  },

  props: {
    comments: {
      type: Array,
    },
    featureItems: {
      type: Array,
    },
    feature: {},
    item: {},
    links: {
      type: Array,
    },
    onClose: {
      type: Function,
    },
  },

  data: () => ({
    filter: '',
    update: {} as Feature | Item,
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
    this.update = this.item;
  },

  methods: {
    ...mapActions({
      editFeature: 'features/editFeature',
      editItem: 'items/editItem',
    }),

    handleTextChange(this: any, type: string, value: string) {
      this.update = {
        ...this.update,
        [type]: value,
        startDate: new Date(this.update.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      if (this.filter === 'features') {
        this.editFeature(this.update);
      } else {
        this.editItem(this.update);
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

</style>

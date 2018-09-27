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
    <links :links="links" />
    <comments :comments="comments" />
  </details-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Comments from '@/components/Comments.vue';
import Description from '@/components/Description.vue';
import DetailsData from '@/components/DetailsData.vue';
import DetailsHeader from '@/components/DetailsHeader.vue';
import DetailsPanel from '@/components/DetailsPanel.vue';
import Links from '@/components/Links.vue';
import { Comment, Link, Feature, Item } from '@/types';
import { Link1, Link2, Comment1, Comment2 } from '@/store/state';

export default Vue.extend({
  name: 'ItemDetails',

  components: {
    Comments,
    Description,
    DetailsData,
    DetailsHeader,
    DetailsPanel,
    Links,
  },

  props: {
    item: {},
    onClose: {
      type: Function,
    },
  },

  data: () => ({
    filter: '',
    links: [Link1, Link2] as Link[],
    comments: [Comment1, Comment2] as Comment[],
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
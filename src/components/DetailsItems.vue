<template>
  <div class="detailsItems">
    <add-item-dialog v-if="show" :toggleDialog="toggleAddItem" />
    <div class="detailsItems_header">
      <h3 class="detailsItems_title">Items</h3>
      <add-button :onClick="toggleAddItem" />
    </div>    
    <div class="detailsItems_container" v-if="items && items.length > 0">
      <div class="detailsItems_list" v-for="item in items" :key="item.id">
        <div class="detailsItems_row">
          <router-link class="detailsItems_link" :to="{path, query: { filter: 'items', id: item.id}}">
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="detailsItems_list" v-else>
      <p class="detailsItems_noItems">No Items</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddButton from './AddButton.vue';
import AddItemDialog from './AddItemDialog.vue';

export default Vue.extend({
  name: 'DetailsItems',

  components: {
    AddButton,
    AddItemDialog,
  },

  props: {
    items: {
      type: Array,
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
    toggleAddItem(this: any) {
      this.show = !this.show;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsItems {
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

  &_list {
    padding: 1rem 1rem 0;
  }

  &_row {
    align-items: center;
    display: flex;
    justify-content: space-between;
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

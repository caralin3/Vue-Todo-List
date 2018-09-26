<template>
  <div class="links">
    <div class="links_header">
      <h3 class="links_title">Links</h3>
      <add-button :onClick="() => null" />
    </div>
    
    <div class="links_container" v-if="links && links.length > 0">
      <div class="links_linkList" v-for="link in links" :key="link.id">
        <div class="links_linkRow"
          :class="{'links_linkRow-border': editedLink.editing && editedLink.id === link.id}"
          :contenteditable="editedLink.editing && editedLink.id === link.id"
          @blur="handleLinkChange($event.target.innerText, link)"
        >
          <a class="links_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
          <edit-button class="links_edit" :onClick="() => toggleEditLink(link.id)" />
        </div>
      </div>
    </div>
    <div class="links_linkList" v-else>
      <p class="links_noLinks">No links</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddButton from './AddButton.vue';
import EditButton from './EditButton.vue';
import { Link } from '@/types';

export default Vue.extend({
  name: 'Links',

  components: {
    AddButton,
    EditButton,
  },

  props: {
    links: {
      type: Array,
    },
  },

  data: () => ({
    editedLink: {
      editing: false,
      id: '',
    },
    updatedLink: {} as Link,
  }),

  methods: {
    handleLinkChange(this: any, value: string, link: Link) {
      console.log(value);
      // this.updatedLink = {
      //   id: link.id,
      //   startDate: link.startDate.toString(),
      //   to: value,
      //   updatedDate: new Date().toString(),
      //   user: link.user,
      // };
      this.editedLink.editing = false;
      // this.editLink(this.updatedLink);
    },
    toggleEditLink(this: any, id: string) {
      this.editedLink = {
        id,
        editing: true,
      };
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.links {
  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &_linkRow {
    align-items: center;
    display: flex;
    justify-content: space-between;

    &:hover {
      .links_edit {
        cursor: pointer;
        opacity: 1;
      }
    }

    &-border {
      padding: 0.3rem 0.5rem;
      border: 1px solid @madison;
    }
  }

  &_link {
    color: @madison;

    &:hover {
      color: darken(@medium-sea-green, 10%);
      text-decoration: underline;
    }
  }

  &_edit {
    opacity: 0;
    padding: 0.5rem 1rem;
  }
}

</style>

<template>
  <div class="links">
    <add-link-dialog v-if="show" :toggle-dialog="toggleDialog" />
    <div class="links_header">
      <h3 class="links_title">Links</h3>
      <add-button :onClick="toggleDialog" />
    </div>    
    <div class="links_container" v-if="links && links.length > 0">
      <div class="links_linkList" v-for="link in links" :key="link.id">
        <div class="links_linkRow"
          :class="{'links_linkRow-border': editedLink.editing && editedLink.id === link.id}"
          :contenteditable="editedLink.editing && editedLink.id === link.id"
          @blur="handleLinkChange($event.target.innerText, link)"
        >
          <a
            :class="{'links_link': !editedLink.editing}"
            :href="updatedLink.to ? updatedLink.to : link.to"
            target="_blank"
          >
            {{ link.to }}
          </a>
        </div>
        <span>
          <edit-button class="links_edit" :on-click="() => toggleEditLink(link.id)" />
          <delete-button class="links_delete" :on-click="() => deleteLink(link)" />
        </span>
      </div>
    </div>
    <div class="links_linkList" v-else>
      <p class="links_noLinks">No links</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import AddButton from './AddButton.vue';
import AddLinkDialog from './AddLinkDialog.vue';
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';
import { Link } from '@/types';

export default Vue.extend({
  name: 'Links',

  components: {
    AddButton,
    AddLinkDialog,
    DeleteButton,
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
    show: false,
    updatedLink: {} as Link,
  }),

  methods: {
    ...mapActions({
      editLink: 'links/editLink',
      removeLink: 'links/removeLink',
    }),
    handleLinkChange(this: any, value: string, link: Link) {
      this.updatedLink = {
        featureId: link.featureId || '',
        id: link.id,
        itemId: link.itemId || '',
        projectId: link.projectId,
        startDate: new Date(link.startDate).toString(),
        to: value,
        updatedDate: new Date().toString(),
        user: link.userId,
      };
      this.editedLink.editing = false;
      this.editLink(this.updatedLink);
    },
    toggleEditLink(this: any, id: string) {
      this.editedLink = {
        id,
        editing: true,
      };
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    deleteLink(this: any, link: Link) {
      this.removeLink(link);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.links {
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
    padding: 1rem 0 0 1rem;
  }

  &_noLinks {
    padding-left: 1rem;
  }

  &_linkList {
    align-items: center;
    display: flex;
    justify-content: space-between;

    &:hover {
      .links_edit,
      .links_delete {
        cursor: pointer;
        opacity: 1;
      }
    }
  }

  &_linkRow {
    align-items: center;
    display: flex;
    justify-content: space-between;

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
    padding: 0.5rem;
  }

  &_delete {
    opacity: 0;
    padding: 0.5rem 1rem;
  }
}

</style>

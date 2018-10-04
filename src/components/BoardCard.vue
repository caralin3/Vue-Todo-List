<template>
  <div
    class="boardCard"
    draggable="true"
    @dragstart="dragStart($event, item.id)"
  >
    <div class="boardCard_title">
      <bug-icon class="boardCard_icon" v-if="itemType === 'items' && item.type === 'bug'" />
      <component-icon class="boardCard_icon" v-if="itemType === 'items' && item.type === 'component'" />
      <feature-icon class="boardCard_icon" v-if="itemType === 'features'" />
      <task-icon class="boardCard_icon" v-if="itemType === 'items' && item.type === 'task'" />
      <a class="boardCard_link" :href="`${$route.path}?filter=${itemType}&id=${item.id}`">
        {{ item.title }}
      </a>
    </div>
    <p class="boardCard_description">
      <priority-icon class="boardCard_priorityIcon" :priority="item.priority"/>
      {{ item.description | shorterDescription }}
    </p>
    <div class="boardCard_user">
      <i class="fas fa-user-circle boardCard_user-icon" />
      <p class="boardCard_user-name">{{ item.assignee | name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BugIcon from './BugIcon.vue';
import ComponentIcon from './ComponentIcon.vue';
import FeatureIcon from './FeatureIcon.vue';
import PriorityIcon from './PriorityIcon.vue';
import TaskIcon from './TaskIcon.vue';

export default Vue.extend({
  name: 'BoardCard',

  components: {
    BugIcon,
    ComponentIcon,
    FeatureIcon,
    PriorityIcon,
    TaskIcon,
  },

  props: {
    item: {
      type: Object,
    },
    itemType: {
      type: String,
    },
  },

  methods: {
    dragStart(event: any, id: string) {
      event.dataTransfer.setData('text/plain', id);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.boardCard {
  align-items: flex-start;
  background-color: @white;
  border: 1px solid @madison;
  color: @madison;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-top: -1px; // border collapse
  padding: 1rem 0 1rem 0;

  &:hover {
    cursor: grab;
  }

  &_title,
  &_user {
    align-items: center;
    display: flex;

    @media only screen and (max-width: 640px) {
      flex-direction: column;
    }
  }

  &_link {
    color: @madison;
    padding-right: 0.5rem;

    @media only screen and (max-width: 640px) {
      font-size: 100%;
      padding: 0.5rem;
      width: 3rem;
      word-wrap: break-word;
    }

    &:hover {
      color: darken(@medium-sea-green, 10%);
      text-decoration: underline;
    }
  }

  &_description {
    align-items: flex-start;
    display: flex;
    padding-right: 1rem;

    @media only screen and (max-width: 640px) {
      display: none;
    }
  }

  &_priorityIcon {
    padding: 0 0.5rem 0 1rem;
  }

  &_user {
    padding-left: 1rem;

    @media only screen and (max-width: 640px) {
      display: none;
    }

    &-icon {
      padding-right: 1rem;
    }
  }

  &_user-name {
    margin: 0;
  }
}
</style>


<template>
  <li class="activityListItem">
    <div class="activityListItem_header">
      <span class="activityListItem_header-name">
        <bug-icon v-if="icon === 'bug'" />
        <component-icon v-if="icon === 'component'" />
        <feature-icon v-if="icon === 'feature'" />
        <task-icon v-if="icon === 'task'" />
        <h4 class="activityListItem_title">{{ item.title }}</h4>
      </span>
      <h5 class="activityListItem_date">{{ new Date(item.updatedDate) | shortDate }}</h5>
    </div>
    <div class="activityListItem_body">
      <p class="activityListItem_description">{{ item.description | shortDescription }}</p>
      <p class="activityListItem_description-mobile">{{ item.description | shortestDescription }}</p>
      <span class="activityListItem_row">
        <span class="activityListItem_row">
          <h4 class="activityListItem_label">Status:</h4>
          <status-icon class="activityListItem_statusIcon" :status="item.status" />
          <p class="activityListItem_text">{{ item.status | capitalize }}</p>
        </span>
        <span class="activityListItem_row">
          <h4 class="activityListItem_label">Priority:</h4>
          <priority-icon class="activityListItem_priorityIcon" :priority="item.priority"/>
          <p class="activityListItem_text">{{ item.priority | capitalize }}</p>
        </span>
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import BugIcon from './BugIcon.vue';
import ComponentIcon from './ComponentIcon.vue';
import FeatureIcon from './FeatureIcon.vue';
import PriorityIcon from './PriorityIcon.vue';
import StatusIcon from './StatusIcon.vue';
import TaskIcon from './TaskIcon.vue';

export default Vue.extend({
  name: 'ActivityListItem',

  components: {
    BugIcon,
    ComponentIcon,
    FeatureIcon,
    PriorityIcon,
    StatusIcon,
    TaskIcon,
  },

  props: {
    icon: {
      type: String,
    },
    item: {
      type: Object,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.activityListItem {
  align-items: flex-start;
  border-bottom: 1px solid @very-light-gray;
  // box-shadow: 1px 2px 2px rgba(114, 113, 113, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 0;

  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    &-name {
      align-items: center;
      display: flex;
    }
  }

  &_title {
    line-height: 2rem;
    margin: 0;
  }

  &_body {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
  }

  &_description {
    line-height: 2rem;
    margin: 0;

    &-mobile {
      display: none;

      @media only screen and (max-width: 640px) {
        display: block;
        line-height: 2rem;
        margin: 0;
      }
    }

    @media only screen and (max-width: 640px) {
      display: none;
    }
  }

  &_date {
    margin: 0;
    justify-self: flex-end;
    padding: 0 1rem;
  }

  &_row {
    align-items: center;
    display: flex;
    padding: 0 1rem;
  }

  &_label {
    margin: 0;
    padding: 0 1rem 0 0;

    @media only screen and (max-width: 640px) {
      display: none;
    }
  }

  &_text {
    margin: 0;

    @media only screen and (max-width: 640px) {
      display: none;
    }
  }

  &_statusIcon {
    @media only screen and (max-width: 640px) {
      display: none;
    }
  }
}
</style>

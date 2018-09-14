<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <AddProjectDialog v-if="show" :toggleDialog="toggleDialog" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import AddProjectDialog from '@/components/AddProjectDialog.vue';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { User1 } from '@/store/state';
import { Project, User, statusType } from '@/types';
import { statusOptions } from '@/utils/constants';
import { uid } from '@/utils/guid';

@Component({
  components: {
    AddProjectDialog,
    DateInput,
    Dialog,
    SelectInput,
    Form,
    ProjectsHeader,
    ProjectList,
    TextAreaInput,
    TextInput,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
})
export default class Projects extends Vue {}
</script>

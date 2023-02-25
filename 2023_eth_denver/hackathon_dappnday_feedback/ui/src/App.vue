<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else>
      <div id="content" style="display: flex; flex-direction: column; flex: 1;">
        <h2></h2>

        <div v-if="showCreate">
          <CreateSubmission @submissionCreated="submissionCreated"/>
          <button @click="showResults">show results</button>
        </div>
        <div v-if="showSubmissions">
          <AllSubmissions/>
          <button @click="showForm">Submit Response</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppAgentClient, AppAgentWebsocket } from '@holochain/client';
import '@material/mwc-circular-progress';
import CreateSubmission from './feedback/feedback/CreateSubmission.vue';
import AllSubmissions from './feedback/feedback/AllSubmissions.vue';
export default defineComponent({
  components: {
    // Add your subcomponents here
    CreateSubmission,
    AllSubmissions,
  },
  data(): {
    client: AppAgentClient | undefined;
    loading: boolean;
    showCreate: boolean;
    showSubmissions: boolean;
  } {
    return {
      client: undefined,
      loading: true,
      showCreate: true,
      showSubmissions: false,
    };
  },
  methods: {
    showResults() {
      this.showCreate = false;
      this.showSubmissions = true;
    },
    showForm() {
      this.showCreate = true;
      this.showSubmissions = false;
    },
    submissionCreated() {
      this.showResults();
    }
  },
  async mounted() {
    // We pass '' as url because it will dynamically be replaced in launcher environments
    this.client = await AppAgentWebsocket.connect('', 'hackathon_dappnday_feedback');

    this.loading = false;
  },
  provide() {
    return {
      client: computed(() => this.client),
    };
  },
});
</script>

<template>
  <div>
    <div v-if="loading">
      <mwc-circular-progress indeterminate></mwc-circular-progress>
    </div>
    <div v-else>
      <div id="content" style="display: flex; flex-direction: column; flex: 1;">
        <h2><CreateSubmission /><AllSubmissions /></h2>      
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppAgentClient, AppAgentWebsocket } from '@holochain/client';
import '@material/mwc-circular-progress';
import AllSubmissions from './questions/questions/AllSubmissions.vue'
import CreateSubmission from './questions/questions/CreateSubmission.vue'
export default defineComponent({
  components: {
    // Add your subcomponents here
    CreateSubmission,
    AllSubmissions,
  },
  data(): {
    client: AppAgentClient | undefined;
    loading: boolean;
  } {
    return {
      client: undefined,
      loading: true,
    };
  },
  async mounted() {
    // We pass '' as url because it will dynamically be replaced in launcher environments
    this.client = await AppAgentWebsocket.connect('', 'dapp_in_a_day_feedback');

    this.loading = false;
  },
  provide() {
    return {
      client: computed(() => this.client),
    };
  },
});
</script>

<template>
  <div v-if="loading" style="display: flex; flex: 1; align-items: center; justify-content: center">
    <mwc-circular-progress indeterminate></mwc-circular-progress>
  </div>

  <div v-else style="display: flex; flex-direction: column">
    <span v-if="error">Error fetching the submissions: {{error.data.data}}.</span>
    <div v-else-if="hashes && hashes.length > 0" style="margin-bottom: 8px">
      <SubmissionDetail 
        v-for="hash in hashes" 
        :submission-hash="hash"
        @submission-deleted="fetchSubmission()"
      >
      </SubmissionDetail>
    </div>
    <span v-else>No submissions found.</span>
  </div>

</template>

<script lang="ts">
import { defineComponent, inject, toRaw, ComputedRef } from 'vue';
import { decode } from '@msgpack/msgpack';
import { AppAgentClient, NewEntryAction, Record, AgentPubKey, EntryHash, ActionHash } from '@holochain/client';
import '@material/mwc-circular-progress';
import SubmissionDetail from './SubmissionDetail.vue';
import { FeedbackSignal } from './types';

export default defineComponent({
  components: {
    SubmissionDetail
  },
  data(): { hashes: Array<ActionHash> | undefined; loading: boolean; error: any } {
    return {
      hashes: undefined,
      loading: true,
      error: undefined
    }
  },
  async mounted() {
    await this.fetchSubmission();
    toRaw(this.client).on('signal', signal => {
      if (signal.zome_name !== 'feedback') return; 
      const payload = signal.payload as FeedbackSignal;
      if (payload.type !== 'EntryCreated') return;
      if (payload.app_entry.type !== 'Submission') return;
      if (this.hashes) this.hashes.push(payload.action.hashed.hash);
    });
  },
  methods: {
    async fetchSubmission() {
      try {
        const records: Array<Record> = await this.client.callZome({
          cap_secret: null,
          role_name: 'feedback',
          zome_name: 'feedback',
          fn_name: 'get_all_submissions',
          payload: null,
        });
        this.hashes = records.map(r => r.signed_action.hashed.hash);
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    }
  },
  setup() {
    const client = (inject('client') as ComputedRef<AppAgentClient>).value;
    return {
      client,
    };
  },
})
</script>

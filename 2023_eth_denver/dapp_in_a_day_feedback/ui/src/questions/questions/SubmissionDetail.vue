<template>
  <div v-if="!loading">
    <div v-if="record" style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <span style="flex: 1"></span>
      
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Date Attended: </strong></span>
 	<span style="white-space: pre-line">{{  new Date((submission?.date_attended || 0)/ 1000).toLocaleString() }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Inspiration: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.inspiration }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Ease Of Start: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.ease_of_start }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Coding Experience: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.coding_experience }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Surprise: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.surprise }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Frustration: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.frustration }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Next Steps: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.next_steps }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Satisfaction: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.satisfaction.type === 'Disappointed' ? `Disappointed` :  submission?.satisfaction.type === 'Reasonable' ? `Reasonable` :  submission?.satisfaction.type === 'Neutral' ? `Neutral` :  submission?.satisfaction.type === 'Positive' ? `Positive` :  `Awesome`  }} </span>
      </div>

    </div>
    
    <span v-else>The requested submission was not found.</span>
  </div>

  <div v-else style="display: flex; flex: 1; align-items: center; justify-content: center">
    <mwc-circular-progress indeterminate></mwc-circular-progress>
  </div>

</template>

<script lang="ts">
import { defineComponent, inject, ComputedRef } from 'vue';
import { decode } from '@msgpack/msgpack';
import { AppAgentClient, Record, AgentPubKey, EntryHash, ActionHash, DnaHash } from '@holochain/client';
import { Submission, Satisfaction } from './types';
import '@material/mwc-circular-progress';
import '@material/mwc-icon-button';
import '@material/mwc-snackbar';
import { Snackbar } from '@material/mwc-snackbar';

export default defineComponent({
  props: {
    submissionHash: {
      type: Object,
      required: true
    }
  },
  data(): { record: Record | undefined; loading: boolean;  } {
    return {
      record: undefined,
      loading: true,
    }
  },
  computed: {
    submission() {
      if (!this.record) return undefined;
      return decode((this.record.entry as any).Present.entry) as Submission;
    }
  },
  async mounted() {
    await this.fetchSubmission();
  },
  methods: {
    async fetchSubmission() {
      this.loading = true;
      this.record = undefined;

      this.record = await this.client.callZome({
        cap_secret: null,
        role_name: 'questions',
        zome_name: 'questions',
        fn_name: 'get_submission',
        payload: this.submissionHash,
      });

      this.loading = false;
    },
  },
  emits: ['submission-deleted'],
  setup() {
    const client = (inject('client') as ComputedRef<AppAgentClient>).value;
    return {
      client
    };
  },
})
</script>

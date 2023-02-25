<template>
  <div v-if="!loading">
    <div v-if="record" style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <span style="flex: 1"></span>
      
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Date: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.date.type === 'Saturday' ? `Saturday` :  submission?.date.type === 'Monday' ? `Monday` :  `Wednesday`  }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Os: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.os.type === 'Linux' ? `Linux` :  submission?.os.type === 'MacOsIntel' ? `Mac Os Intel` :  submission?.os.type === 'MacOsM1' ? `Mac Os M 1` :  `Windows`  }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Experience: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.experience }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Inspiration: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.inspiration }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Dev Experience: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.dev_experience.type === 'One' ? `One` :  submission?.dev_experience.type === 'Two' ? `Two` :  submission?.dev_experience.type === 'Three' ? `Three` :  submission?.dev_experience.type === 'Four' ? `Four` :  `Five`  }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Difficulty: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.difficulty.type === 'One' ? `One` :  submission?.difficulty.type === 'Two' ? `Two` :  submission?.difficulty.type === 'Three' ? `Three` :  submission?.difficulty.type === 'Four' ? `Four` :  `Five`  }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Surprising: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.surprising }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Frustrating: </strong></span>
 	<span style="white-space: pre-line">{{  submission?.frustrating }} </span>
      </div>

      <div style="display: flex; flex-direction: row; margin-bottom: 16px;">
	<span style="margin-right: 4px"><strong>Star Rating: </strong></span>
 	<span style="white-space: pre-line">{{   submission?.star_rating.type === 'One' ? `One` :  submission?.star_rating.type === 'Two' ? `Two` :  submission?.star_rating.type === 'Three' ? `Three` :  submission?.star_rating.type === 'Four' ? `Four` :  `Five`  }} </span>
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
import { Submission, Date, Os, DevExperience, Difficulty, StarRating } from './types';
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
        role_name: 'feedback',
        zome_name: 'feedback',
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

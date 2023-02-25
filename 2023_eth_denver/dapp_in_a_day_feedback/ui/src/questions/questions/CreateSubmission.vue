<template>
  <mwc-snackbar ref="create-error"></mwc-snackbar>

  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create Submission</span>
  
    <div style="margin-bottom: 16px">
      <vaadin-date-time-picker label="Date Attended" :value="new Date(dateAttended / 1000).toISOString()" @change="dateAttended = new Date($event.target.value).valueOf() * 1000" required></vaadin-date-time-picker>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Inspiration" :value="inspiration" @input="inspiration = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <div style="display: flex; flex-direction: row">
        <span style="margin-right: 4px">Ease Of Start</span>
      
        <mwc-slider :value="easeOfStart" @input="easeOfStart = $event.detail.value" discrete></mwc-slider>
      </div>
    </div>

    <div style="margin-bottom: 16px">
      <div style="display: flex; flex-direction: row">
        <span style="margin-right: 4px">Coding Experience</span>
      
        <mwc-slider :value="codingExperience" @input="codingExperience = $event.detail.value" discrete></mwc-slider>
      </div>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Surprise" :value="surprise" @input="surprise = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Frustration" :value="frustration" @input="frustration = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Next Steps" :value="nextSteps" @input="nextSteps = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Satisfaction" required>
  <mwc-list-item :selected="satisfaction.type === 'Disappointed' " @request-selected="satisfaction = { type: 'Disappointed'}">Disappointed</mwc-list-item>
  <mwc-list-item :selected="satisfaction.type === 'Reasonable' " @request-selected="satisfaction = { type: 'Reasonable'}">Reasonable</mwc-list-item>
  <mwc-list-item :selected="satisfaction.type === 'Neutral' " @request-selected="satisfaction = { type: 'Neutral'}">Neutral</mwc-list-item>
  <mwc-list-item :selected="satisfaction.type === 'Positive' " @request-selected="satisfaction = { type: 'Positive'}">Positive</mwc-list-item>
  <mwc-list-item :selected="satisfaction.type === 'Awesome' " @request-selected="satisfaction = { type: 'Awesome'}">Awesome</mwc-list-item>
</mwc-select>
    </div>

  
    <mwc-button 
      raised
      label="Create Submission"
      :disabled="!isSubmissionValid"
      @click="createSubmission"
    ></mwc-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ComputedRef } from 'vue';
import { AppAgentClient, Record, AgentPubKey, EntryHash, ActionHash, DnaHash } from '@holochain/client';
import { Submission, Satisfaction } from './types';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-snackbar';
import { Snackbar } from '@material/mwc-snackbar';
import '@vaadin/date-time-picker/theme/material/vaadin-date-time-picker.js';

import '@material/mwc-select';
import '@material/mwc-slider';
import '@material/mwc-textarea';
export default defineComponent({
  data(): {
    dateAttended: number;
    inspiration: string;
    easeOfStart: number;
    codingExperience: number;
    surprise: string;
    frustration: string;
    nextSteps: string;
    satisfaction: Satisfaction;
  } {
    return { 
      dateAttended: Date.now(),
      inspiration: '',
      easeOfStart: 0,
      codingExperience: 0,
      surprise: '',
      frustration: '',
      nextSteps: '',
      satisfaction: { type: 'Disappointed' },
    }
  },
  computed: {
    isSubmissionValid() {
    return true && true && this.inspiration !== '' && true && true && this.surprise !== '' && this.frustration !== '' && this.nextSteps !== '' && true;
    },
  },
  methods: {
    async createSubmission() {
      const submission: Submission = { 
        date_attended: this.dateAttended!,

        inspiration: this.inspiration!,

        ease_of_start: this.easeOfStart!,

        coding_experience: this.codingExperience!,

        surprise: this.surprise!,

        frustration: this.frustration!,

        next_steps: this.nextSteps!,

        satisfaction: this.satisfaction!,
      };

      try {
        const record: Record = await this.client.callZome({
          cap_secret: null,
          role_name: 'questions',
          zome_name: 'questions',
          fn_name: 'create_submission',
          payload: submission,
        });
        this.$emit('submission-created', record.signed_action.hashed.hash);
      } catch (e: any) {
        const errorSnackbar = this.$refs['create-error'] as Snackbar;
        errorSnackbar.labelText = `Error creating the submission: ${e.data.data}`;
        errorSnackbar.show();
      }
    },
  },
  emits: ['submission-created'],
  setup() {
    const client = (inject('client') as ComputedRef<AppAgentClient>).value;
    return {
      client,
    };
  },
})
</script>

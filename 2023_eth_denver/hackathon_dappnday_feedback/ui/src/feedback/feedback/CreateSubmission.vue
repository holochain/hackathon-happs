<template>
  <mwc-snackbar ref="create-error"></mwc-snackbar>

  <div style="display: flex; flex-direction: column">
    <span style="font-size: 18px">Create Submission</span>
  
    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Date" required>
  <mwc-list-item :selected="date.type === 'Saturday' " @request-selected="date = { type: 'Saturday'}">Saturday</mwc-list-item>
  <mwc-list-item :selected="date.type === 'Monday' " @request-selected="date = { type: 'Monday'}">Monday</mwc-list-item>
  <mwc-list-item :selected="date.type === 'Wednesday' " @request-selected="date = { type: 'Wednesday'}">Wednesday</mwc-list-item>
</mwc-select>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Os" required>
  <mwc-list-item :selected="os.type === 'Linux' " @request-selected="os = { type: 'Linux'}">Linux</mwc-list-item>
  <mwc-list-item :selected="os.type === 'MacOsIntel' " @request-selected="os = { type: 'MacOsIntel'}">Mac Os Intel</mwc-list-item>
  <mwc-list-item :selected="os.type === 'MacOsM1' " @request-selected="os = { type: 'MacOsM1'}">Mac Os M 1</mwc-list-item>
  <mwc-list-item :selected="os.type === 'Windows' " @request-selected="os = { type: 'Windows'}">Windows</mwc-list-item>
</mwc-select>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Experience" :value="experience" @input="experience = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Inspiration" :value="inspiration" @input="inspiration = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Dev Experience" required>
  <mwc-list-item :selected="devExperience.type === 'One' " @request-selected="devExperience = { type: 'One'}">One</mwc-list-item>
  <mwc-list-item :selected="devExperience.type === 'Two' " @request-selected="devExperience = { type: 'Two'}">Two</mwc-list-item>
  <mwc-list-item :selected="devExperience.type === 'Three' " @request-selected="devExperience = { type: 'Three'}">Three</mwc-list-item>
  <mwc-list-item :selected="devExperience.type === 'Four' " @request-selected="devExperience = { type: 'Four'}">Four</mwc-list-item>
  <mwc-list-item :selected="devExperience.type === 'Five' " @request-selected="devExperience = { type: 'Five'}">Five</mwc-list-item>
</mwc-select>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Difficulty" required>
  <mwc-list-item :selected="difficulty.type === 'One' " @request-selected="difficulty = { type: 'One'}">One</mwc-list-item>
  <mwc-list-item :selected="difficulty.type === 'Two' " @request-selected="difficulty = { type: 'Two'}">Two</mwc-list-item>
  <mwc-list-item :selected="difficulty.type === 'Three' " @request-selected="difficulty = { type: 'Three'}">Three</mwc-list-item>
  <mwc-list-item :selected="difficulty.type === 'Four' " @request-selected="difficulty = { type: 'Four'}">Four</mwc-list-item>
  <mwc-list-item :selected="difficulty.type === 'Five' " @request-selected="difficulty = { type: 'Five'}">Five</mwc-list-item>
</mwc-select>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Surprising" :value="surprising" @input="surprising = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-textarea outlined label="Frustrating" :value="frustrating" @input="frustrating = $event.target.value" required></mwc-textarea>
    </div>

    <div style="margin-bottom: 16px">
      <mwc-select outlined helper="Star Rating" required>
  <mwc-list-item :selected="starRating.type === 'One' " @request-selected="starRating = { type: 'One'}">One</mwc-list-item>
  <mwc-list-item :selected="starRating.type === 'Two' " @request-selected="starRating = { type: 'Two'}">Two</mwc-list-item>
  <mwc-list-item :selected="starRating.type === 'Three' " @request-selected="starRating = { type: 'Three'}">Three</mwc-list-item>
  <mwc-list-item :selected="starRating.type === 'Four' " @request-selected="starRating = { type: 'Four'}">Four</mwc-list-item>
  <mwc-list-item :selected="starRating.type === 'Five' " @request-selected="starRating = { type: 'Five'}">Five</mwc-list-item>
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
import { Submission, Date, Os, DevExperience, Difficulty, StarRating } from './types';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-snackbar';
import { Snackbar } from '@material/mwc-snackbar';
import '@material/mwc-select';

import '@material/mwc-textarea';
export default defineComponent({
  data(): {
    date: Date;
    os: Os;
    experience: string;
    inspiration: string;
    devExperience: DevExperience;
    difficulty: Difficulty;
    surprising: string;
    frustrating: string;
    starRating: StarRating;
  } {
    return { 
      date: { type: 'Saturday' },
      os: { type: 'Linux' },
      experience: '',
      inspiration: '',
      devExperience: { type: 'One' },
      difficulty: { type: 'One' },
      surprising: '',
      frustrating: '',
      starRating: { type: 'One' },
    }
  },
  computed: {
    isSubmissionValid() {
    return true && true && true && this.experience !== '' && this.inspiration !== '' && true && true && this.surprising !== '' && this.frustrating !== '' && true;
    },
  },
  methods: {
    async createSubmission() {
      const submission: Submission = { 
        date: this.date!,

        os: this.os!,

        experience: this.experience!,

        inspiration: this.inspiration!,

        dev_experience: this.devExperience!,

        difficulty: this.difficulty!,

        surprising: this.surprising!,

        frustrating: this.frustrating!,

        star_rating: this.starRating!,
      };

      try {
        const record: Record = await this.client.callZome({
          cap_secret: null,
          role_name: 'feedback',
          zome_name: 'feedback',
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

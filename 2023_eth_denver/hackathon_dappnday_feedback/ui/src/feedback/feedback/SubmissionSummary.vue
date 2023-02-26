<template>
  <h2>Summary...</h2>
  <div>{{records.length}} Responses</div>
  <Histogram :values="histogram('difficulty')" label="Difficulty" />
  <Histogram :values="histogram('dev_experience')" label="Level of Experience" />
  <Histogram :values="histogram('star_rating')" label="Overall" />
</template>
<script lang="ts">
import {defineComponent, inject, ComputedRef, defineProps} from 'vue';
import {decode} from '@msgpack/msgpack';
import {Submission} from "./types";
import Histogram from "./Histogram.vue";

function enumToInt(menum: any): number  {
  switch(menum.type) {
    case "One": return 0;
    case "Two": return 1;
    case "Three": return 2;
    case "Four": return 3;
    case "Five": return 4;
    default: throw new Error(`Unexpected enum value ${menum.type}`)
  }
}

export default defineComponent({
  components: {
    Histogram
  },
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    histogram: function(key: 'difficulty' | 'dev_experience' | 'star_rating') {
      let hist = [0, 0, 0, 0, 0];
      for (let i = 0; i < this.records.length; i++) {
        let hash = decode(((this.records[i] as any).entry as any).Present.entry) as Submission
        console.log(hash);
        hist[enumToInt(hash[key])] += 1;
      }
      return hist;
    }
  }
});

</script>

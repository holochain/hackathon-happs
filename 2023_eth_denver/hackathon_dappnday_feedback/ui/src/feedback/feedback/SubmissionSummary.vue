<template>
  <h2>Summary...</h2>
  <div>{{records.length}} Responses</div>
  <div>{{histogram5('ease')}} Responses</div>
  <hr/>
</template>
<script lang="ts">
import {defineComponent, inject, ComputedRef, defineProps} from 'vue';
import {decode} from '@msgpack/msgpack';
import {Submission} from "./types";

function enumToInt(menum: any): number  {
  switch(menum.type) {
    case "One": return 0;
    case "Two": return 1;
    case "Three": return 2;
    case "Four": return 3;
    case "Five": return 4;
    default :   return -1;
  }
}

export default defineComponent({
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    histogram5: function(key: string) {
      let hist = [0, 0, 0, 0, 0];
      for (let i = 0; i < this.records.length; i++) {
        let hash = decode(((this.records[i] as any).entry as any).Present.entry) as Submission
        console.log(hash);
        hist[enumToInt(hash.difficulty)] += 1;
      }
      return hist;
    }
  }
});

</script>

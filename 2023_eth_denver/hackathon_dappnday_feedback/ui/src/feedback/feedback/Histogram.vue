<template>
  <div>{{ label }}</div>
  <div style="display: flex;">
    <div v-for="row in transformed">
      <div v-for="cell in row" style="width: 10px; height: 10px">
        {{ cell }}
      </div>
    </div>
  </div>
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
    default: throw new Error(`Unexpected enum value ${menum.type}`)
  }
}

export default defineComponent({
  props: {
    label: {
      type: String
    },
    values: {
      type: Array,
      required: true,
    },
  },
  computed: {
    transformed: function(): Array<Array<string>> {
      const output = []
      
      const max = Math.max(...(this.values as Array<number>))

      for (let i = max -1; i >=0 ; i--) {
        const row = []
        for (let j = 0; j < 5; j++) {          
          row.push((this.values[j] as number) <= i ? '#' : ' ')
        }
        output.push(row)
      }

      return output
    }
  }
});

</script>

<template>
  <div>
    <div style="display: flex; flex-direction: column">
      <div v-for="row in transformed" style="display: flex;">
        <span v-for="cell in row" style="flex-basis: 15px; height: 15px">
          {{ cell }}
        </span>
      </div><br/>
    </div>
  </div>
  <div>{{ label }}</div>
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
          row.push((this.values[j] as number) <= i ? ' ' : '#')
        }
        output.push(row)
      }

      console.log(this.label, this.values, output)

      return output
    }
  }
});

</script>

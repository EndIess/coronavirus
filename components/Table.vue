<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="15"
    class="elevation-1 mt-3"
  >
    <template #[`item.date`]="{ item }">
      <span>{{ changeDateFormat(item.date) }}</span>
    </template>
    <template #[`item.cases`]="{ item }">
      <span>{{ formatNum(item.cases) }}</span>
    </template>
    <template #[`item.deaths`]="{ item }">
      <span>{{ formatNum(item.deaths) }}</span>
    </template>
    <template #[`item.recovered`]="{ item }">
      <span>{{ formatNum(item.recovered) }}</span>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import mixin from '~/components/mixin'

export default {
  mixins: [mixin],
  props: {
    rawData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          value: 'date',
        },
        { text: 'Cases', align: 'center', value: 'cases' },
        { text: 'Deaths', align: 'center', value: 'deaths' },
        { text: 'Recovered', align: 'center', value: 'recovered' },
      ],
    }
  },
  computed: {
    items() {
      const obj = {}
      for (const i of Object.keys(this.rawData)) {
        for (const [j, value] of Object.entries(this.rawData[i])) {
          if (!obj[j]) {
            obj[j] = {}
          }
          obj[j][i] = value
        }
      }

      const result = []
      for (const i of Object.keys(obj)) {
        const temp = obj[i]
        temp.date = moment(new Date(i)).format('YYYY-MM-DD')
        result.push(temp)
      }
      return result
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-row class="pt-3" justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      Date:
      <date-range-picker
        ref="picker"
        v-model="dateRange"
        opens="right"
        auto-apply
      >
        <template #[`input`]="picker" style="min-width: 350px">
          {{ changeDateFormat(picker.startDate) }} -
          {{ changeDateFormat(picker.endDate) }}
        </template>
      </date-range-picker>

      <v-card class="mt-3">
        <v-tabs
          v-model="tab"
          background-color="blue darken-4"
          center-active
          dark
        >
          <v-tab>Table</v-tab>
          <v-tab>Chart</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat><Table :raw-data="rawData" /></v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat><Chart :raw-data="rawData" /></v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import _ from 'lodash'
import Table from '~/components/Table'
import Chart from '~/components/Chart'

const moment = extendMoment(Moment)

export default {
  components: {
    DateRangePicker,
    Table,
    Chart,
  },
  data() {
    return {
      dateRange: {
        startDate: moment().subtract(30, 'days').toDate(),
        endDate: moment().toDate(),
      },
      rawData: {},
      tab: null,
    }
  },
  watch: {
    dateRange: {
      handler() {
        this.fetchData()
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const range = _.cloneDeep(this.dateRange)
      range.startDate = moment(range.startDate).startOf('day')
      range.endDate = moment(range.endDate).startOf('day')

      const diff = moment()
        .subtract(1, 'days')
        .startOf('day')
        .diff(range.startDate, 'days')

      if (diff < 0) {
        this.rawData = []
        return
      }
      const res = await this.$axios.get(
        'https://disease.sh/v3/covid-19/historical/all',
        {
          params: {
            lastdays: diff + 1,
          },
        }
      )

      const dateRange = []

      for (const i in _.range(
        range.endDate.diff(range.startDate, 'days') + 1
      )) {
        const startDate = _.cloneDeep(range.startDate)
        dateRange.push(startDate.add(i, 'days').format('M/D/YY'))
      }

      const cases = res.data

      for (const i of Object.keys(cases)) {
        cases[i] = _.pick(cases[i], dateRange)
      }

      this.rawData = cases
    },
    changeDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
  },
}
</script>

<style lang="scss" scoped></style>

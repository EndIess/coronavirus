<template>
  <apex-chart
    type="line"
    height="350"
    :options="options"
    :series="series"
  ></apex-chart>
</template>

<script>
import numeral from 'numeral'
import _ from 'lodash'
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
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter(value) {
              return numeral(value).format('0a')
            },
          },
        },
      },
      options: {},
    }
  },
  computed: {
    series() {
      const series = []

      for (const i of Object.keys(this.rawData)) {
        series.push({
          name: i,
          data: Object.values(this.rawData[i]),
        })
      }

      return series
    },
    categories() {
      let categories = []
      categories = Object.values(this.rawData)
      if (categories.length) {
        return Object.keys(categories[0]).map((o) =>
          this.changeDateFormat(new Date(o))
        )
      }
      return []
    },
  },
  watch: {
    categories() {
      this.setCategories()
    },
  },
  mounted() {
    this.setCategories()
  },
  methods: {
    setCategories() {
      const chartOptions = _.cloneDeep(this.chartOptions)
      chartOptions.xaxis = {
        categories: this.categories,
      }
      this.options = chartOptions
    },
  },
}
</script>

<style lang="scss" scoped></style>

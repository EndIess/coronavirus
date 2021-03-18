import numeral from 'numeral'
import moment from 'moment'

export default {
  data() {
    return {
      message: 'hello',
      foo: 'abc',
    }
  },
  methods: {
    changeDateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    formatNum(num) {
      return numeral(num).format()
    },
  },
}

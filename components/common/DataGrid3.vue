<template>
  <div>
    <hot-table
      :data="data"
      colHeaders="true"
      rowHeaders="true"
      width="600"
      height="300"
    ></hot-table>
  </div>
</template>

<script>
export default {
  props: { p_headers: Array, p_items: Array },

  data: () => ({
    items: [],
    headers: [],

    data: [
          ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
          ['2019', 10, 11, 12, 13],
          ['2020', 20, 11, 14, 13],
          ['2021', 30, 15, 12, 13]
        ],
  }),

  beforeMount() {
    this.items = this.p_items;
    this.headers = this.p_headers;
  },

  watch: {
    p_items(newValue) {
      this.items = newValue; // Update when the prop changes
    },
    p_headers(newValue) {
      this.headers = newValue; // Update when the prop changes
    },
  },

  methods: {},
};

if (process.client) {
}
</script>


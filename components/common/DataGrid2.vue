<template>
  <div>
    <v-grid
      id="grid"
      theme="darkCompact"
      :source="rows"
      :columns="columns"
    ></v-grid>
  </div>
</template>

<script>
export default {
  props: { p_headers: Array, p_items: Array },

  data: () => ({
    items: [],
    headers: [],

    columns: [{ prop: "name" }, { prop: "details" }],
    rows: [
      {
        name: "1",
        details: "Item 1",
      },
      {
        name: "2",
        details: "Item 2",
      },
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

<style scoped>
#grid {
  height: 500px;
  width: 500px;
}
</style>


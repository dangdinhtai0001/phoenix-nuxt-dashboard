<template>
  <div>
    <CommonDataGrid
      :fetchColumnDef="fetchColumnDef"
      :fetchRowData="fetchRowData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    async fetchColumnDef() {
      let data;
      await this.$axios.$get("/def/column").then(function (response) {
        data = response;
      });

      return data;
    },

    async fetchRowData() {
      let data;
      await this.$axios.$get("/def/row").then(function (response) {
        data = response;
      });

      return data;
    },
  },

  computed: {},
};
</script>




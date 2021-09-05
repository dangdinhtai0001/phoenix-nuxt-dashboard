<template>
  <div>
    <ag-grid-vue
      style="width: 100px; height=100px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
    >
    </ag-grid-vue>
  </div>
</template>

<script>
export default {
  props: { fetchColumnDef: Function, fetchRowData: Function },
  data: () => ({
    gridOptions: null,
    api: null,
    columnDefs: null,
    rowData: null,
    showGrid: false,
    sideBar: false,
    rowCount: null,
  }),

  async beforeMount() {
    this.gridOptions = {};
    await this.createColumnDefs();
    await this.createRowData();
  },

  methods: {
    async createColumnDefs() {
      this.columnDefs = await this.fetchColumnDef();
    },

    async createRowData() {
      this.rowData = await this.fetchRowData();
    },
  },
};
</script>


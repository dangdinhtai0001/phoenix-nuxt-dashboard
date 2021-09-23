<template>
  <div>
    <div class="default-grid-size">
      <ag-grid-vue
        class="ag-theme-alpine default-grid-size"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @grid-ready="onReady"
        :frameworkComponents="frameworkComponents"
        :defaultColDef="defaultColDef"
        :columnTypes="columnTypes"
        :paginationPageSize="paginationPageSize"
        rowSelection="multiple"
        :suppressMenuHide="true"
        :rowDragManaged="false"
        :animateRows="true"
        :pagination="true"
      ></ag-grid-vue>
    </div>

    <v-text-field
      @change="onPageSizeChanged"
      v-model="paginationPageSize"
      class="w-20"
      type="number"
      label="Number"
    ></v-text-field>
  </div>
</template>

<script>
import DefaultHeader from "~/components/common/data-grid/DefaultHeader.vue";
import DefaultHeaderGroup from "~/components/common/data-grid/DefaultHeaderGroup.vue";

export default {
  props: {
    fetchColumnDef: Function,
    fetchRowData: Function,
  },
  data: () => ({
    gridOptions: null,
    columnDefs: null,
    rowData: null,
    api: null,
    paginationPageSize: null,
    paginationNumberFormatter: null,
  }),

  components: {
    agColumnHeader: DefaultHeader,
    defaultHeaderGroup: DefaultHeaderGroup,
  },

  computed: {
    defaultColDef() {
      return {
        editable: false,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
        headerComponentParams: { menuIcon: "fa-bars" },
        filter: "agTextColumnFilter",
      };
    },

    frameworkComponents() {
      return { agColumnHeader: "agColumnHeader" };
    },

    columnTypes() {
      return {
        numberColumn: {
          width: 130,
          filter: "agNumberColumnFilter",
        },
        medalColumn: {
          width: 100,
          columnGroupShow: "open",
          filter: false,
        },
        nonEditableColumn: { editable: false },
        dateColumn: {
          filter: "agDateColumnFilter",
          filterParams: {
            comparator: (filterLocalDateAtMidnight, cellValue) => {
              var dateParts = cellValue.split("/");
              var day = Number(dateParts[0]);
              var month = Number(dateParts[1]) - 1;
              var year = Number(dateParts[2]);
              var cellDate = new Date(year, month, day);
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              } else {
                return 0;
              }
            },
          },
        },
      };
    },
  },

  async beforeMount() {
    this.gridOptions = {};

    // fetch grid def from api
    await this.createColumnDefs();
    await this.createRowData();

    this.paginationPageSize = 30;

    this.api.paginationSetPageSize(this.paginationPageSize);
  },

  methods: {
    // fetch grid def from api
    async createColumnDefs() {
      this.columnDefs = await this.fetchColumnDef();
    },

    async createRowData() {
      this.rowData = await this.fetchRowData();
    },

    // fetch grid def from api
    onReady(params) {
      console.log("onReady");

      this.api = params.api;
      this.api.sizeColumnsToFit();

      this.api.paginationSetPageSize(this.paginationPageSize);

    },

    onPageSizeChanged() {
      this.api.paginationSetPageSize(this.paginationPageSize);
    },
  },
};
</script>

<style scoped>
.default-grid-size {
  width: 100%;
  height: 80vh;
}
</style>





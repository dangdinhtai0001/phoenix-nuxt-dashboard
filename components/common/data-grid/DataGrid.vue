<template>
  <div>
    <div style="height: 500px">
      <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        @grid-ready="onReady"
        :frameworkComponents="frameworkComponents"
        :defaultColDef="defaultColDef"
        :columnTypes="columnTypes"
        :paginationPageSize="paginationPageSize"
        :rowSelection="rowSelection"
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
  props: { fetchColumnDef: Function, fetchRowData: Function },
  data: () => ({
    gridOptions: null,
    api: null,
    columnDefs: null,
    rowData: null,
    rowSelection: null,
    paginationPageSize: null,
    paginationNumberFormatter: null,
  }),

  components: {
    agColumnHeader: DefaultHeader,
    customHeaderGroupComponent: DefaultHeaderGroup,
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

    await this.createColumnDefs();
    await this.createRowData();

    this.rowSelection = "multiple";

    this.paginationPageSize = 30;

    this.api.paginationSetPageSize(this.paginationPageSize);
  },

  methods: {
    async createColumnDefs() {
      this.columnDefs = await this.fetchColumnDef();
    },

    async createRowData() {
      this.rowData = await this.fetchRowData();
    },

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





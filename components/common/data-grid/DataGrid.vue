<template>
  <div>
    <!-- <ag-grid-vue
      style="width: 100%; height=500px;"
      class="ag-theme-alpine"
      :gridOptions="gridOptions"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :sideBar="sideBar"
      :defaultColDef="{
        sortable: true,
        resizable: true,
        filter: true,
      }"
      :groupHeaders="true"
      :suppressRowClickSelection="true"
      rowSelection="multiple"
      @grid-ready="onReady"
      @model-updated="onModelUpdated"
      @cell-clicked="onCellClicked"
      @cell-double-clicked="onCellDoubleClicked"
      @cell-context-menu="onCellContextMenu"
      @cell-value-changed="onCellValueChanged"
      @cell-focused="onCellFocused"
      @row-selected="onRowSelected"
      @selection-changed="onSelectionChanged"
      @filter-modified="onFilterModified"
      @virtual-row-removed="onVirtualRowRemoved"
      @row-clicked="onRowClicked"
      @column-everything-changed="onColumnEvent"
      @column-row-group-changed="onColumnEvent"
      @column-value-Changed="onColumnEvent"
      @column-moved="onColumnEvent"
      @column-visible="onColumnEvent"
      @column-group-Opened="onColumnEvent"
      @column-resized="onColumnEvent"
      @column-pinned-count-changed="onColumnEvent"
    >
    </ag-grid-vue> -->

    <ag-grid-vue
      style="width: 100%; height: 500px"
      class="ag-theme-alpine"
            :sideBar="sideBar"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="{
        sortable: true,
        resizable: true,
        filter: true,
      }"
      :groupHeaders="true"
      :suppressRowClickSelection="true"
      rowSelection="multiple"
      @grid-ready="onReady"
      @model-updated="onModelUpdated"
      @cell-clicked="onCellClicked"
      @cell-double-clicked="onCellDoubleClicked"
      @cell-context-menu="onCellContextMenu"
      @cell-value-changed="onCellValueChanged"
      @cell-focused="onCellFocused"
      @row-selected="onRowSelected"
      @selection-changed="onSelectionChanged"
      @filter-modified="onFilterModified"
      @virtual-row-removed="onVirtualRowRemoved"
      @row-clicked="onRowClicked"
      @column-everything-changed="onColumnEvent"
      @column-row-group-changed="onColumnEvent"
      @column-value-Changed="onColumnEvent"
      @column-moved="onColumnEvent"
      @column-visible="onColumnEvent"
      @column-group-Opened="onColumnEvent"
      @column-resized="onColumnEvent"
      @column-pinned-count-changed="onColumnEvent"
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
    sideBar: true,
    rowCount: null,
  }),

  async beforeMount() {
    this.gridOptions = {};
    await this.createColumnDefs();
    await this.createRowData();
    this.showGrid = true;
  },

  methods: {
    async createColumnDefs() {
      this.columnDefs = await this.fetchColumnDef();
    },

    async createRowData() {
      this.rowData = await this.fetchRowData();
    },

    pad(num, totalStringSize) {
      let asString = num + "";
      while (asString.length < totalStringSize) asString = "0" + asString;
      return asString;
    },

    // calculateRowCount() {
    //   if (this.api && this.rowData) {
    //     let model = this.gridOptions.api.getModel();
    //     let totalRows = this.rowData.length;
    //     let processedRows = model.getRowCount();
    //     this.rowCount =
    //       processedRows.toLocaleString() + " / " + totalRows.toLocaleString();
    //   }
    // },

    onModelUpdated() {
      console.log("onModelUpdated");
      // this.calculateRowCount();
    },

    onReady(params) {
      console.log("onReady");

      // this.api = params.api;
      //this.calculateRowCount();

      // this.api.sizeColumnsToFit();
    },

    onCellClicked(event) {
      console.log(
        "onCellClicked: " + event.rowIndex + " " + event.colDef.field
      );
    },

    onCellValueChanged(event) {
      console.log(
        "onCellValueChanged: " + event.oldValue + " to " + event.newValue
      );
    },

    onCellDoubleClicked(event) {
      console.log(
        "onCellDoubleClicked: " + event.rowIndex + " " + event.colDef.field
      );
    },

    onCellContextMenu(event) {
      console.log(
        "onCellContextMenu: " + event.rowIndex + " " + event.colDef.field
      );
    },

    onCellFocused(event) {
      console.log(
        "onCellFocused: (" + event.rowIndex + "," + event.colIndex + ")"
      );
    },

    // taking out, as when we 'select all', it prints to much to the console!!
    // eslint-disable-next-line
    onRowSelected(event) {
      // console.log('onRowSelected: ' + event.node.data.name);
    },

    onSelectionChanged() {
      console.log("selectionChanged");
    },

    onFilterModified() {
      console.log("onFilterModified");
    },

    // eslint-disable-next-line
    onVirtualRowRemoved(event) {
      // because this event gets fired LOTS of times, we don't print it to the
      // console. if you want to see it, just uncomment out this line
      // console.log('onVirtualRowRemoved: ' + event.rowIndex);
    },

    onRowClicked(event) {
      console.log("onRowClicked: " + event.node.data.name);
    },

    onQuickFilterChanged(event) {
      // this.gridOptions.api.setQuickFilter(event.target.value);
    },

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    onColumnEvent(event) {
      console.log("onColumnEvent: " + event);
    },
  },
};
</script>


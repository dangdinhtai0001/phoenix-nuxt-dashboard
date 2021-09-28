<template>
  <div class="flex flex-row">
    <div v-if="params.enableMenu" ref="menuButton" class="flex-none">
      <v-menu
        transition="slide-y-transition"
        :close-on-content-click="false"
        offset-y
        bottom
        right
        class="pa-0 ma-0"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="black"
            v-bind="attrs"
            v-on="on"
            small
            @click="onMenuClicked($event)"
          >
            <v-icon x-small> fa {{ params.menuIcon }} </v-icon>
          </v-btn>
        </template>

        <!-- -------------------------------------------------- header menu -------------------------------------------------- -->
        <v-card text tile width="200px">
          <v-item-group v-model="menuTab" class="text-center" mandatory>
            <div class="flex flex-row">
              <v-item
                v-for="(item, i) in menuItem"
                :key="i"
                v-slot="{ active, toggle }"
              >
                <div class="flex-grow">
                  <v-btn
                    :input-value="active"
                    icon
                    @click="toggle"
                    tile
                    active-class="secondary"
                    block
                  >
                    <v-icon x-small>{{ item.icon }}</v-icon>
                  </v-btn>
                </div>
              </v-item>
            </div>
          </v-item-group>

          <v-window v-model="menuTab" class="pb-1">
            <perfect-scrollbar>
              <v-window-item>
                <v-card color="transparent">menu</v-card>
              </v-window-item>
              <v-window-item>
                <v-card color="transparent">filter</v-card>
              </v-window-item>
              <v-window-item>
                <v-card color="transparent">
                  <v-text-field
                    v-model="columnSearch"
                    label="Tìm..."
                    placeholder="Tên cột"
                    outlined
                    hide-details
                    dense
                    clearable
                    clear-icon="mdi-close-circle-outline"
                    class="mb-0 pb-0 mt-2 px-2"
                  ></v-text-field>
                  <v-treeview
                    v-model="displayColumns"
                    item-key="id"
                    @input="updateMenuColumn($event)"
                    dense
                    open-all
                    open-on-click
                    selectable
                    selected-color="primary"
                    :items="allColumns"
                    :search="columnSearch"
                  >
                    <template v-slot:label="{ item }">
                      <div class="text-xs">{{ item.name }}</div>
                    </template>
                  </v-treeview>
                </v-card>
              </v-window-item>
            </perfect-scrollbar>
          </v-window>
        </v-card>
        <!-- -------------------------------------------------- header menu -------------------------------------------------- -->
      </v-menu>
    </div>
    <div class="text-base truncate font-bold capitalize flex-grow mx-1">
      {{ params.displayName }}
    </div>

    <!-- -------------------------------------------------- sort  -------------------------------------------------- -->
    <div v-if="params.enableSorting" class="flex-none">
      <v-btn icon color="black" small @click="onSortRequested($event)">
        <v-icon v-if="noSort == 'active'" x-small class="angry-animate">
          fa fa-times
        </v-icon>
        <v-icon v-if="ascSort == 'active'" x-small class="angry-animate">
          fa fa-long-arrow-alt-down
        </v-icon>
        <v-icon v-if="descSort == 'active'" x-small class="angry-animate">
          fa fa-long-arrow-alt-up
        </v-icon>
      </v-btn>
    </div>
    <!-- -------------------------------------------------- sort  -------------------------------------------------- -->
  </div>
</template>

<script>
export default {
  data: () => ({
    ascSort: null,
    descSort: null,
    noSort: null,
    menuTab: null,
    columnSearch: "",
    displayColumns: [],
    allColumns: [],
  }),

  beforeMount() {},
  mounted() {
    this.params.column.addEventListener("sortChanged", this.onSortChanged);
    this.onSortChanged();

    this.initAllColumns();
    this.updateDisplayColumn();
  },

  computed: {
    menuItem() {
      return [
        { icon: "mdi-menu" },
        { icon: "mdi-filter" },
        { icon: "mdi-view-column" },
      ];
    },
  },
  methods: {
    onMenuClicked() {
      console.log(this.params.columnApi.getAllDisplayedColumns());
      this.updateDisplayColumn();
      // console.log(this.params.api.getColumnDefs());
      // this.params.showColumnMenu(this.$refs.menuButton);
    },

    onSortChanged() {
      this.ascSort = this.descSort = this.noSort = "inactive";

      if (this.params.column.isSortAscending()) {
        this.ascSort = "active";
      } else if (this.params.column.isSortDescending()) {
        this.descSort = "active";
      } else {
        this.noSort = "active";
      }
    },

    onSortRequested(event) {
      if (this.noSort == "active") {
        this.params.setSort("asc", event.shiftKey);
      } else if (this.ascSort == "active") {
        this.params.setSort("desc", event.shiftKey);
      } else if (this.descSort == "active") {
        this.params.setSort("", event.shiftKey);
      }
    },

    initAllColumns() {
      const allColumns = [...this.params.api.getColumnDefs()];

      allColumns.forEach((element) => {
        if (element.children) {
          this.allColumns.push({
            id: element.groupId,
            name: element.headerName,
            children: element.children.map((child) => {
              return {
                id: child.colId,
                name: child.headerName,
              };
            }),
          });
        } else {
          this.allColumns.push({
            id: element.colId,
            name: element.headerName,
          });
        }
      });
    },

    updateDisplayColumn() {
      const allDisplayColumns = [
        ...this.params.columnApi.getAllDisplayedColumns(),
      ];

      this.displayColumns = [];

      allDisplayColumns.forEach((element) => {
        this.displayColumns.push(element.colId);
      });
    },

    updateMenuColumn(event) {
      this.allColumns.forEach((element) => {
        if (!Object.assign([], event).includes(element.id)) {
          this.params.columnApi.setColumnVisible(element.id, false);
        }
      });
    },
  },
};
</script>

<style scoped>
.angry-animate {
  -webkit-animation: rotate 0.5s ease 0s 1 normal;
  -moz-animation: rotate 0.5s ease 0s 1 normal;
  -ms-animation: rotate 0.5s ease 0s 1 normal;
  animation: rotate 0.5s ease 0s 1 normal;
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.ps {
  height: 200px;
}
</style>

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
        <v-card flat tile>
          <v-item-group v-model="tab" class="text-center" mandatory>
            <v-item v-slot="{ active, toggle }">
              <v-btn
                :input-value="active"
                icon
                @click="toggle"
                tile
                flat
                active-class="secondary"
              >
                <v-icon x-small>mdi-menu</v-icon>
              </v-btn>
            </v-item>
            <v-item v-slot="{ active, toggle }">
              <v-btn
                :input-value="active"
                icon
                tile
                flat
                active-class="secondary"
                @click="toggle"
              >
                <v-icon x-small>mdi-filter</v-icon>
              </v-btn>
            </v-item>
            <v-item v-slot="{ active, toggle }">
              <v-btn
                :input-value="active"
                icon
                tile
                flat
                active-class="secondary"
                @click="toggle"
              >
                <v-icon x-small>mdi-view-column</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>

          <v-window v-model="tab">
            <v-window-item>
              <v-card color="transparent">menu</v-card>
            </v-window-item>
            <v-window-item>
              <v-card color="transparent">filter</v-card>
            </v-window-item>
          </v-window>
        </v-card>
        <!-- -------------------------------------------------- header menu -------------------------------------------------- -->
      </v-menu>
    </div>
    <div class="text-base truncate font-bold capitalize flex-grow mx-1">
      {{ params.displayName }}
    </div>

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
  </div>
</template>

<script>
export default {
  data: () => ({
    ascSort: null,
    descSort: null,
    noSort: null,
    tab: null,
  }),

  beforeMount() {},
  mounted() {
    this.params.column.addEventListener("sortChanged", this.onSortChanged);
    this.onSortChanged();
  },
  methods: {
    onMenuClicked() {
      console.log(this.params.columnApi.getAllDisplayedColumns());
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

    getListDisplayColumns() {},
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
</style>

<template>
  <div>
    <v-row>
      <div v-if="params.enableMenu" ref="menuButton">
        <v-btn icon color="black" small @click="onMenuClicked($event)">
          <v-icon x-small> fa {{ params.menuIcon }} </v-icon>
        </v-btn>
      </div>
      <div class="text-base truncate font-bold capitalize mx-1">
        {{ params.displayName }}
      </div>

      <div v-if="params.enableSorting">
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

      <!-- <v-spacer /> -->
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    ascSort: null,
    descSort: null,
    noSort: null,
  }),

  beforeMount() {},
  mounted() {
    this.params.column.addEventListener("sortChanged", this.onSortChanged);
    this.onSortChanged();
  },
  methods: {
    onMenuClicked() {
      console.log(
        this.params.columnApi.getAllDisplayedColumnGroups()[1].getGroupId()
      );
      this.params.showColumnMenu(this.$refs.menuButton);
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

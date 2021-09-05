<template>
  <div>
    <table class="table-fixed w-auto">
      <!-- ---------------------------------------------------- header ---------------------------------------------------- -->
      <thead>
        <tr>
          <draggable v-model="headers" tag="div">
            <th
              v-for="(header, i) in headers"
              :key="i"
              :ref="`th_` + header.value + ``"
            >
              <vue-resizable
                v-if="header.isDisplay == true"
                :active="['r']"
                :width="header.currentWidth"
                :minWidth="50"
                @resize:end="onColumnResize"
                :class="`border bg-gray-800 w-` + header.width"
              >
                <!-- ---------------------------------- header content ---------------------------------- -->
                <div :class="`flex flex-row px-3 py-2 `">
                  <!-- ------------ -->
                  <div :class="`text-md text-uppercase truncate mt-1`">
                    {{ header.text }}
                  </div>
                  <!-- ------------ -->
                  <v-spacer></v-spacer>
                  <!-- ------------ -->
                  <div>
                    <v-menu
                      transition="slide-y-transition"
                      :close-on-content-click="false"
                      offset-y
                      bottom
                      right
                      class="pa-0 ma-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon small v-bind="attrs" v-on="on">
                          <v-icon small>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>

                      <v-card class="pa-0 ma-0 h-auto" flat>
                        <v-container fluid class="ma-0 pa-0 py-1">
                          <!-- ------------ sort asc ------------ -->
                          <v-btn small text block class="pa-0 ma-0">
                            <div
                              class="
                                flex flex-row
                                cursor-pointer
                                my-2
                                mx-2
                                pa-0
                              "
                            >
                              <div
                                class="
                                  text-sm
                                  font-weight-regular
                                  text-capitalize
                                "
                              >
                                <v-icon small class="mr-1">
                                  mdi-arrow-up
                                </v-icon>
                                Sort asc
                              </div>
                            </div>
                          </v-btn>
                          <!-- ------------ sort asc ------------ -->
                          <!-- ------------ sort desc -------------->
                          <v-btn small text block class="pa-0 ma-0">
                            <div
                              class="
                                flex flex-row
                                cursor-pointer
                                my-2
                                mx-2
                                pa-0
                              "
                            >
                              <div
                                class="
                                  text-sm
                                  font-weight-regular
                                  text-capitalize
                                "
                              >
                                <v-icon small class="mr-1">
                                  mdi-arrow-down
                                </v-icon>
                                Sort desc
                              </div>
                            </div>
                          </v-btn>
                          <!-- ------------ sort desc -------------->
                          <v-divider></v-divider>
                          <!-- ------------ column ------------ -->
                          <v-menu
                            transition="slide-x-transition"
                            :close-on-content-click="false"
                            open-on-hover
                            offset-x
                            bottom
                            right
                            class="pa-0 ma-0"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                small
                                text
                                block
                                class="pa-0 ma-0"
                              >
                                <div
                                  class="
                                    flex flex-row
                                    cursor-pointer
                                    my-2
                                    mx-2
                                    pa-0
                                  "
                                >
                                  <div
                                    class="
                                      text-sm
                                      font-weight-regular
                                      text-capitalize
                                    "
                                  >
                                    <v-icon small class="mr-1">
                                      mdi-format-columns
                                    </v-icon>
                                    columns
                                    <v-icon small class="ml-3">
                                      mdi-chevron-right
                                    </v-icon>
                                  </div>
                                </div>
                              </v-btn>
                            </template>

                            <v-card class="pa-0 ma-0 h-auto" flat dense>
                              <v-container fluid class="ma-0 pa-0">
                                <div v-for="(h, j) in p_headers" :key="j">
                                  <div
                                    class="
                                      flex flex-row
                                      cursor-pointer
                                      my-2
                                      mx-2
                                      pa-0
                                    "
                                  >
                                    <div
                                      class="
                                        text-sm
                                        font-weight-regular
                                        text-capitalize
                                      "
                                    >
                                      <input
                                        type="checkbox"
                                        v-model="h.isDisplay"
                                      />
                                      {{ h.text }}
                                    </div>
                                  </div>
                                </div>
                              </v-container>
                            </v-card>
                          </v-menu>
                          <!-- ------------ column ------------ -->
                        </v-container>
                      </v-card>
                    </v-menu>
                  </div>
                  <!-- ------------ -->
                </div>
                <!-- ---------------------------------- header content ---------------------------------- -->
              </vue-resizable>
            </th>
          </draggable>
        </tr>
      </thead>
      <!-- ---------------------------------------------------- header ---------------------------------------------------- -->
      <!-- ---------------------------------------------------- body ---------------------------------------------------- -->
      <tbody>
        <draggable v-model="items" tag="div">
          <tr v-for="(item, i) in items" :key="i">
            <td v-for="(header, j) in headers" :key="j">
              <vue-resizable
                :active="['r']"
                :minWidth="50"
                :width="columnsCurrentWidth[header.value]"
                :class="` border bg-gray-800 `"
              >
                <div
                  v-if="header.isDisplay == true"
                  :class="` px-3 py-1 w-` + header.width"
                >
                  <div :class="`text-sm truncate text-` + header.align">
                    {{ item[header.value] }}
                  </div>
                </div>
              </vue-resizable>
            </td>
          </tr>
        </draggable>
      </tbody>
      <!-- ---------------------------------------------------- body ---------------------------------------------------- -->
    </table>

    <p>
      {{ headers[0] }}
    </p>
  </div>
</template>

<script>
export default {
  props: { p_headers: Array, p_items: Array },

  data: () => ({
    items: [],
    headers: [],

    columnsCurrentWidth: {},
  }),

  beforeMount() {
    this.items = this.p_items;
    this.headers = this.p_headers;
  },

  mounted() {
    this.initColumnsCurrentWidth(this.headers);

    this.headers.forEach((element) => {
      element.currentWidth = this.$refs["th_" + element.value]["0"].clientWidth;
    });
  },

  watch: {
    p_items(newValue) {
      this.items = newValue; // Update when the prop changes
    },
    p_headers(newValue) {
      this.headers = newValue; // Update when the prop changes
    },
  },

  methods: {
    initColumnsCurrentWidth(headers) {
      headers.forEach((element) => {
        this.columnsCurrentWidth[element.value] =
          this.$refs["th_" + element.value]["0"].clientWidth;
      });
    },

    onColumnResize(data) {
      console.log(data);
      // this.columnsCurrentWidth["name"] = data.width;
      console.log(this.columnsCurrentWidth);
      console.log(this.headers);
      // console.log(this.$refs["th_name"]['0'].clientWidth);
    },
  },
};

if (process.client) {
}
</script>


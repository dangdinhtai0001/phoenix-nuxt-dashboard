<template>
  <div>
    <!-- ------------------------------ sub group ------------------------------ -->
    <v-list-group
      v-if="hasChild || isRootMenu"
      :value="true"
      dense
      :prepend-icon="item.icon"
      no-action
      :sub-group="!isRootMenu"
      active-class="w-60"
      class="w-60"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            <div class="text-sm">
              {{ item.displayName }}
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <CommonTreeMenu
        v-for="(item, i) in item.children"
        :key="i"
        :item="item"
      />
    </v-list-group>
    <!-- ------------------------------ sub group ------------------------------ -->

    <!-- ------------------------------ item ------------------------------ -->
    <v-list-item v-if="!hasChild && !isRootMenu" link dense :to="item.path" class="ml-3">
      <v-list-item-title>
        <div class="text-sm">
          {{ item.displayName }}
        </div>
      </v-list-item-title>

      <v-list-item-icon>
        <v-icon small v-text="item.icon"></v-icon>
      </v-list-item-icon>
    </v-list-item>
    <!-- ------------------------------ item ------------------------------ -->
  </div>
</template>
<script>
export default {
  props: ["item"],

  computed: {
    hasChild() {
      return this.item.children.length > 0;
    },

    isRootMenu() {
      return !this.item.parentId;
    },
  },
};
</script>
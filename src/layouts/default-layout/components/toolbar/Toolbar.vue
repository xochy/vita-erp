<template>
  <!-- #region::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!-- #regionToolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle />
      <!-- #region::Actions-->
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <!--begin::Secondary button-->
        <!-- <a
          href="#"
          class="btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_create_app"
          >Rollover</a
        > -->
        <!--end::Secondary button-->
        <!--begin::Primary button-->
        <!-- <a
          href="#"
          class="btn btn-sm fw-bold btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_new_target"
          >Add Target</a
        >
        <a
          href="#"
          class="btn btn-sm fw-bold btn-primary"
          :data-bs-toggle="dataBsToggle"
          :data-bs-target="dataBsTarget"
          >{{ actionButtonText }}</a
        > -->
        <!-- <router-link :to="newModelPath" class="btn btn-sm fw-bold btn-primary">
          {{ actionButtonText }}
        </router-link> -->

        <template v-for="(button, index) in actionButtons" :key="index">
          <router-link :to="button.to" class="btn btn-sm fw-bold btn-primary">
            {{ button.title }}
          </router-link>
        </template>
        <!--end::Primary button-->
      </div>
      <!-- #endregion::Actions-->
    </div>
    <!-- #endregion::Toolbar container-->
  </div>
  <!-- #endregion::Toolbar-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { toolbarWidthFluid } from "@/layouts/default-layout/config/helper";
import KTPageTitle from "@/layouts/default-layout/components/toolbar/PageTitle.vue";
import { useRoute } from "vue-router";
import type { ToolbarItem } from "./config/ToolbarItem";

export default defineComponent({
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    const route = useRoute();

    const dataBsToggle = computed(() => {
      return route.meta.dataBsToggle;
    });

    const dataBsTarget = computed(() => {
      return route.meta.dataBsTarget;
    });

    const actionButtons = computed(() => {
      return route.meta.actionButtons as ToolbarItem[];
    });

    return {
      toolbarWidthFluid,
      dataBsToggle,
      dataBsTarget,
      actionButtons,
    };
  },
});
</script>

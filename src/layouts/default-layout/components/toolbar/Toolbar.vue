<template>
  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle />
      <!--begin::Actions-->
      <div class="d-flex align-items-center gap-2 gap-lg-3">
        <!--begin::Secondary button-->
        <a
          href="#"
          class="btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_create_app"
          >Rollover</a
        >
        <!--end::Secondary button-->
        <!--begin::Primary button-->
        <a
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
        >
        <!--end::Primary button-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { toolbarWidthFluid } from "@/layouts/default-layout/config/helper";
import KTPageTitle from "@/layouts/default-layout/components/toolbar/PageTitle.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    const route = useRoute();

    const actionButtonText = computed(() => {
      return route.meta.actionButtonText;
    });

    const dataBsToggle = computed(() => {
      return route.meta.dataBsToggle;
    });

    const dataBsTarget = computed(() => {
      return route.meta.dataBsTarget;
    });

    return {
      toolbarWidthFluid,
      actionButtonText,
      dataBsToggle,
      dataBsTarget,
    };
  },
});
</script>

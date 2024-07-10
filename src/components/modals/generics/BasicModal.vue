<template>
  <!-- #region::modal -->
  <div class="modal fade" :id="id" ref="reference" tabindex="-1" aria-hidden="true">
    <!-- #region::modal dialog -->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!-- #region::modal content -->
      <div class="modal-content rounded">
        <!-- #region::modal header -->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!-- #region::close modal button -->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!-- #endregion::close modal button -->
        </div>
        <!-- #endregion::modal header -->

        <!-- #region::modal body -->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <slot></slot>
        </div>
        <!-- #endregion::modal body -->
      </div>
      <!-- #endregion::modal content -->
    </div>
    <!-- #endregion::modal dialog -->
  </div>
  <!-- #endregion::modal -->
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  id: string;
}

defineProps<Props>();

const reference = ref<null | HTMLDivElement>(null);

defineExpose({ reference });
</script>

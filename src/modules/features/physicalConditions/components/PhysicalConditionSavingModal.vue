<template>
  <!-- #region::Modal -->
  <div
    class="modal fade"
    id="physical_condition_saving_modal"
    ref="PhysicalConditionSavingModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!-- #region::Modal dialog -->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!-- #region::Modal content -->
      <div class="modal-content rounded">
        <!-- #region::Modal header -->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!-- #region::Close modal button -->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!-- #endregion::Close modal button -->
        </div>
        <!-- #endregion::Modal header -->

        <!-- #region::Modal body -->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <!-- #region::From -->
          <el-form
            id="physical_condition_saving_form"
            ref="formRef"
            class="form"
            @submit.prevent="originalPhysicalCondition ? physicalConditionMutation.mutate(editablePhysicalCondition!) : createPhysicalCondition()"
          >
            <!-- #region::Heading -->
            <div class="mb-13 text-center">
              <!-- #region::Title -->
              <h1 class="mb-3">Physical Condition</h1>
              <!-- #endregion::Title -->

              <!-- #region::Description -->
              <div class="text-gray-500 fw-semibold fs-5">
                If you need more info, please check
                <a href="#" class="fw-bold link-primary">Project Guidelines</a>.
              </div>
              <!-- #endregion::Description -->
            </div>
            <!-- #endregion::Heading -->

            <!-- #region::Name input group -->
            <div class="d-flex flex-column mb-8 fv-row">
              <!-- #region::Name label -->
              <label
                for="physicalConditionName"
                class="d-flex align-items-center fs-6 fw-semibold mb-2"
              >
                <span class="required">Name</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a physical condition name for future usage and reference"
                ></i>
              </label>
              <!-- #endregion::Name label -->

              <el-form-item prop="physicalConditionName">
                <el-input
                  v-model="nameModel"
                  placeholder="Enter physical condition name"
                  name="physicalConditionName"
                ></el-input>
              </el-form-item>
            </div>
            <!-- #endregion::Name input group -->

            <!-- #region::Description input group -->
            <div class="d-flex flex-column mb-8 fv-row">
              <!-- #region::Description label -->
              <label
                for="physicalConditionDescription"
                class="d-flex align-items-center fs-6 fw-semibold mb-2"
              >
                <span class="required">Description</span>
                <i
                  class="fas fa-exclamation-circle ms-2 fs-7"
                  data-bs-toggle="tooltip"
                  title="Specify a physical condition description for future usage and reference"
                ></i>
              </label>
              <!-- #endregion::Description label -->

              <el-form-item prop="physicalConditionDescription">
                <el-input
                  type="textarea"
                  v-model="descriptionModel"
                  placeholder="Enter physical condition description"
                  name="physicalConditionDescription"
                  rows="5"
                ></el-input>
              </el-form-item>
            </div>
            <!-- #endregion::Description input group -->

            <!-- #region::Actions -->
            <div class="text-center">
              <!-- #region::Cancel button -->
              <button
                type="reset"
                id="kt_modal_new_target_cancel"
                class="btn btn-light me-3"
              >
                Cancel
              </button>
              <!-- #endregion::Cancel button -->
              <button
                :data-kt-indicator="physicalConditionMutation.isPending ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!physicalConditionMutation.isPending" class="indicator-label">
                  Submit
                </span>
                <span
                  v-if="physicalConditionMutation.isPending"
                  class="indicator-progress"
                >
                  Please wait...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
              <!-- #region::Submit button -->

              <!-- #endregion::Submit button -->
            </div>
            <!-- #endregion::Actions -->
          </el-form>
          <!-- #endregion::From -->
        </div>
        <!-- #endregion::Modal body -->
      </div>
      <!-- #endregion::Modal content -->
    </div>
    <!-- #endregion::Modal dialog -->
  </div>
  <!-- #endregion::Modal -->
</template>

<script setup lang="ts">
import ApiService from "@/core/services/ApiService";
import Modal from "bootstrap/js/dist/modal";
import type { PhysicalCondition, PhysicalConditionResponse } from "../interfaces";
import { computed, ref, toRaw } from "vue";
import { useMutation } from "@tanstack/vue-query";

/* ---------------------------------- Props --------------------------------- */

const originalPhysicalCondition = ref<PhysicalCondition | null>(null);
const editablePhysicalCondition = ref<PhysicalCondition | null>(null);

const name = ref("");
const description = ref("");

/* -------------------------------- Computed -------------------------------- */

const nameModel = computed({
  get: () => editablePhysicalCondition?.value?.attributes?.name || name.value,
  set: (value) => {
    if (editablePhysicalCondition && editablePhysicalCondition.value?.attributes) {
      editablePhysicalCondition.value.attributes.name = value;
    } else {
      name.value = value;
    }
  },
});

const descriptionModel = computed({
  get: () =>
    editablePhysicalCondition?.value?.attributes?.description || description.value,
  set: (value) => {
    if (editablePhysicalCondition && editablePhysicalCondition.value?.attributes) {
      editablePhysicalCondition.value.attributes.description = value;
    } else {
      description.value = value;
    }
  },
});

/* -------------------------------- Functions ------------------------------- */

/**
 * @description load the physical condition data to the form
 * @param {PhysicalCondition} row
 */
const loadPhysicalCondition = (physicalCondition: PhysicalCondition) => {
  originalPhysicalCondition.value = physicalCondition;
  editablePhysicalCondition.value = JSON.parse(JSON.stringify(toRaw(physicalCondition)));
};

/**
 * @description show the modal
 */
const showModal = () => {
  // @ts-ignore
  const modal = new Modal(document.getElementById("physical_condition_saving_modal"));
  modal.show();
};

/**
 * @description create the physical condition
 * @param {PhysicalCondition} physicalCondition
 * @returns {Promise<PhysicalConditionResponse>}
 */
const createPhysicalCondition = async (): Promise<PhysicalConditionResponse> => {
  const { data } = await ApiService.vueInstance.axios.post<PhysicalConditionResponse>(
    "/physical-conditions",
    {
      data: {
        type: "physical-conditions",
        attributes: {
          name: name.value,
          description: description.value,
        },
      },
    }
  );
  return data;
};

/**
 * @description update the physical condition
 * @param {PhysicalCondition} physicalCondition
 * @returns {Promise<PhysicalConditionResponse>}
 */
const updatePhysicalCondition = async (
  physicalCondition: PhysicalCondition
): Promise<PhysicalConditionResponse> => {
  const { data } = await ApiService.vueInstance.axios.patch<PhysicalConditionResponse>(
    `/physical-conditions/${physicalCondition.id}`,
    {
      data: {
        type: "physical-conditions",
        id: physicalCondition.id,
        attributes: physicalCondition.attributes,
      },
    }
  );
  return data;
};

const resetForNewModel = () => {
  originalPhysicalCondition.value = null;
  editablePhysicalCondition.value = null;
};

/**
 * @description mutation to update the physical condition
 */
const physicalConditionMutation = useMutation({ mutationFn: updatePhysicalCondition });

/* ---------------------------------- Expose -------------------------------- */

defineExpose({
  showModal,
  loadPhysicalCondition,
});
</script>

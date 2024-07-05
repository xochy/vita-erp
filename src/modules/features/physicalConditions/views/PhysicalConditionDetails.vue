<template>
  <div class="card shadow-sm" v-if="!isLoading">
    <div
      class="card-header collapsible cursor-pointer rotate"
      data-bs-toggle="collapse"
      data-bs-target="#kt_docs_card_collapsible"
    >
      <h3 class="card-title">{{ physicalCondition?.attributes.name }}</h3>
      <div class="card-toolbar rotate-180">
        <i class="ki-duotone ki-down fs-1"></i>
      </div>
    </div>
    <div id="kt_docs_card_collapsible" class="collapse show">
      <div class="card-body">{{ physicalCondition?.attributes.description }}</div>
      <div class="card-footer">
        <!--begin::Accordion-->
        <div class="accordion accordion-icon-toggle" id="kt_accordion_2">
          <!--begin::Item-->
          <div class="mb-5">
            <!--begin::Header-->
            <div
              class="accordion-header py-3 d-flex"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_2_item_1"
            >
              <span class="accordion-icon">
                <i class="ki-duotone ki-arrow-right fs-4"
                  ><span class="path1"></span><span class="path2"></span
                ></i>
              </span>
              <h3 class="fs-4 fw-semibold mb-0 ms-4">
                The best way to quick start business
              </h3>
            </div>
            <!--end::Header-->

            <!--begin::Body-->
            <div
              id="kt_accordion_2_item_1"
              class="fs-6 collapse show ps-10"
              data-bs-parent="#kt_accordion_2"
            >
              ...
            </div>
            <!--end::Body-->
          </div>
          <!--end::Item-->

          <!--begin::Item-->
          <div class="mb-5">
            <!--begin::Header-->
            <div
              class="accordion-header py-3 d-flex collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_2_item_2"
            >
              <span class="accordion-icon">
                <i class="ki-duotone ki-arrow-right fs-4"
                  ><span class="path1"></span><span class="path2"></span
                ></i>
              </span>
              <h3 class="fs-4 fw-semibold mb-0 ms-4">How To Create Channel ?</h3>
            </div>
            <!--end::Header-->

            <!--begin::Body-->
            <div
              id="kt_accordion_2_item_2"
              class="collapse fs-6 ps-10"
              data-bs-parent="#kt_accordion_2"
            >
              ...
            </div>
            <!--end::Body-->
          </div>
          <!--end::Item-->

          <!--begin::Item-->
          <div class="mb-5">
            <!--begin::Header-->
            <div
              class="accordion-header py-3 d-flex collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#kt_accordion_2_item_3"
            >
              <span class="accordion-icon">
                <i class="ki-duotone ki-arrow-right fs-4"
                  ><span class="path1"></span><span class="path2"></span
                ></i>
              </span>
              <h3 class="fs-4 fw-semibold mb-0 ms-4">
                What are the support terms & conditions ?
              </h3>
            </div>
            <!--end::Header-->

            <!--begin::Body-->
            <div
              id="kt_accordion_2_item_3"
              class="collapse fs-6 ps-10"
              data-bs-parent="#kt_accordion_2"
            >
              ...
            </div>
            <!--end::Body-->
          </div>
          <!--end::Item-->
        </div>
        <!--end::Accordion-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import usePhysicalCondition from '../composables/UsePhysicalConditionStore';

const route = useRoute();

const { physicalCondition, isLoading } = usePhysicalCondition(+route.params.id);
</script>

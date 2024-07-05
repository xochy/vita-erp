<template>
  <LoadingAlert />
  <form class="row g-4">
    <!-- #region::Name input -->
    <div class="col-xl-6 col-md-12">
      <label for="name" class="required form-label">Name</label>
      <input name="name" type="text" class="form-control" />
    </div>
    <!-- #endregion::Name input -->

    <!-- #region::Input group -->
    <div class="col-xl-6 col-md-12">
      <label for="description" class="required form-label">Description</label>
      <textarea
        name="description"
        class="form-control"
        aria-label="With textarea"
      ></textarea>
    </div>
    <!-- endregion::Input group -->
  </form>
  <code>
    Physical Condition data
  </code>
</template>

<script setup lang="ts">
import LoadingAlert from "@/components/shared/alerts/LoadingAlert.vue";
</script>

<template>
<div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
       <div class="modal-header text-white bg-secondary justify-content-start">
          <i-fa-solid:user-plus class="me-1" />Add a Team
        </div>
        <div class="modal-body">
        <form ref="form" @submit.prevent="onSubmit" id="teamForm" @input="formValid = form.checkValidity()">
        <fieldset :disabled="appState.requestPending">
        
        
        
        </fieldset>
        
        </form>
        
        </div>

</div>

</template>

<script setup>


</script>
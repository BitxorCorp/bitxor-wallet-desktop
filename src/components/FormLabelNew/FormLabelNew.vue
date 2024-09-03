<template>
    <div class="form-label-container">
        <span class="form-label" style=" font-family: 'Xolonium'; display: flex;   padding-left: 0rem !important;
    padding-bottom: 0.1rem !important;">
            <slot />
        </span>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FormLabelNew extends Vue {}
</script>

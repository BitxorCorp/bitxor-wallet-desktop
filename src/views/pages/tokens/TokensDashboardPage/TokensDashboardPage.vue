<template>
    <AssetDashboardWrap :parent-route-name="'tokens'" />
</template>

<script lang="ts">
// external dependencies
import { Component, Vue } from 'vue-property-decorator';

// child components
import AssetDashboardWrap from '@/views/pages/assets/AssetDashboardWrap/AssetDashboardWrap.vue';

@Component({
    components: { AssetDashboardWrap },
    data() {
        return {};
    },
})
export default class TokensDashboardPage extends Vue {}
</script>

<template>
    <div>
        <div>
            <NavigationLinks
                :direction="'horizontal'"
                :items="panelItems"
                :current-item-index="activePanel"
                translation-prefix="tab_token_"
                @selected="(i) => (activePanel = i)"
            />
        </div>
        <div style="overflow-y: auto; border-radius: 0.08rem;">
            <CreateTokenPageInit v-if="activePanel === 0" /> <CreateName v-if="activePanel === 1" />
        </div>
    </div>
</template>

<script lang="ts">
import { CreateTokenPageTs } from './CreateTokenPageTs';
export default class CreateTokenPage extends CreateTokenPageTs {}
</script>

<style lang="less" scoped>
/deep/ .form-wrapper {
    max-width: 14rem;
}
/deep/ .horizontal {
    justify-content: center !important;
}
</style>

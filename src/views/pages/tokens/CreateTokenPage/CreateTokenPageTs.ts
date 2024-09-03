// external dependencies
import { Address, AliasAction, TokenId, NamespaceId } from 'bitxor-sdk';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
// @ts-ignore
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks.vue';
// @ts-ignore
import CreateTokenPageInit from '@/views/pages/tokens/CreateTokenPage/CreateTokenPageInit.vue';
// @ts-ignore
// child components
// @ts-ignore
import AssetFormPageWrap from '@/views/pages/assets/AssetFormPageWrap/AssetFormPageWrap.vue';
// @ts-ignore
import FormTokenDefinitionTransaction from '@/views/forms/FormTokenDefinitionTransaction/FormTokenDefinitionTransaction.vue';
import { Signer } from '@/store/Account';

import { TokenModel } from '@/core/database/entities/TokenModel';
// @ts-ignore
@Component({
    components: { AssetFormPageWrap, FormTokenDefinitionTransaction, NavigationLinks, CreateTokenPageInit },
    computed: {
        ...mapGetters({
            currentSigner: 'account/currentSigner',
            holdTokens: 'token/holdTokens',
        }),
    },
})
export class CreateTokenPageTs extends Vue {
    currentSigner: Signer;

    public holdTokens!: TokenModel[];

    public get panelItems() {
      /*   return this.holdTokens.filter(
            (n) =>
                n.name &&
                n.duration === 0 &&
                n.transferable === true &&
                !n.isCurrencyToken &&
                n.ownerRawPlain === this.currentSigner.address.plain(),
        ).length > 0
            ? ['createtoken', 'certificate']
            : ['createtoken']; */
            return ['createtoken'];
    }

    public activeIndex = 0;

    public get activePanel() {
        return this.activeIndex;
    }
    public set activePanel(panel) {
        this.activeIndex = panel;
    }
}

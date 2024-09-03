import { Component, Vue, Prop } from 'vue-property-decorator';
//@ts-ignore
import TokenAmountDisplay from '@/components/TokenAmountDisplay/TokenAmountDisplay.vue';
//@ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';

//@ts-ignore
import { mapGetters } from 'vuex';
import { RentalFees } from 'bitxor-sdk';
export type RentalFeesType = 'token' | 'root-namespace' | 'child-namespace' | 'nametoken' ;
@Component({
    components: {
        TokenAmountDisplay,
        FormRow,
    },
    computed: mapGetters({
        rentalEstimation: 'network/rentalFeeEstimation',
    }),
})
export class RentalFeeTs extends Vue {
    @Prop({ required: true }) rentalType: RentalFeesType;
    @Prop() duration: number;
    private rentalEstimation: RentalFees;
    /**
     * @description: return effectiveFee according to prop 'rentalType'
     */
    public async created() {
        await this.$store.dispatch('network/REST_NETWORK_RENTAL_FEES');
    }
    get rentalFeeAmount(): number {
        let feeAmountRaw: number = 0;
        if (this.rentalEstimation) {
            switch (this.rentalType) {
                case 'token':
                    feeAmountRaw = this.rentalEstimation?.effectiveTokenRentalFee.compact();
                    break;
                case 'root-namespace':
                    feeAmountRaw =
                        this.duration < 1
                            ? this.rentalEstimation?.effectiveRootNamespaceEternalFee.compact()
                            : this.rentalEstimation?.effectiveRootNamespaceRentalFeePerBlock.compact() * this.duration;
                    break;
                case 'child-namespace':
                    feeAmountRaw = this.rentalEstimation?.effectiveChildNamespaceRentalFee.compact();
                    break;
                case 'nametoken':
                        feeAmountRaw = this.rentalEstimation?.effectiveTokenRentalFee.compact() + this.rentalEstimation?.effectiveRootNamespaceEternalFee.compact();
                        break;
                default:
                    feeAmountRaw = 0;
            }
            return feeAmountRaw;
        }
    }
}

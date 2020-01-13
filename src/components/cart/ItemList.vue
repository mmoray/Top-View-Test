<template>
    <div class="list-group list-group-flush">
        <div class="cart-items">
            <Item class="list-group-item" v-for="item in items" :key="item.product.id" :item="item" :removeItem="removeItem">
            </Item>
        </div>
        <div class="list-group-item">
            <div class="alert alert-danger" v-if="isError">
                <font-awesome-icon icon="exclamation-circle" /> You must fix all errors in order to checkout!
            </div>
            <div class="alert alert-danger" v-if="!canCheckout">
                <font-awesome-icon icon="exclamation-circle" /> You must add a bike in order to checkout!
            </div>
            <div class="d-flex">
                <div class="ml-auto my-auto">
                    <h5 class="mb-0">
                        <strong>Total:</strong>
                        ${{ total }}
                    </h5>
                </div>
                <div class="ml-4">
                    <button class="btn btn-outline-dark btn-sm" @click="setCheckout" type="button" :disabled="!canCheckout || isError">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item.vue';

    export default {
        components: {
            Item
        },

        computed: {
            canCheckout() {
                const index = _.findIndex(this.items, (item) => {
                    return item.product.product_type === 'bike';
                });
                return index >= 0;
            },

            isError() {
                const index = _.findIndex(this.items, (item) => {
                    return item.quantity === '' || item.quantity <= 0;
                })
                return index >= 0;
            },

            total() {
                let total = 0;
                _.forEach(this.items, (item) => {
                    if (item.quantity !== '' && item.quantity >= 0) {
                        total += item.product.price * item.quantity;
                    }
                });
                return _.round(total, 2).toFixed(2);;
            }
        },

        methods: {
            removeItem(removeItem) {
                const index = _.findIndex(this.items, (item) => {
                    return item.product.id === removeItem.product.id;
                });
                this.items.splice(index, 1);
            }
        },

        props: [
            'items',
            'setCheckout'
        ]
    }
</script>

<style scoped>
    .cart-items {
        max-height: 600px;
        overflow-y: auto;
    }
    @media (max-width: 992px) {
        .cart-items {
            max-height: 100%;
        }
    }
</style>
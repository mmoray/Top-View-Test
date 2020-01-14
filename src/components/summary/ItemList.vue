<template>
    <div class="card">
        <div class="card-header">
            <h2>
                Summary
            </h2>
        </div>
        <div class="card-body">
            <div class="alert alert-danger mb-0" v-if="isEmpty">
                <p class="mb-0">
                    <font-awesome-icon icon="exclamation-circle" /> Your order is empty! <a class="alert-link" @click="keepShopping">Go on and add some items.</a>
                </p>
            </div>
            <div class="list-group list-group-flush" v-else>
                <Item class="list-group-item" v-for="item in items" :key="item.product.id" :item="item" :removeItem="removeItem">
                </Item>
                <div class="list-group-item">
                    <div class="alert alert-danger" v-if="isError">
                        <p class="mb-0">
                            <font-awesome-icon icon="exclamation-circle" /> You must fix all errors in order to submit your order! 
                        </p>
                    </div>
                    <div class="alert alert-danger" v-if="!canSubmit">
                        <p class="mb-0">
                            <font-awesome-icon icon="exclamation-circle" /> You must add a bike in order to submit your order! <a class="alert-link" @click="keepShopping">Go on and add some items.</a>
                        </p>
                    </div>
                    <div class="alert alert-warning" v-if="canSubmit && (!hasAccessories || !hasAddOns)">
                        <p class="mb-0">
                            <font-awesome-icon icon="question-circle" /> We noticed that you do not have any
                            <span v-if="!hasAccessories && !hasAddOns">accessories and/or add-ons.</span>
                            <span v-else-if="!hasAccessories">accessories.</span>
                            <span v-else-if="!hasAddOns">add-ons.</span>
                            <a class="alert-link" @click="keepShopping">Would you like to keep shopping?</a>
                        </p>
                    </div>
                    <div class="d-flex">
                        <div class="mr-auto my-auto" v-if="canSubmit && hasAccessories && hasAddOns">
                            <button class="btn btn-outline-dark btn-sm" @click="keepShopping" type="button">
                                Keep Shopping
                            </button>
                        </div>
                        <div class="ml-auto my-auto">
                            <h5 class="mb-0">
                                <strong>Total:</strong>
                                ${{ total }}
                            </h5>
                        </div>
                        <div class="ml-4">
                            <button class="btn btn-outline-dark btn-sm" @click="setSubmit" type="button" :disabled="!canSubmit || isError">
                                Submit
                            </button>
                        </div>
                    </div>
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
            canSubmit() {
                const index = _.findIndex(this.items, (item) => {
                    return item.product.product_type === 'bike';
                });
                return index >= 0;
            },

            hasAccessories() {
                const index = _.findIndex(this.items, (item) => {
                    return item.product.product_type === 'accessory';
                });
                return index >= 0;
            },

            hasAddOns() {
                const index = _.findIndex(this.items, (item) => {
                    return item.product.product_type === 'addon';
                });
                return index >= 0;
            },

            isEmpty() {
                return this.items.length === 0;
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
            'keepShopping',
            'setSubmit'
        ]
    }
</script>

<style scoped>
    .alert-link {
        cursor: pointer;
    }
</style>
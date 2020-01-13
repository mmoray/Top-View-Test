<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-2 col-md-3 col-4">
                    <img class="img-fluid" :src="item.product.image" />
                </div>
                <div class="col-lg-10 col-md-9 col-8 d-flex">
                    <div class="mr-auto">
                        <h5 class="card-title">{{ item.product.name }}</h5>
                        <div class="alert alert-danger alert-dismissible" role="alert" v-if="isError">
                            <p class="alert-heading mb-0">
                                <font-awesome-icon icon="exclamation-circle" /> {{ error }}
                            </p>
                        </div>
                        <form class="card-text row">
                            <div class="col-7 form-group">
                                <label :for="priceId">Price</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text">$</div>
                                    </div>
                                    <input class="form-control" :id="priceId" type="text" :value="price" disabled />
                                </div>
                            </div>
                            <div class="col-5 for-group">
                                <label :for="quantityId">Quantity</label>
                                <div>
                                    <input class="form-control" :id="quantityId" min="1" placeholder="Quantity" type="number" v-model="item.quantity" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="ml-auto">
                        <button class="btn btn-sm btn-outline-dark" @click="remove">
                            <font-awesome-icon icon="trash-alt" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isError() {
                return this.item.quantity === '' || this.item.quantity <= 0;
            }, 

            error() {
                if (this.item.quantity === '') {
                    return "The quantity is required!";
                }
                else if (this.item.quantity <= 0) {
                    return "The quantity must be a positive number!"
                }
                return null;
            },

            price() {
                if (this.isError) {
                    return _.round(this.item.product.price, 2).toFixed(2);
                }
                return _.round(this.item.product.price * this.item.quantity, 2).toFixed(2);
            },

            priceId() {
                return this.item.product.product_type + "_" + this.item.product.id + "_price"
            },

            quantityId() {
                return this.item.product.product_type + "_" + this.item.product.id + "_quantity"
            }
        },

        methods: {
            remove(event) {
                this.removeItem(this.item);
                event.stopPropagation();
            }
        },

        props: [
            'item',
            'removeItem'
        ],
    }
</script>
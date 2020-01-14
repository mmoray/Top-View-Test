<template>
    <div class="card">
        <img class="card-img-top" :alt="product.name" :src="product.image" />
        <div class="card-body">
            <h3 class="card-title">{{ product.name }}</h3>
            <form>
                <div class="alert alert-danger alert-dismissible" role="alert" v-if="isError">
                    <p class="alert-heading mb-0">
                        <font-awesome-icon icon="exclamation-circle" /> {{ error }}
                    </p>
                    <button aria-label="Close" class="btn-sm close" @click="clearError" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-success alert-dismissible" role="alert" v-if="isSuccess">
                    <p class="alert-heading mb-0">
                        <font-awesome-icon icon="check-circle" /> You have added {{ previousQuantity }}
                        <span v-if="previousQuantity > 1">items</span> 
                        <span v-else>item</span> 
                        to your cart.
                    </p>
                    <button aria-label="Close" class="btn-sm close" @click="clearSuccess" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="row">
                    <div class="col-6 form-group">
                        <label :for="priceId">Price</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">$</div>
                            </div>
                            <input class="form-control" :id="priceId" type="text" :value="price" disabled />
                        </div>
                    </div>
                    <div class="col-6 form-group">
                        <label :for="quantityId">Quantity</label>
                        <div>
                            <input class="form-control" :class="{'is-invalid': isError, 'is-valid': isSuccess}" :id="quantityId" min="1" placeholder="Quantity" type="number" @keydown.enter="submitForm" v-model="quantity" />
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <button class="btn btn-outline-dark" @click="submitForm" type="button">
                        Add to Cart <font-awesome-icon icon="cart-plus" />
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            isError() {
                return this.error != null;
            },

            isSuccess() {
                return this.previousQuantity != '';
            },

            price() {
                return _.round(this.product.price, 2).toFixed(2);
            },

            priceId() {
                return this.product.product_type + "_" + this.product.id + "_price"
            },

            quantityId() {
                return this.product.product_type + "_" + this.product.id + "_quantity"
            }
        },

        data() {
            return {
                error: null,
                previousQuantity: '',
                quantity: '',
            }
        },

        methods: {
            clearError() {
                this.error = null;
                this.quantity = '';
            },

            clearSuccess() {
                this.previousQuantity = '';
                this.quantity = '';
            },

            submitForm() {
                if (this.validateForm()) {
                    this.addToCart(this.product, Number(this.quantity));
                    this.previousQuantity = this.quantity;
                }
            },

            validateForm() {
                this.error = null;
                this.previousQuantity = '';
                if (this.quantity == '' || this.quantity <= 0) {
                    if (this.quantity == '') {
                        this.error = "The quantity is required!";
                    }
                    else {
                        this.error = "The quantity must be a positive number!";
                    }
                }
                return !this.isError;
            }
        },

        mounted() {
            $(".alert").on("close.bs.alert", (e) => {
                e.preventDefault();
            })
        },

        props: [
            'addToCart',
            'product'
        ]
    }
</script>
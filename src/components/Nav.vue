<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div class="container">
            <button class="btn btn-link navbar-brand" @click="keepShopping">
                Top View Sightseeing <font-awesome-icon icon="bicycle" /> 
            </button>
            <button aria-controls="navbar_toggle" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler" data-target="#navbar_toggle" data-toggle="collapse" type="button" v-if="!submit">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar_toggle" v-if="!submit">
                <ul class="ml-auto navbar-nav">
                    <li class="nav-item">
                        <div class="dropdown">
                            <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline-dark dropdown-toggle" data-toggle="dropdown" id="cart_menu" type="button">
                                My Cart <font-awesome-icon icon="shopping-cart" /> <span class="badge badge-pill badge-dark">{{ cartAmount }}</span>
                            </button>
                            <div aria-labelledby="cart_menu" class="dropdown-menu dropdown-menu-right py-0">
                                <div class="alert alert-danger mb-0" v-if="cartEmpty">
                                    <p class="mb-0">
                                       <font-awesome-icon icon="exclamation-circle" /> Your cart is empty! Go on and add some items.
                                    </p>
                                </div>
                                <ItemList :items="cart" :setCheckout="setCheckout" v-else>
                                </ItemList>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import ItemList from './cart/ItemList.vue';

    export default {
        components: {
            ItemList
        },

        computed: {
            cartAmount() {
                let amount = 0;
                _.forEach(this.cart, function(item) {
                    amount += Number(item.quantity);
                }, amount);
                return amount;
            },

            cartEmpty() {
                return this.cartAmount === 0 && this.cart.length === 0;
            }
        },
        
        props: [
            'cart',
            'keepShopping',
            'setCheckout',
            'submit'
        ]
    }
</script>

<style scoped>
    .dropdown-menu {
        width: 600px;
    }
    @media (max-width: 992px) {
        .dropdown-menu {
            width: 100%;
        }
    }
</style>
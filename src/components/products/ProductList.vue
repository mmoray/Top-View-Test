<template>
    <div class="card">
        <div class="card-header">
            <h2>
                <slot>Products</slot>
            </h2>   
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4 col-md-6" v-for="product in products" :key="product.id">
                    <Product :addToCart="addToCart" :product="product"></Product>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Product from './Product.vue';

    export default {
        components: {
            Product
        },

        props: [
            'addToCart',
            'products'
        ]
    }
</script>
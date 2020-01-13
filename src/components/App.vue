<template>
  <div id="app">
    <Nav :cart="cart" :keepShopping="keepShopping" :setCheckout="setCheckout"></Nav>
    <div class="container">
      <div v-if="!checkout">
        <ProductList class="my-4" :addToCart="addToCart" :products="getBikes">
          Bikes
        </ProductList>
        <ProductList class="my-4" :addToCart="addToCart" :products="getAccessories">
          Accessories
        </ProductList>
        <ProductList class="my-4" :addToCart="addToCart" :products="getAddOns">
          Add Ons
        </ProductList>
      </div>
      <div v-else>
        <PaymentInformation class="my-4"></PaymentInformation>
        <ItemList class="my-4" :items="cart" :keepShopping="keepShopping">
        </ItemList>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from './Nav.vue';
  import ItemList from './summary/ItemList.vue';
  import PaymentInformation from './summary/PaymentInformation.vue';
  import ProductList from './products/ProductList.vue';

  export default {
    components: {
      Nav,
      ItemList,
      PaymentInformation,
      ProductList
    },

    computed: {
      getAccessories() {
        return _.filter(this.products, (product) => {
          return product.product_type === "accessory";
        });
      },

      getAddOns() {
        return _.filter(this.products, (product) => {
          return product.product_type === "addon";
        });
      },

      getBikes() {
        return _.filter(this.products, (product) => {
          return product.product_type === "bike";
        });
      }
    },

    data() {
      return {
        cart: [],
        checkout: false,
        products: [
          {
            id: 1,
            name: "Adult Male Bike",
            price: 20.50,
            image: "http://via.placeholder.com/250x250?text=Adult%20Male%20Bike",
            product_type: "bike"
          },
          {
            id: 2,
            name: "Adult Female Bike",
            price: 20.50,
            image: "http://via.placeholder.com/250x250?text=Adult%20Female%20Bike",
            product_type: "bike"
          },
          {
            id: 3,
            name: "Kids Unisex Bike",
            price: 12.75,
            image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike",
            product_type: "bike"
          },
          {
            id: 4,
            name: "Adult Unisex Helmet",
            price: 4.00,
            image: "http://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet",
            product_type: "accessory"
          },
          {
            id: 5,
            name: "Kids Unisex Helmet",
            price: 3.50,
            image: "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet",
            product_type: "accessory"
          },
          {
            id: 6,
            name: "Insurance",
            price: 9.99,
            image: "http://via.placeholder.com/250x250?text=Insurance",
            product_type: "addon"
          }
        ]
      };
    },

    methods: {
      addToCart(product, quantity) {
        const index = _.findIndex(this.cart, (item) => {
          return item.product.id === product.id;
        });
        if (index >= 0) {
          this.cart[index].quantity += quantity;
        }
        else {
          const item = {
            product: product,
            quantity: quantity
          };
          this.cart.push(item);
        }
      },

      keepShopping() {
        this.checkout = false;
      },

      setCheckout() {
        this.checkout = true;
      }
    },

    name: 'app'
  }
</script>
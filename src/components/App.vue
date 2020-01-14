<template>
  <div id="app">
    <Nav :cart="cart" :keepShopping="keepShopping" :setCheckout="setCheckout" :submit="submit"></Nav>
    <div class="container">
      <div v-if="!checkout && !submit">
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
      <div v-else-if="checkout">
        <PaymentInformation class="my-4"></PaymentInformation>
        <ItemList class="my-4" :items="cart" :keepShopping="keepShopping" :setSubmit="setSubmit">
        </ItemList>
      </div>
      <div v-else-if="submit">
        <div class="card my-4">
          <div class="card-header">
            <h2>
              Conclusion
            </h2>
          </div>
          <div class="card-body">
            <p class="mb-0">
              Thank you for the opportunity to interview and take the practical assessment for Top View Sightseeing! I hope you have enjoyed this demo and I look forward to hearing back from you!
            </p>  
          </div>
          <div class="card-footer d-flex">
            <div class="ml-auto">
              <button class="btn btn-outline-dark btn-sm" @click="reset" type="button">
                Reset Demo
              </button>
            </div>
          </div>
        </div>
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
        ],
        submit: false
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

      reset() {
        this.cart = [];
        this.keepShopping();
        this.submit = false;
      },

      setCheckout() {
        this.checkout = true;
      },

      setSubmit() {
        this.keepShopping();
        this.submit = true;
      }
    }
  }
</script>
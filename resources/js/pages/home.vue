<template>
  <div class="w-full">
    <div class="mx-auto max-w-2xl py-10 px-4 sm:py-15 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex mb-10">
        <h1 class="flex-grow text-3xl font-bold">Products <template v-if="!loading">({{ products.length }})</template></h1>
        <template v-if="!loading">
          <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" @click="onAdd">
            Add Product
          </button>
          <button class="ml-2 block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" @click="onImport">
            Import Product
          </button>
        </template>
      </div>

      <div v-if="loading">
        <b>Please wait...</b>
      </div>
      <div v-else-if="products.length > 0" class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group relative">
          <div class="flex flex-grow items-center min-h-56 lg:h-56 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img :src="product.logoUrls[0]" :alt="product.product_name" class="w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-900">
                <a href="#" @click.prevent="onView(product.id)" title="View More">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.product_name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.brand }}</p>
            </div>
            <!-- <p class="text-sm font-medium text-gray-900">{{ product.sender_fee }}</p> -->
          </div>
        </div>
      </div>
      <div v-else class="">
        No records found.
      </div>
    </div>   
    
    <!-- Product View Modal -->
    <Modal v-if="isViewModal && viewProduct" @close="isViewModal=false">
      <template #header>
        <div class="flex justify-between">
          <h1 class="flex items-center text-lg font-bold">
            Product: {{ viewProduct.product_name }}
          </h1>
        </div>
      </template>
      <template #body>
        <div class="h-96 overflow-y-auto">
          <div class="flex flex-grow items-center min-h-56 lg:h-56 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
            <img :src="viewProduct.logoUrls[0]" :alt="viewProduct.product_name" class="w-full" />
          </div>
          <table class="w-full text-left">
            <tbody>
                <tr>
                  <th scope="col" class="py-3 px-6">Product Id</th>
                  <td>{{ viewProduct.product_id }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Product Name</th>
                  <td>{{ viewProduct.product_name }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Brand</th>
                  <td>{{ viewProduct.brand }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Sender Fee</th>
                  <td>{{ viewProduct.sender_fee.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Sender Fee Percentage</th>
                  <td>{{ viewProduct.sender_fee_percentage }}%</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Denomination Type</th>
                  <td>{{ viewProduct.denomination_type }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Recipient Currency Code</th>
                  <td>{{ viewProduct.recipient_currency_code }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Country</th>
                  <td>{{ viewProduct.country }}</td>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">Redeem Instruction</th>
                  <td>{{ viewProduct.redeem_instruction }}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-glow">
          <button class="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" @click.prevent="editClick">
            Edit
          </button>
          <button class="ml-3 block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button" @click.prevent="deleteProduct">
            Delete
          </button>
        </div>
      </template>
    </Modal>

    <!-- Product Add/Edit Modal -->
    <Modal v-if="isEditModal" @close="isEditModal=false">
      <template #header>
        <div class="flex justify-between">
          <h1 class="flex items-center text-lg font-bold">
            <template v-if="isAdding">Add Product</template> 
            <template v-else>Edit Product</template> 
          </h1>
        </div>
      </template>
      <template #body>
        <div class="h-96 overflow-y-auto">
          <form @submit.prevent="submitProduct" class="w-full flex flex-wrap">
            <div class="w-full mb-6">
              <Input type="file" name="logoUrls" label="Logo" @change="handleFile"/>
              <small v-if="!isAdding">Do not select file if not want to update</small>
              <div v-if="formProduct.errors.has('logoUrls')" v-html="formProduct.errors.get('logoUrls')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.product_id" type="number" name="product_id" placeholder="Product ID" label="Product ID" />
              <div v-if="formProduct.errors.has('product_id')" v-html="formProduct.errors.get('product_id')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.product_name" type="text" name="product_name" placeholder="Product Name" label="Product Name" />
              <div v-if="formProduct.errors.has('product_name')" v-html="formProduct.errors.get('product_name')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.sender_fee" type="number" min="0" step="0.01" name="sender_fee" placeholder="Sender Fee" label="Sender Fee" />
              <div v-if="formProduct.errors.has('sender_fee')" v-html="formProduct.errors.get('sender_fee')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.sender_fee_percentage" type="number" min="0" step="0.01" name="sender_fee_percentage" placeholder="Sender Fee Percentage" label="Sender Fee Percentage" />
              <div v-if="formProduct.errors.has('sender_fee_percentage')" v-html="formProduct.errors.get('sender_fee_percentage')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.denomination_type" type="text" name="denomination_type" placeholder="Denomination Type" label="Denomination Type" />
              <div v-if="formProduct.errors.has('denomination_type')" v-html="formProduct.errors.get('denomination_type')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.recipient_currency_code" type="text" name="recipient_currency_code" placeholder="Recipient Currency Code" label="Recipient Currency Code" />
              <div v-if="formProduct.errors.has('recipient_currency_code')" v-html="formProduct.errors.get('recipient_currency_code')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.brand" type="text" name="brand" placeholder="Brand" label="Brand" />
              <div v-if="formProduct.errors.has('brand')" v-html="formProduct.errors.get('brand')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <Input v-model="formProduct.country" type="text" name="country" placeholder="Country" label="Country" />
              <div v-if="formProduct.errors.has('country')" v-html="formProduct.errors.get('country')" class="text-red-500" />
            </div>
            <div class="w-full mb-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Redeem Instruction</label>
              <textarea v-model="formProduct.redeem_instruction" name="redeem_instruction" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Redeem Instruction..."></textarea>
              <div v-if="formProduct.errors.has('redeem_instruction')" v-html="formProduct.errors.get('redeem_instruction')" class="text-red-500" />
            </div>
            <div class="w-full">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" :disabled="formProduct.busy">
                Save
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
    
  </div>
</template>

<script>
import axios from "axios";
import { Modal, Table, Input } from 'flowbite-vue'
import Form from "vform";

export default {
  name: 'Home',

  components: { Modal, Table, Input },

  data: () => ({
    loading: true,
    productEndpoint: "/api/product",
    products: [],
    viewProductId: false,
    isViewModal: false,
    isEditModal: false,
    isAdding: true,
    formProduct: new Form({
      id: null,
      logoUrls: null,
      product_id: null,
      product_name: null,
      sender_fee: null,
      sender_fee_percentage: null,
      denomination_type: null,
      recipient_currency_code: null,
      brand: null,
      country: null,
      redeem_instruction: null
    }),
  }),

  mounted () {
    this.loadProducts()
  },

  computed: {
    viewProduct (){
      return (this.viewProductId) ? this.products.find(prod => (prod.id == this.viewProductId)) : false
    }
  },

  methods: {
    loadProducts(){
      this.loading = true
      axios.get(this.productEndpoint).then(({data}) => {
        this.products = data.data
        this.loading = false
      })
    },
    onImport(){
      this.resetform()
      if (confirm("Are you sure want to import ?") == true) {
        this.loading = true
        axios.get(this.productEndpoint+'/import').then(({data}) => {
          this.loadProducts()
          this.resetform()
        })
      }
    },
    onAdd(){
      this.resetform()
      this.isEditModal = true
    },
    onView(Id){
      this.viewProductId = Id
      this.isViewModal = true
    },
    submitProduct(){
      let apiUrl = this.productEndpoint+'/create'
      if(!this.isAdding){
        apiUrl = this.productEndpoint+'/update'
      }
      this.addUpdateProduct(apiUrl)
    },
    addUpdateProduct(apiUrl){
      this.formProduct.post(apiUrl).then(({data}) => {
        this.resetform()
        this.loadProducts()
      })
    },
    editClick(){
      if(!this.viewProduct) return false
      this.isViewModal = false
      this.isAdding = false
      this.formProduct.id = this.viewProduct.id
      this.formProduct.logoUrls = (this.viewProduct.logoUrls) ? this.viewProduct.logoUrls[0] : null
      this.formProduct.product_id = this.viewProduct.product_id
      this.formProduct.product_name = this.viewProduct.product_name
      this.formProduct.sender_fee = this.viewProduct.sender_fee.toFixed(2)
      this.formProduct.sender_fee_percentage = this.viewProduct.sender_fee_percentage.toFixed(2)
      this.formProduct.denomination_type = this.viewProduct.denomination_type
      this.formProduct.recipient_currency_code = this.viewProduct.recipient_currency_code
      this.formProduct.brand = this.viewProduct.brand
      this.formProduct.country = this.viewProduct.country
      this.formProduct.redeem_instruction = this.viewProduct.redeem_instruction
      this.isEditModal = true
    },
    deleteProduct(){
      if(!this.viewProductId) return false
      if (confirm("Are you sure want to delete ?") == true) {
        axios.delete(this.productEndpoint+'/delete/'+this.viewProductId).then(({data}) => {
          this.loadProducts()
          this.resetform()
        })
      }
    },
    resetform(){
      this.formProduct.reset()
      this.isAdding = true
      this.formProduct.id = null
      this.isEditModal = false
      this.isViewModal = false
      this.viewProductId = false
    },
    handleFile (event) {
      if((event.target.files && event.target.files[0])){
        this.formProduct.logoUrls = event.target.files[0]
      }
    }
  }
}
</script>
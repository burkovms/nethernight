<template>
  <div class="container-fluid">
    <v-data-table
      :loading="!packages.length"
      loading-text="Loading... Please wait"
      :headers="headers"
      :items="packages"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @click:row="detailInfo"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="totalVisible"
        dark
        @input="changePage"
      ></v-pagination>
    </div>
    <v-dialog v-model="isOpened" max-width="800px">
      <v-card class="modal-info">
        <v-card-title>
          <span>{{ selectedPackage.name }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-list class="modal-info__list">
          <v-list-item>
            <div class="name">Date:</div>
            <div class="value">{{ selectedPackage.date }}</div>
          </v-list-item>
          <v-list-item>
            <div class="name">Keywords:</div>
            <div class="value">
              <span v-for="item in selectedPackage.keywords" :key="item">
                {{ item }}
              </span>
            </div>
          </v-list-item>
          <v-list-item>
            <div class="name">Description:</div>
            <div class="value">{{ selectedPackage.description }}</div>
          </v-list-item>
          <v-list-item>
            <div class="name">Version:</div>
            <div class="value">{{ selectedPackage.version }}</div>
          </v-list-item>
          <v-list-item
            v-for="(item, name) in selectedPackage.links"
            :key="item + name"
          >
            <div class="name">Link {{ name }}:</div>
            <div class="value">
              <a :href="item">{{ item }}</a>
            </div>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn color="primary" large text @click="isOpened = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      isOpened: false,
      page: 1,
      itemsPerPage: 10,
      totalVisible: 10,
      selectedPackage: {},
      headers: [
        {
          text: 'Name:',
          sortable: false,
          value: 'name',
        },
        { text: 'Author:', sortable: false, value: 'author.name' },
        { text: 'Version:', sortable: false, value: 'version' },
        { text: 'Date:', sortable: false, value: 'date' },
      ],
    }
  },
  computed: {
    ...mapState(['packages', 'totalResults']),
    totalPages() {
      return Math.ceil(this.totalResults / this.itemsPerPage)
    },
  },
  mounted() {
    this.fetchPackages(this.page)
  },
  methods: {
    ...mapActions(['fetchPackages']),
    ...mapMutations(['CLEAR_PACKAGES']),

    detailInfo(item) {
      this.selectedPackage = item
      return (this.isOpened = true)
    },
    async changePage() {
      this.CLEAR_PACKAGES()
      await this.fetchPackages(this.page)
    },
  },
}
</script>

<style lang="scss" scoped>
.v-pagination {
  flex-wrap: wrap;
}

.v-dialog {
  > .v-card {
    > .v-card__title {
      text-transform: uppercase;
      color: $violet;
      font-weight: 700;
      font-size: 20px;
      padding: 16px 20px;
      background-color: $dark;
    }
    > .v-card__actions {
      padding: 16px 20px;
      background-color: $dark;
      > .v-btn.v-btn {
        padding: 0 16px;
      }
    }
    > .v-list {
      padding: 10px;
    }
  }
}

.v-list-item {
  display: flex;
  align-items: flex-start;
  &:not(:first-child) {
    border-top: thin solid rgba(255, 255, 255, 0.12);
  }
  .name {
    flex: 0 0 25%;
    max-width: 25%;
    margin-right: 10px;
    color: $gray-100;
    padding: 10px 0;
  }
  .value {
    flex-grow: 1;
    padding: 10px 0;
    span {
      &:not(:last-child) {
        &:after {
          content: ',';
        }
      }
    }
  }
}
</style>

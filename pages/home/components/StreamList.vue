<template>
  <div style="width: 100%;">
    <el-table
      v-loading="loading"
      :data="homeList"
      class="table"
      :cell-style="cellStyle"
      :header-cell-style="cellStyle"
    >
      <el-table-column
        width="80"
        prop="id"
        label="ID"
      />
      <el-table-column align="center" label="Recipient" style="background: #272958;" min-width="100">
        <template slot-scope="scope">
          <span :title="scope.row.recipient">{{ scope.row.recipient | addr }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Deposited">
        <template slot-scope="scope">
          <span :title="scope.row.depositAmount">{{ scope.row.depositAmount | precision18 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Withdrawable" min-width="120">
        <template slot-scope="scope">
          <span :title="scope.row.withdrawable">{{ (detailCache[scope.row.id] && detailCache[scope.row.id].withdrawable) | precision18 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Start Block" min-width="100">
        <template slot-scope="scope">
          <span :title="scope.row.startBlock">#{{ scope.row.startBlock }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status" min-width="120">
        <template slot-scope="scope">
          <stream-status
            :start-block="scope.row.startBlock"
            :current-block="blockNumber"
            :remaining="detailCache[scope.row.id] && detailCache[scope.row.id].remaining"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Sender" min-width="100">
        <template slot-scope="scope">
          <span :title="scope.row.sender">{{ scope.row.sender | addr }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Date" fixed="right" min-width="100">
        <template slot-scope="scope">
          <span :title="scope.row.timestamp">{{ scope.row.timestamp | date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label=""
        width="110"
      >
        <template slot-scope="scope">
          <NuxtLink :to="`/detail?id=${scope.row.id}`">
            <el-button :id="scope.row.id" size="small" round class="view-detail-btn" @click="drawer = true">
              View Detail
              <stream-balance :id="scope.row.id" :row="scope.row" />
            </el-button>
          </NuxtLink>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total>0"
      class="pagination"
      :current-page.sync="query.page"
      :page-size="query.limit"
      layout="prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { STREAM_LIST } from '@/api/apollo/queries'
import { mapState } from 'vuex'
// import gql from 'graphql-tag'

export default {
  name: 'StreamList',
  // fetch () {
  //   this.getList()
  // },
  /*
  * depositAmount: (...)
id: (...)
kBlock: (...)
recipient: (...)
sender: (...)
startBlock: (...)
timestamp: (...)
txs: (...)
unlockRatio: (...)
__typename: (...)
  *
  * */
  data () {
    return {
      loading: false,
      list: [],
      query: {
        page: 1,
        limit: 10
      }
    }
  },
  // apollo: {
  //   list: {
  //     query: () => {
  //       return gql`
  //       query streams($first: Int!) {
  //           streams(first: $first){
  //            id
  //             timestamp
  //             txs(first: $first, orderBy: timestamp, orderDirection: desc) {
  //               to
  //               txhash
  //             }
  //           }
  //       } `
  //     },
  //     update: (data) => {
  //       console.log('apollo data', data)
  //       return data.streams
  //     },
  //     variables () {
  //       // Use vue reactive properties here
  //       return {
  //         first: 3
  //       }
  //     }
  //   }
  // },
  computed: mapState({
    blockNumber (state) {
      return state.blockNumber
    },
    skip () {
      return (this.query.page - 1) * this.query.limit
    },
    total (state) {
      return Number(state.stats.totalCount) || 0
    },
    homeList (state) {
      return state.homeList
    },
    detailCache (state) {
      return state.detailCache
    }
  }),
  created () {
    console.log('StreamList mounted')
    this.getList()
    this.$store.dispatch('refreshLatestBlockNumber')
  },
  methods: {
    async getList () {
      this.loading = true
      const ret = await this.$apollo.query({ query: STREAM_LIST, variables: { first: this.query.limit, skip: this.skip } })
      console.log('StreamList ret', ret)
      this.$store.commit('updateSteamList', { key: 'homeList', value: ret.data.streams })
      this.loading = false
      return ret
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.getList()
    },
    cellStyle (obj) {
      return 'background-color:#272958;border-bottom-color:#2E2F5C;color:#7E7F9C;'
      // if (obj.columnIndex === 8) {
      //   return 'background-color:#1e2049;border-bottom-color:#2E2F5C;color:#7E7F9C;'
      // } else {
      //   return 'background-color:#272958;border-bottom-color:#2E2F5C;color:#7E7F9C;'
      // }
    }
  }
}
</script>

<style scoped lang="scss">
  .pagination {
    width: 938px;
    margin-top: 20px;
  }

  .table {
    width: 100%;

    &::before {
      border: none;
    }
  }

  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    border: none;
  }

  .view-detail-btn {
    //font-family: PingFang-SC-Bold;
    background-image: linear-gradient(136deg, #2bf7dd 0%, #3a8ff7 51%, #da37fa 100%);
    border-radius: 20px;
    width: 98px;
    height: 27.7px;
    font-size: 13px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
  }
</style>

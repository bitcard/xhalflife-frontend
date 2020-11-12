import gql from 'graphql-tag'

export const STREAM_LIST = gql`
 query streams($first: Int!) {
    id
    sender
    recipient
    depositAmount
    startBlock
    kBlock
    unlockRatio
    timestamp
    txs(first: 10, orderBy: timestamp, orderDirection: desc) {
      block
      event
      from
      timestamp
      to
      txhash
    }
  }
 `
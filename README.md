# xhalflife-frontend

## xHalfLife Protocol: Exponentially Decaying Money Stream Protocol

xHalfLife Protocol has 4 parameters for execution: $NumStart$、$K$、$ratio$ and $eps$. Under this protocol, users' reward are split to 2 parts: 

$\text{Deferred Income}$ and $\text{Earned Income}$.

Any new income enters $\text{Deferred Income}$ account.

After $NumStart$ ethereum mainnet block, each time the block number can be divided by $K$, and asset in $\text{Deferred Income}$ balance is over $eps$, $ratio \cdot \text{Deferred Income}$ in $\text{Deferred Income}$ balance will be forwarded into $\text{Earned Income}$ account. 

When needed, any asset in $\text{Earned Income}$ is free to withdraw.

$50\%$ of any single cashflow under xHalfLife is free to withdraw after 

$$-K / log_2(1-ratio) * 13.1s$$

since time at Ethereum Mainnet Block Height $numStart$


For more detail, refer to yellowpaper of xHalfLife and xVote.

For xDEX token farmed from XDEX voting pool, ordinary farming pools, and founder teams' fund, any income is rewarded through xHalfLife protocol. We wish the template of money stream can become one of backbone standard in crypto financing world.

xHalfLife is inspired by Sablier Protocol.

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:9090
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

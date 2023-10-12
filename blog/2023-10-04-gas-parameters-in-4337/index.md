---
slug: 4337 gas parameters
title: 'Road to 4337: Bundler Earnings & Gas Calculations'
authors: [aditya]
tags: [4337, UserOp, Lifecycle, pre-chain, education, Entrypoint]
---

Only **10.21%** of the bundlers are profitable. Rest are yet to cross the $10 mark in profit. The complete play is around gas prices. 

So in this post, let's understand the different gas parameters in 4337 and show what made the bundlers actually earn in a couple of sample transactions.
<!--truncate-->

:::info
As per the report **[Development of 4337](https://sixdegree.xyz/research/Half-Year-Data-Report-of-ERC4337-by-Sixdegree.pdf)**, published in September 2023 by [SixDegree](https://sixdegree.xyz/) only **10.21%** of the bundlers have made more than $10 in earnings.
:::

## Introduction
---

[ERC-4337](https://www.erc4337.io/) Introduced multiple new gas parameters that take a bit of time to wrap your hand around currently. One needs to deep dive into the entrypoint smart contract code and bundler implementations to see how the values impact the actual processing. In this post, we will learn the meaning and intent behind the values relevant to a UserOp & their relation to the actual blockchain transaction or bundler earnings.

We will later use 2 bundles (or transactions) submitted on the Ethereum mainnet and use their values for our reference. There's no particular reason for choosing these two specifically, apart from the fact that one has a single UserOperation in the bundler while the other has 2 UserOperations in the bundle.

## Defining Gas Parameters
---

First, let's define the various gas parameters that aid in calculating the cost at a *UserOperation* and *Bundle* Level.
1. **UserOp Level:** Values from UserOperation Input or UserOperation Event Log are sufficient.
2. **Bundle Level:** Needs values from *TransactionInput* and *TransactionReceipt*.

**Note:** You may not get the differences completely just yet. Please bear through till the next section where we use real values from UserOps/Bundles submitted on-chain and show the impact of these fields.

### UserOperation Related Parameters
---

These impact the processing of an individual UserOperation and the gas fee paid for its execution.

||Parameter|Source|Description|
|-|-|-|-|
|A|callGasLimit|UserOperation Calldata|Max unit of Gas that can be consumed by the `Exec.call()` triggered inside the Entrypoint contract for doing the operation desired by the wallet owner. |
|B|verificationGasLimit|UserOperation Calldata| Max unit of Gas that can be consumed for checks carried out by the entrypoint before & after the execution of `Exec.call()` statement. These include deploying the Smart Contract Wallet when initcode is present, confirming validness of the UserOp and paymaster's support for the UserOp and triggering postOp on paymaster to validate successful completion of the userOp and fee sponsor.|
|C|preVerificationGas|UserOperation Calldata|This is a fixed amount of Gas Units compensated to the Bundler for performing checks before submitting the UserOperation to the blockchain. |
|D|maxFeePerGas|UserOperation Calldata|The maximum price (in wei) per unit of Gas that can be charged for the UserOp, irrespective of the baseFee of the block. |
|E|maxPriorityFeeGas|UserOperation Calldata|The maximum additional price (in wei) per unit of Gas that can be used to incentivize block builders to accept the transaction over the other pending transactions. At UserOp level, it's to incentivize the bundler. The actual maxPriorityFee value a bundler submits for a bundle is not tied to this value directly. |
|F|actualGasCost|UserOperation Event Log|This the amount of Ether (in wei) the sender (or paymaster) is charged for the complete execution of the UserOp and gets transferred to the beneficiary at the end of the operation |
|G|actualGasUsed|UserOperation Event Log|Total Gas Units Consumed in processing the entrypoint through the entrypoint plus the preVerificationGas value shared in the UserOperation Input |

* You can refer to the previous article on [UserOp calldata](../2023-05-17-decoding-4337-calldata/index.md) to know all the UserOperation calldata fields


### Special Commmon Parameters
---

These impact the gas fee calculation at UserOperation as well as Bundle/Transaction Level.

||Parameter|Source|Description|
|-|-|-|-|
|H|baseFeePerGas|custom|This is the minimum Ether (in wei) per Gas Unit that needs to be paid for accept a transaction in a block by a miner and changes based on the number of people attempting to submit a transaction to the ethereum chain. Currently this value is not directly exposed in Ethereum APIs can you have custom setup for this, or derive from other values. |

### Bundle/Transaction Level Parameters
---

These impact the processing of the entire transaction reprenting a Bundle and the gas fee paid for its execution by the bundler, irrespective of what is charged to the individual wallet owner.

||Parameter|Source|Description|
|-|-|-|-|
|I|gasLimit|TransactionInput|Maximum amount of Gas That can be consumed by the entire Transaction|
|J|maxPriorityFeePerGas|TransactionInput|The maximum amount of Eth per Gas Unit given as tip to the validator to include the transaction as per [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)|
|K|gasUsed| TransactionReceipt|Total amount of Gas Units consumed by the Transaction|
|L|effectiveGasPrice|TransactionReceipt| This is the actual Gas Price In Ether paid per Unit of Gas Consumed by the bundler. It's `baseFeePerGas` + `maxPriorityFeePerGas`|


## Fees in Sample Bundles and UserOps
---
Let's take two sample transactions and what the Wallet Owners were Charged, what the bundler paid as *Gas Fee*, and the net profit (or loss) for the bundler.

### Transaction 1: Bundle with 1 UserOperation
---

The links to further explore the transaction/UserOperation details are:
1. [UserOperation](https://www.jiffyscan.xyz/userOpHash/0x46002d88bb8ce68fd2281555783930e9b024a10a007c719e0b448c30a4b03b86) on JiffyScan
2. [Bundle](https://www.jiffyscan.xyz/bundle/0xf1b26a09b51bc13d994d65bd644695016e607bebf854b0b54149a8a2a22ab2e6) on JiffyScan
3. [Transaction](https://etherscan.io/tx/0xf1b26a09b51bc13d994d65bd644695016e607bebf854b0b54149a8a2a22ab2e6) on Etherscan

First Let's Show all the values. Then we show the fees paid and the bundler markup.

#### UserOperation Level
----

||Parameter|Source|Value for UserOp_1|
|-|-|-|-|
|A1|callGasLimit|UserOperation Calldata|39,551 Gas Units|
|B1|verificationGasLimit|UserOperation Calldata|100,000 Gas Units|
|C1|preVerificationGas|UserOperation Calldata|49,264 Gas Units|
|D1|maxFeePerGas|UserOperation Calldata|35,579,741,989 (wei/Gas)|
|E1|maxPriorityFeeGas|UserOperation Calldata|54,687,739 (wei/Gas)|
|F1|actualGasCost|UserOperation Event Log|2,103,274,083,204,352 (wei/Gas)|
|G1|actualGasUsed|UserOperation Event Log|107,648 Gas Units|

#### Common Parameters
----

||Parameter|Source|Value|
|-|-|-|-|
|H1|baseFeePerGas|custom|19,483,753,135 (wei/Gas)|

#### Bundle Level
----

||Parameter|Source|Value|
|-|-|-|-|
|I1|gasLimit|TransactionInput|226,976 Gas Units|
|J1|maxPriorityFeePerGas|TransactionInput|48,396,233 (wei/Gas)|
|K1|gasUsed| TransactionReceipt|102,924 Gas Units|
|L1|effectiveGasPrice|TransactionReceipt|19,532,149,368 (wei/Gas)|


#### Fee & Markup Calculations
---
A few observations we should make from the above data:
1. **Gas Units Markup:** The *gas consumed by the UserOp* (`G1 = 107,648 Gas Units`) is higher than the *gas consumed in the transaction* (`K1 = 102,924 Gas Units`). This is because the *UserOperation* gas calculation adds the fixed *preVerificationGas* (`C1`) value to the actual consumption, to account for the parts that can't be calculated. Thus, ~4.589% extra *Gas Units* were charged. In a perfect bundler, this value is zero.
2. **Gas Price Paid by the Wallet Owner:** The wallet owner paid *gas fee* (`F1`)/*gas used* (`G1`) = `2,103,274,083,204,352 / 107,648` = `19,538,440,874 wei/Gas`. This value is exactly equal to *baseFee for the block* (`H1`) + *priority fee for the bundler* (`E1`), which is how it's calculated in the smart contract. Thus `F1/G1 = H1+E1` or `F1 = (H1+E1) * G1`.
3. **Effective Gas Price:** Similar to the *Gas Price* paid by the wallet, the gas price for the *Bundle* is the sum of the *base fee for the block* (`H1`) and the *priority for the validator* (`J1`). Thus `L1 = H1 + J1`.
4. **Bundler Gas Fee Markup:** Now, since the two gas costs are different, the bundler charged a markup of `(H1+E1)/(H1+J1)` = `19,538,440,874/19,532,149,368 = 1.0003221102748` or `0.032%` markup. So did the bundler make only 0.032% profit? Not quite!
5. **Fee paid by Wallet Owner:** As shown in `F1`, the wallet owner was charged a total of `0.002103274083204352 ETH`, which is approximately `3.527 USD` as per the ETH price on that day.  
6. **Fee paid by Bundler:** This is essentially the *total gas consumed* (`K1`) \* *price per gas* (`L1`) = `102,924 * 19,532,149,368 = 0.002010326941552032 ETH`, approximately `$3.34` as per the ETH price on that day.
7. **Bundler Markup:** This is the ratio of the last two values: `0.002103274083204352 ETH`/`0.002010326941552032 ETH` = `1.04623483859` or ~**`4.62%`** profit.

Thus even though the bundler charged only a `0.032%` the markup on the actual Gas Price paid, as there were additional gas units, the net markup was ~`4.62%`. (The net ratio can be calculated as `(G1/K1)*((H1+E1)/(H1+J1))`). When this value is greater than 1, the bundler makes a profit, or else a loss.

Let's see how to calculate these values in case of more than 1 *UserOperation* in a bundle.

### Transaction 2: Bundle with 2 UserOperation
---

The links to further explore the transaction/UserOperation details are:
1. [UserOperation 1](https://www.jiffyscan.xyz/userOpHash/0x080f5f0d60c327e10678fe467995b18a2429cdd8964855d58fd4195c712235a5?network=mainnet) on JiffyScan
2. [UserOperation 2](https://www.jiffyscan.xyz/userOpHash/0x01c3e97ee1a6440b6e8e140c40623a1c24ff65be6ac3faa171dcb1a221d89dc1?network=mainnet) on JiffyScan
3. [Bundle](https://www.jiffyscan.xyz/bundle/0xeacb2c301d2d107cf99dbf44e48c96c51a337663a4c2ff0a9b3da18797aabd07) on JiffyScan
4. [Transaction](https://etherscan.io/tx/0xeacb2c301d2d107cf99dbf44e48c96c51a337663a4c2ff0a9b3da18797aabd07) on Etherscan

#### UserOperation Level Fields
----

||Parameter|Source|UserOp_1|UserOp_2|
|-|-|-|-|-|
|A2|callGasLimit|UserOperation Calldata|57307 Gas Units|300,000 Gas Units|
|B2|verificationGasLimit|UserOperation Calldata|150,000 Gas Units|150,000 Gas Units|
|C2|preVerificationGas|UserOperation Calldata|46,444 Gas Units|51,232 Gas Units|
|D2|maxFeePerGas|UserOperation Calldata|13,597,415,618 (wei/Gas)|13,597,415,618 (wei/Gas)|
|E2|maxPriorityFeeGas|UserOperation Calldata|1,500,000,000 (wei/Gas)|1,500,000,000 (wei/Gas)|
|F2|actualGasCost|UserOperation Event Log|818,160,397,184,746 (wei/Gas)|1,719,564,005,679,058 (wei/Gas)|
|G2|actualGasUsed|UserOperation Event Log|112,763 Gas Units|236,999 Gas Units|

#### Common Fields
----

||Parameter|Source|Value|
|-|-|-|-|
|H2|baseFeePerGas|custom|5,755,574,942 (wei/Gas)|

#### Bundle Level Fields
----

||Parameter|Source|Value|
|-|-|-|-|
|I2|gasLimit|TransactionInput|732,603 Gas Units|
|J2|maxPriorityFeePerGas|TransactionInput|100,000,000 (wei/Gas)|
|K2|gasUsed| TransactionReceipt|346,938 Gas Units|
|L2|effectiveGasPrice|TransactionReceipt|5,855,574,942 (wei/Gas)|

#### Fee & Markup Calculations
---
Let's see how the values discussed before change when there are multiple *UserOperations* in the *Bundle*:
1. **Gas Units Markup**: The *gas consumed by the UserOps* to calculate the markup is the sum of the two values (`G2_1 + G2_2 = 112,763 + 236,999 = 349,762 Gas Units`). The *gas consumed in the transaction* (`K2 = 346,938 Gas Units`). The gas Units Markup  is `349,762/346,938 = 1.008139782901` or ~`0.814%`. Less than a fifth of the previous bundle.
2. **Gas Price Paid by the Wallet Owner:** The wallet owners paid `F2_1/G2_1 = 818,160,397,184,746 / 112,763` and `F2_2/G2_2 = 1,719,564,005,679,058 / 236,999`. Here both result in `7,255,574,942 wei/Gas`, since the priority fee `E2_1` and `E2_2` is the same. In the future, a bundler could provide different values to different UserOps to be competitive. As previously, this value is equal to the sum of the *base fee for the block* (`H2`) and `priority fee to bundler` (`B2`).
3. **Effective Gas Price:** Similar to the *Gas price* by the wallet, the gas price for the *Bundle* is the sum of the *base fee for the block* (`H2`) and the *priority for the validator* (`J2`). Thus `L2 = H2 + J2`.
4. **Bundler Gas Fee Markup:** Now, since the *priority fee* for both the *UserOperations* is the same, the bundler charged a markup of `(H2+E2)/(H2+J2)` = `(5,755,574,942+1,500,000,000)/(5,855,574,942) = 1.2390883925` or a massive `23.908%` markup. If the priority fees for the UserOperations were different, then you would have to do a weighted average of the gas units consumed by each to get the effective gas markup, or calculate per UserOperation gas markup and do a weighted average in the overall markup calculation.
5. **Fee paid by Wallet Owner:** As shown in `F2_1` and `F2_2`, the wallet owners were charged a total of `0.000818160397184746 ETH` and `0.001719564005679058 ETH`, adding to `0.002537724402863804`, which is approximately `4.176 USD` as per the ETH price on that day.  
6. **Fee paid by Bundler:** The *total gas consumed* (`K2`) \* *price per gas* (`L2`) = `346,938 * 5,855,574,942 = 0.002031521459227596 ETH`, approximately `$3.34` as per the ETH price on that day.
7. **Bundler Markup:** This is the ratio of the last two values: `0.002537724402863804/0.002031521459227596 = 1.249174303` or ~**`24.917%`** profit.

Thus the bundler charged a markup of `0.814%` on the Gas units and ~`23.908%` on the gas price. The net profit was a sweet `24.917%`.

## What's Next
---
Check out a couple of *Bundles* and *UserOperations*, and their fees on [JiffyScan](https://app.jiffyscan.xyz/) to distill the information.

WANT TO help build or use a low-cost bundler for the wallet owner? [Get In Touch!](https://twitter.com/artsofbaniya)

Or just using or exploring Account Abstraction based blockchain usage? [Get In Touch!](https://twitter.com/artsofbaniya)

Note:
If you need real-time data on 4337, do check out our leading [API](https://jiffyscan.readme.io/reference/getting-started-1).

We will be releasing more deep dives, walkthroughs, and quickstart tutorials for 4337 regularly in the coming weeks. Follow me on [Twitter](https://twitter.com/artsofbaniya) or [JiffyScan](https://twitter.com/JiffyScan) to stay updated. 
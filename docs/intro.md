---
sidebar_position: 1
slug: /
---

# Introduction

Let's get a quick overview of **JiffyScan in 2 minutes**.

## Problem with existing block-explorers

**[EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)** introduced a new abstract kind of transaction called UserOp and several supporting entities which are non-native to the EVM chain itself. These abstract entites are implemented in the form of several off-chain infrastructure components and on-chain smart contracts.

The leading block-explorers, like [etherscan](https://etherscan.io/), show these transactions from the perspective of a node, fail to show the relevant detail for a user in this ecosystem in a clean manner. This is because a normal on-chain transaction now could contain multiple userOperations and it's relevant metadata, obscuring what's relevant to understand an independent UserOperation.

## How does JiffyScan Help

With **JiffyScan** you can easily understand the details relevant to a single UserOperation, Smart Contract Wallet or Account, Bundler, Paymaster, etc while the additional metadata needed to process it on-chain is abstracted away.

Thus these new entites are treated as first-class citizens while designing all the views and metrics.

## Where to go next

If you're not yet familiar with the purpose of EIP-4337 and at atleast a conceptual level, what the new entities and their roles are, we'll recommend continuing to the next section before moving forward.

Else you can skip the next section and directly start understanding how to use JiffyScan.

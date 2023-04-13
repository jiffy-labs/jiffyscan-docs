---
sidebar_position: 3
title: FAQs
---

### Is 4337 introducing native account abstraction?
No, 4337 is not introducing a protcol level change and thus not a way to enabel native abstraction on EVM chains.

### Are Eth nodes already supporting this?
Ethereum nodes such as erigon, geth, etc don't need any changes as 4337 is not introducing a change at the ethereum protocol level. These will continue working as is it.

### How does one trigger a 4337 transaction?
A bundler is used to package a userOperation with the required metadata, verify its correctness and trigger the entrypoint smart contract for processing.

### Are Eth nodes still used?
Yes, the eth nodes are still used. Bundlers simply package one or more userOps into a single blockchain transaction request and submit it to a node. Any change on-chain still requires going through the node and bundler merely sit between the node and the user.
---
title: Glossary
sidebar_position: 4
---

 - **User Operation (UserOp):** The new concept of transaction as per EIP-4337 standard and which gets processed by the entrypoint.
 - **Entrypoint:** A smart contract for validating User Operations and executing them, while being the trusted parties to coordinate fees across different components.
 - **Bundler:** A component used to accept the UserOperation, validate it and submit it on-chain, and paying the gas fee for the transaction while expecting to get reimbursed for it by the user or paymaster.
 - **Paymaster:** A component which can pay the gas fee on behalf of the user. It's not actually paying the gas fee, reimbursing the bundler. This could be done to not maintain multiple token/coin balances across different chains.
 - **Beneficiary:** While the bundler always pays the gas fee for the actual blockchain transaction, it can select the address where the reimbursment is trasffered to. This address could be the bundler's wallet address or another and is represented as the beneficiary address.
 - **Factory:** It is an account used for creating a new smart contract wallet account in the specific chain.
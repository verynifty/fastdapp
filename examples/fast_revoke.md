---
chain: [1,10,42161,137,5, 11155111, 43114]
authors: grands_marquis
theme: dark
title: Fast Revoke
description: Manage your ERC20 approvals with Fast Revoke
---

<div class="p-10">
  <center>
    <h1>⚡ Fast Revoke ⚡</h1>
    <p>
      When using dapps like Uniswap or OpenSea you have to grant them permission
      to spend your tokens and NFTs. This is called a token approval. If you
      don't revoke these approvals, the dapp can spend your tokens forever. Take
      back control by revoking your approvals.
    </p>
  </center>
  <div class="mt-10 alert">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-info shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>This app was built in less than 110 Lines of code</span>
    <div>
      <a href="https://docs.fastdapp.xyz/docs/tutorials/getting_started" class="btn btn-sm btn-primary">
        Learn how to build dapps
      </a>
    </div>
  </div>
  <PleaseConnect>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Spender</th>
            <th>Amount</th>
            <th>Revoke</th>
          </tr>
        </thead>
        <tbody>
          <Events
            address={null}
            abi={ABIs.ERC20}
            eventName="Approval"
            args={[userAddress]}
            render={function (logs) {
              approvals = [];
              logs.reverse().forEach(function (log) {
                if (
                  log.args.value != null &&
                  !approvals.find(
                    (aproval) =>
                      aproval.args.spender == log.args.spender &&
                      aproval.address == log.address
                  )
                ) {
                  approvals.push(log);
                }
              });
              return approvals
                .sort((a, b) => b.address - a.address)
                .filter((approval) => parseInt(approval.args.value) != 0)
                .map((approved) => (
                  <tr>
                    <td>
                      <TokenName token={approved.address} />
                    </td>
                    <td>
                      <AddressDisplay address={approved.args.spender} />
                    </td>
                    <td>
                      <TokenAmount
                        token={approved.address}
                        amount={approved.args.value}
                      />
                    </td>
                    <td>
                      <ContractWrite
                        address={approved.address}
                        abi={[
                          {
                            inputs: [
                              {
                                internalType: "address",
                                name: "spender",
                                type: "address",
                                hidden: true,
                              },
                              {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                                hidden: true,
                              },
                            ],
                            name: "approve",
                            outputs: [
                              {
                                internalType: "bool",
                                name: "",
                                type: "bool",
                              },
                            ],
                            stateMutability: "nonpayable",
                            type: "function",
                          },
                        ]}
                        functionName="approve"
                        buttonText="Revoke"
                        args={[approved.args.spender, 0]}
                      />
                    </td>
                  </tr>
                ));
            }}
          />
        </tbody>
      </table>
    </div>
  </PleaseConnect>
</div>

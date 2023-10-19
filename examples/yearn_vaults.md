---
chain: 1
authors: grands_marquis
theme: dark
---

<APICall
  url="/api/examples/yearn"
  renderFunction={(vaults) => (
    <div>
      <div className="overflow-x-auto no-prose">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>APY</th>
              <th>TVL</th>
              <th></th>
            </tr>
          </thead>
          {vaults.map((vault) => (
            <tr>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className=" w-12 h-12">
                      <img
                        className="m-0"
                        src={vault.token.icon}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{vault.name}</div>
                    <div className="text-sm opacity-50">{vault.symbol}</div>
                  </div>
                </div>
              </td>
              <td>{vault.apy.net_apy * 100}%</td>
              <td>
               {vault.tvl.tvl}
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )}
/>

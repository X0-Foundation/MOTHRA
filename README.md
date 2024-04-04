# XContracts
the older version allows numerical processing errors accumulated over time.
The TGR contract maintain an important watchdog,
which watches for the difference between the collective true net amount of TGR and the marginal sum of all users' net TGR balances.
'net' tokens here means the total bookkept amount of tokens minus the amount of tokens pending burn.
why burn is pending? because burning occurs over time but burning cannot be executed on time, to save gas!!!
on-time burning would require to scan all (millions of) users to burn from each of them every 12 hours.
So, a virtual collective burn is managed every 12 hours, and individual users' burn will only be executed when we need.
Hence, there are distinctive concepts: collective burn and individual burn. The former is virtual.
My watchdog monitors the difference between the collective net value and the individual net value. They must be the same.
In the older version, the difference (error_rate) was acceptable small but increasing over time. This was due to the inherent numerical error of computer.
The new version invented a new algorithm, which solves the error problem completely.
While the whole crypto industry adopts the Pancakeswap (after Uniswap v2)'s technique of managing accumulated amount, to me it turns out to be a linear model.
But your model is different: you want to burn some percent periodically, not an amount. This is a non-linear model.
A series of amounts can grow to any sum, but a series of a percent cannot grow to the given sum. You cannot burn more than actual amount after all.
I invented this algorithm in the new version: It can be business-licensed.

The new version now produce virtually no error.
The watchdog reports, after running dozens of transactions, only 0 trillion-ths of error_rate.
The absolute error is normally zero gway, some times one or two grway.
The new version is equipped with safety mechanism for numerical errors:
The whole system will stuck, freezing users' precious assets in the blockchain, if there is a negative amount, however small it is. Terrible.
I added safety mechanism that prevents a negative amount from happening, at the small expense of gas fee.
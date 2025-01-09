const binarySearch = function (arr, high, target) {
  let low = 0;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    // javascript won't carp if you do 
    // if (arr[mid] > target)
    if (arr[mid][1] > target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
};

var maxTaxiEarnings = function (n, rides) {
  rides.sort((a, b) => {
    a[1] - b[1];
  });

  const m = rides.length;
  const dp = new Array(m + 1).fill(0);
  for (let i = 0; i < m; ++i) {
    let j = binarySearch(rides, i, rides[i][0]);
    dp[i + 1] = Math.max(
      dp[i],
      dp[j] + rides[i][1] - rides[i][0] + rides[i][2]
    );
  }
  return dp[m];
};

/*
const binarySearch = function(arr, high, target) {
    let low = 0;
    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (arr[mid][1] > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}

var maxTaxiEarnings = function(n, rides) {
    rides.sort((a, b) => a[1] - b[1]);
    const m = rides.length;
    const dp = new Array(m + 1).fill(0);
    for (let i = 0; i < m; i++) {
        let j = binarySearch(rides, i, rides[i][0]);
        dp[i + 1] = Math.max(dp[i], dp[j] + rides[i][1] - rides[i][0] + rides[i][2]);
    }
    return dp[m];
};
*/

let ans = maxTaxiEarnings(20, [
  [1, 6, 1],
  [3, 10, 2],
  [10, 12, 3],
  [11, 12, 2],
  [12, 15, 2],
  [13, 18, 1],
]);
console.log("ans = " + ans);

type Tuple = [string, string];
type Triplet = [string, string, string];

// Time complexity is O(n)
const mostOccurringTriplets = (logFile: Tuple[], limit = 10): Triplet[] => {
  const pathsByUser = new Map<string, string[]>();
  const allTriplets = new Map<string, number>();

  logFile.forEach(([path, user]) => {
    if (!pathsByUser.has(user)) {
      pathsByUser.set(user, [path]);
      return;
    }

    const paths = pathsByUser.get(user);
    paths.push(path);

    // is there a triplet?
    if (paths.length === 3) {
      const triplet = paths.toString();
      allTriplets.set(
        triplet,
        allTriplets.has(triplet) ? allTriplets.get(triplet) + 1 : 1
      );
      // removing first path to expect next triplet
      paths.shift();
    }

    pathsByUser.set(user, paths);
  });

  const popularTriplets = new Map<Triplet, number>(
    [...allTriplets.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([paths, count]) => {
        return [paths.split(",") as Triplet, count];
      })
  );

  return [...popularTriplets.keys()];
};

const cases: Tuple[][] = [
  [
    ["/", "user_1"],
    ["/about", "user_1"],
    ["/", "user_3"],
    ["/features", "user_1"],
    ["/about", "user_2"],
    ["/purchase", "user_2"],
    ["/purchase", "user_1"],
    ["/thank-you", "user_1"],
    ["/about", "user_3"],
    ["/thank-you", "user_2"],
    ["/purchase", "user_3"],
    ["/thank-you", "user_3"],
  ],
];

cases.forEach((logFile) => {
  const result = mostOccurringTriplets(logFile);
  console.log(result);
});

function sorterByName() {
  People.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);

    if (nameComparison !== 0) {
      //meaning names arent same
      return nameComparison;
    }

    return b.age - a.age;
  });
}

function sortedByAge() {
  //agar age same hai to name pe sort
  People.sort((a, b) => {
    if (a.age - b.age !== 0) return a.age - b.age;

    return a.name.localeCompare(b.name);
  });
}

export { sortedByAge, sorterByName };

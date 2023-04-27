const dictionary = {
  animals: {
    easy: ["cat", "dog"],
    normal: ["elephant"],
    hard: ["pangolin"],
  },
};

export const generateDictionary = (difficulty, category) => {
  return dictionary[category][difficulty];
};

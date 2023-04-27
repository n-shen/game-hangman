import { generateDictionary } from "../data/dictionary.js";

export async function getDictionary(req, res) {
  const { difficulty, category } = req.body;

  try {
    if (!difficulty || !category)
      throw Error("Missing required header fields!");
    const dictionary = generateDictionary(difficulty, category);
    if (!dictionary) throw Error("No such dictionary available!");

    res.json({
      success: true,
      message: "Dictionary fetched successfully!",
      dictionary: dictionary,
      difficulty: difficulty,
      category: category,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

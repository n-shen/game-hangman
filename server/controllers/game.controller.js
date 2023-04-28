import { generateDictionary } from "../data/dictionary.js";
import { Customize } from "../models/customizeModel.js";
import { User } from "../models/userModel.js";

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

export async function getSharingDictionary(req, res) {
  const { sid } = req.body;

  try {
    if (!sid) throw Error("Missing required header fields!");
    const dictionary = await Customize.getSharing(sid);

    res.json({
      success: true,
      message: "Sharing dictionary fetched successfully!",
      dictionary: dictionary,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function getRank(req, res) {
  try {
    const ranking = await User.getRank();

    res.json({
      success: true,
      message: "Rank fetched successfully!",
      rank: ranking,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

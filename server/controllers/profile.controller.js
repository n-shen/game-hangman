import { User } from "../models/userModel.js";

export async function getProfile(req, res) {
  try {
    const { uid } = req.body;
    const profileCollections = await User.getProfile(uid);

    res.json({
      success: true,
      message: "Profile collections fetched!",
      profile: {
        score: profileCollections["score"],
        duration: profileCollections["duration"],
        rounds_easy: profileCollections["rounds_easy"],
        rounds_normal: profileCollections["rounds_normal"],
        rounds_hard: profileCollections["rounds_hard"],
      },
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function updateProfile(req, res) {
  const { uid, score } = req.body;

  try {
    const newProfile = await User.updateProfile(uid, score);

    res.json({
      success: true,
      message: "User profile updated!",
      profile: newProfile,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function destroyCtm(req, res) {
  try {
    const { cid, fk_user } = req.body;
    const ctm = await Customize.destroyCtm(cid, fk_user);

    res.json({
      success: true,
      message: "Customize destroyed!",
      ctm: ctm,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

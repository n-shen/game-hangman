import { Customize } from "../models/customizeModel.js";

export async function getCtm(req, res) {
  try {
    const { customizeUser } = req.body;
    const ctmCollections = await Customize.getCustomize(customizeUser);

    res.json({
      success: true,
      message: "Customize collections fetched!",
      ctms: ctmCollections,
      user: customizeUser,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function postCtm(req, res) {
  const { ctmTitle, ctmDescription, ctmWords, ctmUser } = req.body;

  try {
    const ctmProfile = await Customize.newCtm(
      ctmTitle,
      ctmDescription,
      ctmWords,
      ctmUser
    );

    res.json({
      success: true,
      message: "New Customize created!",
      cmt: ctmProfile,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function updateCtm(req, res) {
  const { ctmId, ctmTitle, ctmDescription, ctmWords, ctmUser } = req.body;

  try {
    const ctmProfile = await Customize.updateCtm(
      ctmId,
      ctmTitle,
      ctmDescription,
      ctmWords,
      ctmUser
    );

    res.json({
      success: true,
      message: "Customize updated!",
      ctm: ctmProfile,
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

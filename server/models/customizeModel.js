import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customizeSchema = new Schema(
  {
    title: {
      type: String,
      default: "No Title",
      required: true,
    },
    description: {
      type: String,
      default: "Host has not set a description yet.",
      required: false,
    },
    words: {
      type: [String],
      default: [],
      required: true,
    },
    fk_user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

customizeSchema.statics.getCustomize = async function (ctm_user) {
  if (!ctm_user) throw Error("Missing required fields!");

  return await this.find({ fk_user: ctm_user }).sort({
    createdAt: -1,
  });
};

customizeSchema.statics.newCtm = async function (
  ctm_title,
  ctm_description,
  ctm_words,
  ctm_user
) {
  if (!ctm_title || !ctm_words || !ctm_user)
    throw Error("Missing required fields!");

  return await this.create({
    title: ctm_title,
    description: ctm_description,
    words: ctm_words,
    fk_user: ctm_user,
  });
};

customizeSchema.statics.updateCtm = async function (
  ctm_id,
  ctm_title,
  ctm_description,
  ctm_words,
  ctm_user
) {
  if (!ctm_id || !ctm_title || !ctm_words || !ctm_user)
    throw Error("Missing required fields!");

  const updatedFrom = await this.findOneAndUpdate(
    { _id: ctm_id },
    {
      title: ctm_title,
      description: ctm_description,
      words: ctm_words,
      fk_user: ctm_user,
    },
    {
      new: true,
    }
  );

  if (!updatedFrom) throw Error("Not a valid customize update request!");
  return updatedFrom;
};

customizeSchema.statics.destroyCtm = async function (ctm_id, fk_user) {
  if (!ctm_id || !fk_user) throw Error("Missing required fields!");

  const del_ctm = await this.findOneAndDelete({ _id: ctm_id });
  if (!del_ctm) throw Error("Not a valid customize deletion request!");
  return del_ctm;
};

const Customize = mongoose.model("Customize", customizeSchema);

export { Customize };

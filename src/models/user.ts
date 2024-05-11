import mongoose, { models, Schema } from "mongoose";

import type { InferSchemaType, Model } from "mongoose";
import type { AdvertiserModel } from "@/models/advertiser";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    hire: {
      default: () => ({}),
      type: {
        advertisers: [
          {
            type: Schema.Types.ObjectId,
            ref: "Advertiser",
          },
        ],
      },
    },
  },
  { timestamps: true }
);

export type UserModel = InferSchemaType<typeof userSchema>;

const User =
  (models.User as Model<UserModel>) || mongoose.model("User", userSchema);
export default User;

export type UserModelWithAdvertisers = UserModel & {
  hire: {
    advertisers: AdvertiserModel[];
  };
};

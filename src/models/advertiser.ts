import mongoose, { models, Schema } from "mongoose";

import { advertiserConfig } from "@models/config/advertiser.config";

import type { InferSchemaType, Model } from "mongoose";

const advertiserSchema = new Schema(
  {
    details: {
      default: () => ({}),
      type: {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        website: { type: String, default: "" },
        location: { type: String, default: "" },
        industry: { type: String, default: "" },
        employees: { type: Number, default: 0 },
        importantInfo: { type: String, default: "" },
        contact: {
          default: () => ({}),
          type: {
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            other: [
              {
                label: {
                  type: String,
                  required: true,
                },
                value: {
                  type: String,
                  required: true,
                },
                link: { type: String, default: "" },
                icon: { type: String, default: "" },
              },
            ],
          },
        },
      },
    },
    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: Object.values(advertiserConfig.roles),
          default: advertiserConfig.defaultRole,
        },
      },
    ],
    jobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    functional: {
      default: () => ({}),
      type: {
        allowNewUsers: { type: Boolean, default: false },
        password: {
          type: String,
          default: "",
          required: function () {
            return !!(this as any).allowNewUsers;
          },
        },
      },
    },
    trace: {
      default: () => ({}),
      type: {
        memberCount: {
          type: Number,
          default: 1,
        },
        jobCount: {
          type: Number,
          default: 0,
        },
        applicationCount: {
          type: Number,
          default: 0,
        },
        rating: {
          default: () => ({}),
          type: {
            approvals: { type: Number, default: 0 },
            dissaprovals: { type: Number, default: 0 },
          },
        },
      },
    },
  },
  { timestamps: true }
);

export type AdvertiserModel = InferSchemaType<typeof advertiserSchema>;

const Advertiser =
  (models.Advertiser as Model<AdvertiserModel>) ||
  mongoose.model("Advertiser", advertiserSchema);
export default Advertiser;

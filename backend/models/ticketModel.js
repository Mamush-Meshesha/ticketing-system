import mongoose from "mongoose";

const ticketSchema = new  mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "in progress"], 
      required: true,
      default: "Open",
    },
    category: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "high", "critical"],
      default: 'low'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;

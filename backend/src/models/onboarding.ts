import mongoose from 'mongoose';
import { IOnboarding } from '@/interfaces/IOnboarding';
import e from 'express';
import { IPersonalityScore } from '@/interfaces/IPersonalityScore';

const Onboarding = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      index: true,
    },
    city: String,
    zipcode: Number,
    religion: String,
    religionOther: String,
    sexualOrientation: String,
    identifyYourself: String,
    ethnicity: String,
    gender: String,
    genderOther: String,
    pronouns: String,
    pronounsOther: String,
    spiritual: Boolean,
    sexAssignedAtBirth: String,
    mentalHealthCare: String,
    haveSoughtCare: String,
    concerns: {
      type: [String],
      default: undefined,
    },
    goals: {
      type: [String],
      default: undefined,
    },
    personalityTestScore: {
      type: Object,
      default: undefined,
      validate: [CheckFive, 'Five Numbers are required'],
    },
    personalityTestCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

// Check that the object has 5 numbers
function CheckFive(val: IPersonalityScore) {
  return !(
    val.Agreeableness == undefined ||
    val.Conscientiousness == undefined ||
    val.Extraversion == undefined ||
    val.Neuroticism == undefined ||
    val.Openness == undefined);
}
export default mongoose.model<IOnboarding & mongoose.Document>('Onboarding', Onboarding);

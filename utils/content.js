import { notification } from 'antd';
import { capitalizeFirstLetter } from './generateUtils';

export const WORD_LIMIT = 'Word Limit Reached'; //output generation word limit title when user or team members word limit exceed to currentPlanWordCount
export const UPGRADE_PLAN = 'Your do not have an active Subscription Plan'; //user Plan status title when team owner or user plan status is cancelled

export const UPGRADE_PLAN_DESCRIPTION = 'Please upgrade your plan'; //user Plan status Description when team owner or user plan status is cancelled
export const WORD_LIMIT_DESCRIPTION = 'You have reached your word limit'; // when user or team members word limit exceed to currentPlanWordCount

export const HOLD_TEAM_STATUS_DESCRIPTION =
  "You can't use CopyWriter because your Team Admin has made a change. The current plan doesn't allow for this many team members."; //team owner status hold when user team member limit and subscription team plan less or equall
export const HOLD_PLAN_TITLE = "Your Team's subscription status is on hold";
export const HOLD_TEAM_MEMBER_DESCRIPTION =
  "You can't use CopyWriter because your Team Admin no longer has a active subscription."; //team member status hold description when user team member limit and subscription team plan less or equall
export const COPIED_TO_CLIPBOARD = 'Copied to Clipboard';
export const FAVOURITE_TEXT = 'Favorite';
export const UN_FAVOURITE_TEXT = 'Removed from Favouites';
export const LIKE_TEXT = 'Like';
export const DISLIKE_TEXT = 'Dislike';

export const COPIED_TOOLTIP = 'Copy';
export const FAVOURITE_TOOLTIP = 'Favorite';
export const UN_FAVOURITE_TOOLTIP = 'Remove from Favorite';
export const LIKE_TOOLTIP = 'Like';
export const DISLIKE_TOOLTIP = 'Dislike';

export const SAVE_ANNUAL_BILLING = 'Save 30%';

export const TEAM_MEMBER_NO_ACCESS = ({ findOwner, page }) => {
  return `You can't access the ${page} Page as you are not the Admin of ${
    findOwner && capitalizeFirstLetter(findOwner.name)
  }'s team`;
};
// those page that team members not access

export const TEAM_ERROR_MESSAGE = ({ teamLength, planName }) => {
  return `Please reduce your team members. ${capitalizeFirstLetter(
    planName,
  )} Your plan allows for ${teamLength} team members.`;
}; // error message in team page when team length is exceed to paln team length

export const PLAN_LIMIT_DESCRIPTION = (limit) => {
  return `You have reached your plans limit of ${limit} words. Please upgrade in order to continue using CopyWriter`; // notifcation description when assign usage limit exceed
};

export const DELETED_ACCOUNT_TITLE = (displayName) => {
  return `Are you sure delete ${displayName} account?`; // notifcation description when assign usage limit exceed
};
export const DELETED_TEMPLATE_TITLE = (templateName) => {
  return `Are you sure delete ${templateName} tool ?`; // notifcation description when assign usage limit exceed
};
export const TEMPLATE_DELETE_DESCRIPTION = 'Template will be permanently delete'; // this comes in a confirmation popup when admin try to delete template.
export const TEMPLATE_DELETE_CONFIRMATION = 'Template deleted successfully';

export const ADD_TEAM_MEMBER_EXCEED = 'You have consumed the limit of adding new team members'; // when team owner try to add new members but limit is not allowing to do.

export const ACCOUNT_DELETE = 'Account will be permanently delete';

export const EMAIL_FOR_PASSWORD_RESET_TITLE = 'Email for resetting password has been sent to your email address';
export const EMAIL_FOR_PASSWORD_RESET_DESCRIPTION = 'Please check your email.';
export const EMAIL_FOR_PASSWORD_WRONG_EMAIL = (email) => {
  return `This ${email} is not registered in CopyWriter. Please provide correct email address.`;
};

export const NEW_TEMPLATE_ADDED = 'New Template Successfully Added';

export const USER_OUTPUT_DELETE = 'Output Deleted.'; // when user delete their output result.
export const USER_UPDATE_NAME = 'Your account detail successfully changed'; // when user successfully change their first and last name.
export const PASSWORD_UPDATED = 'Password successfully updated.'; // when user successfully change their password
export const EMAIL_UPDATED = 'Email successfully updated.'; // when user successfully change their email

export const TEAM_OWNER_USAGE_ASSIGN = 'Usage Assigned'; // when team-owner assign usage to team member

export const ADMIN_CHANGE_PLAN_DETAILS = 'Plan details successfully changed.'; // when admin successfully change plan details

export const TEAM_MEMBER_INVITATION_NOT_FOUND = 'No invitation found on this email'; // when team member enters a wrong email

export const NEW_PROJECT_LIMIT = 'Project limit fully consumed.'; // when user try to add new project but fully limit already achieved.

export const NEW_TEAM_MEMBER_ALREADY_ADDED = (teamMemberEmail) => `${teamMemberEmail} is already part of CopyWriter`; // when team-owner try to add team member who is already a part of team

export const PASSWORD_RESET_TITLE = 'Your password reset successfully';
export const PASSWORD_RESET_CODE_EXPIRE = 'OTP is expire';
export const WRONG_PASSWORD = 'Wrong Password';
export const USER_NOT_FOUND = 'user not found';

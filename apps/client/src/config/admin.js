/** Dashboard access is limited to these Supabase Auth users. */
export const ADMIN_EMAILS = [
  "erica@artfulaestheticmedicine.com",
  "nadine@nadineshill.com",
];

export function isAllowedAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function getPostLoginPath(email) {
  if (isAllowedAdminEmail(email)) return "/admin/overview";
  return "/account";
}

/**
 * Returns true when the user has a non-empty profile image URL.
 */
export function hasProfileImage(profileImage: string | null | undefined): boolean {
  return Boolean(profileImage && profileImage.trim() !== "")
}

/**
 * Returns the profile image URL, or empty string when missing.
 * Callers that need a visual fallback should use ProfileAvatar instead of a remote placeholder.
 */
export function getProfileImageUrl(
  profileImage: string | null | undefined,
  _userType?: "client" | "provider"
): string {
  if (!hasProfileImage(profileImage)) {
    return ""
  }

  return profileImage!.trim()
}

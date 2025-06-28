/**
 * Get the tag type based on the group of the workout.
 * @param {string} group - The group of the workout.
 * @returns {string} - The tag type for the specified group.
 */
export const getGroupTagType = (group: string): string => {
  const groupTypes: Record<string, string> = {
    "Free weights": "primary",
    Bodyweight: "success",
    Cardio: "warning",
    Strength: "danger",
    Flexibility: "info",
  };
  return groupTypes[group] || "default";
};

/**
 * Get the tag type based on the level of the workout.
 * @param {string} level - The level of the workout.
 * @returns {string} - The tag type for the specified level.
 */
export const getLevelTagType = (level: string): string => {
  const levelTypes: Record<string, string> = {
    beginner: "success",
    intermediate: "warning",
    advanced: "danger",
  };
  return levelTypes[level] || "default";
};
export const getPermissionName = (permission: string, entityName: string): string => {

  return `${permission} ${entityName}`;
};
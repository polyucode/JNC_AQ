export const ROLES = {
    admin: 1,
    client: 2,
    reporter: 3,
    inspector: 4,
    technic: 1004
  };
  
  export const SCOPES = {
    canCreate: "can-create",
    canEdit: "can-edit",
    canDelete: "can-delete",
    canView: "can-view"
  };
  
  export const PERMISSIONS = {
    [ROLES.technic]: [SCOPES.canView],
    [ROLES.inspector]: [SCOPES.canView],
    [ROLES.reporter]: [SCOPES.canView],
    [ROLES.client]: [SCOPES.canView, SCOPES.canEdit],
    [ROLES.admin]: [
      SCOPES.canView,
      SCOPES.canEdit,
      SCOPES.canCreate,
      SCOPES.canDelete
    ]
  };
  

export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    super(`Firestore Security Rules denied the ${context.operation} request at ${context.path}`);
    this.name = 'FirestorePermissionError';
    this.context = context;
  }
}

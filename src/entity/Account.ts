export interface Account {
    id?: number;
    user_id?: number;
    bank?: string;
    account_id?: string;
    iban?: string;
    balance?: number;
    description?: string;
    status?: string;
    access_token?: string;
    refresh_token?: string;
    code_verifier?: string;
    additional_data?: any;
    synced_at?: Date;
    transaction_see?: string;
    balance_see?: string;
    token_expires_at?: Date;
    currency?: string;
  }
import { FreeScoutAuthConfig } from './types';
import { ConversationService } from './services/conversation-service';
import { CustomerService } from './services/customer-service';
import { MailboxService } from './services/mailbox-service';
import { UserService } from './services/user-service';
import { WebhookService } from './services/webhook-service';
import { AuthService } from './services/auth-service';

export class FreeScoutClient {
  public conversations: ConversationService;
  public customers: CustomerService;
  public mailboxes: MailboxService;
  public users: UserService;
  public webhooks: WebhookService;
  public auth: AuthService;

  constructor(config: FreeScoutAuthConfig) {
    this.conversations = new ConversationService(config);
    this.customers = new CustomerService(config);
    this.mailboxes = new MailboxService(config);
    this.users = new UserService(config);
    this.webhooks = new WebhookService(config);
    this.auth = new AuthService(config);
  }
}

// Create a singleton instance
let instance: FreeScoutClient | null = null;

export const createFreeScoutClient = (config: FreeScoutAuthConfig): FreeScoutClient => {
  if (!instance) {
    instance = new FreeScoutClient(config);
  }
  return instance;
};

export const getFreeScoutClient = (): FreeScoutClient => {
  if (!instance) {
    throw new Error('FreeScout client not initialized. Call createFreeScoutClient first.');
  }
  return instance;
}; 
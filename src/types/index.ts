
// Channel Interface
export interface Channel {
    main_category: string;
    sub_category: string;
    real_time_alert_keywords: string[];
    report_alert_keywords: string[];
    recipients: string[];
    quote_context: number;
    tags: string[];
}

// User Interface
export interface User {
    id?: string;
    name: string;
    email: string;
    subscription_type: string;
    channels: Channel[];
}

// Keyword Interface
export interface Keyword {
    user_ids: string[];
    tags: string[];
}

// Category Interface
export interface Category {
    id: string;
    name: string;
    parent: string;
    streaming_sources: string[];
    tags: string[];
}


//Repositories
export interface IUserRepository {
    createUser(user: ICreateUserRequestData): Promise<void>;
    getUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<any | undefined>;
    addChannel(userId: string, channel: IAddChannelRequestData): void;
    getChannels(userId: string): Promise<Channel[]>;
    addRealTimeAlertKeyword(userId: string, channelId: string, keyword: string): void;
    addReportAlertKeyword(userId: string, channelId: string, keyword: string): void
}

// Request Data
export interface ICreateUserRequestData {
    id: string;
    name: string;
    email: string;
}

export interface IAddChannelRequestData {
    main_category: string;
    sub_category: string;
    real_time_alert_keywords: string[],
    report_alert_keywords: string[],
    recipients: string[],
    quote_context: number,
    tags: string[]
}
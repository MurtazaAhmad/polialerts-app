// Channel Interface
export interface Channel {
    ChannelId: string;
    real_time_alert_keywords: string[];
    report_alert_keywords: string[];
    recipient: string[];
    quote_context: number;
    tags: string[];
}

// User Interface
export interface User {
    id?: string;
    name: string;
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
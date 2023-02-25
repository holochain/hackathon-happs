import { 
  Record, 
  ActionHash, 
  SignedActionHashed,
  DnaHash,
  EntryHash, 
  AgentPubKey,
  Create,
  Update,
  Delete,
  CreateLink,
  DeleteLink
} from '@holochain/client';

export type QuestionsSignal = {
  type: 'EntryCreated';
  action: SignedActionHashed<Create>;
  app_entry: EntryTypes;
} | {
  type: 'EntryUpdated';
  action: SignedActionHashed<Update>;
  app_entry: EntryTypes;
  original_app_entry: EntryTypes;
} | {
  type: 'EntryDeleted';
  action: SignedActionHashed<Delete>;
  original_app_entry: EntryTypes;
} | {
  type: 'LinkCreated';
  action: SignedActionHashed<CreateLink>;
  link_type: string;
} | {
  type: 'LinkDeleted';
  action: SignedActionHashed<DeleteLink>;
  link_type: string;
};

export type EntryTypes =
 | ({  type: 'Submission'; } & Submission);


export interface Satisfaction {
  type:  
    | 'Disappointed'
        | 'Reasonable'
        | 'Neutral'
        | 'Positive'
        | 'Awesome'
    ;
}

export interface Submission { 
  date_attended: number;

  inspiration: string;

  ease_of_start: number;

  coding_experience: number;

  surprise: string;

  frustration: string;

  next_steps: string;

  satisfaction: Satisfaction;
}


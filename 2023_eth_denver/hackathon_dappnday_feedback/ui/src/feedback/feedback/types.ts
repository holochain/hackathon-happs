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

export type FeedbackSignal = {
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


export interface Date {
  type:  
    | 'Saturday'
        | 'Monday'
        | 'Wednesday'
    ;
}
export interface Os {
  type:  
    | 'Linux'
        | 'MacOsIntel'
        | 'MacOsM1'
        | 'Windows'
    ;
}
export interface DevExperience {
  type:  
    | 'One'
        | 'Two'
        | 'Three'
        | 'Four'
        | 'Five'
    ;
}
export interface Difficulty {
  type:  
    | 'One'
        | 'Two'
        | 'Three'
        | 'Four'
        | 'Five'
    ;
}
export interface StarRating {
  type:  
    | 'One'
        | 'Two'
        | 'Three'
        | 'Four'
        | 'Five'
    ;
}

export interface Submission { 
  date: Date;

  os: Os;

  experience: string;

  inspiration: string;

  dev_experience: DevExperience;

  difficulty: Difficulty;

  surprising: string;

  frustrating: string;

  star_rating: StarRating;
}


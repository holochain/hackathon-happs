import { CallableCell } from '@holochain/tryorama';
import { NewEntryAction, ActionHash, Record, AppBundleSource, fakeActionHash, fakeAgentPubKey, fakeEntryHash, fakeDnaHash } from '@holochain/client';



export async function sampleSubmission(cell: CallableCell, partialSubmission = {}) {
    return {
        ...{
	  date_attended: 1674053334548000,
	  inspiration: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  ease_of_start: 10,
	  coding_experience: 10,
	  surprise: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  frustration: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  next_steps: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  satisfaction: { type: 'Disappointed' },
        },
        ...partialSubmission
    };
}

export async function createSubmission(cell: CallableCell, submission = undefined): Promise<Record> {
    return cell.callZome({
      zome_name: "questions",
      fn_name: "create_submission",
      payload: submission || await sampleSubmission(cell),
    });
}


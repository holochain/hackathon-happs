import { CallableCell } from '@holochain/tryorama';
import { NewEntryAction, ActionHash, Record, AppBundleSource, fakeActionHash, fakeAgentPubKey, fakeEntryHash, fakeDnaHash } from '@holochain/client';



export async function sampleSubmission(cell: CallableCell, partialSubmission = {}) {
    return {
        ...{
	  date: { type: 'Saturday' },
	  os: { type: 'Linux' },
	  experience: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  inspiration: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  dev_experience: { type: 'One' },
	  difficulty: { type: 'One' },
	  surprising: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  frustrating: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	  star_rating: { type: 'One' },
        },
        ...partialSubmission
    };
}

export async function createSubmission(cell: CallableCell, submission = undefined): Promise<Record> {
    return cell.callZome({
      zome_name: "feedback",
      fn_name: "create_submission",
      payload: submission || await sampleSubmission(cell),
    });
}


use hdk::prelude::*;
use questions_integrity::*;
#[hdk_extern]
pub fn create_submission(submission: Submission) -> ExternResult<Record> {
    let submission_hash = create_entry(&EntryTypes::Submission(submission.clone()))?;
    let record = get(submission_hash.clone(), GetOptions::default())?
        .ok_or(
            wasm_error!(
                WasmErrorInner::Guest(String::from("Could not find the newly created Submission"))
            ),
        )?;
    let path = Path::from("all_submissions");
    create_link(
        path.path_entry_hash()?,
        submission_hash.clone(),
        LinkTypes::AllSubmissions,
        (),
    )?;
    Ok(record)
}
#[hdk_extern]
pub fn get_submission(submission_hash: ActionHash) -> ExternResult<Option<Record>> {
    get(submission_hash, GetOptions::default())
}

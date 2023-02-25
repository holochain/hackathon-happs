use hdi::prelude::*;
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(tag = "type")]
pub enum Satisfaction {
    Disappointed,
    Reasonable,
    Neutral,
    Positive,
    Awesome,
}
#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Submission {
    pub date_attended: Timestamp,
    pub inspiration: String,
    pub ease_of_start: u32,
    pub coding_experience: u32,
    pub surprise: String,
    pub frustration: String,
    pub next_steps: String,
    pub satisfaction: Satisfaction,
}
pub fn validate_create_submission(
    _action: EntryCreationAction,
    _submission: Submission,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_update_submission(
    _action: Update,
    _submission: Submission,
    _original_action: EntryCreationAction,
    _original_submission: Submission,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from("Submissions cannot be updated")))
}
pub fn validate_delete_submission(
    _action: Delete,
    _original_action: EntryCreationAction,
    _original_submission: Submission,
) -> ExternResult<ValidateCallbackResult> {
    Ok(ValidateCallbackResult::Invalid(String::from("Submissions cannot be deleted")))
}
pub fn validate_create_link_all_submissions(
    _action: CreateLink,
    _base_address: AnyLinkableHash,
    target_address: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    // Check the entry type for the given action hash
    let action_hash = ActionHash::from(target_address);
    let record = must_get_valid_record(action_hash)?;
    let _submission: crate::Submission = record
        .entry()
        .to_app_option()
        .map_err(|e| wasm_error!(e))?
        .ok_or(
            wasm_error!(
                WasmErrorInner::Guest(String::from("Linked action must reference an entry"))
            ),
        )?;
    // TODO: add the appropriate validation rules
    Ok(ValidateCallbackResult::Valid)
}
pub fn validate_delete_link_all_submissions(
    _action: DeleteLink,
    _original_action: CreateLink,
    _base: AnyLinkableHash,
    _target: AnyLinkableHash,
    _tag: LinkTag,
) -> ExternResult<ValidateCallbackResult> {
    Ok(
        ValidateCallbackResult::Invalid(
            String::from("AllSubmissions links cannot be deleted"),
        ),
    )
}

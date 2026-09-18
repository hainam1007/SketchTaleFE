# Content Manager contract v0.1

This is the frontend-owned contract used by the editor, mock adapter and preview spike. The backend adapter may translate endpoint names or response envelopes, but IDs and relationships remain stable.

## Ownership and permissions

Only `content_manager` is granted authoring permissions in the frontend matrix. The backend remains authoritative for ownership and authorization. Parent and admin are not assumed to inherit story authoring access.

| Permission | Scope |
| --- | --- |
| read | story list/detail, assets, preview |
| edit | story metadata, pages, roles, slots, vocabulary, quizzes |
| publish | validate and publish a draft version |
| hide | remove a published story from the catalog |
| upload | create an asset upload |
| statistics | content statistics |

## Stable relationships

- A page is referenced by `pageId`; reorder must not change page IDs.
- A slot belongs to a role and references a page by `pageId`.
- Vocabulary and quiz entries reference a page by `pageId`.
- A published version keeps an immutable `snapshot`; editing the draft does not mutate older versions.
- `draftDirty` means saved draft content differs from the latest published version. It is not the same as unsaved form state.

## Save and revision

- Every authoring mutation sends the current story `revision` as an expected revision.
- The server increments the revision atomically after a successful mutation and returns the updated story.
- A stale expected revision returns `409 REVISION_CONFLICT`; the editor keeps the current input and asks the user to reload before retrying.
- Publish, validate and hide are coordinated with the same story mutation scope. Publish is disabled while the metadata form has unsaved changes.

## Fixture

`story-contract-multi-role` contains three pages, two roles, layered slots on multiple pages, vocabulary and a quiz. It is available in mock mode at `/content/stories/story-contract-multi-role/preview` and is used to verify that preview renders every role on the current page.

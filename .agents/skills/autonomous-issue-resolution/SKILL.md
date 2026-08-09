---
name: autonomous-issue-resolution
description: An end-to-end orchestration skill that enables an agent to parse vague requirements or GitHub issues, translate them into structured formats, create comprehensive test plans, implement changes, and autonomously raise and merge Pull Requests.
---

# Autonomous Issue Resolution Workflow

You are an autonomous AI software engineer acting as a full-stack engineering team. Your goal is to take a raw requirement, user intent, or GitHub issue, and drive it entirely to a successfully merged Pull Request.

Follow these phases strictly. Do not skip steps.

## Phase 1: Intent Parsing & Requirement Translation
Before writing any code or architecture plans, you must understand what the user actually wants.
1. **Intake:** Read the raw user request or fetch the GitHub issue using `gh issue view <issue-number>`.
2. **Clarification (Optional):** If the intent is vague, invoke the `interview-me` skill to ask clarifying questions.
3. **Structured Translation:** Translate the parsed intent into a **Structured Requirements Document**. This document should explicitly contain:
   - **Core User Intent:** (What the user actually wants, stripping away assumptions).
   - **Functional Requirements:** (Clear, testable capabilities).
   - **Non-Functional Requirements:** (Performance, security, UX constraints).
   - **Acceptance Criteria:** (The definition of done).
   Save this as an artifact (e.g., `requirements_spec.md`).

## Phase 2: Architectural Planning & Test Strategy
Do not write implementation code yet.
1. **Research:** Invoke the `research` subagent to analyze the codebase and identify all impacted files and dependencies.
2. **Architecture Plan:** Draft a technical implementation plan detailing file changes, new modules, and API signatures.
3. **Comprehensive Test Plan:** Invoke the `test-engineer` subagent. Have it review the structured requirements and write a comprehensive test strategy encompassing Unit, Integration, and Edge cases.
   Save the combined plan and test strategy as an artifact (e.g., `implementation_plan.md`).

## Phase 3: Implementation & Validation
1. **Branching:** Ensure you are on a fresh, isolated branch using `git checkout -b <branch-name>`.
2. **Test-Driven Development:** Write the tests outlined in the Test Plan first. Run them to ensure they fail.
3. **Incremental Coding:** Implement the application logic step-by-step to make the tests pass.
4. **Validation:** Run the project's build and test suites to verify that your new tests pass and no existing tests regress.

## Phase 4: Autonomous Review & Merge
1. **Commit & Push:** Commit your changes with descriptive messages and push to the remote repository.
2. **Pull Request:** Raise a Pull Request using the GitHub CLI: `gh pr create --title "..." --body "..."`. Ensure the PR body links to the original issue or requirements spec.
3. **Peer Review:** Invoke the `code-reviewer` and/or `security-auditor` subagents. Provide them with the PR diff (e.g., via `gh pr diff`).
4. **Refinement:** Address any feedback from the subagents by pushing new commits.
5. **Merge:** Once all tests and reviews pass, merge the Pull Request automatically using `gh pr merge --auto --squash --delete-branch`. Clean up your local branch.

## Rules of Engagement
- **Never guess user intent;** always parse and translate it into the structured format first.
- **Test First:** Always ensure the comprehensive test plan is created before coding.
- **Autonomy:** Proceed through the phases autonomously, but keep the user informed of your progress at phase transitions. Ask for explicit approval before the final merge if the project requires a human-in-the-loop.

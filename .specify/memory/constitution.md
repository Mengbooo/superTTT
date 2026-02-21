<!--
SYNC IMPACT REPORT
==================
Version change: [UNVERSIONED] → 1.0.0 (MAJOR - Initial constitution)

Modified Principles:
- All principles: Created from template placeholders (no prior version)

Added Sections:
- Core Principles (5 principles defined)
- Development Workflow
- Quality Gates
- Governance

Removed Sections: None

Templates Status:
✅ .specify/templates/plan-template.md - Constitution Check section aligns
✅ .specify/templates/spec-template.md - User story independence matches Principle III
✅ .specify/templates/tasks-template.md - MVP/parallel execution matches principles
✅ .specify/templates/checklist-template.md - No conflicts

Follow-up TODOs: None
-->

# SuperTTT Constitution

## Core Principles

### I. Spec-Driven Development

All features MUST originate from a formal specification document before any
implementation begins. Specifications define user stories, requirements, and
success criteria in technology-agnostic terms. Implementation without an
approved spec violates this principle.

**Rationale**: Ensures clarity of purpose, enables parallel team execution, and
provides traceability from requirement to implementation.

### II. User Story Independence (MVP-First)

Every user story MUST be independently implementable, testable, and deliverable
as a Minimum Viable Product. Stories are prioritized (P1, P2, P3...) where P1
delivers standalone value. No story should depend on another's completion for
core functionality.

**Rationale**: Enables incremental delivery, early validation, and flexible
scope adjustment without breaking previous work.

### III. Test-First Implementation

Tests MUST be written before implementation code for all user stories (when
tests are requested in the feature spec). The Red-Green-Refactor cycle is
mandatory: write test → verify failure → implement → verify pass → refactor.
This applies to contract tests, integration tests, and unit tests.

**Rationale**: Guarantees testability by design, prevents over-engineering, and
ensures every feature has verifiable acceptance criteria.

### IV. Parallel Execution Design

Tasks that operate on different files with no dependencies MUST be marked with
[P] to enable parallel execution. Project structure and task breakdown MUST
maximize opportunities for concurrent work streams without creating merge
conflicts or coordination bottlenecks.

**Rationale**: Optimizes team throughput, reduces idle time, and accelerates
delivery through true parallel development.

### V. Documentation Co-Location

All features MUST include co-located documentation: specs in `.specify/specs/`,
plans in feature branches, contracts in `contracts/`, and quickstart guides.
Documentation lives alongside code it describes, not in separate wikis or
external systems.

**Rationale**: Ensures documentation stays current, provides immediate context
for contributors, and creates a self-documenting codebase.

## Development Workflow

All development follows the speckit command workflow:

1. **Clarify** (`/speckit.clarify`) - Gather requirements and resolve ambiguity
2. **Specify** (`/speckit.specify`) - Create formal spec with user stories
3. **Plan** (`/speckit.plan`) - Research, design, and create implementation plan
4. **Task** (`/speckit.tasks`) - Generate granular task list per user story
5. **Implement** (`/speckit.implement`) - Execute tasks with test-first approach
6. **Checklist** (`/speckit.checklist`) - Validate completeness and compliance

Deviations from this workflow require explicit justification in the feature
branch documentation.

## Quality Gates

Every feature MUST pass these gates before merging:

- **Gate 0**: Constitution Check - Plan validates against all 5 principles
- **Gate 1**: Spec Approval - User stories reviewed and prioritized
- **Gate 2**: Contract Tests - All endpoint contracts verified
- **Gate 3**: Integration Tests - User journeys end-to-end validated
- **Gate 4**: Quickstart Validation - Feature documented and reproducible

Complexity violations (e.g., exceeding project count limits, unnecessary
patterns) MUST include a Complexity Tracking table justifying why simpler
alternatives were rejected.

## Governance

This constitution supersedes all other development practices and guidelines.
Amendments require:

1. Proposal documenting the change rationale
2. Impact analysis on existing features and workflows
3. Migration plan for affected components
4. Version bump following semantic versioning

**Versioning Policy**:
- MAJOR: Backward-incompatible principle removals or redefinitions
- MINOR: New principles added or existing guidance materially expanded
- PATCH: Clarifications, typo fixes, non-semantic refinements

**Compliance Review**: All PRs MUST verify constitution compliance. Reviewers
MUST reject changes that violate principles without proper justification or
complexity tracking.

**Guidance Files**: Runtime development guidance is maintained in
`.qoder/commands/` for speckit agents and `.specify/templates/` for templates.

**Version**: 1.0.0 | **Ratified**: 2026-02-21 | **Last Amended**: 2026-02-21

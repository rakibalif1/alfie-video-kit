---
name: team
description: Run a multi-step job with a cheap agent team. Opus plans and checks; four Sonnet and Haiku workers always work from a shared task queue, so nobody sits idle.
---
# Team playbook (you are the Opus manager). Rule one: four workers are always busy.
Workers (agent types): researcher, scriptwriter, coder, scene-builder (Sonnet); checker, helper (Haiku).

1. Plan first. Split the job into small independent tasks. Ask the user if anything is unclear. Never guess.
2. Build a work queue, do not hand each worker a fixed job. Create a job folder (for example /home/user/<job>/) with `shared/brief.md` (goal, inputs, environment facts, output rules, time box), `shared/protocol.md` (copy `protocol.md` from this skill folder), `tasks/<priority>_<name>.md` (one file per task, sorted by priority), and an empty `claims/` folder. Pre-claim each worker's first task with `mkdir claims/<task>`.
3. Launch exactly 4 workers at once (run_in_background), each with a short prompt: read brief.md and protocol.md, your first task is X. Pick the cheapest agent type that can do the task (Haiku for checks and mechanical work, Sonnet for building and writing).
4. No idle rule: when a worker finishes, it claims the next free task itself (atomic `mkdir` claim). When a worker's notification arrives and the queue still has work, make sure 4 are running; start a new worker if one ended. When the queue is empty, free workers help: QA of other workers' results, reading their logs and writing `HELP_FROM_<name>.md`, splitting a long render into frame ranges, drafting titles and descriptions. Help must be real work, never busywork. If nothing real is left, finish the job rather than burn tokens.
5. You, the manager, are never idle either: while workers run, prepare the next tasks, review finished reports, and update the user.
6. All workers share the same 4 CPU cores. Each worker runs at most one heavy render at a time; stagger long renders; run anything over 60 seconds in the background and poll.
7. Briefs must be self-contained (workers do not see the chat). Workers write results to files and reply in 3 lines; read reports, open files only when needed.
8. Run a checker on every deliverable (ffprobe, frame sheets, audio level). Fix failures by re-briefing, not by redoing everything yourself.
9. Be honest in the final report: what was made, file paths, what is unverified. Remember nobody can watch or listen to video, only inspect frames and files.
10. Ask the user before: more than 4 workers at once, downloads over 2 GB, anything paid or needing a key.

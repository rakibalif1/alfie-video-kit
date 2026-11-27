# Team protocol: nobody is idle (work queue)
1. Read /home/user/compare/shared/brief.md, then do the task you were given.
2. When you finish, IMMEDIATELY claim the next free task. Claiming is atomic: for each file in /home/user/compare/tasks/ (sorted), run `mkdir /home/user/compare/claims/<task name without .md>`; if mkdir succeeds the task is yours, if it fails someone else has it, try the next one. Read the task file and do it. Repeat until no free task is left.
3. Waiting is not allowed. If your claimed task depends on others (for example comparing results), start with everything that does not depend on them, then poll every 2 minutes with a short sleep loop for the rest. If you are blocked for more than 10 minutes, write down why and take another free task.
4. When there is no free task left, help: look at the other worker folders in /home/user/compare/. If a worker has no REPORT.md yet and has logs, read its log and offer concrete help by writing /home/user/compare/<their folder>/HELP_FROM_<you>.md (what you found, a fix). Do not edit their files. Then end.
5. Everything honest: say what you could not check. You cannot watch or listen to video, only inspect frames and files.

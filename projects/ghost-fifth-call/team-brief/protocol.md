# Team protocol: nobody is idle (work queue)
1. Read /home/user/ghost/shared/brief.md, then do the task you were given first.
2. When you finish, IMMEDIATELY claim the next free task. Claiming is atomic: for each file in /home/user/ghost/tasks/ (sorted), run `mkdir /home/user/ghost/claims/<task name without .md>`; if mkdir succeeds the task is yours; if it fails someone else has it, try the next. Read the task file and do it. Repeat until none is free.
3. If you finish all tasks: look at the scene files other workers wrote (src/s_*.js) and their snapshots in /tmp/snaps_*; write concrete, polite improvement notes into /home/user/ghost/notes/<scene>_from_<you>.md (do not edit their files). Then end.
4. Be honest about what you could not check (you cannot hear or watch video).

import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const LOGO = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQwIDY0MCIgd2lkdGg9IjY1IiBoZWlnaHQ9IjY1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw2NDAuMDAwMDAwKSBzY2FsZSgwLjEwMDAwMCwtMC4xMDAwMDApIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJub25lIj4gPHBhdGggZD0iTTI5NjcgNTk1MCBjLTI3IC0xMCAtNzUgLTQ0IC0xMTMgLTc5IC0zNSAtMzQgLTcyIC02MSAtODIgLTYyIC05IC0xIC00NSAtMiAtNzkgLTMgLTY1IC0yIC05MyAtMTYgLTE5NiAtOTggLTI3IC0yMSAtNTUgLTM4IC02MiAtMzggLTcgMCAtMzUgMjAgLTYzIDQ1IC04MCA3MiAtMTI1IDc4IC0xNjggMjIgLTE0IC0xNyAtMzQgLTI2IC02OCAtMzAgLTI3IC00IC02OCAtMTggLTkxIC0zMSAtNTAgLTMwIC0xMzMgLTExNyAtMTQ2IC0xNTQgLTYgLTE4IC0yOCAtMzcgLTY3IC01OCAtNjMgLTM0IC05OSAtNzcgLTEwNyAtMTMzIC00IC0yMCAtOCAtNDcgLTExIC02MSAtOCAtMzggLTEwMyAtMTIyIC0xODcgLTE2NCAtNzEgLTM2IC04MCAtMzggLTEzNSAtMzIgLTQ3IDUgLTcxIDIgLTExNCAtMTQgLTcxIC0yNiAtMTY2IC0xMDQgLTE5NSAtMTU5IC0zMyAtNjMgLTQyIC03MSAtNzcgLTcxIC00NCAwIC03NyAtMjAgLTk5IC01OCAtMzQgLTU4IC0zOSAtMTAwIC0yMCAtMTc1IGwxNyAtNjcgLTMwIC0zMyBjLTY5IC03NCAtMTUyIC0yMDMgLTE3NCAtMjY5IC0xMCAtMzIgLTkgLTQzIDQgLTY5IDkgLTE4IDE2IC0zNyAxNiAtNDMgMCAtNiAtMjIgLTM4IC00OCAtNzEgLTkxIC0xMTIgLTk5IC0xNDUgLTUyIC0yMTUgMTYgLTI1IDMwIC01NSAzMCAtNjcgMCAtMTIgLTE4IC01NiAtNDEgLTk5IC01NCAtMTAxIC01MCAtMTE4IDQwIC0yMDQgNzAgLTY1IDcyIC02OSA5NiAtMTc0IDEwIC00NSA1OSAtODQgMTM2IC0xMDcgbDY5IC0yMSAzMDIgNTEgYzQ0MCA3MyA1NjMgODMgNzYzIDYxIDIxNCAtMjQgNDU0IC0xMTkgNjgxIC0yNjcgMjEyIC0xNDAgNDgzIC00MTMgNTYwIC01NjUgNDIgLTgzIDgxIC00MDEgNjkgLTU2MyAtOSAtMTIxIC0yNCAtMzEyIC00MCAtNDkwIC04IC04OCAtMjAgLTIyMCAtMjUgLTI5MyAtMjEgLTI2MSAtNTEgLTM4OCAtMTU2IC02NDQgLTI1IC02MCAtNDQgLTExOSAtNDIgLTEzMCA0IC0yOCA0OSAtNjEgNzEgLTUyIDYzIDI0IDExNCAyNjQgMTY3IDc4NCA2IDU4IDIwIDE2NyAzMSAyNDQgMzggMjY2IDY5IDU2MyA3OSA3NjYgMTUgMjk5IDIzIDM1MiA2NSA0MzUgMTIyIDI0MSA0MTQgNDkzIDgyMCA3MDYgMjg2IDE1MCA0OTQgMTk3IDk3MCAyMTkgMzAyIDE0IDM2MyAyNiA0OTMgOTEgNTYgMjkgMTA4IDU5IDExNCA2NiA2IDggMTcgNTYgMjMgMTA3IDkgNzEgMjEgMTE0IDUwIDE3NSA0NyAxMDAgNDggMTI3IDUgMTgxIC0yOSAzNyAtMzIgNDYgLTI2IDg2IDQgMzIgMCA1OCAtMTUgOTcgLTIwIDQ5IC0yMCA1OCAtOSAxNDggMTUgMTE0IDEwIDE0MiAtMzQgMTg0IC0xOCAxNyAtNDUgNDkgLTU4IDcxIC0zNyA1OCAtNTcgNzIgLTEyOCA5MCAtMzYgOSAtNzYgMjMgLTg4IDMxIC0zNSAyMiAtNTIgNzMgLTUyIDE1OCAwIDE0MSAtNDcgMjA0IC0xNzcgMjM1IC00NCAxMCAtNTkgMjAgLTk3IDY0IC0zMSAzNyAtNTcgNTYgLTg1IDY0IC0yOSA5IC01NSAyOSAtOTIgNzMgLTU5IDY3IC04MyA3OCAtMTI5IDU0IGwtMzEgLTE2IC00MCA0NSBjLTU4IDY1IC0xMjcgOTAgLTIzOSA4MyAtNTMgLTIgLTk4IC0xMSAtMTE5IC0yMSAtMTggLTEwIC0zNCAtMTYgLTM1IC0xNCAtMSAyIC0xMiAxOSAtMjQgMzkgLTI5IDQ3IC02NiA2MiAtMTM0IDU1IC01NyAtNyAtNjkgLTMgLTg2IDMxIC0xMyAyNCAtMTAyIDg4IC0xMDIgNzMgMCAtNSAxNiAtMjAgMzYgLTM0IDIwIC0xMyA0NyAtNDAgNjAgLTYwIDI0IC0zNSAyNyAtMzYgODUgLTM2IDU2IDAgNjQgLTMgOTUgLTM0IDE5IC0xOSAzNCAtNDEgMzQgLTQ5IDAgLTI2IDM1IC0yOSA3NSAtNiAyNCAxNCA1OSAyMyAxMDMgMjYgODggNiAxNjcgLTIyIDIzNSAtODUgNDcgLTQ0IDQ5IC00NSA4NiAtMzYgNTAgMTMgNjQgNyAxMDAgLTQzIDIwIC0yOCA1MSAtNTMgOTAgLTcyIDM2IC0xOSA3NCAtNDggOTYgLTc2IDMyIC0zOCA0OCAtNDggMTA2IC02NSAxMTcgLTM1IDE0NyAtNzggMTY0IC0yMzUgNCAtMzMgMTMgLTc1IDIxIC05NCA4IC0xOCAxMSAtMzggNyAtNDQgLTMgLTYgLTEgLTcgNSAtMyA2IDQgMjIgMCAzNCAtNyAxMyAtOCA0MSAtMTggNjMgLTIyIDYyIC0xMSA5NSAtMzMgMTE1IC03NyAxMCAtMjIgMzkgLTYwIDY1IC04MyBsNDcgLTQ0IC03IC04MiBjLTMgLTQ2IC05IC04NyAtMTEgLTkxIC04IC0xMiAxNyAtMTI4IDI3IC0xMjggNSAwIDkgLTI4IDkgLTYzIDAgLTYyIDE1IC0xMDEgNDcgLTEyMCA3IC00IDEzIC0xNyAxMyAtMjkgMCAtMjIgLTU4IC0xMzggLTcwIC0xMzggLTQgMCAtNyAtNiAtOCAtMTIgLTEgLTcgLTcgLTQ4IC0xMyAtOTAgLTExIC02NSAtMTYgLTc4IC0zMyAtODEgLTE5IC00IC0xOSAtNCAyIC02IDI1IC0xIDMwIC0yOCAxMCAtNTMgLTcgLTggLTU2IC0zNCAtMTA5IC01NyAtMTIwIC01MSAtMjEyIC02NiAtNTE5IC04MSAtMzM4IC0xNiAtNDYzIC0zNCAtNjMzIC05MiAtMTk5IC02NiAtNDEyIC0xNzUgLTY0MiAtMzI2IC0xMDMgLTY4IC0xNjEgLTExNyAtMjc4IC0yMzIgLTgxIC04MCAtMTQ3IC0xNDIgLTE0NyAtMTM3IDAgNCAxMSAyNSAyNSA0OCAxNCAyMiAyMyA0NCAyMCA0OCAtNiAxMCA3NCAxMzUgMTI5IDIwMSA3NyA5MyAyNzUgMjg2IDM4NyAzNzYgMjU5IDIwOCA2ODkgNTA2IDkyOSA2NDMgNjkgNDAgMjExIDExNSAzMTcgMTY5IDEwNiA1MyAxOTAgOTggMTg4IDEwMCAtMSAyIC0xMTEgLTUwIC0yNDIgLTExNiAtMzg5IC0xOTQgLTgzMyAtNDU1IC0xMDM4IC02MTAgLTU2IC00MyAtMTk1IC0xNzEgLTMxNSAtMjkxIC0xMTggLTExOCAtMjEwIC0yMDggLTIwNCAtMjAwIDEzOSAxODAgMjAxIDI1NiAyOTAgMzQ4IDEyNiAxMzEgMTg4IDE4NCA0NjkgMzk4IDExNiA4NyAyNzQgMjA5IDM1MiAyNzAgMTIzIDk3IDI0MiAxODAgMzczIDI2MSA1OSAzNyAyNiAyNCAtNDkgLTE4IC0yNzcgLTE1NyAtNzU2IC01MTUgLTEwNDAgLTc3OSAtMjQ3IC0yMjggLTQ4NyAtNTQ2IC02MjIgLTgyNSBsLTU5IC0xMjEgNCA3NSBjMyA0NCAxNSAxMDUgMzAgMTQ5IDMxIDkwIDk2IDIyMiAxMDcgMjE2IDkgLTYgMzAgNTEgMjIgNTkgLTQgMyAtMSA2IDYgNiA3IDAgOSA1IDYgMTAgLTQgNiAzNiA5MiA4OCAxOTMgMTk4IDM4MiAyNzEgNDgwIDY4NyA5MjcgMTU0IDE2NiAxODcgMjAyIDMxOSAzNTUgMTM2IDE1NyAzMDEgMzI2IDM5NiA0MDggODYgNzMgOTkgODYgNjAgNjAgLTU2IC0zOSAtMjA5IC0xNzcgLTMyNSAtMjk0IC0xODEgLTE4MiAtNTY2IC02MDggLTcxNCAtNzg5IC0zMiAtNDAgLTI2IC0yNCAxNCAzNSAxNSAyMiA4NyAxMzkgMTYwIDI2MCAxNTkgMjY1IDI2NSA0MjUgMzczIDU2MyA4NCAxMDggMTE1IDE3MCA0NiA5MyAtNjMgLTcwIC0yMTkgLTI3NSAtMjg1IC0zNzQgLTM0IC01MSAtMTIwIC0xODkgLTE5MSAtMzA3IC03MiAtMTE5IC0xODkgLTMwNCAtMjYxIC00MTIgLTE2NSAtMjQ1IC0zNjQgLTYxMiAtNDM4IC04MDMgLTEzIC0zNCAtMjAgLTQzIC0yMiAtMzAgLTggNTkgMjEwIDYxNCAzNzIgOTQ4IDEwMCAyMDYgMzM2IDYyOSA0NzkgODU4IDkxIDE0NyAyMzIgMzQ1IDMxMSA0MzggODQgOTkgMTA5IDEzMSAxMDMgMTMxIC0xMiAwIC0xNzAgLTE5MCAtMjcyIC0zMjUgLTI3NyAtMzY5IC01MzMgLTgyMiAtNzUwIC0xMzMwIC00MyAtOTkgLTk5IC0yMjkgLTEyNSAtMjkwIC01OSAtMTM4IC05NCAtMjQxIC0xNDEgLTQyNSAtMjggLTEwNiAtMzggLTEzNCAtMzggLTEwNSAtMiA4MiAyMCAyNzMgNDAgMzUwIDExIDQ0IDI5IDEyMiA0MCAxNzQgMTAgNTEgNTUgMjUyIDk4IDQ0NSA0MyAxOTMgOTcgNDQzIDEyMCA1NTYgNjUgMzE2IDE0NSA2MzUgMTkwIDc1MyA2IDE2IDExIDM0IDEwIDQwIC0xIDIwIC0yOCAtNjAgLTc0IC0yMTggLTU4IC0yMDIgLTgwIC0yOTQgLTE0NSAtNjEwIC00NCAtMjE2IC00NyAtMjI3IC0xNDAgLTYxNSAtNjUgLTI3MCAtMTIwIC01MjcgLTEzNSAtNjMzIC0xNyAtMTEzIC0xMiAtMjMgMTAgMjE4IDQzIDQ1NyA2NSA2MzUgMTE2IDk1MCA2NiA0MDAgMTA2IDU3NyAyMDAgODg2IDMyIDEwOCA4MiAyODMgMTA5IDM4OSAyNyAxMDYgNTIgMTk1IDU0IDE5OCAzIDIgMjEgLTEgNDEgLTggMjAgLTcgNDYgLTkgNTkgLTYgMTUgNCAzNCAtMyA1NiAtMTkgNDkgLTM3IDYxIC0zMCAxNSA4IC0yOSAyNCAtNTMgMzQgLTkzIDM4IC00NSA2IC02MCAxMyAtOTYgNDggLTQwIDQwIC00NCA0MSAtMTA4IDQxIGwtNjcgMCAtMzggNDYgLTM3IDQ3IC02NyAtNiBjLTYzIC01IC0xMjAgLTI1IC0xMzMgLTQ2IC0xMyAtMjEgLTM2IC0xNjAgLTYwIC0zNjEgLTc4IC02NDUgLTk3IC03NjUgLTEyMSAtNzY1IC01IDAgLTE2IDM0IC0yMiA3NSAtMTIgNzAgLTI0IDE2NSAtMTA0IDgxOSAtMTcgMTM5IC0zNSAyNjQgLTM5IDI3NyAtOCAyMSAtMTYgMjQgLTU3IDI0IC0yNyAtMSAtNzAgLTkgLTk2IC0yMHogbTEyMSAtMjIgYzkgLTEyIDE5IC05NiA3OCAtNjU4IDQ2IC00NDEgODIgLTY1MCAxMTQgLTY1MCAzNiAwIDk3IDMxNiAxODEgOTMwIDIzIDE3MyA0NyAzMjEgNTMgMzI4IDEyIDE3IDcyIDQyIDEwMSA0MiAxMyAwIDM5IC0xOCA2NiAtNDcgbDQ0IC00OCA4MiAzIGM3OSAzIDgzIDIgOTkgLTI0IDE1IC0yMSAxNiAtMzIgNyAtNjIgLTI1IC04NyAtMTA1IC0zNjEgLTE1NiAtNTMyIC0xMTQgLTM4MyAtMTQ2IC01MzEgLTIzMiAtMTA3NSAtMjIgLTEzOSAtNjIgLTQ4MCAtODEgLTY4NyAtMTAgLTEwNCAtMjEgLTE4OCAtMjUgLTE4OCAtMTYgMCAtMjEgMzY1IC0xMCA2NDUgMTcgMzk4IDM5IDc5MCA1MSA5MTAgMjggMjYzIDExMyA2MDIgMjI1IDkwMCAyOCA3NiAzMSA5MyA5IDUyIC0yNSAtNDYgLTgxIC0yMDcgLTExOCAtMzM5IC0xMDkgLTM5MCAtMTM3IC01NjMgLTE1NiAtOTU4IC01IC0xMTggLTE1IC0zMTIgLTIxIC00MzAgLTcgLTEzMyAtOSAtMzQ3IC01IC01NjAgMyAtMTkwIDIgLTM1OCAtMiAtMzc1IC02IC0xOSAtMTEgNzIgLTE1IDI1NSAtNCAxNTcgLTEwIDQwOSAtMTQgNTYxIC02IDI4NyAwIDM5OCAzOCA2NzQgMjggMjA0IDIyIDIwNCAtMTggMCAtMzMgLTE2OSAtMzYgLTE5NSAtNDAgLTQzMCAtMyAtMTM3IDAgLTQzMCA3IC02NTAgNiAtMjIwIDE0IC00OTggMTcgLTYxOCA2IC0yNDQgMjIgLTI3NSAyNCAtNDcgMSA4MCA1IDE3MiA5IDIwNSA0IDMzIDUgLTM0IDIgLTE1MCAtMiAtMTE1IC04IC0yMjAgLTEzIC0yMzMgLTUgLTEzIC05IC0xMjggLTEwIC0yNTUgLTEgLTI3MiAtMTEgLTQzNSAtMjEgLTM3MiAtOSA1MyAtMTYgMTM0IC0yOCAzMzcgLTEwIDE2NyAtNTQgNDY4IC03MCA0NzggLTUgMyAtMzMgODAgLTYzIDE3MCAtMTIyIDM3MSAtMjU5IDY3NCAtNDgzIDEwNjYgLTIyOSA0MDIgLTM0MiA2MzMgLTQ3OSA5NzkgLTY1IDE2NSAtMTQwIDM1MSAtMTY2IDQxMyBsLTQ3IDExMiAzMSAyNCBjNDUgMzMgODYgNTIgMTMwIDYwIDIxIDQgMzUgMTEgMzIgMTYgLTggMTMgMzYgNDAgNjcgNDAgMTcgMCAzNSAtOSA0NiAtMjIgOSAtMTMgMzQgLTM5IDU0IC01OCAyMSAtMjAgNDcgLTU2IDU4IC04MSAxOCAtMzcgMjEgLTM5IDE2IC0xNCAtMiAxNyAtOCAzOCAtMTEgNDcgLTUgMTEgMSAyMCAxNyAyOCAxMyA3IDQ0IDI5IDY5IDUwIDI1IDIxIDYxIDQ3IDgwIDU5IDM4IDIzIDk5IDI4IDEwMCA5IDAgLTEwIDIgLTEwIDYgMCAyIDYgMTUgMTIgMjggMTIgNDAgMCA2NyAxNSAxMzQgNzUgOTIgODIgMTgxIDExNyAyMDkgODN6IG0tOTc5IC01NzUgYzIyMSAtNTU5IDI1NyAtNjQ3IDM0MCAtODEzIDQ4IC05NiAxNTMgLTI5MCAyMzMgLTQzMCAxNjYgLTI5MSAyMzEgLTQxNyAzMTYgLTYxNSAxNzIgLTQwMyAyNjggLTcwNSAyODggLTkxMCA0IC0zOCA0IC02OCAxIC02NSAtOCA4IC05NCAyMjMgLTE0NCAzNjAgLTQ0IDEyNCAtMTQwIDMzNCAtMzE5IDY5NSAtMTI1IDI1MyAtMjM3IDQ1OSAtMzQ3IDYzNSAtMjUxIDQwNCAtMjUwIDQwMiAtNDg3IDg4MCAtNjIgMTI0IC0xMTYgMjMwIC0xMjIgMjM1IC01IDYgMiAtMTIgMTUgLTQwIDEzIC0yNyA1MiAtMTA4IDg2IC0xODAgMTc1IC0zNjMgMjM3IC00ODMgMzI2IC02MzAgMTc0IC0yODYgNDUwIC03NzMgNDQzIC03ODAgLTIgLTMgLTI3IDI3IC01NiA2NSAtMjkgMzggLTExOSAxNTAgLTIwMCAyNDcgLTI2OSAzMjIgLTM5MSA1MDIgLTU2MiA4MjggLTg4IDE2OCAtMTY2IDMwMSAtMTgyIDMxMSAtNiA0IC05IDMgLTYgLTIgMTA2IC0xODIgMTU5IC0yNzYgMjE0IC0zODUgMTYwIC0zMTYgMjQ5IC00NDEgNzgyIC0xMDk4IDkzIC0xMTUgMTExIC0xNTkgMjUgLTYzIC0zMSAzNSAtMTM2IDEzNSAtMjMzIDIyMiAtMjYxIDIzNCAtNDEwIDQwMyAtNTA4IDU3OSAtMjE4IDM4OCAtMjgxIDQ4NyAtMzg2IDYwMiAtNTUgNjIgLTUwIDUxIDIxIC00MSA3NiAtOTggMTUyIC0yMTkgMjQzIC0zODUgNDUgLTgzIDkzIC0xNzAgMTA2IC0xOTUgbDI1IC00NSAtMzcgNDAgYy0yMCAyMiAtMzMgMzMgLTI5IDI1IDUgLTggLTI5IDIwIC03NiA2MyAtMTU5IDE0OCAtMjMwIDE5NSAtNTUxIDM2MSAtMTA0IDU0IC0xODggMTAxIC0xODggMTA2IDAgMTQgODggODAgMTMzIDEwMCAzMSAxNCA2MyAxOSAxMTcgMTcgOTAgLTIgMTMxIDE1IDIzNiA5MyA3NiA1OCAxMTIgMTA1IDEzOCAxODYgMTkgNTkgNTMgOTQgMTE4IDEyMiA0NSAyMCA1NSAzMCAxMDAgMTExIDkgMTcgMjEgMzEgMjUgMzEgNSAwIDUxIC0xMDcgMTAyIC0yMzd6IG0tNzkxIC01MzkgYzIzNiAtMTI5IDI4MyAtMTU3IDM3NyAtMjI4IDEzNSAtMTAyIDM4NCAtMzUzIDU3MCAtNTc1IGwzMCAtMzYgLTMxIDIyIGMtMTggMTMgLTExMiA5OCAtMjExIDE5MSAtMTkzIDE4MSAtMzE0IDI3NyAtNDYxIDM2NiAtMTExIDY4IC0yODkgMTU3IC00MjQgMjExIC01NCAyMiAtOTggNDMgLTk4IDQ2IDAgMTQgNTIgOTkgNjEgOTkgNiAwIDkwIC00MyAxODcgLTk2eiBtLTE0MiAtNjMgYzE4NSAtNzggNDM0IC0yMzAgNjE5IC0zNzggNTUgLTQ0IDE3MiAtMTQ0IDI2MCAtMjIzIDg4IC03OCAyMDAgLTE3MCAyNDggLTIwMiAxNjkgLTExMyA0ODYgLTQxMiA1NzYgLTU0MiAyOSAtNDIgNTEgLTc5IDQ5IC04MSAtMiAtMyAtNDkgNDggLTEwNCAxMTIgLTEyOCAxNTEgLTIzNCAyNDIgLTQ3NCA0MTAgLTEwNyA3NSAtMjYyIDE4OSAtMzQ1IDI1MiAtODIgNjQgLTIwNCAxNTIgLTI3MSAxOTcgLTIxNiAxNDQgLTY0NCAzNzQgLTc3MSA0MTQgLTM4IDEyIC00MSAxNSAtMzEgMzQgMjYgNTAgNDAgNTkgOTQgNTMgMjkgLTMgOTYgLTI0IDE1MCAtNDZ6IG0tMTUxIC04NCBjNDQgLTE5IDEyNSAtNjAgMTgwIC05MiA1NSAtMzIgMTcwIC05OSAyNTUgLTE0OCAxOTQgLTExMSAzMjMgLTE5NiA0NzAgLTMwOSAyMTAgLTE2MiAzNzQgLTI4MyA0NzMgLTM1MiAxMzIgLTkxIDIwNiAtMTUzIDMwNSAtMjU1IDIwNSAtMjEwIDMxOSAtNDA1IDQ1NCAtNzc2IDMzIC05MSAzMiAtOTAgLTQ1IDIzIC05NyAxNDIgLTIwNyAyNzIgLTM2NyA0MzIgLTE3MiAxNzIgLTMxNiAyODYgLTQ3OCAzNzggLTI5NyAxNjkgLTgwOCAzNTMgLTEwNDIgMzc3IC0xNTQgMTUgLTMzMyA1MCAtNDYyIDkyIC00MiAxMyAtNDcgMTcgLTM4IDMzIDYgMTAgMTAgMjggMTAgMzkgMCAxMSA3IDI0IDE3IDI5IDE0IDkgMTQgMTAgLTUgMTYgLTM1IDEyIC0yOSA2OSAxNSAxNDQgMzEgNTIgNDAgNjEgNTcgNTYgMTggLTYgMTkgLTUgNyAxMCAtMTEgMTQgLTExIDE2IDIgMTYgMTAgMCAxNCA2IDExIDEzIC02IDE3IDcyIDEwNyA5MyAxMDcgMjEgMCA3OCAtMzUgMzM4IC0yMDYgMTI3IC04MyAyODAgLTE4MCAzNDAgLTIxNiAxMTkgLTcwIDQ3NyAtMjU4IDQ5MSAtMjU4IDEwIDAgLTQ0IDMxIC0yNTAgMTQyIC0yMDEgMTA4IC0zNTggMjAzIC02MjYgMzc4IC0xMjQgODEgLTI0MSAxNTUgLTI2MCAxNjYgLTM5IDIzIC01OCA2OCAtNTkgMTQ3IC0xIDU4IDQgNTkgMTE0IDE0eiBtLTIxMSAtNjU2IGMxMzAgLTM3IDIyNSAtNTcgMzYxIC03NiAxNjUgLTIzIDI1NyAtNDMgMzkwIC04NyA0MDggLTEzNiA3MjQgLTI5NSA5NTUgLTQ4MSAxMTcgLTk0IDM1OCAtMzM2IDQ2NiAtNDY3IDkzIC0xMTMgMjE2IC0yOTAgMjAxIC0yOTAgLTMgMCAtNDAgNDQgLTgyIDk4IC05OSAxMjQgLTM0OSAzNzEgLTQ5MCA0ODUgLTIyOSAxODQgLTQ1MCAzMDkgLTY4MyAzODYgLTY4IDIyIC0yNTAgNzAgLTQwNSAxMDYgLTE1NSAzNyAtMzA2IDczIC0zMzUgODIgLTMwIDggLTU1IDEzIC01OCAxMCAtNiAtNSAyMjAgLTczIDQ0MSAtMTMyIDI1OSAtNzAgNDAwIC0xMTQgNTE0IC0xNjIgMjcyIC0xMTMgNTAxIC0yNzIgNzYxIC01MjggMTM0IC0xMzIgMTk5IC0yMDIgMTEwIC0xMTkgLTM0OCAzMjMgLTc0NCA1NDYgLTExMzAgNjM2IC02OSAxNiAtMjE1IDUyIC0zMjUgODAgLTExMCAyOCAtMjQ5IDYyIC0zMDkgNzUgLTExNiAyNSAtMzc3IDY1IC0zODMgNTkgLTMgLTIgMjkgLTkgNjkgLTE2IDE5NiAtMzAgMzAxIC01NSA0NjkgLTEwOSAxMDEgLTMzIDIzOCAtNzEgMzA0IC04NiAyNDYgLTU1IDI4NyAtNjcgNDk2IC0xNTEgMTg1IC03NCAzMzkgLTE0NiAzMzkgLTE1OSAwIC0yIC0zNyAxMyAtODIgMzQgLTk1IDQ0IC0xNzcgNzMgLTI2MyA5NSAtMTE1IDI5IC03NjQgMTU1IC05MjUgMTgwIC04NSAxMyAtNDc2IDQ2IC01NDkgNDYgLTY2IDAgLTc4IDY0IC0yNSAxNDMgMzUgNTMgMzUgMTA2IDAgMTc2IC0zNCA2NyAtMzAgMTAxIDIwIDE1OSAyMCAyMyAzOCA0MiA0MSA0MiAzIDAgNTEgLTEzIDEwNyAtMjl6IG0xODEgLTUzMiBjOTkgLTExIDIzOSAtMzQgMzEwIC01MCAxNzIgLTQxIDM0MyAtNzggNDM1IC05NCA2OSAtMTIgNDUgLTEzIC0yOTEgLTE0IC00NzIgLTEgLTY2NiAxNiAtNjkxIDYyIC02IDEyIC0zNCA0NiAtNjIgNzUgbC01MSA1NCA4NSAtNyBjNDcgLTQgMTY2IC0xNSAyNjUgLTI2eiBtLTg1IC0xNTggYzI1IC02IDEzNyAtMTYgMjUwIC0yMiAxMTMgLTYgMjEyIC0xMyAyMjAgLTE2IDggLTMgLTU5IC0yMCAtMTUwIC0zOSAtMjM0IC00NyAtMzQyIC00NCAtNDA5IDExIC0yNyAyMyAtNTUgNzggLTQ1IDg4IDUgNCA1NyAtNCAxMzQgLTIyeiBtMjUwNyAtMTg4IGMtMyAtMTAgLTUgLTIgLTUgMTcgMCAxOSAyIDI3IDUgMTggMiAtMTAgMiAtMjYgMCAtMzV6Ii8+IDxwYXRoIGQ9Ik0yOTkyIDU4MTggYy0yNiAtMTg4IC0zNSAtMzM2IC0zNiAtNTczIC0xIC0yNjAgMiAtMjkwIDU1IC02MjEgMTYgLTk5IDM4IC0yNTkgNDkgLTM1NSA0NCAtMzY3IDY5IC02MDMgNjYgLTYwNiAtNiAtNiAtNjEgMjM5IC0xMTUgNTA3IC0yNyAxMzUgLTc3IDM3OCAtMTExIDU0MCAtNzUgMzU5IC0xMTIgNTYzIC0xMzYgNzM3IC0xMCA3MyAtMjAgMTMxIC0yMiAxMjggLTggLTcgMTggLTIyMCA0OSAtNDA1IDMzIC0xOTUgNzkgLTQzMiAxNDUgLTc0NCAyNCAtMTE1IDQ0IC0yMTQgNDMgLTIyMCAtMSAtMTcgLTEwMCAyODkgLTE5NCA1OTkgLTg0IDI4MCAtMTIzIDQyOCAtMTY2IDYyNCAtMTMgNTcgLTI1IDk5IC0yNyA5MyAtMiAtNiA2IC01NSAxOCAtMTA5IDU2IC0yNjIgMTM0IC01MzcgMjk2IC0xMDQzIDQyIC0xMjkgODQgLTI2MiA5NCAtMjk1IDE5IC02MSA2NiAtMjU1IDExNCAtNDcwIDM3IC0xNjUgMzcgLTE2NSAzMiAtMTY1IC0yIDAgLTMwIDgwIC02MSAxNzggLTE1MyA0NzUgLTM0OSA5NTEgLTYyMCAxNTA3IC0xMTYgMjM3IC0yMDAgNDI0IC0yMjQgNDk4IC03IDIxIC0xNSAzNyAtMTcgMzQgLTEwIC05IDU0IC0xNjcgMTkxIC00NjcgNDU4IC0xMDEwIDY0OSAtMTQ4OSA3NzAgLTE5MzUgMTkgLTcyIDMzIC0xMTEgMzAgLTg3IC0zIDIzIC0zIDQyIC0xIDQyIDE2IDAgNTEgLTE4OSA5MSAtNDk0IDkgLTY1IDIwIC0xMjggMjUgLTE0MCAxNSAtMzYgMTEgMTQwIC01IDI0OSAtOCA1NCAtMjAgMTgzIC0yNSAyODUgLTUgMTAyIC0xNCAyNjQgLTIwIDM2MCAtNiA5NiAtMTUgMjk0IC0yMCA0NDAgLTcgMTc2IC0xOCAzMjQgLTM1IDQ0MCBsLTI0IDE3NSA1IC0xMTAgYzIgLTYwIDExIC0yMjkgMTkgLTM3NSAxNiAtMjgyIDQ1IC05MTIgNDQgLTkzOSAwIC05IC0xOCA1NiAtMzkgMTQzIC00MyAxNzMgLTczIDM1OCAtOTAgNTU2IC0yNSAyODMgLTc0IDY2NCAtMTIxIDk1MCAtNDggMjg5IC01NiA2MzYgLTIzIDk4NCAxNiAxNzMgMTQgMjE2IC00IDg0eiIvPiA8cGF0aCBkPSJNMzU1MiA1NzgwIGMwIC0xNCAyIC0xOSA1IC0xMiAyIDYgMiAxOCAwIDI1IC0zIDYgLTUgMSAtNSAtMTN6Ii8+IDxwYXRoIGQ9Ik0yNzIyIDU3MTUgYzAgLTE2IDIgLTIyIDUgLTEyIDIgOSAyIDIzIDAgMzAgLTMgNiAtNSAtMSAtNSAtMTh6Ii8+IDxwYXRoIGQ9Ik0zNTQzIDU3MDAgYzAgLTI1IDIgLTM1IDQgLTIyIDIgMTIgMiAzMiAwIDQ1IC0yIDEyIC00IDIgLTQgLTIzeiIvPiA8cGF0aCBkPSJNMjczMiA1NjQwIGMwIC0xOSAyIC0yNyA1IC0xNyAyIDkgMiAyNSAwIDM1IC0zIDkgLTUgMSAtNSAtMTh6Ii8+IDxwYXRoIGQ9Ik0zNTMwIDU2MjEgYzAgLTE2IC0xNCAtMTEwIC0zMSAtMjA4IC0zMSAtMTgyIC00NyAtMzA2IC0zMCAtMjMzIDM4IDE1OCA4MiA0NzAgNjcgNDcwIC0zIDAgLTYgLTEzIC02IC0yOXoiLz4gPHBhdGggZD0iTTM0NTIgNTExNSBjMCAtMTYgMiAtMjIgNSAtMTIgMiA5IDIgMjMgMCAzMCAtMyA2IC01IC0xIC01IC0xOHoiLz4gPHBhdGggZD0iTTM0NDIgNTA1MCBjMCAtMTkgMiAtMjcgNSAtMTcgMiA5IDIgMjUgMCAzNSAtMyA5IC01IDEgLTUgLTE4eiIvPiA8cGF0aCBkPSJNMzQyNSA0OTE3IGMtNCAtNTMgLTUgLTEwMSAtMyAtMTA5IDMgLTcgOSAzMyAxMyA5MCA0IDU3IDUgMTA1IDIgMTA4IC0zIDMgLTggLTM3IC0xMiAtODl6Ii8+IDxwYXRoIGQ9Ik0zMjIxIDMwODQgYzAgLTExIDMgLTE0IDYgLTYgMyA3IDIgMTYgLTEgMTkgLTMgNCAtNiAtMiAtNSAtMTN6Ii8+IDxwYXRoIGQ9Ik0zMjMyIDMwNDAgYzAgLTE0IDQgLTM4IDggLTU1IDcgLTI3IDggLTI3IDggLTUgMCAxNCAtNCAzOSAtOCA1NSAtNyAyNyAtOCAyNyAtOCA1eiIvPiA8cGF0aCBkPSJNMzI1MiAyOTMwIGMwIC0xNCAyIC0xOSA1IC0xMiAyIDYgMiAxOCAwIDI1IC0zIDYgLTUgMSAtNSAtMTN6Ii8+IDxwYXRoIGQ9Ik0xMzM1IDQ5NzMgYzYgLTUgNTcgLTQzIDExNSAtODMgMTA1IC03NSAxODUgLTE0OSAzODQgLTM1OCAxMjggLTEzNiAxMjUgLTExOSAtNiAyOCAtMTMwIDE0NyAtMjM1IDI0OCAtMzI2IDMxMiAtNzQgNTMgLTE4OCAxMjIgLTE2NyAxMDF6Ii8+IDxwYXRoIGQ9Ik04OTQgNDM1NiBjMTEgLTkgMjQgLTE2IDMwIC0xNiAxMiAwIDcgNSAtMjQgMTkgLTI0IDExIC0yNCAxMSAtNiAtM3oiLz4gPHBhdGggZD0iTTg5NCA0MzI2IGMxMSAtOSAyNCAtMTYgMzAgLTE2IDEyIDAgNyA1IC0yNCAxOSAtMjQgMTEgLTI0IDExIC02IC0zeiIvPiA8cGF0aCBkPSJNOTgwIDQyODYgYzAgLTIgNyAtNyAxNiAtMTAgOCAtMyAxMiAtMiA5IDQgLTYgMTAgLTI1IDE0IC0yNSA2eiIvPiA8cGF0aCBkPSJNMTA0MCA0MjU3IGMwIC03IDEzMiAtNzkgMTM2IC03NCAyIDIgLTI4IDIwIC02NiA0MSAtMzkgMjAgLTcwIDM1IC03MCAzM3oiLz4gPHBhdGggZD0iTTExOTAgNDE3NiBjMCAtMyA5IC0xMCAyMCAtMTYgMTEgLTYgMjAgLTggMjAgLTYgMCAzIC05IDEwIC0yMCAxNiAtMTEgNiAtMjAgOCAtMjAgNnoiLz4gPHBhdGggZD0iTTEyNjAgNDEzNiBjMCAtNiAyMDEgLTEwMiAzMjUgLTE1NiA2MSAtMjYgMjA1IC04MiAzMjAgLTEyNCAzNzYgLTEzOCA0NDQgLTE2OCA1NzIgLTI1MiAxNjUgLTEwOSAzODIgLTM1MCA1MTUgLTU3NSAyOCAtNDkgNTQgLTg3IDU1IC04NSA1IDUgLTk5IDE4NCAtMTUwIDI2MSAtMTQwIDIwOCAtMzA3IDM3OCAtNDY2IDQ3NCAtNjggNDEgLTI4MSAxMzIgLTI5MyAxMjUgLTUgLTMgLTM0IDQgLTY2IDE1IC0zNjMgMTI2IC01MjcgMTkwIC02OTkgMjcxIC0xMDggNTEgLTExMyA1MyAtMTEzIDQ2eiIvPiA8cGF0aCBkPSJNODMwIDQxMjIgYzggLTUgMjYgLTEzIDQwIC0xNiAxNyAtNSAyMCAtNCAxMCAyIC04IDUgLTI2IDEzIC00MCAxNiAtMTcgNSAtMjAgNCAtMTAgLTJ6Ii8+IDxwYXRoIGQ9Ik05MDEgNDA5NiBjMTAgLTkgMTQ5IC03NiAxNDkgLTcxIDAgNSAtMTM2IDc1IC0xNDYgNzUgLTQgMCAtNSAtMiAtMyAtNHoiLz4gPHBhdGggZD0iTTEwNjUgMzc5NSBjMTcgLTggMzcgLTE0IDQ1IC0xNCA4IDAgLTEgNyAtMjAgMTQgLTQ2IDE4IC02NCAxNyAtMjUgMHoiLz4gPHBhdGggZD0iTTQwMTAgNTQzMCBjLTE3IC01MCAtMzAgLTkzIC0yOCAtOTYgMyAtMiAxOSAzNyAzNiA4OCAxOCA1MCAzMSA5MyAyOSA5NSAtMiAyIC0xOSAtMzcgLTM3IC04N3oiLz4gPHBhdGggZD0iTTQ2MjkgNTQyMyBjLTE5NiAtMjEwIC00ODkgLTY1NCAtNjY4IC0xMDExIC0xMDAgLTE5OSAtMjUwIC01NTMgLTMxNSAtNzQ0IC0yNSAtNzEgLTEwIC01NCAyNCAyOSAyMTAgNTEwIDMwMiA3MDcgNDQzIDk1NiAxODUgMzI0IDI5MiA0ODAgNTM2IDc3OCAzMyA0MSAyMiAzNiAtMjAgLTh6Ii8+IDxwYXRoIGQ9Ik00MTA2IDUyNzggYy03NCAtMjM0IC0xNDUgLTQ2MCAtMTY2IC01MzMgLTI1IC04MyAtNTAgLTE2NSAtMTA1IC0zNDAgLTUxIC0xNjEgLTE0MiAtNDYxIC0xODAgLTU5MCAtMjQgLTgwIC0yOCAtMTE5IC01IC00OCA2MiAxOTMgMjMyIDY0NCAzMzYgODkzIDc2IDE4MSAxNzggMzQ3IDMzNyA1NDggNDkgNjMgODcgMTE1IDg1IDExNyAtNCA0IC0xMTggLTEyOSAtMTgwIC0yMTEgLTEyMyAtMTYyIC0yMTUgLTMzNSAtMzI5IC02MjIgLTQwIC0xMDAgLTc0IC0xODEgLTc2IC0xNzkgLTggOSAxMDIgMzExIDE0OCA0MDUgNjAgMTIzIDIwOSAzOTggMjg2IDUyNyAyOSA1MCA0MiA3NyAyOCA2MCAtMzMgLTQwIC0xODYgLTI5OCAtMjcwIC00NTUgLTY0IC0xMjEgLTc3IC0xMzEgLTI5IC0yMSAxMyAyOSAyNCA2NCAyNCA3NiAwIDEzIDM0IDEzMyA3NiAyNjcgOTQgMzAxIDg3IDI3OCA4MSAyNzggLTMgMCAtMzAgLTc4IC02MSAtMTcyeiIvPiA8cGF0aCBkPSJNNDMzOSA1MzgzIGMtMTMgLTE2IC0xMiAtMTcgNCAtNCA5IDcgMTcgMTUgMTcgMTcgMCA4IC04IDMgLTIxIC0xM3oiLz4gPHBhdGggZD0iTTM5NTYgNTI3NCBjLTkgLTI2IC0xNiAtNTIgLTE1IC01OCAwIC02IDkgMTMgMjAgNDMgMTAgMzAgMTcgNTYgMTUgNTggLTIgMiAtMTEgLTE3IC0yMCAtNDN6Ii8+IDxwYXRoIGQ9Ik00NzQ5IDQ5NjMgYy0xMyAtMTYgLTEyIC0xNyA0IC00IDkgNyAxNyAxNSAxNyAxNyAwIDggLTggMyAtMjEgLTEzeiIvPiA8cGF0aCBkPSJNNTM3OCA0OTMxIGMtMTI0IC03MiAtMjQzIC0xNjAgLTUwOSAtMzczIC0yOTcgLTIzOCAtMzUyIC0yODUgLTQ4OCAtNDA3IC0xNTMgLTEzOSAtNDM4IC00NzIgLTU1NCAtNjQ4IC02MyAtOTYgLTE4NCAtMzEzIC0xNzQgLTMxMyAzIDAgMjcgMzkgNTMgODggMTk1IDM1OCA1MTUgNzE1IDEwMTkgMTEzOCAzNjcgMzA4IDUwMyA0MTIgNjcxIDUxMyAzNyAyMyA2MyA0MSA1OCA0MSAtNSAwIC0zOSAtMTcgLTc2IC0zOXoiLz4gPHBhdGggZD0iTTU1MDAgNDcxMCBjLTggLTUgLTEwIC0xMCAtNSAtMTAgNiAwIDE3IDUgMjUgMTAgOCA1IDExIDEwIDUgMTAgLTUgMCAtMTcgLTUgLTI1IC0xMHoiLz4gPHBhdGggZD0iTTUzNDUgNDYzNCBjLTY2IC0zNiAtMTI3IC03MyAtMTM1IC04MSAtOCAtOSA1IC00IDMwIDEwIDI1IDE1IDkxIDUxIDE0NSA4MiA1NSAzMCA5NSA1NSA5MCA1NSAtNiAwIC02NCAtMzAgLTEzMCAtNjZ6Ii8+IDxwYXRoIGQ9Ik01MDc0IDQ0NzIgYy0zNDMgLTIxMyAtNzA4IC01MTIgLTEwMzUgLTg0OCAtMTk0IC0yMDAgLTMxNCAtMzU0IC00MTggLTUzNCAtMzIgLTU1IC02MSAtOTcgLTY1IC05MyAtMyAzIC02IDEgLTYgLTYgMCAtNyAtMjAgLTYwIC00NSAtMTE3IC01OSAtMTM1IC01NyAtMTQ2IDQgLTE5IDYwIDEyNyAxNzcgMzE1IDI3NyA0NDcgOTYgMTI3IDM1OCAzODggNjUxIDY1MSAzMjUgMjkyIDQ0MCAzODEgNzM5IDU3NCAxMSA2IDE2IDEyIDEzIDEyIC0zIDEgLTU1IC0zMCAtMTE1IC02N3oiLz4gPHBhdGggZD0iTTU4MjAgNDQwMCBjLTggLTUgLTEwIC0xMCAtNSAtMTAgNiAwIDE3IDUgMjUgMTAgOCA1IDExIDEwIDUgMTAgLTUgMCAtMTcgLTUgLTI1IC0xMHoiLz4gPHBhdGggZD0iTTUyNTggNDM2NCBjLTM4IC0yMCAtMzYgLTI4IDIgLTkgMTcgOSAzMCAxOCAzMCAyMCAwIDcgLTEgNiAtMzIgLTExeiIvPiA8cGF0aCBkPSJNNTY0MCA0MzIwIGMtOSAtNiAtMTAgLTEwIC0zIC0xMCA2IDAgMTUgNSAxOCAxMCA4IDEyIDQgMTIgLTE1IDB6Ii8+IDxwYXRoIGQ9Ik01NTUwIDQyODAgYy0xOSAtMTEgLTMxIC0xOSAtMjcgLTIwIDExIDAgNjcgMjkgNjcgMzUgMCA3IC0xIDcgLTQwIC0xNXoiLz4gPHBhdGggZD0iTTU2MjUgNDExNiBjLTM2MiAtMTI3IC02NzcgLTI3MyAtOTU1IC00NDQgLTM2NSAtMjI1IC02MzggLTQxNCAtNzUwIC01MjEgLTQxIC0zOCAtMjggLTMwIDUwIDMxIDU4IDQ2IDE3OSAxMzAgMjcwIDE4OCA5MSA1NyAyNDQgMTU0IDM0MCAyMTUgNDE0IDI2MyA2NzAgMzg5IDEwNjggNTI2IDk3IDMzIDE3OCA2MiAxODEgNjQgMTMgMTQgLTQxIC0yIC0yMDQgLTU5eiIvPiA8cGF0aCBkPSJNNTg1OCA0MDAzIGM3IC0zIDE2IC0yIDE5IDEgNCAzIC0yIDYgLTEzIDUgLTExIDAgLTE0IC0zIC02IC02eiIvPiA8cGF0aCBkPSJNNTgwOCAzOTkzIGM2IC0yIDE4IC0yIDI1IDAgNiAzIDEgNSAtMTMgNSAtMTQgMCAtMTkgLTIgLTEyIC01eiIvPiA8cGF0aCBkPSJNNTY0MCAzOTYwIGMtMjAgLTYgLTIxIC04IC01IC04IDExIDAgMjkgMyA0MCA4IDI1IDExIC0xIDExIC0zNSAweiIvPiA8cGF0aCBkPSJNNTQ0NyAzOTEwIGMtMjE0IC02MyAtMzkwIC0xMzEgLTU1MSAtMjEyIC0xMjcgLTY0IC01NDEgLTMwNCAtNjYxIC0zODIgLTI4NyAtMTkwIC00MDkgLTI2NyAtMzkyIC0yNDkgOSAxMSAxNyAyNCAxNyAyOSAwIDIyIC0yNzEgLTI2OSAtMjk0IC0zMTYgLTQgLTggMiAtNCAxNCAxMCA5OCAxMTMgMTI4IDE0NCAxODcgMTkzIDExMyA5MiA2MjIgNDE3IDc2MyA0ODcgMzYgMTggMTQzIDc1IDIzNyAxMjcgMjM0IDEyOSA0MjQgMjE0IDYzMyAyODQgMTg1IDYxIDIxMCA3NyA0NyAyOXoiLz4gPHBhdGggZD0iTTU2ODggMzgwMyBjNyAtMyAxNiAtMiAxOSAxIDQgMyAtMiA2IC0xMyA1IC0xMSAwIC0xNCAtMyAtNiAtNnoiLz4gPHBhdGggZD0iTTUyNDUgMzcxNSBjLTM5IC0xNCAtNDAgLTE0IC01IC04IDQxIDcgODIgMjIgNjAgMjIgLTggMCAtMzMgLTcgLTU1IC0xNHoiLz4gPHBhdGggZD0iTTUwNTAgMzY2MCBjLTYzIC0yMCAtMTQ2IC00OSAtMTgzIC02MyAtODUgLTMzIC00MzggLTE5OSAtNDMzIC0yMDQgMiAtMiA4OCAzMyAxOTIgNzcgMzA5IDEzMiAzMjQgMTM4IDQ1NCAxODUgMTUyIDU0IDEzMCA1OCAtMzAgNXoiLz4gPHBhdGggZD0iTTU3MDUgMzY0MCBjLTQyIC0xMSAtMSAtMTEgNTAgLTEgMzQgNyAzNSA5IDEwIDkgLTE2IDAgLTQzIC00IC02MCAtOHoiLz4gPHBhdGggZD0iTTU2MzMgMzYyMyBjOSAtMiAyMyAtMiAzMCAwIDYgMyAtMSA1IC0xOCA1IC0xNiAwIC0yMiAtMiAtMTIgLTV6Ii8+IDxwYXRoIGQ9Ik01NTQ4IDM2MTMgYzYgLTIgMTggLTIgMjUgMCA2IDMgMSA1IC0xMyA1IC0xNCAwIC0xOSAtMiAtMTIgLTV6Ii8+IDxwYXRoIGQ9Ik01NDEwIDM1OTUgYy0zNiAtNyAtNTQgLTEzIC00MCAtMTMgMTQgMCA1NyA1IDk1IDEyIDM5IDggNTcgMTQgNDAgMTQgLTE2IDAgLTU5IC02IC05NSAtMTN6Ii8+IDxwYXRoIGQ9Ik01MzAzIDM1NzMgYzkgLTIgMjMgLTIgMzAgMCA2IDMgLTEgNSAtMTggNSAtMTYgMCAtMjIgLTIgLTEyIC01eiIvPiA8cGF0aCBkPSJNNTE3NSAzNTU1IGMtMzMgLTcgLTUxIC0xMyAtNDAgLTEzIDExIC0xIDQ5IDUgODUgMTIgMzYgOCA1NCAxNCA0MCAxNCAtMTQgMCAtNTIgLTYgLTg1IC0xM3oiLz4gPHBhdGggZD0iTTQ5NDAgMzUxMCBjLTY5IC0xNiAtMTU5IC00MCAtMjAwIC01NCAtODQgLTI5IC03NCAtMjcgOTAgMTQgNjMgMTYgMTUzIDM4IDIwMCA0OSA0NyAxMCA3NCAxOSA2MCAxOSAtMTQgMCAtODEgLTEzIC0xNTAgLTI4eiIvPiA8cGF0aCBkPSJNMzYzNSAzMTY5IGMtNCAtNiAtNSAtMTIgLTIgLTE1IDIgLTMgNyAyIDEwIDExIDcgMTcgMSAyMCAtOCA0eiIvPiA8L2c+IDwvc3ZnPg==";
const ADMINS = ["1158242449", "1165286823"];
const MESES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const DIAS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

const formatFecha = (fecha) => {
  if(!fecha) return "";
  if(fecha.includes("-") && fecha.length === 10) {
    const d = new Date(fecha + "T12:00:00");
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    const manana = new Date(hoy); manana.setDate(hoy.getDate()+1);
    d.setHours(12,0,0,0);
    if(d.getTime()===hoy.getTime()) return "Hoy · " + d.getDate() + " " + MESES[d.getMonth()];
    if(d.getTime()===manana.getTime()) return "Mañana · " + d.getDate() + " " + MESES[d.getMonth()];
    return DIAS[d.getDay()] + " " + d.getDate() + " " + MESES[d.getMonth()];
  }
  return fecha;
};
const formatHora = (hora) => hora ? hora.slice(0,5) : "";

const S = {
  app:{ fontFamily:"'Raleway',sans-serif", backgroundColor:"#FAF5F1", minHeight:"100vh", maxWidth:430, margin:"0 auto" },
  header:{ padding:"52px 24px 22px", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", borderBottom:"1px solid #DDD0C8", position:"relative", overflow:"hidden" },
  hAccent:{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"#8FAF8A18" },
  hTitle:{ fontSize:26, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Playfair Display',Georgia,serif" },
  hSub:{ fontSize:12, color:"#A89890", margin:"4px 0 0", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:500 },
  card:{ backgroundColor:"#FFFFFF", borderRadius:16, padding:20, marginBottom:12, boxShadow:"0 2px 16px rgba(44,36,32,0.06)", border:"1px solid #DDD0C8" },
  btnP:{ backgroundColor:"#8FAF8A", color:"#FFFFFF", border:"none", borderRadius:50, padding:"14px 32px", fontSize:13, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", width:"100%" },
  btnS:{ backgroundColor:"transparent", color:"#2C2420", border:"1.5px solid #DDD0C8", borderRadius:50, padding:"13px 24px", fontSize:13, fontFamily:"'Raleway',sans-serif", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnD:{ backgroundColor:"transparent", color:"#B86060", border:"1.5px solid #B86060", borderRadius:50, padding:"11px 20px", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnG:{ backgroundColor:"#7BA68A", color:"#FFFFFF", border:"none", borderRadius:50, padding:"11px 20px", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  btnA:{ backgroundColor:"#C8A46A", color:"#FFFFFF", border:"none", borderRadius:50, padding:"11px 20px", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", cursor:"pointer" },
  inp:{ width:"100%", border:"1.5px solid #DDD0C8", borderRadius:12, padding:"14px 16px", fontSize:15, fontFamily:"'Raleway',sans-serif", color:"#2C2420", backgroundColor:"#FFFFFF", outline:"none", boxSizing:"border-box" },
  lbl:{ fontSize:10, color:"#A89890", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.16em", textTransform:"uppercase", fontWeight:700, display:"block", marginBottom:8 },
  nav:{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, backgroundColor:"#FFFFFF", borderTop:"1px solid #DDD0C8", display:"flex", justifyContent:"space-around", padding:"12px 0 22px", zIndex:100 },
};

const navBtn = (active) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", color:active?"#8FAF8A":"#A89890", fontSize:10, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:active?700:500 });

const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Raleway:wght@300;400;500;600;700;800&family=Montserrat:wght@400;600;700&display=swap'); .marca{font-family:'Montserrat','Trebuchet MS',Arial,sans-serif!important;font-weight:700!important;}`}</style>
);

const IcoSVG = ({ name, size=22, color="currentColor" }) => {
  const attr = { fill:"none", stroke:color, strokeWidth:"1.8", strokeLinecap:"round", strokeLinejoin:"round" };
  if(name==="calendar") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if(name==="home") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if(name==="user") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if(name==="users") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  if(name==="check") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="20 6 9 17 4 12"/></svg>;
  if(name==="clock") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if(name==="edit") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
  if(name==="back") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="15 18 9 12 15 6"/></svg>;
  if(name==="chevron") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="9 18 15 12 9 6"/></svg>;
  if(name==="plus") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if(name==="trash") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
  if(name==="unlock") return <svg width={size} height={size} viewBox="0 0 24 24" {...attr}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
  if(name==="wa") return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
  return null;
};

const estadoColor = (estado) => {
  if(estado==="confirmado") return { bg:"#EBF1EA", text:"#6D8F68", label:"Confirmado", dot:"#7BA68A" };
  if(estado==="pendiente")  return { bg:"#FBF3E4", text:"#C8A46A", label:"Pendiente",  dot:"#C8A46A" };
  return                           { bg:"#FAE8E8", text:"#B86060", label:"Libre",       dot:"#B86060" };
};

const Badge = ({ estado }) => {
  const st = estadoColor(estado);
  return <span style={{ display:"inline-block", padding:"3px 12px", borderRadius:50, fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", backgroundColor:st.bg, color:st.text }}>{st.label}</span>;
};

// ─── LOGIN ──────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [paso, setPaso] = useState(1);
  const [cel, setCel] = useState(() => localStorage.getItem("ms_cel") || "");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [load, setLoad] = useState(false);
  const [pendiente, setPendiente] = useState(false);
  const [solicitado, setSolicitado] = useState(false);
  const [recordar, setRecordar] = useState(!!localStorage.getItem("ms_cel"));

  const verificar = async () => {
    const num = cel.replace(/\s/g,"").replace(/-/g,"");
    if(num.length < 8) return;
    setLoad(true);
    if(recordar) { localStorage.setItem("ms_cel", cel); } else { localStorage.removeItem("ms_cel"); }
    if(ADMINS.includes(num)) { setLoad(false); onLogin("admin", null); return; }
    const { data } = await supabase.from("pacientes").select("*").eq("celular", num).single();
    setLoad(false);
    if(!data) { setPaso(2); return; }
    if(data.estado === "pendiente") { setPendiente(true); return; }
    onLogin("paciente", data);
  };

  const registrar = async () => {
    if(nombre.length < 2 || apellido.length < 2) return;
    const num = cel.replace(/\s/g,"").replace(/-/g,"");
    setLoad(true);
    await supabase.from("pacientes").insert([{ nombre, apellido, celular:num, estado:"pendiente" }]);
    setLoad(false);
    setSolicitado(true);
    setTimeout(() => setPendiente(true), 1500);
  };

  if(pendiente) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
      <Fonts/>
      <div style={{ width:80, height:80, borderRadius:"50%", background:"#FBF3E4", border:"2px solid #C8A46A", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <IcoSVG name="clock" size={36} color="#C8A46A"/>
      </div>
      <h2 style={{ fontSize:24, color:"#2C2420", fontWeight:600, margin:"0 0 12px" }}>Acceso pendiente</h2>
      <p style={{ fontSize:14, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", lineHeight:1.6, maxWidth:280 }}>Tu solicitud fue enviada. Mara va a aprobar tu acceso y te va a avisar.</p>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(180deg,#C8DBC5 0%,#F5EDE6 100%)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 28px" }}>
      <Fonts/>
      <div style={{ textAlign:"center", marginBottom:44 }}>
        <div style={{ width:100, height:100, borderRadius:"50%", background:"#6D8F68", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", boxShadow:"0 4px 24px rgba(44,36,32,0.15)" }}>
          <img src={LOGO} width={70} height={70} alt="logo" style={{ objectFit:"contain" }}/>
        </div>
        <h1 className="marca" style={{ fontSize:30, color:"#2C2420", margin:0 }}>Mara Serena</h1>
        <p style={{ color:"#6B5C56", fontSize:13, margin:"5px 0 0", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.18em", textTransform:"uppercase" }}>Dermocosmética</p>
      </div>
      <div style={{...S.card, padding:"28px 24px"}}>
        {paso===1 && <>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>Ingresá tu celular</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Ingresá tu número para acceder.</p>
          <label style={{...S.lbl}}>Número de WhatsApp</label>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
            <div style={{...S.inp, width:80, flexShrink:0, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", color:"#6B5C56", background:"#F5EDE6", fontSize:14 }}>+54 9</div>
            <input style={{...S.inp}} placeholder="11 1234-5678" value={cel} onChange={e=>setCel(e.target.value)} type="tel"/>
          </div>
          <p style={{ fontSize:11, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"0 0 16px", letterSpacing:"0.06em" }}>Sin el 15 · Ej: <strong style={{color:"#2C2420"}}>11</strong> 1234-5678</p>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <input type="checkbox" id="recordar" checked={recordar} onChange={e=>setRecordar(e.target.checked)} style={{ width:16, height:16, accentColor:"#8FAF8A", cursor:"pointer" }}/>
            <label htmlFor="recordar" style={{ fontSize:13, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", cursor:"pointer" }}>Recordar mi número en este dispositivo</label>
          </div>
          <button style={{...S.btnP}} onClick={verificar} disabled={load||cel.length<8}>
            {load ? "Verificando..." : "Ingresar"}
          </button>
        </>}
        {paso===2 && <>
          <button onClick={()=>setPaso(1)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", display:"flex", alignItems:"center", gap:4, marginBottom:18, padding:0 }}>
            <IcoSVG name="back" size={15} color="#A89890"/><span style={{ fontFamily:"'Raleway',sans-serif", fontSize:12 }}>Cambiar número</span>
          </button>
          <h2 style={{ fontSize:21, color:"#2C2420", fontWeight:600, margin:"0 0 6px" }}>Bienvenida/o!</h2>
          <p style={{ fontSize:13, color:"#A89890", margin:"0 0 24px", fontFamily:"'Raleway',sans-serif", lineHeight:1.6 }}>Completá tus datos. Mara va a aprobar tu acceso.</p>
          <label style={{...S.lbl}}>Nombre</label>
          <input style={{...S.inp, marginBottom:16}} placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)}/>
          <label style={{...S.lbl}}>Apellido</label>
          <input style={{...S.inp, marginBottom:20}} placeholder="Apellido" value={apellido} onChange={e=>setApellido(e.target.value)}/>
          <button style={{...S.btnP}} onClick={registrar} disabled={load||nombre.length<2||apellido.length<2}>
            {load ? "Guardando..." : solicitado ? "✓ Acceso solicitado" : "Solicitar acceso"}
          </button>
        </>}
      </div>
    </div>
  );
}

// ─── PACIENTE ───────────────────────────────────────────────────────────────────
function TurnosDisponibles({ paciente }) {
  const [slots, setSlots] = useState([]);
  const [dIdx, setDIdx] = useState(null);
  const [horaSelec, setHoraSelec] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    supabase.from("disponibilidad").select("*").eq("ocupado", false).gte("fecha", hoy).order("fecha").order("hora").then(({ data }) => { if(data) setSlots(data); });
  }, []);

  const porFecha = slots.reduce((acc, sl) => { (acc[sl.fecha]=acc[sl.fecha]||[]).push(sl); return acc; }, {});

  const confirmar = async () => {
    if(!horaSelec || dIdx===null) return;
    setLoad(true);
    const fechaSel = Object.keys(porFecha)[dIdx];
    const slotsDia = Object.values(porFecha)[dIdx];
    const slotSel = slotsDia?.find(sl => sl.hora.slice(0,5) === horaSelec.slice(0,5));
    await supabase.from("turnos").insert([{ paciente_id: paciente?.id || null, fecha: fechaSel, hora: horaSelec, estado:"pendiente", mensaje: mensaje||null }]);
    if(slotSel) await supabase.from("disponibilidad").update({ ocupado:true }).eq("id", slotSel.id);
    setLoad(false);
    setOk(true);
  };

  if(ok) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center", background:"linear-gradient(160deg,#EBF1EA 0%,#FAF5F1 100%)" }}>
      <Fonts/>
      <div style={{ width:88, height:88, borderRadius:"50%", background:"#EBF1EA", border:"2px solid #8FAF8A", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
        <IcoSVG name="check" size={40} color="#8FAF8A"/>
      </div>
      <h2 style={{ fontSize:28, color:"#2C2420", fontWeight:600, margin:"0 0 8px", fontFamily:"'Playfair Display',serif" }}>Turno reservado!</h2>
      <p style={{ fontSize:15, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", lineHeight:1.7, margin:"0 0 16px" }}>
        <strong style={{ color:"#2C2420" }}>{formatFecha(Object.keys(porFecha)[dIdx])} · {formatHora(horaSelec)} hs</strong>
      </p>
      <div style={{...S.card, maxWidth:300, margin:"0 0 24px", textAlign:"left"}}>
        <p style={{ fontSize:12, color:"#6B5C56", fontFamily:"'Raleway',sans-serif", margin:"0 0 10px", fontWeight:600 }}>Recordá estas indicaciones:</p>
        {["Llegar sin maquillaje ni base","No aplicar cremas el día del turno","Avisanos si tomás alguna medicación","Si no podés asistir comunicarte con nosotros"].map((item,i)=>(
          <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#8FAF8A", marginTop:5, flexShrink:0 }}/>
            <p style={{ fontSize:12, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif", lineHeight:1.5 }}>{item}</p>
          </div>
        ))}
        <p style={{ fontSize:11, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"12px 0 0" }}>48 hs antes te enviamos un recordatorio.</p>
      </div>
      <button style={{...S.btnP}} onClick={()=>{setOk(false);setDIdx(null);setHoraSelec(null);setMensaje("");}}>Reservar otro turno</button>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{...S.hTitle}}>Turnos disponibles</h1>
          <p style={{...S.hSub}}>Próximos 6 meses</p>
        </div>
      </div>
      <div style={{ padding:"20px" }}>
        {Object.keys(porFecha).length === 0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay turnos disponibles por el momento.</p>
          : Object.entries(porFecha).map(([fecha, sls], idx) => (
            <div key={fecha} style={{ marginBottom:16 }}>
              <p style={{ fontSize:13, color:"#2C2420", fontFamily:"'Raleway',sans-serif", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>{formatFecha(fecha)}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {sls.map(sl => {
                  const sel = dIdx===idx && horaSelec===sl.hora;
                  return <button key={sl.id} onClick={()=>{setDIdx(idx);setHoraSelec(sl.hora);}} style={{ padding:"10px 20px", borderRadius:50, border: sel?"1.5px solid #8FAF8A":"1.5px solid #DDD0C8", background: sel?"#8FAF8A":"#fff", color: sel?"#fff":"#2C2420", fontSize:13, fontFamily:"'Raleway',sans-serif", cursor:"pointer", fontWeight:600 }}>{formatHora(sl.hora)}</button>;
                })}
              </div>
            </div>
          ))
        }
        {horaSelec && (
          <div style={{...S.card, background:"#EBF1EA", border:"1px solid #B8CEB5", marginTop:8}}>
            <p style={{...S.lbl, color:"#6D8F68", marginBottom:4}}>Turno seleccionado</p>
            <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 16px", fontWeight:600 }}>{formatFecha(Object.keys(porFecha)[dIdx])} · {formatHora(horaSelec)} hs</p>
            <label style={{...S.lbl}}>Mensaje para Mara <span style={{ color:"#B8CEB5" }}>(opcional)</span></label>
            <textarea style={{...S.inp, resize:"none", height:80, fontSize:14, lineHeight:1.5}} placeholder="Ej: quería consultar sobre un tratamiento..." value={mensaje} onChange={e=>setMensaje(e.target.value)}/>
            <button style={{...S.btnP, marginTop:16}} onClick={confirmar} disabled={load}>{load?"Guardando...":"Confirmar reserva"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MisTurnos({ paciente }) {
  const [turnos, setTurnos] = useState([]);
  const [det, setDet] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      if(!paciente?.id) return;
      const { data } = await supabase.from("turnos").select("*").eq("paciente_id", paciente.id).order("fecha").order("hora");
      if(data) setTurnos(data);
    };
    cargar();
    const canal = supabase.channel("mis-turnos").on("postgres_changes", { event:"*", schema:"public", table:"turnos" }, ()=>cargar()).subscribe();
    return () => supabase.removeChannel(canal);
  }, [paciente]);

  if(det) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setDet(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>Detalle del turno</h1></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{...S.card}}>
          <Badge estado={det.estado}/>
          <div style={{ height:1, background:"#DDD0C8", margin:"16px 0" }}/>
          <div style={{ display:"flex", gap:24 }}>
            <div><p style={{...S.lbl}}>Fecha</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{formatFecha(det.fecha)}</p></div>
            <div><p style={{...S.lbl}}>Hora</p><p style={{ fontSize:15, color:"#2C2420", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:600 }}>{formatHora(det.hora)} hs</p></div>
          </div>
          {det.mensaje && <div style={{ marginTop:16, padding:12, background:"#F5EDE6", borderRadius:12 }}><p style={{ fontSize:13, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif" }}>{det.mensaje}</p></div>}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}><div style={{...S.hAccent}}/><div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Mis turnos</h1><p style={{...S.hSub}}>Tus citas</p></div></div>
      <div style={{ padding:20 }}>
        {turnos.length === 0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No tenés turnos reservados aún.</p>
          : turnos.map(trn => (
            <div key={trn.id} style={{...S.card, cursor:"pointer"}} onClick={()=>setDet(trn)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div><Badge estado={trn.estado}/><p style={{ fontSize:15, color:"#2C2420", margin:"8px 0 0", fontWeight:600 }}>{formatFecha(trn.fecha)}</p></div>
                <p style={{ fontSize:16, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif" }}>{formatHora(trn.hora)} hs</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ─── ADMIN TURNOS ───────────────────────────────────────────────────────────────
function AdminTurnos() {
  const [sel, setSel] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [load, setLoad] = useState(true);
  const [editando, setEditando] = useState(false);
  const [editFecha, setEditFecha] = useState("");
  const [editHora, setEditHora] = useState("");
  const [editEstado, setEditEstado] = useState("");
  const [asignando, setAsignando] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const cargar = async () => {
    const { data: dataTurnos } = await supabase.from("turnos").select("*").order("fecha").order("hora");
    const { data: dataPacs } = await supabase.from("pacientes").select("id, nombre, apellido, celular");
    const pacsMap = {};
    if(dataPacs) dataPacs.forEach(p => { pacsMap[p.id] = p; });
    const merged = (dataTurnos||[]).map(t => ({ ...t, pacienteData: t.paciente_id ? pacsMap[t.paciente_id]||null : null }));
    setTurnos(merged);
    setLoad(false);
  };

  useEffect(() => {
    cargar();
    const canal = supabase.channel("admin-turnos").on("postgres_changes", { event:"*", schema:"public", table:"turnos" }, ()=>cargar()).subscribe();
    return () => supabase.removeChannel(canal);
  }, []);

  const liberar = async (trn) => {
    await supabase.from("turnos").delete().eq("id", trn.id);
    // Liberar el slot en disponibilidad
    await supabase.from("disponibilidad").update({ ocupado:false }).eq("fecha", trn.fecha).eq("hora", trn.hora);
    await cargar();
    setSel(null);
  };

  const eliminar = async (trn) => {
    await supabase.from("turnos").delete().eq("id", trn.id);
    await supabase.from("disponibilidad").delete().eq("fecha", trn.fecha).eq("hora", trn.hora);
    await cargar();
    setSel(null);
  };

  const guardarEdicion = async () => {
    await supabase.from("turnos").update({ fecha:editFecha, hora:editHora, estado:editEstado }).eq("id", sel.id);
    await cargar();
    setEditando(false);
    setSel(null);
  };

  const asignarPaciente = async (pac) => {
    await supabase.from("turnos").update({ paciente_id: pac.id }).eq("id", sel.id);
    await cargar();
    setAsignando(false);
    setSel(null);
  };

  const crearYAsignar = async (pac) => {
    // Admin assigns a slot directly to a patient
    await supabase.from("turnos").insert([{ paciente_id: pac.id, fecha: sel.fecha, hora: sel.hora, estado:"pendiente" }]);
    await supabase.from("disponibilidad").update({ ocupado:true }).eq("id", sel.id);
    await cargar();
    setAsignando(false);
    setSel(null);
  };

  const lista = filtro==="todos" ? turnos : turnos.filter(t => t.estado===filtro);
  const libres = turnos.filter(t => !t.paciente_id);
  const porFecha = lista.reduce((acc, t) => { (acc[t.fecha]=acc[t.fecha]||[]).push(t); return acc; }, {});

  const stats = {
    total: turnos.length,
    confirmados: turnos.filter(t=>t.estado==="confirmado").length,
    pendientes: turnos.filter(t=>t.estado==="pendiente").length,
    libres: turnos.filter(t=>!t.paciente_id).length,
  };

  if(asignando) {
    const filtrados = pacientes.filter(p => (p.nombre+" "+p.apellido+" "+p.celular).toLowerCase().includes(busqueda.toLowerCase()));
    return (
      <div style={{ paddingBottom:100 }}>
        <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
          <div style={{...S.hAccent}}/>
          <button onClick={()=>setAsignando(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
          <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>Asignar paciente</h1><p style={{...S.hSub}}>{formatFecha(sel?.fecha)} · {formatHora(sel?.hora)}</p></div>
        </div>
        <div style={{ padding:20 }}>
          <input style={{...S.inp, marginBottom:16}} placeholder="Buscar por nombre o celular..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
          {filtrados.map(pac => (
            <div key={pac.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:14}} onClick={()=>sel.paciente_id ? asignarPaciente(pac) : crearYAsignar(pac)}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:16, color:"#2C2420", fontWeight:600 }}>{pac.nombre?pac.nombre[0]:"?"}</span>
              </div>
              <div>
                <p style={{ fontSize:14, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{pac.nombre} {pac.apellido}</p>
                <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{pac.celular}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if(editando && sel) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setEditando(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>Editar turno</h1></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{...S.card}}>
          <label style={{...S.lbl}}>Fecha</label>
          <input type="date" style={{...S.inp, marginBottom:16}} value={editFecha} onChange={e=>setEditFecha(e.target.value)}/>
          <label style={{...S.lbl}}>Hora</label>
          <input type="time" style={{...S.inp, marginBottom:16}} value={editHora} onChange={e=>setEditHora(e.target.value)}/>
          <label style={{...S.lbl}}>Estado</label>
          <select style={{...S.inp, marginBottom:20}} value={editEstado} onChange={e=>setEditEstado(e.target.value)}>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
          </select>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{...S.btnS, flex:1}} onClick={()=>setEditando(false)}>Cancelar</button>
            <button style={{...S.btnP, flex:1}} onClick={guardarEdicion}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );

  if(sel) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setSel(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{formatFecha(sel.fecha)} · {formatHora(sel.hora)}</h1><p style={{...S.hSub}}>Detalle del turno</p></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{...S.card}}>
          <Badge estado={sel.pacienteData ? sel.estado : "libre"}/>
          {sel.pacienteData
            ? <><h2 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"12px 0 4px" }}>{sel.pacienteData.nombre} {sel.pacienteData.apellido}</h2>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}><IcoSVG name="wa" size={16} color="#8FAF8A"/><span style={{ fontSize:14, color:"#A89890", fontFamily:"'Raleway',sans-serif" }}>{sel.pacienteData.celular}</span></div></>
            : <p style={{ fontSize:14, color:"#A89890", fontFamily:"'Raleway',sans-serif", margin:"12px 0 0" }}>Turno sin asignar</p>
          }
          {sel.mensaje && <div style={{ marginTop:16, padding:12, background:"#F5EDE6", borderRadius:12 }}><p style={{...S.lbl, marginBottom:4}}>Mensaje</p><p style={{ fontSize:13, color:"#6B5C56", margin:0, fontFamily:"'Raleway',sans-serif" }}>{sel.mensaje}</p></div>}
        </div>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button style={{...S.btnS, flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6}}
            onClick={()=>{setEditFecha(sel.fecha);setEditHora(sel.hora?.slice(0,5));setEditEstado(sel.estado||"pendiente");setEditando(true);}}>
            <IcoSVG name="edit" size={14} color="#2C2420"/> Editar
          </button>
          <button style={{...S.btnG, flex:1}} onClick={async()=>{const{data}=await supabase.from("pacientes").select("*").eq("estado","aprobado");if(data)setPacientes(data);setBusqueda("");setAsignando(true);}}>
            Asignar
          </button>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:8 }}>
          <button style={{...S.btnA, flex:1}} onClick={()=>liberar(sel)}>Liberar</button>
          <button style={{...S.btnD, flex:1}} onClick={()=>eliminar(sel)}>Eliminar</button>
        </div>
        <div style={{...S.card, marginTop:12, textAlign:"center"}}>
          <p style={{...S.lbl}}>Recordatorio manual</p>
          <button style={{...S.btnS, display:"inline-flex", alignItems:"center", gap:8, marginTop:8}}><IcoSVG name="wa" size={15} color="#2C2420"/> WhatsApp</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Todos los turnos</h1><p style={{...S.hSub}}>Agenda completa</p></div>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
          {[{lbl:"Total",val:stats.total,col:"#2C2420"},{lbl:"Confirm.",val:stats.confirmados,col:"#7BA68A"},{lbl:"Pendient.",val:stats.pendientes,col:"#C8A46A"},{lbl:"Libres",val:stats.libres,col:"#B86060"}].map(st=>(
            <div key={st.lbl} style={{...S.card, padding:"12px 8px", textAlign:"center", marginBottom:0}}>
              <p style={{ fontSize:22, color:st.col, margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{st.val}</p>
              <p style={{ fontSize:8, color:"#A89890", margin:"2px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.06em" }}>{st.lbl}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
          {[{val:"todos",lbl:"Todos"},{val:"confirmado",lbl:"Confirmados"},{val:"pendiente",lbl:"Pendientes"}].map(fi=>(
            <button key={fi.val} onClick={()=>setFiltro(fi.val)} style={{ flexShrink:0, padding:"7px 16px", borderRadius:50, border: filtro===fi.val?"1.5px solid #8FAF8A":"1.5px solid #DDD0C8", background: filtro===fi.val?"#8FAF8A":"#fff", color: filtro===fi.val?"#fff":"#6B5C56", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:600, cursor:"pointer" }}>{fi.lbl}</button>
          ))}
        </div>
        {load ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>Cargando...</p>
        : turnos.length === 0 ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay turnos cargados aún.</p>
        : Object.entries(porFecha).map(([fecha, trns]) => (
          <div key={fecha} style={{ marginBottom:8 }}>
            <p style={{...S.lbl, marginBottom:8}}>{formatFecha(fecha)}</p>
            {trns.map(trn => {
              const est = trn.pacienteData ? trn.estado : "libre";
              const col = estadoColor(est);
              return (
                <div key={trn.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", marginBottom:8, borderLeft:`4px solid ${col.dot}`}} onClick={()=>setSel(trn)}>
                  <p style={{ fontSize:14, color:"#2C2420", fontWeight:700, margin:0, fontFamily:"'Raleway',sans-serif", minWidth:44 }}>{formatHora(trn.hora)}</p>
                  <div style={{ width:1, height:32, background:"#DDD0C8" }}/>
                  <div style={{ flex:1 }}>
                    {trn.pacienteData ? <p style={{ fontSize:14, color:"#2C2420", margin:0, fontWeight:600 }}>{trn.pacienteData.nombre} {trn.pacienteData.apellido}</p> : <p style={{ fontSize:13, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif", fontStyle:"italic" }}>Disponible</p>}
                  </div>
                  <IcoSVG name="chevron" size={14} color="#A89890"/>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN HORARIOS ─────────────────────────────────────────────────────────────
function AdminHorarios() {
  const [modal, setModal] = useState(false);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotSel, setSlotSel] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [asignando, setAsignando] = useState(false);

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    supabase.from("disponibilidad").select("*").gte("fecha", hoy).order("fecha").order("hora").then(({ data }) => { if(data) setSlots(data); });
  }, []);

  const agregar = async () => {
    if(!fecha || !hora) return;
    const { data, error } = await supabase.from("disponibilidad").insert([{ fecha, hora, ocupado:false }]).select().single();
    if(error) { alert("Error: " + error.message); return; }
    if(data) { setSlots(prev => [...prev, data]); setModal(false); setFecha(""); setHora(""); }
  };

  const eliminar = async (id) => {
    await supabase.from("disponibilidad").delete().eq("id", id);
    setSlots(slots.filter(sl => sl.id !== id));
  };

  const abrirAsignar = async (sl) => {
    setSlotSel(sl);
    const { data } = await supabase.from("pacientes").select("*").eq("estado","aprobado").order("apellido");
    if(data) setPacientes(data);
    setBusqueda("");
    setAsignando(true);
  };

  const asignarPaciente = async (pac) => {
    await supabase.from("turnos").insert([{ paciente_id: pac.id, fecha: slotSel.fecha, hora: slotSel.hora, estado:"pendiente" }]);
    await supabase.from("disponibilidad").update({ ocupado:true }).eq("id", slotSel.id);
    setSlots(slots.map(sl => sl.id===slotSel.id ? {...sl, ocupado:true} : sl));
    setAsignando(false);
    setSlotSel(null);
  };

  const porFecha = slots.reduce((acc, sl) => { (acc[sl.fecha]=acc[sl.fecha]||[]).push(sl); return acc; }, {});

  if(asignando) {
    const filtrados = pacientes.filter(p => (p.nombre+" "+p.apellido+" "+p.celular).toLowerCase().includes(busqueda.toLowerCase()));
    return (
      <div style={{ paddingBottom:100 }}>
        <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
          <div style={{...S.hAccent}}/>
          <button onClick={()=>setAsignando(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
          <div style={{ zIndex:1 }}>
            <h1 style={{...S.hTitle}}>Asignar paciente</h1>
            <p style={{...S.hSub}}>{formatFecha(slotSel?.fecha)} · {formatHora(slotSel?.hora)} hs</p>
          </div>
        </div>
        <div style={{ padding:20 }}>
          <input style={{...S.inp, marginBottom:16}} placeholder="Buscar por nombre o celular..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
          {filtrados.length === 0
            ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay pacientes activas.</p>
            : filtrados.map(pac => (
              <div key={pac.id} style={{...S.card, cursor:"pointer", display:"flex", alignItems:"center", gap:14}} onClick={()=>asignarPaciente(pac)}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:18, color:"#2C2420", fontWeight:600 }}>{pac.nombre?pac.nombre[0]:"?"}</span>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{pac.nombre} {pac.apellido}</p>
                  <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{pac.celular}</p>
                </div>
                <IcoSVG name="chevron" size={16} color="#A89890"/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Horarios</h1><p style={{...S.hSub}}>Turnos disponibles</p></div>
        <button onClick={()=>setModal(true)} style={{...S.btnP, width:"auto", padding:"10px 20px", fontSize:12, position:"relative", zIndex:1}}>+ Agregar</button>
      </div>
      <div style={{ padding:20 }}>
        {Object.keys(porFecha).length === 0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay horarios cargados.</p>
          : Object.entries(porFecha).map(([fecha, sls]) => (
            <div key={fecha} style={{...S.card}}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <p style={{ fontSize:15, color:"#2C2420", margin:0, fontWeight:600 }}>{formatFecha(fecha)}</p>
                <span style={{ fontSize:11, fontFamily:"'Raleway',sans-serif", fontWeight:700, color:"#6D8F68", background:"#EBF1EA", padding:"3px 10px", borderRadius:50 }}>{sls.filter(s=>!s.ocupado).length} libres</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {sls.map(sl => (
                  <div key={sl.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:50, background: sl.ocupado?"#EBF1EA":"#F5EDE6", border:"1px solid #DDD0C8", cursor: sl.ocupado?"default":"pointer" }}
                    onClick={()=>!sl.ocupado && abrirAsignar(sl)}>
                    <span style={{ fontSize:12, fontFamily:"'Raleway',sans-serif", color: sl.ocupado?"#6D8F68":"#2C2420", fontWeight:600 }}>{formatHora(sl.hora)}</span>
                    {!sl.ocupado && <IcoSVG name="plus" size={12} color="#8FAF8A"/>}
                    {sl.ocupado && <span style={{ fontSize:9, color:"#6D8F68", fontFamily:"'Raleway',sans-serif" }}>✓</span>}
                    {!sl.ocupado && <button onClick={e=>{e.stopPropagation();eliminar(sl.id);}} style={{ background:"none", border:"none", cursor:"pointer", color:"#A89890", padding:0, fontSize:14, lineHeight:1 }}>×</button>}
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(44,36,32,0.4)", display:"flex", alignItems:"flex-end", zIndex:200 }}>
          <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 44px", width:"100%", maxWidth:430, margin:"0 auto" }}>
            <h3 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"0 0 20px" }}>Agregar horario</h3>
            <label style={{...S.lbl}}>Fecha</label>
            <input type="date" style={{...S.inp, marginBottom:16}} value={fecha} onChange={e=>setFecha(e.target.value)} min={new Date().toISOString().split("T")[0]}/>
            <label style={{...S.lbl}}>Hora</label>
            <input type="time" style={{...S.inp, marginBottom:24}} value={hora} onChange={e=>setHora(e.target.value)}/>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{...S.btnS, flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
              <button style={{...S.btnP, flex:1}} onClick={agregar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PACIENTES ────────────────────────────────────────────────────────────
function AdminPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [tab, setTab] = useState("aprobados");
  const [modal, setModal] = useState(false);
  const [nuevoCel, setNuevoCel] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [load, setLoad] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [detPac, setDetPac] = useState(null);
  const [turnosPac, setTurnosPac] = useState([]);

  useEffect(() => { cargar(); }, []);

  const verPaciente = async (pac) => {
    setDetPac(pac);
    const { data } = await supabase.from("turnos").select("*").eq("paciente_id", pac.id).order("fecha", { ascending:false });
    if(data) setTurnosPac(data);
  };

  const cargar = async () => {
    const { data } = await supabase.from("pacientes").select("*").order("apellido");
    if(data) setPacientes(data);
  };

  const aprobar = async (id) => {
    await supabase.from("pacientes").update({ estado:"aprobado" }).eq("id", id);
    await cargar();
  };

  const rechazar = async (id) => {
    await supabase.from("pacientes").delete().eq("id", id);
    await cargar();
  };

  const agregar = async () => {
    if(!nuevoCel || nuevoCel.length < 8) return;
    setLoad(true);
    const { error } = await supabase.from("pacientes").insert([{ celular:nuevoCel.replace(/\s/g,""), nombre:nuevoNombre, apellido:nuevoApellido, estado:"aprobado" }]);
    setLoad(false);
    if(error) { alert("Error: " + error.message); return; }
    setModal(false); setNuevoCel(""); setNuevoNombre(""); setNuevoApellido("");
    await cargar();
  };

  const aprobados = pacientes.filter(p => p.estado==="aprobado" && (p.nombre+" "+p.apellido+" "+p.celular).toLowerCase().includes(busqueda.toLowerCase()));
  const pendientes = pacientes.filter(p => p.estado==="pendiente" && (p.nombre+" "+p.apellido+" "+p.celular).toLowerCase().includes(busqueda.toLowerCase()));

  if(detPac) return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, display:"flex", alignItems:"center", gap:14}}>
        <div style={{...S.hAccent}}/>
        <button onClick={()=>setDetPac(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, zIndex:1 }}><IcoSVG name="back" size={20} color="#2C2420"/></button>
        <div style={{ zIndex:1 }}><h1 style={{...S.hTitle}}>{detPac.nombre} {detPac.apellido}</h1><p style={{...S.hSub}}>{detPac.celular}</p></div>
      </div>
      <div style={{ padding:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:16 }}>
          <div style={{...S.card, textAlign:"center", marginBottom:0}}>
            <p style={{ fontSize:32, color:"#8FAF8A", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{turnosPac.length}</p>
            <p style={{ fontSize:10, color:"#A89890", margin:"4px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em" }}>Visitas totales</p>
          </div>
          <div style={{...S.card, textAlign:"center", marginBottom:0}}>
            <p style={{ fontSize:32, color:"#C8A46A", margin:0, fontFamily:"'Raleway',sans-serif", fontWeight:800 }}>{turnosPac.filter(t=>t.estado==="confirmado").length}</p>
            <p style={{ fontSize:10, color:"#A89890", margin:"4px 0 0", fontFamily:"'Raleway',sans-serif", textTransform:"uppercase", letterSpacing:"0.08em" }}>Confirmadas</p>
          </div>
        </div>
        <p style={{...S.lbl, marginBottom:12}}>Historial de turnos</p>
        {turnosPac.length === 0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:20 }}>Sin turnos registrados.</p>
          : turnosPac.map(trn => (
            <div key={trn.id} style={{...S.card, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <p style={{ fontSize:14, color:"#2C2420", margin:"0 0 4px", fontWeight:600, fontFamily:"'Raleway',sans-serif" }}>{formatFecha(trn.fecha)}</p>
                <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{formatHora(trn.hora)} hs</p>
              </div>
              <Badge estado={trn.estado}/>
            </div>
          ))
        }
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom:100 }}>
      <div style={{...S.header, position:"relative", display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
        <div style={{...S.hAccent}}/>
        <div style={{ position:"relative", zIndex:1 }}><h1 style={{...S.hTitle}}>Pacientes</h1><p style={{...S.hSub}}>{aprobados.length} activas · {pendientes.length} pendientes</p></div>
        <button onClick={()=>setModal(true)} style={{...S.btnP, width:"auto", padding:"10px 20px", fontSize:12, position:"relative", zIndex:1}}>+ Nueva</button>
      </div>
      <div style={{ padding:"16px 20px 0" }}>
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {[{val:"aprobados",lbl:"Activas"},{val:"pendientes",lbl:`Pendientes${pendientes.length>0?" ("+pendientes.length+")":""}`}].map(tb=>(
            <button key={tb.val} onClick={()=>setTab(tb.val)} style={{ padding:"7px 20px", borderRadius:50, border: tab===tb.val?"1.5px solid #8FAF8A":"1.5px solid #DDD0C8", background: tab===tb.val?"#8FAF8A":"#fff", color: tab===tb.val?"#fff":"#6B5C56", fontSize:12, fontFamily:"'Raleway',sans-serif", fontWeight:600, cursor:"pointer" }}>{tb.lbl}</button>
          ))}
        </div>
        <input style={{...S.inp, marginBottom:16}} placeholder="Buscar por nombre o celular..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
        {tab==="aprobados" && (aprobados.length===0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay pacientes activas.</p>
          : aprobados.map(pac => (
            <div key={pac.id} style={{...S.card, display:"flex", alignItems:"center", gap:14, cursor:"pointer"}} onClick={()=>verPaciente(pac)}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:"#E8D5C8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:18, color:"#2C2420", fontWeight:600 }}>{pac.nombre?pac.nombre[0]:"?"}</span>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{pac.nombre} {pac.apellido}</p>
                <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{pac.celular}</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <IcoSVG name="chevron" size={14} color="#A89890"/>
                <button onClick={e=>{e.stopPropagation();rechazar(pac.id);}} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}><IcoSVG name="trash" size={16} color="#B86060"/></button>
              </div>
            </div>
          ))
        )}
        {tab==="pendientes" && (pendientes.length===0
          ? <p style={{ color:"#A89890", fontFamily:"'Raleway',sans-serif", textAlign:"center", marginTop:40 }}>No hay solicitudes pendientes.</p>
          : pendientes.map(pac => (
            <div key={pac.id} style={{...S.card}}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"#FBF3E4", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:18, color:"#C8A46A", fontWeight:600 }}>{pac.nombre?pac.nombre[0]:"?"}</span>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:15, color:"#2C2420", margin:"0 0 2px", fontWeight:600 }}>{pac.nombre} {pac.apellido}</p>
                  <p style={{ fontSize:12, color:"#A89890", margin:0, fontFamily:"'Raleway',sans-serif" }}>{pac.celular}</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button style={{...S.btnD, flex:1}} onClick={()=>rechazar(pac.id)}>Rechazar</button>
                <button style={{...S.btnG, flex:1}} onClick={()=>aprobar(pac.id)}>Aprobar</button>
              </div>
            </div>
          ))
        )}
      </div>
      {modal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(44,36,32,0.4)", display:"flex", alignItems:"flex-end", zIndex:200 }}>
          <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 44px", width:"100%", maxWidth:430, margin:"0 auto" }}>
            <h3 style={{ fontSize:20, color:"#2C2420", fontWeight:600, margin:"0 0 20px" }}>Nueva paciente</h3>
            <label style={{...S.lbl}}>Celular</label>
            <input style={{...S.inp, marginBottom:16}} placeholder="1112345678" value={nuevoCel} onChange={e=>setNuevoCel(e.target.value)} type="tel"/>
            <label style={{...S.lbl}}>Nombre</label>
            <input style={{...S.inp, marginBottom:16}} placeholder="Nombre" value={nuevoNombre} onChange={e=>setNuevoNombre(e.target.value)}/>
            <label style={{...S.lbl}}>Apellido</label>
            <input style={{...S.inp, marginBottom:24}} placeholder="Apellido" value={nuevoApellido} onChange={e=>setNuevoApellido(e.target.value)}/>
            <div style={{ display:"flex", gap:10 }}>
              <button style={{...S.btnS, flex:1}} onClick={()=>setModal(false)}>Cancelar</button>
              <button style={{...S.btnP, flex:1}} onClick={agregar} disabled={load}>{load?"Guardando...":"Agregar"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ROOT ───────────────────────────────────────────────────────────────────
export default function App() {
  const [rol, setRol] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [tabP, setTabP] = useState("disponibles");
  const [tabA, setTabA] = useState("turnos");

  const handleLogin = (rolSelec, dataPaciente) => {
    setRol(rolSelec);
    setPaciente(dataPaciente);
  };

  if(!rol) return <Login onLogin={handleLogin}/>;

  if(rol==="paciente") return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabP==="disponibles" && <TurnosDisponibles paciente={paciente}/>}
      {tabP==="misturnos" && <MisTurnos paciente={paciente}/>}
      <nav style={{...S.nav}}>
        {[{id:"disponibles",name:"calendar",lbl:"Reservar"},{id:"misturnos",name:"user",lbl:"Mis turnos"}].map(navItem=>(
          <button key={navItem.id} style={{...navBtn(tabP===navItem.id)}} onClick={()=>setTabP(navItem.id)}>
            <IcoSVG name={navItem.name} size={22} color={tabP===navItem.id?"#8FAF8A":"#A89890"}/>
            {navItem.lbl}
          </button>
        ))}
      </nav>
    </div>
  );

  return (
    <div style={{...S.app}}>
      <Fonts/>
      {tabA==="turnos" && <AdminTurnos/>}
      {tabA==="horarios" && <AdminHorarios/>}
      {tabA==="pacientes" && <AdminPacientes/>}
      <nav style={{...S.nav}}>
        {[{id:"turnos",name:"home",lbl:"Turnos"},{id:"horarios",name:"calendar",lbl:"Horarios"},{id:"pacientes",name:"users",lbl:"Pacientes"}].map(navItem=>(
          <button key={navItem.id} style={{...navBtn(tabA===navItem.id)}} onClick={()=>setTabA(navItem.id)}>
            <IcoSVG name={navItem.name} size={22} color={tabA===navItem.id?"#8FAF8A":"#A89890"}/>
            {navItem.lbl}
          </button>
        ))}
      </nav>
    </div>
  );
}

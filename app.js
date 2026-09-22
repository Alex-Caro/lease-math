function n(id) { return Number(document.getElementById(id).value) || 0; }
function run() {
  const monthly = n("check") * 26 / 12;
  const rent = n("rent");
  const moveIn = rent + rent * n("dep") + n("fees");
  const left = monthly - rent - n("other");
  const rentPct = monthly ? (rent / monthly) * 100 : 0;
  const leftPct = monthly ? (left / monthly) * 100 : 0;
  let grade = "Pass";
  if (rentPct > 40 || leftPct < 30) grade = "Fail";
  else if (rentPct > 30 || leftPct < 50) grade = "Tight";
  document.getElementById("out").textContent = [
    "Monthly net: $" + monthly.toFixed(0),
    "Rent share: " + rentPct.toFixed(0) + "%",
    "Move-in cash: $" + moveIn.toFixed(0),
    "Left after rent and bills: $" + left.toFixed(0) + " (" + leftPct.toFixed(0) + "%)",
    "Grade: " + grade,
    "30% rent rule: " + (rentPct <= 30 ? "ok" : "over"),
    "50% leftover after rent food car: " + (leftPct >= 50 ? "ok" : "under")
  ].join("\n");
}
["check", "rent", "dep", "fees", "other"].forEach((id) => {
  document.getElementById(id).addEventListener("input", run);
});
run();

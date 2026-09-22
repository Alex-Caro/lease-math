function clamp(v, lo, hi) {
  const n = Number(v);
  if (!Number.isFinite(n)) return lo;
  return Math.min(hi, Math.max(lo, n));
}
function n(id, lo, hi) {
  const el = document.getElementById(id);
  return clamp(el ? el.value : lo, lo, hi);
}
function run() {
  try {
    const monthly = n("check", 0, 100000) * 26 / 12;
    const rent = n("rent", 0, 20000);
    const moveIn = rent + rent * n("dep", 0, 3) + n("fees", 0, 5000);
    const left = monthly - rent - n("other", 0, 20000);
    const rentPct = monthly > 0 ? (rent / monthly) * 100 : 0;
    const leftPct = monthly > 0 ? (left / monthly) * 100 : 0;
    let grade = "Pass";
    if (rentPct > 40 || leftPct < 30) grade = "Fail";
    else if (rentPct > 30 || leftPct < 50) grade = "Tight";
    const out = document.getElementById("out");
    if (!out) return;
    out.textContent = [
      "Monthly net: $" + monthly.toFixed(0),
      "Rent share: " + rentPct.toFixed(0) + "%",
      "Move-in cash: $" + moveIn.toFixed(0),
      "Left after rent and bills: $" + left.toFixed(0) + " (" + leftPct.toFixed(0) + "%)",
      "Grade: " + grade,
      "30% rent rule: " + (rentPct <= 30 ? "ok" : "over"),
      "50% leftover after rent food car: " + (leftPct >= 50 ? "ok" : "under")
    ].join("\n");
  } catch (err) {
    const out = document.getElementById("out");
    if (out) out.textContent = "Could not calculate. Reload the page.";
  }
}
try {
  ["check", "rent", "dep", "fees", "other"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", run);
  });
  const form = document.getElementById("f");
  if (form) form.addEventListener("submit", (e) => e.preventDefault());
  run();
} catch (err) {
  document.body.appendChild(document.createTextNode("App failed to start."));
}

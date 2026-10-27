import test from "node:test";
import assert from "node:assert/strict";
import { getShopStatus, HOURS_LABEL } from "../src/utils/shopStatus.js";

// Shop is in Karachi (UTC+5, no DST): 19:00 PKT = 14:00Z.
const at = (hhmmUtc) => getShopStatus(new Date(`2026-10-27T${hhmmUtc}:00Z`));

test("hours label", () => assert.equal(HOURS_LABEL, "6:00 PM \u2013 2:00 AM"));
test("open in the evening (7 PM PKT)", () => assert.equal(at("14:00").open, true));
test("opens exactly at 6 PM PKT", () => assert.equal(at("13:00").open, true));
test("open after midnight (12:30 AM PKT)", () => assert.equal(at("19:30").open, true));
test("closing soon at 1:30 AM PKT", () => assert.equal(at("20:30").tone, "warn"));
test("closed exactly at 2 AM PKT", () => assert.equal(at("21:00").open, false));
test("closed in the afternoon (12 PM PKT)", () => {
  const s = at("07:00");
  assert.equal(s.open, false);
  assert.match(s.text, /opens at 6:00 PM/);
});
test("opening soon at 5:30 PM PKT", () => assert.match(at("12:30").text, /Opening soon/));
test("uses the shop's time zone, not the visitor's", () => {
  // 14:00Z is evening in Karachi regardless of where the code runs
  assert.equal(at("14:00").open, true);
});

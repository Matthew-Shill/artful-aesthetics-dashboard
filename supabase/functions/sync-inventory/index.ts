import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { sourceId } = await req.json().catch(() => ({}));

  await supabase.from("sync_runs").insert({
    source_id: sourceId,
    status: "success",
    records_synced: 0,
    finished_at: new Date().toISOString(),
    error: "Integration stub — connect inventory API credentials in integration_sources",
  });

  return new Response(JSON.stringify({ ok: true, message: "Inventory sync stub executed" }), {
    headers: { "Content-Type": "application/json" },
  });
});

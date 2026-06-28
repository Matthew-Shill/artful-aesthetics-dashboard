import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const { sourceId } = await req.json().catch(() => ({}));

  const run = await supabase
    .from("sync_runs")
    .insert({ source_id: sourceId, status: "running" })
    .select()
    .single();

  // Stub: replace with actual booking API integration when credentials are available
  await supabase
    .from("sync_runs")
    .update({
      status: "success",
      records_synced: 0,
      finished_at: new Date().toISOString(),
      error: "Integration stub — connect booking API credentials in integration_sources",
    })
    .eq("id", run.data?.id);

  return new Response(JSON.stringify({ ok: true, message: "Booking sync stub executed" }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { mockData } from "../data/mockData";
import { inventoryData } from "../data/inventoryData";

export function useDashboardData() {
  const { supabase, session } = useAuth();
  const [source, setSource] = useState("mock");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    mockData,
    inventoryData,
    appointments: null,
    transactions: null,
    inventoryItems: null,
  });

  useEffect(() => {
    if (!supabase || !session) {
      setSource("mock");
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const [appointments, transactions, inventoryItems] = await Promise.all([
          supabase.from("appointments").select("*").limit(100),
          supabase.from("transactions").select("*").limit(100),
          supabase.from("inventory_items").select("*").limit(100),
        ]);

        const hasLiveData =
          (appointments.data?.length ?? 0) > 0 ||
          (transactions.data?.length ?? 0) > 0 ||
          (inventoryItems.data?.length ?? 0) > 0;

        if (hasLiveData) {
          setSource("supabase");
          setData((prev) => ({
            ...prev,
            appointments: appointments.data,
            transactions: transactions.data,
            inventoryItems: inventoryItems.data,
          }));
        } else {
          setSource("mock");
        }
      } catch {
        setSource("mock");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [supabase, session]);

  return { data, source, loading, isLive: source === "supabase" };
}

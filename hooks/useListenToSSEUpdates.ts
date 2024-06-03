import { User } from "@/app/types";
import { getAllUsers } from "@/services/user.service";
import { useCallback, useEffect, useState } from "react";

export function useListenToSSEUpdates() {
  const [users, setUsers] = useState<User[]>([]);
  const [sseConnection, setSSEConnection] = useState<EventSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersResult = await getAllUsers();
      setUsers(usersResult);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const listenToSSEUpdates = useCallback(() => {
    const eventSource = new EventSource(
      "https://challenge.bodhilabs.dev/users/events",
    );

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      if (data) {
        fetchUsers();
      }
    };

    eventSource.onerror = (event) => {
      console.error("SSE Error:", event);
    };

    setSSEConnection(eventSource);

    return eventSource;
  }, []);

  useEffect(() => {
    fetchUsers();
    listenToSSEUpdates();

    return () => {
      if (sseConnection) {
        sseConnection.close();
      }
    };
  }, [listenToSSEUpdates]);

  // Add "beforeunload" event listener to close SSE connection when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.dir(sseConnection);
      if (sseConnection) {
        console.info("Closing SSE connection before unloading the page.");
        sseConnection.close();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sseConnection]);

  return { users, isLoading };
}

import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";
// import { useUserStore } from "./user";

// const { currentUsername } = useUserStore();
export const useFriendStore = defineStore(
  "friends",
  () => {
    const currentFriends = ref<Array<string>>([]);
    const requests = ref<Array<Record<string, string>>>([]);

    const getFriends = async () => {
      try {
        const friends = await fetchy("api/friends", "GET", {});
        currentFriends.value = friends;
      } catch {
        currentFriends.value = [];
      }
    };

    const getRequests = async () => {
      let requestResults;
      try {
        requestResults = await fetchy("/api/friend/requests", "GET");
      } catch (_) {
        return;
      }
      requests.value = requestResults;
    };

    return {
      currentFriends,
      requests,
      getFriends,
      getRequests,
    };
  },
  { persist: true },
);

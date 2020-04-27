import { useState, useCallback } from "react";

// Hook that's calls the passed onRefresh function (to fetch data) when the user
// pulls down to refresh the screen
const useRefresh = (onRefresh) => {
  const [refreshing, setRefreshing] = useState(false);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return [refreshing, onPullToRefresh];
};

export default useRefresh;
